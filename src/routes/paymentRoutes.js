import express from "express";
import rateLimit from "express-rate-limit";
import {
  createPaymentOrder,
  createPaymentOrderTracking,
  vnpayReturn,
  vnpayReturnOrderTracking
} from "../controllers/paymentController.js";

const router = express.Router();

const createPaymentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message:
    "Too many payment requests from this IP, please try again after 15 minutes",
});

router.post("/create_payment_url", createPaymentLimiter, createPaymentOrder);
router.post("/create_payment_order_tracking_url", createPaymentOrderTracking);
router.get("/vnpay_return", vnpayReturn);
router.get("/vnpay_return_order_tracking", vnpayReturnOrderTracking);

export default router;
