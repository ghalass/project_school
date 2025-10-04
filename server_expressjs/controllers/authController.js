import {
  hashPassword,
  hidePassword,
  generateToken,
  comparePassword,
  setAuthCookie,
  clearAuthCookie,
} from "../utils/functions.js";
import HttpStatus from "../utils/httpStatus.js";
import prisma from "../utils/prismaClient.js";

// Durée d'expiration du token (7h en millisecondes)
const tokenExpireIn = 7 * 60 * 60 * 1000;

export const signupUser = async (req, res) => {
  const { name, lastName, email, password, role } = req.body;
  const msgEmailUsed = "E-mail déjà utilisé.";
  const userExist = await prisma.user.findFirst({ where: { email } });
  if (userExist)
    return res.status(HttpStatus.CONFLICT).json({ error: msgEmailUsed });
  const hashedPassword = await hashPassword(password);
  const createdUser = await prisma.user.create({
    data: { name, lastName, email, password: hashedPassword, role },
  });
  res.status(HttpStatus.CREATED).json(hidePassword(createdUser));
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const msgIncorrect = "E-mail ou mot de passe incorrect.";
  const msgInactive =
    "Votre compte est désactivé, veuillez contacter un admin.";
  const user = await prisma.user.findFirst({ where: { email } });
  if (!user)
    return res.status(HttpStatus.BAD_REQUEST).json({ error: msgIncorrect });
  const passwordMatch = await comparePassword(password, user.password);
  if (!passwordMatch)
    return res.status(HttpStatus.BAD_REQUEST).json({ error: msgIncorrect });
  if (!user.active)
    return res.status(HttpStatus.FORBIDDEN).json({ error: msgInactive });
  const token = generateToken(hidePassword(user));
  setAuthCookie(res, token, tokenExpireIn);
  res.status(HttpStatus.OK).json({ user: hidePassword(user), token });
};

export const logoutUser = async (req, res) => {
  clearAuthCookie(res, tokenExpireIn);
  res.status(HttpStatus.OK).json({ message: "Déconnecté avec succès." });
};
