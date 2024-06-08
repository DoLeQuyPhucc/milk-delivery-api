import express from "express";
import userRoutes from "./userRoutes.js";
import authRoutes from "./authRoutes.js";
const router = express.Router();

// Use the user routes

router.use("/users", userRoutes);
router.use("/auth", authRoutes);

export default router;
