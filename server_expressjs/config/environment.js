// config/environment.js

/**
 * Configuration centralisée des variables d'environnement
 */
export const config = {
  // Serveur
  PORT: process.env.PORT || 5000,
  HOST: process.env.URL || "http://localhost",
  NODE_ENV: process.env.NODE_ENV || "development",

  // JWT
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  TOKEN_EXPIRE_IN: process.env.TOKEN_EXPIRE_IN || "7h",
};
