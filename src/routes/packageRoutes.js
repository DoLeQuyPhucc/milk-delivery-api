import express from "express";
import {
  getAllPackages,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage,
  getFilteredPackages,
  getPagedPackages
} from "../controllers/packageController.js";
import { authenticateToken, isManager, isUserOrManager } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/packages/getAllPackages
router.get("/getAllPackages", authenticateToken, getAllPackages);

// GET /api/packages/:id
router.get("/:id", authenticateToken, isUserOrManager, getPackageById);

// POST /api/packages/createPackage
router.post("/", authenticateToken, isManager, createPackage);

// PUT /api/packages/:id
router.put("/:id", authenticateToken, isManager, updatePackage);

// DELETE /api/packages/:id
router.delete("/:id", authenticateToken, isManager, deletePackage);

// GET /api/packages/getPackages/filtered
router.get("/getPackages/filtered", authenticateToken, isUserOrManager, getFilteredPackages);

// GET /api/packages/getPackages/paged
router.get("/getPackages/paged", authenticateToken, isUserOrManager, getPagedPackages);

export default router;
