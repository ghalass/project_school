// middleware/requireAuth.js
import jwt from "jsonwebtoken";
import prisma from "../utils/prismaClient.js";

const requireAuth = async (req, res, next) => {
  const sendError = (status, message) =>
    res.status(status).json({ error: message });

  try {
    // 🔑 Récupérer le token depuis les cookies
    const token = req.cookies?.jwt;
    if (!token) return sendError(401, "Authorization token required");

    // 🔍 Vérifier et décoder le token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
      return sendError(401, "Invalid or expired token");
    }

    const userId = Number(decoded?.id);
    if (!userId) return sendError(401, "Invalid user ID in token");

    // 🔎 Vérifier si l'utilisateur existe encore en base
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, role: true, active: true },
    });

    if (!user) return sendError(401, "User does not exist");
    if (!user.active) return sendError(403, "User account is disabled");

    // 🔗 Attacher l'utilisateur à la requête
    req.user = user;

    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err);
    return sendError(500, "Internal server error");
  }
};

export default requireAuth;
