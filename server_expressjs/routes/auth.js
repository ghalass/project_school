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

export default router;
