import express from "express";
import {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getUserByFirstName,
} from "../controllers/usersController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/users/getAllUsers
router.get("/getAllUsers", authenticateToken, getAllUsers);

// POST /api/users/createUser
router.post("/createUser", authenticateToken, createUser);

// GET /api/users/getUserById/:id
router.get("/getUserById/:id", authenticateToken, getUserById);

// PUT /api/users/updateUser/:id
router.put("/updateUser/:id", authenticateToken, updateUser);

// DELETE /api/users/deleteUser/:id
router.delete("/deleteUser/:id", authenticateToken, deleteUser);

// GET /api/users/getUserByFirstName
router.get("/getUserByFirstName", authenticateToken, getUserByFirstName);

export default router;
