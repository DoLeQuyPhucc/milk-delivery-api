import express from "express";
import { getAllUsers } from "../controllers/usersController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/getAllUsers", authenticateToken, getAllUsers);

export default router;
