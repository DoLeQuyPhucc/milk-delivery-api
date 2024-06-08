import express from "express";
import userRoutes from "./userRoutes.js";

const router = express.Router();

// Use the user routes
router.use("/users", userRoutes);

export default router;
