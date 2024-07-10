import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrdersByUser,
  getOrderById,
  getListOrderByDate,
  deleteOrder,
  updateOrderStatus,
  getFilteredOrders,
  getOrdersPaged,
  updateDeliveryDateOrder,
  updateOrder,
  updateCircleShipmentOrder
} from "../controllers/orderController.js";

import { authenticateToken, isUser, isManager, isUserOrManager } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticateToken, isUser, createOrder);
router.get("/getAllOrders", authenticateToken, isManager, getAllOrders);
router.get("/user/:userId", authenticateToken, isUser, getOrdersByUser);
router.get("/:id", authenticateToken, getOrderById);
router.get("/getByDate/:date", getListOrderByDate);
router.delete("/:id", authenticateToken, isUserOrManager, deleteOrder);
router.patch("/:id/status", authenticateToken, isManager, updateOrderStatus);
router.get("/getOrders/filtered", authenticateToken, isManager, getFilteredOrders);
router.get("/getOrders/paged", authenticateToken, getOrdersPaged);
router.put("/updateDeliveryDate/:id", authenticateToken, isUserOrManager, updateDeliveryDateOrder);
router.put("/updateOrder/:id", authenticateToken, isUserOrManager, updateOrder);
router.put("/updateCircleShipment/:id", authenticateToken, isUserOrManager, updateCircleShipmentOrder);

export default router;
