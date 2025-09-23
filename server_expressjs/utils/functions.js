import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/environment.js";
import { cookieConfig } from "../config/cookieConfig.js";

export const getDaysInMonth = (date) => {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const firstDay = new Date(Date.UTC(year, month, 1));
  const nextMonthFirstDay = new Date(Date.UTC(year, month + 1, 1));
  const days = (nextMonthFirstDay - firstDay) / (1000 * 60 * 60 * 24);
  return days;
};

export const hashPassword = async (password, saltRounds = 12) => {
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

export const hidePassword = (user) => {
  if (!user) return null;
  const { password, ...rest } = user;
  return rest;
};

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

export const setAuthCookie = (res, token, maxAge) => {
  res.cookie("jwt", token, { ...cookieConfig(), maxAge });
};

export const clearAuthCookie = (res, maxAge) => {
  res.clearCookie("jwt", cookieConfig()); // <-- PAS de maxAge ici
};
