import express from "express";
import { dashboard } from "../controllers/dashboardController.js";
import asyncHandler from "../middleware/asyncHandler.js";

const router = express.Router();

// dashboard route
router.get("/", [asyncHandler(dashboard)]);

export default router;
