// middleware/requireAuth.js

import prisma from "../prismaClient.js";
import jwt from "jsonwebtoken";

const requireAuth = async (req, res, next) => {
  const sendError = (status, message) =>
    res.status(status).json({ error: message });

  try {
    // Récupérer le token depuis les cookies
    const token = req.cookies?.jwt;
    if (!token) return sendError(401, "Authorization token required");

    // Vérifier et décoder le token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch {
      return sendError(401, "Invalid or expired token");
    }

    const userId = Number(decoded?.id);
    if (!userId) return sendError(401, "Invalid user ID in token");

    // Vérifier si l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, role: true }, // minimum nécessaire
    });

    if (!user) return sendError(401, "User does not exist");

    // Attacher l'utilisateur à la requête pour les prochains middlewares
    req.user = user;
    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err);
    return sendError(500, "Internal server error");
  }
};

export default requireAuth;

// import prisma from "../prismaClient.js";
// import jwt from "jsonwebtoken";

// const requireAuth = async (req, res, next) => {
//   try {
//     // Vérifier si le token est présent dans les cookies
//     const tokenInCookie = req.cookies?.jwt;
//     if (!tokenInCookie) {
//       return res.status(401).json({ error: "AUTHORIZATION TOKEN REQUIRED!!" });
//     }

//     // Vérifier la validité du token
//     let userInToken;
//     try {
//       userInToken = jwt.verify(tokenInCookie, process.env.ACCESS_TOKEN_SECRET);
//     } catch (error) {
//       return res
//         .status(401)
//         .json({ error: error?.message || "INVALID TOKEN!" });
//     }

//     // Vérifier si l'ID utilisateur est valide
//     const userId = parseInt(userInToken?.id);
//     if (!userId) {
//       return res.status(401).json({ error: "INVALID USER ID IN TOKEN!" });
//     }

//     // Vérifier si l'utilisateur existe dans la base de données
//     const checkedUser = await prisma.user.findUnique({
//       where: { id: userId },
//       select: { id: true, email: true, role: true }, // Sélectionner seulement les champs nécessaires
//     });

//     if (!checkedUser) {
//       return res.status(401).json({ error: "USER NOT EXIST IN DATABASE!" });
//     }

//     // Ajouter l'utilisateur à la requête et continuer
//     req.user = checkedUser;
//     next();
//   } catch (error) {
//     console.error("Auth Middleware Error:", error);
//     res.status(500).json({ error: "INTERNAL SERVER ERROR!" });
//   }
// };

// export default requireAuth;
