import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProductByName,
  getProductsPaged,
} from "../controllers/productController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all products
router.get("/getAllProducts", getAllProducts);

// Create a new product
router.post("/createProduct", authenticateToken, createProduct);

// Update a product
router.put("/updateProduct/:id", authenticateToken, updateProduct);

// Delete a product
router.delete("/deleteProduct/:id", authenticateToken, deleteProduct);

// Search products by name
router.get("/searchProductByName", searchProductByName);

// Get products by page
router.get("/paged", getProductsPaged);

export default router;
