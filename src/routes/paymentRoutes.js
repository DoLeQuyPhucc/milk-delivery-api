import express from "express";
import {
  createPayment,
  vnpayReturn,
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create_payment_url", createPayment);
router.get("/vnpay_return", vnpayReturn);

export default router;
