import express from "express";
import userRoutes from "./userRoutes.js";

import authRoutes from "./authRoutes.js";

import productRoutes from "./productRoutes.js";

const router = express.Router();

// Use the user routes

router.use("/users", userRoutes);
router.use("/auth", authRoutes);

// Use the product routes
router.use("/products", productRoutes);

export default router;
