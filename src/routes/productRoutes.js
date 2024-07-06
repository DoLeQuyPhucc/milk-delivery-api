import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductByName,
  getProductsPaged,
} from "../controllers/productController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/products/getAllProducts
router.get("/getAllProducts", authenticateToken, getAllProducts);

// GET /api/products/:id
router.get("/:id", getProductById);

// POST /api/products/
router.post("/", authenticateToken, createProduct);

// PUT /api/products/:id
router.put("/:id", authenticateToken, updateProduct);

// DELETE /api/products/:id
router.delete("/:id", authenticateToken, deleteProduct);

// GET /api/products/getProductByName
router.get("/getProductByName", authenticateToken, getProductByName);

// GET /api/products/paged
router.get("/getProducts/paged",  getProductsPaged);

export default router;
