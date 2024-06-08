import express from "express";
import authController from "../controllers/authController.js";
const router = express.Router();

// Sign In route
router.post("/signin", authController.signIn);

// Sign Out route
router.post("/signout", authController.signOut);

export default router;
