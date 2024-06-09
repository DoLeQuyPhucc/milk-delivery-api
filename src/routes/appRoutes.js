import express from "express";
import userRoutes from "./userRoutes.js";
import productRoutes from "./productRoutes.js";

const router = express.Router();

// Use the user routes
router.use("/users", userRoutes);

// Use the product routes
router.use("/products", productRoutes);

export default router;
