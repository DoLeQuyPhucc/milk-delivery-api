import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductByName,
  getProductsPaged,
  getProductsFiltered
} from "../controllers/productController.js";
import { authenticateToken, isUserOrAdmin, isManagerOrAdmin, isManager } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/products/getAllProducts
router.get("/getAllProducts", authenticateToken, getAllProducts);

// GET /api/products/:id
router.get("/:id", authenticateToken, getProductById);

// POST /api/products/
router.post("/", authenticateToken, isManager, createProduct);

// PUT /api/products/:id
router.put("/:id", authenticateToken, isManager, updateProduct);

// DELETE /api/products/:id
router.delete("/:id", authenticateToken, isManager, deleteProduct);

// GET /api/products/getProductByName
router.get("/getProductByName", authenticateToken, getProductByName);

// GET /api/products/paged
router.get("/getProducts/paged", authenticateToken,  getProductsPaged);

// GET /api/products/filtered
router.get("/getProducts/filtered", authenticateToken, getProductsFiltered);

export default router;
