import express from "express";

// controller functions
import {
  getByEmail,
  changePassword,
  getUsers,
  updateUser,
  deleteUser,
  createSuperAdmin,
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
router.use(requireAuth);

// GET ALL USERS
router.get("/users", asyncHandler(getUsers));

// get user by email
router.post(
  "/getByEmail",
  validate(getByEmailValidatorSchema),
  asyncHandler(getByEmail)
);

// change user password
router.post(
  "/changePassword",
  validate(changePasswordValidatorSchema),
  asyncHandler(changePassword)
);

// UPDATE A USER
router.patch("/updateUser", [
  validate(updateUserValidatorSchema),
  allowedRoles([ROLES.SUPER_ADMIN, ROLES.ADMIN]),
  asyncHandler(updateUser),
]);

// DELETE A USER
router.delete("/:id", [
  allowedRoles([ROLES.SUPER_ADMIN, ROLES.ADMIN]),
  asyncHandler(deleteUser),
]);

export default router;
