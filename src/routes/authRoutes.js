import express from "express";
import authController from "../controllers/authController.js";
const router = express.Router();

// POST /api/auth/signup
router.post("/signin", authController.signIn);

// POST /api/auth/signin
router.post("/signout", authController.signOut);

export default router;
