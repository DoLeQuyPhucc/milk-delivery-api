import express from "express";
import userRoutes from "./userRoutes.js";

import authRoutes from "./authRoutes.js";

import productRoutes from "./productRoutes.js";

import packageRoutes from "./packageRoutes.js";
const router = express.Router();

router.use("/users", userRoutes);

router.use("/auth", authRoutes);

router.use("/products", productRoutes);

router.use("/packages", packageRoutes);

export default router;
