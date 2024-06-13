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

// GET /api/products/getAllProducts
router.get("/getAllProducts", getAllProducts);

// POST /api/products/createProduct
router.post("/createProduct", authenticateToken, createProduct);

// PUT /api/products/updateProduct/:id
router.put("/updateProduct/:id", authenticateToken, updateProduct);

// DELETE /api/products/deleteProduct/:id
router.delete("/deleteProduct/:id", authenticateToken, deleteProduct);

// GET /api/products/searchProductByName
router.get("/searchProductByName", searchProductByName);

// GET /api/products/paged
router.get("/paged", getProductsPaged);

export default router;
