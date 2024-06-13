import express from "express";
import {
  getAllPackages,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage,
} from "../controllers/packageController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/packages/getAllPackages
router.get("/getAllPackages", authenticateToken, getAllPackages);

// GET /api/packages/:id
router.get("/:id", authenticateToken, getPackageById);

// POST /api/packages/createPackage
router.post("/", authenticateToken, createPackage);

// PUT /api/packages/:id
router.put("/:id", authenticateToken, updatePackage);

// DELETE /api/packages/:id
router.delete("/:id", authenticateToken, deletePackage);

export default router;
