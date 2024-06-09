import express from "express";
import { getAllProducts } from "../controllers/productController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/getAllProducts", authenticateToken, getAllProducts);

export default router;
