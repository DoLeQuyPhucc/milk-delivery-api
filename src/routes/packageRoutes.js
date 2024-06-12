import express from "express";
import {
  getAllPackages,
  createPackage,
} from "../controllers/packageController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// /api/packages/getAllPackages
// router.get("/getAllPackages", authenticateToken, getAllPackages);
router.get("/getAllPackages", authenticateToken, getAllPackages);

// /api/packages/createPackage
router.post("/createPackage", authenticateToken, createPackage);

export default router;
