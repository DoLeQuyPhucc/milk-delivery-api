import express from "express";
import userRoutes from "./userRoutes.js";

import authRoutes from "./authRoutes.js";

import productRoutes from "./productRoutes.js";

import packageRoutes from "./packageRoutes.js";

import brandRoutes from "./brandRoutes.js";

import storeRoutes from "./storeRoutes.js";

import shipperRoutes from "./shipperRoutes.js";

import orderRoutes from "./orderRoutes.js";

const router = express.Router();

router.use("/users", userRoutes);

router.use("/auth", authRoutes);

router.use("/products", productRoutes);

router.use("/packages", packageRoutes);

router.use("/brands", brandRoutes);

router.use("/stores", storeRoutes);

router.use("/shippers", shipperRoutes);

router.use("/orders", orderRoutes);

export default router;
