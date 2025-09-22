// server.js

import "dotenv/config"; // équivalent à require("dotenv").config()

import express from "express";
import helmet from "helmet";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";

import corsOptions from "./config/corsOptions.js";
import prisma from "./prismaClient.js";

// .ENV VARIABLES ==> CHECK ALL VARIABLES
const requiredEnv = ["ACCESS_TOKEN_SECRET", "URL", "DATABASE_URL", "PORT"];
requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.error(`⚠️ ${key} is missing in .env`);
    process.exit(1);
  }
});

// Routes
import userRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";
import rootRoutes from "./routes/root.js";

// Pour __dirname en ESM :
import { fileURLToPath } from "url";
import { logger } from "./middleware/logger.js";
import { config } from "./config/environment.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CREATE EXPRESS APP
const app = express();

// MIDDLEWARES
app.use(express.json()); // allow json data
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions)); // Enable CORS
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "default-src": ["'self'"],
        "script-src": ["'self'", "https://cdn.jsdelivr.net"],
        "img-src": ["'self'", "data:"],
      },
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "same-origin" },
  })
);
app.use("/", express.static(path.join(__dirname, "public"))); // static files

// USE ROUTES
app.use("/", rootRoutes);
app.use("/user", userRoutes);
app.use("/auth", authRoutes);

app.use(logger);

// 404 ROUTE
app.all("*", (req, res) => {
  console.warn(`⚠️ 404 Not Found: ${req.method} ${req.originalUrl}`);
  const message = "404 Not Found";
  res.status(404).format({
    html: () => res.sendFile(path.join(__dirname, "./views/404.html")),
    json: () => res.json({ message }),
    text: () => res.send(message),
  });
});

// Middleware global pour les erreurs "exceptions non gérées."
app.use((err, req, res, next) => {
  console.error("Global Error:", err);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal Server Error" });
});

// PRISMA & RUN SERVER
async function startServer() {
  try {
    await prisma.$connect();
    app.listen(config.PORT, () => {
      console.log(
        `✅ Connected to DB & listening on ${config.HOST}:${config.PORT}`
      );
    });
  } catch (err) {
    console.error("Failed to connect to DB:", err);
    process.exit(1);
  }
}

startServer();
