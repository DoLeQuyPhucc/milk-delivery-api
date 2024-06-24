import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  //   updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";

import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticateToken, createOrder);
router.get("/getAllOrders", authenticateToken, getAllOrders);
router.get("/:id", authenticateToken, getOrderById);
// router.put("/:id",authenticateToken, updateOrder);
router.delete("/:id", authenticateToken, deleteOrder);

export default router;
