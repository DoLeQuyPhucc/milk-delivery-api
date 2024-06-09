import express from "express";
import userRoutes from "./userRoutes.js";
import productRoutes from "./productRoutes.js"

const router = express.Router();

// Use the user routes
router.use("/allusers", userRoutes);

// Use the product routes
router.use("/allproducts", productRoutes);

export default router;
