import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrdersByUser,
  getOrderById,
  getListOrderByDate,
  deleteOrder,
} from "../controllers/orderController.js";

import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticateToken, createOrder);
router.get("/getAllOrders", authenticateToken, getAllOrders);
router.get("/user/:userId", authenticateToken, getOrdersByUser);
router.get("/:id", authenticateToken, getOrderById);
router.get("/getByDate/:date", getListOrderByDate);
router.delete("/:id", authenticateToken, deleteOrder);

export default router;
