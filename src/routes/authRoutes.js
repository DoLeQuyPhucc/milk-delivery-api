import express from "express";

import authController from "../controllers/authController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signin", authController.signIn);
router.post("/google", authController.googleLogin);
router.post("/signup", authController.signUp);
router.get("/verify-email", authController.verifyEmail);
router.get("/me", authenticateToken, authController.getMe);
router.post("/signout", authController.signOut);
router.post("/refreshtoken", authenticateToken, authController.refreshToken);

export default router;
