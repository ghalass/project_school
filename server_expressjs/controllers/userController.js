import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { hashPassword, hidePassword } from "../utils/functions.js";
import HttpStatus from "../utils/httpStatus.js";
import prisma from "../utils/prismaClient.js";

/**
 * Récupérer un utilisateur par email
 */
export const getByEmail = async (req, res) => {
  const { email } = req.body;
  const user = await prisma.user.findFirst({ where: { email } });

  if (!user) {
    return res.status(400).json({ error: "Utilisateur non trouvé." });
  }
  res.status(200).json(hidePassword(user));
};

/**
 * Changer le mot de passe d'un utilisateur
 */
export const changePassword = async (req, res) => {
  const { oldPassword, newPassword, email } = req.body;
  const user = await prisma.user.findFirst({ where: { email } });
  if (!user) return res.status(400).json({ error: "E-mail n'existe pas!" });

  const match = await bcrypt.compare(oldPassword, user.password);
  if (!match)
    return res.status(400).json({ error: "Mot de passe actuel incorrect." });

  // Vérification du token JWT
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ error: "Authorization token required!" });

  const token = authHeader.split(" ")[1];
  const { id } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  if (user.id !== id) {
    return res.status(400).json({
      error: "Vous ne pouvez changer que votre propre mot de passe!",
    });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const updatedUser = await prisma.user.update({
    where: { email },
    data: { password: hashedPassword },
  });

  res.status(200).json(hidePassword(updatedUser));
};

/**
 * Récupérer tous les utilisateurs
 */
export const getUsers = async (req, res) => {
  const users = await prisma.user.findMany({
    orderBy: [{ role: "asc" }, { name: "asc" }, { active: "desc" }],
  });
  const usersWithoutPassword = users.map((user) => hidePassword(user));
  res.status(HttpStatus.OK).json(usersWithoutPassword);
};

export const getUsersCount = async (req, res) => {
  const usersCount = await prisma.user.count();
  res.status(HttpStatus.OK).json(usersCount);
};

/**
 * Mettre à jour un utilisateur
 */
export const updateUser = async (req, res) => {
  const { id, password, ...data } = req.body;
  const currentUserRole = req?.user?.role;
  const currentUserId = req?.user?.id;

  const userToUpdate = await prisma.user.findUnique({
    where: { id: parseInt(id) },
  });
  if (!userToUpdate)
    return res
      .status(HttpStatus.NOT_FOUND)
      .json({ error: "Utilisateur non trouvé." });

  // Vérification des rôles
  if (
    (currentUserRole === "ADMIN" &&
      ["SUPER_ADMIN", "ADMIN"].includes(userToUpdate.role)) ||
    (currentUserRole === "SUPER_ADMIN" &&
      userToUpdate.role === "SUPER_ADMIN" &&
      userToUpdate.id !== currentUserId)
  ) {
    return res
      .status(HttpStatus.FORBIDDEN)
      .json({ error: "Action non autorisée sur cet utilisateur." });
  }

  // Vérification email unique
  if (data.email) {
    const emailExists = await prisma.user.findFirst({
      where: { email: data.email, id: { not: parseInt(id) } },
    });
    if (emailExists)
      return res
        .status(HttpStatus.CONFLICT)
        .json({ error: "Cet email est déjà utilisé!" });
  }

  // Hash du nouveau mot de passe si fourni
  if (password && password !== "") {
    data.password = await hashPassword(password);
  }

  const updatedUser = await prisma.user.update({
    where: { id: parseInt(id) },
    data,
  });
  res.status(HttpStatus.OK).json(hidePassword(updatedUser));
};

/**
 * Supprimer un utilisateur
 */
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const currentUserRole = req?.user?.role;

  const userToDelete = await prisma.user.findUnique({
    where: { id: parseInt(id) },
  });
  if (!userToDelete)
    return res
      .status(HttpStatus.NOT_FOUND)
      .json({ error: "Utilisateur non trouvé!" });

  if (
    (currentUserRole === "ADMIN" &&
      ["SUPER_ADMIN", "ADMIN"].includes(userToDelete.role)) ||
    (currentUserRole === "SUPER_ADMIN" && userToDelete.role === "SUPER_ADMIN")
  ) {
    return res
      .status(HttpStatus.FORBIDDEN)
      .json({ error: "Action non autorisée sur cet utilisateur." });
  }

  await prisma.user.delete({ where: { id: parseInt(id) } });
  res
    .status(HttpStatus.OK)
    .json({ message: "Utilisateur supprimé avec succès!" });
};

/**
 * Créer un super admin par défaut
 */
export const createSuperAdmin = async (req, res) => {
  const name = "ghalass";
  const email = "ghalass@gmail.com";
  const password = "gh@l@ss@dmin";
  const role = "SUPER_ADMIN";

  const userExist = await prisma.user.findFirst({ where: { email } });
  if (userExist)
    return res.status(HttpStatus.CONFLICT).json("SUPER_ADMIN ALREADY CREATED");

  const hashedPassword = await hashPassword(password);
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
      active: true,
    },
  });

  res.status(HttpStatus.CREATED).json("SUPER_ADMIN CREATED SUCCESSFULLY");
};
