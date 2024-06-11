import express from "express";
import userRoutes from "./userRoutes.js";

import authRoutes from "./authRoutes.js";

import productRoutes from "./productRoutes.js";

import packageRoutes from "./packageRoutes.js";
const router = express.Router();

// Use the user routes

router.use("/users", userRoutes);
router.use("/auth", authRoutes);

// Use the product routes
router.use("/products", productRoutes);

// Use the package routes
router.use("/packages", packageRoutes);

export default router;
