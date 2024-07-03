import express from "express";
import {
  getAllUsers,
  createUser,
  getUserById,
  deleteUser,
  getUserByFirstName,
  updateUser,
  editUser,
} from "../controllers/usersController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/users/getAllUsers
router.get("/getAllUsers", authenticateToken, getAllUsers);

// POST /api/users/
router.post("/", authenticateToken, createUser);

// GET /api/users/:id
router.get("/getUserById/:id", authenticateToken, getUserById);

// PUT /api/users/:id
router.put("/:id", authenticateToken, updateUser);

// DELETE /api/users/:id
router.delete("/getUserById/:id", authenticateToken, deleteUser);

// GET /api/users/getUserByFirstName
router.get("/getUserByFirstName", authenticateToken, getUserByFirstName);

// PUT /api/users/edit
router.put("/edit-user", authenticateToken, editUser);


export default router;
