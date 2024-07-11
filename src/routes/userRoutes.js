import express from "express";
import {
  getAllUsers,
  createUser,
  getUserById,
  deleteUser,
  getUserByFirstName,
  updateUser,
  editUser,
  getUserByEmail,
  getUserByRole,
  getUserPaged,
  getUsersFiltered
} from "../controllers/usersController.js";
import { authenticateToken, isAdmin, isManagerOrAdmin, isUserOrAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/users/getAllUsers
router.get("/getAllUsers", authenticateToken, isManagerOrAdmin, getAllUsers);

// POST /api/users/
router.post("/", authenticateToken, isAdmin, createUser);

// GET /api/users/:id
router.get("/getUserById/:id", authenticateToken, isUserOrAdmin, getUserById);

// PUT /api/users/:id
router.put("/:id", authenticateToken, updateUser);

// DELETE /api/users/:id
router.delete("/getUserById/:id", authenticateToken, isAdmin, deleteUser);

// GET /api/users/getUserByFirstName
router.get("/getUserByFirstName", authenticateToken, getUserByFirstName);

// PUT /api/users/edit
router.put("/edit-user", authenticateToken, isAdmin, editUser);

// GET /api/users/by-email
router.get("/by-email", authenticateToken, getUserByEmail);

// GET /api/users/by-role
router.get("/by-role", authenticateToken, isManagerOrAdmin, getUserByRole);

// GET /api/users/paged
router.get("/paged", authenticateToken, isManagerOrAdmin, getUserPaged);

// GET /api/users/filtered
router.get("/filtered", authenticateToken, isManagerOrAdmin, getUsersFiltered);

export default router;
