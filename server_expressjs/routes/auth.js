import express from "express";
import requireAuth from "../middleware/requireAuth.js";
import allowedRoles from "../middleware/allowedRoles.js";
import { validate } from "../middleware/validator.js";
import {
  signupUser,
  logoutUser,
  loginUser,
} from "../controllers/authController.js";
import {
  signupValidatorSchema,
  loginValidatorSchema,
} from "../validators/authValidatorSchema.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { ROLES } from "../utils/constants/roles.js";
import HttpStatus from "../utils/httpStatus.js";
import jwt from "jsonwebtoken";
import { hidePassword } from "../utils/functions.js";

const router = express.Router();

// login route
router.post("/login", [
  validate(loginValidatorSchema),
  asyncHandler(loginUser),
]);

// logout route
router.post("/logout", asyncHandler(logoutUser));

/**************** REQUIRE AUTH FOR ALL ROUTES BELOW ****************/
router.use(requireAuth);

// CREATE A NEW USER ==> ONLY ADMIN & SUPER_ADMIN ARE ALLOWED
router.post("/signup", [
  validate(signupValidatorSchema),
  allowedRoles([ROLES.SUPER_ADMIN, ROLES.ADMIN]),
  asyncHandler(signupUser),
]);

// GET current user info (à ajouter dans routes/auth.js après router.use(requireAuth))
router.get(
  "/me",
  asyncHandler(async (req, res) => {
    const token = req.cookies?.jwt;
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ error: "Invalid or expired token" });
    }
    const userId = Number(decoded?.id);
    if (!userId) return sendError(401, "Invalid user ID in token");
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ error: "Utilisateur non trouvé" });
    }
    res.status(HttpStatus.OK).json(hidePassword(user));
  })
);

export default router;
