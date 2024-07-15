import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrdersByUser,
  getOrderById,
  getListOrderByDate,
  deleteOrder,
  updateOrderStatus,
  updateOrderTrackingStatus,
  getFilteredOrders,
  getOrdersPaged,
  updateDeliveryDateOrder,
  updateOrder,
  updateCircleShipmentOrder,
  assignShipperToOrder,
  getOrderItemById,
  cancelOrder,
  getTotalDeliveredOrders,
  getTotalCancelledOrders,
  getTotalOrdersInMonth,
  getTotalUserOrders,
  getTotalPriceOfAllOrders,
  confirmOrder
} from "../controllers/orderController.js";

import { authenticateToken, isUser, isManager, isUserOrManager, isShipper, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticateToken, isUser, createOrder);
router.get("/getAllOrders", authenticateToken, isManager, getAllOrders);
router.get("/user/:userId", authenticateToken, isUser, getOrdersByUser);
router.get('/getOrder/total-delivered', authenticateToken, isManager, getTotalDeliveredOrders);
router.get('/getOrder/total-cancelled', authenticateToken, isManager, getTotalCancelledOrders);
router.get('/getOrder/total-in-month/:year/:month', authenticateToken, isManager, getTotalOrdersInMonth);
router.get('/getOrder/total-user-orders', authenticateToken, isManager, getTotalUserOrders);
router.get('/getOrder/total-price-of-all-orders', authenticateToken, isManager, getTotalPriceOfAllOrders);
router.get("/:id", authenticateToken, getOrderById);
router.get("/getByDate/:date", getListOrderByDate);
router.get("/confirmEmail/confirm", confirmOrder);
router.delete("/:id", authenticateToken, isUserOrManager, deleteOrder);
router.patch("/:id/status", authenticateToken, isManager, updateOrderStatus);
router.get("/getOrders/filtered", authenticateToken, isManager, getFilteredOrders);
router.get("/:orderId/:itemId", authenticateToken, isShipper, getOrderItemById);
router.patch("/:orderId/:itemId/status", authenticateToken, isShipper, updateOrderTrackingStatus);
router.get("/getOrders/paged", authenticateToken, getOrdersPaged);
router.put("/updateDeliveryDate/:orderId", authenticateToken, isUserOrManager, updateDeliveryDateOrder);
router.put("/:orderId/cancel", authenticateToken, isUser, cancelOrder);
router.put("/updateOrder/:id", authenticateToken, isUserOrManager, updateOrder);
router.put("/updateCircleShipment/:id", authenticateToken, isUserOrManager, updateCircleShipmentOrder);
router.post("/assignShipper", authenticateToken, isManager, assignShipperToOrder);


export default router;
