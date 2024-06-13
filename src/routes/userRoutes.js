import express from "express";
import {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  searchUserByFirstName,
} from "../controllers/usersController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/getAllUsers", authenticateToken, getAllUsers);
router.post("/createUser", authenticateToken, createUser);
router.get("/getUserById/:id", authenticateToken, getUserById);
router.put("/updateUser/:id", authenticateToken, updateUser);
router.delete("/deleteUser/:id", authenticateToken, deleteUser);
router.get("/searchUserByFirstName", authenticateToken, searchUserByFirstName);

export default router;
