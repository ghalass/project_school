import express from "express";

// controller functions
import {
  getByEmail,
  changePassword,
  getUsers,
  updateUser,
  deleteUser,
  createSuperAdmin,
  getUsersCount,
} from "../controllers/userController.js";

import requireAuth from "../middleware/requireAuth.js";
import allowedRoles from "../middleware/allowedRoles.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { validate } from "../middleware/validator.js";
import {
  changePasswordValidatorSchema,
  getByEmailValidatorSchema,
  updateUserValidatorSchema,
} from "../validators/userValidatorSchema.js";
import { ROLES } from "../utils/constants/roles.js";

const router = express.Router();

// CREATE A DEFAULT SUPER_ADMIN
router.get("/create_super_admin", asyncHandler(createSuperAdmin));

/*************************** REQUIRE AUTH FOR ALL ROUTES BELOW ***************************/

// GET ALL USERS
router.get("/users", [requireAuth, asyncHandler(getUsers)]);

// USERS COUNT
router.get("/users/count", [requireAuth, asyncHandler(getUsersCount)]);

// get user by email
router.post("/getByEmail", [
  requireAuth,
  validate(getByEmailValidatorSchema),
  asyncHandler(getByEmail),
]);

// change user password
router.post("/changePassword", [
  requireAuth,
  validate(changePasswordValidatorSchema),
  asyncHandler(changePassword),
]);

// UPDATE A USER
router.patch("/updateUser", [
  requireAuth,
  validate(updateUserValidatorSchema),
  allowedRoles([ROLES.SUPER_ADMIN, ROLES.ADMIN]),
  asyncHandler(updateUser),
]);

// DELETE A USER
router.delete("/:id", [
  requireAuth,
  allowedRoles([ROLES.SUPER_ADMIN, ROLES.ADMIN]),
  asyncHandler(deleteUser),
]);

export default router;
