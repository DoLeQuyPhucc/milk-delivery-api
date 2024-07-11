import express from "express";
import {
  createPaymentOrder,
  createPaymentOrderTracking,
  vnpayReturn,
  vnpayReturnOrderTracking
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create_payment_url", createPaymentOrder);
router.post("/create_payment_order_tracking_url", createPaymentOrderTracking);
router.get("/vnpay_return", vnpayReturn);
router.get("/vnpay_return_order_tracking", vnpayReturnOrderTracking);

export default router;
