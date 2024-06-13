import express from "express";
import {
  getAllPackages,
  createPackage,
} from "../controllers/packageController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/packages/getAllPackages
router.get("/getAllPackages", authenticateToken, getAllPackages);

// POST /api/packages/createPackage
router.post("/createPackage", authenticateToken, createPackage);

export default router;
