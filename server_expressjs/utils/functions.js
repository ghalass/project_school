import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/environment.js";

/**
 * Calcul le nombre des jours dans un mois à partir d'une date
 * @param {Date} date - une date dans le mois
 * @returns {number} - nombre de jours dans le mois
 */
export const getDaysInMonth = (date) => {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const firstDay = new Date(Date.UTC(year, month, 1));
  const nextMonthFirstDay = new Date(Date.UTC(year, month + 1, 1));
  const days = (nextMonthFirstDay - firstDay) / (1000 * 60 * 60 * 24);
  return days;
};

/**
 * Hash un mot de passe en utilisant bcrypt
 * @param {string} password - Mot de passe en clair
 * @param {number} saltRounds - Nombre de tours de salage (par défaut 12)
 * @returns {Promise<string>} - Le mot de passe hashé
 */
export const hashPassword = async (password, saltRounds = 12) => {
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(password, salt);
};

/**
 * Compare un mot de passe en clair avec un hash
 * @param {string} password - Mot de passe en clair
 * @param {string} hashedPassword - Hash stocké en base
 * @returns {Promise<boolean>}
 */
export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

/**
 * Supprime le champ password d'un objet user
 * @param {object} user
 * @returns {object|null}
 */
export const hidePassword = (user) => {
  if (!user) return null;
  const { password, ...rest } = user;
  return rest;
};

/**
 * Génère un token JWT pour un utilisateur
 * @param {object} loggedUser - Données de l'utilisateur à stocker dans le token
 * @param {string} [secret=config.ACCESS_TOKEN_SECRET] - Clé secrète pour signer le token
 * @param {string|number} [expiresIn="7h"] - Durée d'expiration du token (ex: "7h", "1d", 3600)
 * @returns {string} - Token JWT signé
 */
export const generateToken = (
  loggedUser,
  secret = config.ACCESS_TOKEN_SECRET,
  expiresIn = "7h"
) => {
  if (!secret) {
    throw new Error(
      "JWT secret manquant. Vérifie ACCESS_TOKEN_SECRET dans ton .env"
    );
  }

  try {
    return jwt.sign(loggedUser, secret, { expiresIn });
  } catch (err) {
    throw new Error("Erreur lors de la génération du token: " + err.message);
  }
};

/**
 * Définit le cookie JWT dans la réponse
 * @param {object} res - Objet response Express
 * @param {string} token - Le token JWT généré
 * @param {number} maxAge - Durée de vie du cookie en ms
 */
export const setAuthCookie = (res, token, maxAge) => {
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: "None",
    maxAge,
  });
};
