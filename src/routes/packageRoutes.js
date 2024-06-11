import express from "express";
import { getAllPackages } from "../controllers/packageController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// /api/packages/getAllPackages
// router.get("/getAllPackages", authenticateToken, getAllPackages);
router.get("/getAllPackages", getAllPackages);

export default router;
