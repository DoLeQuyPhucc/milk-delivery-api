import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
  vnp_Params: {
    type: Object,
    required: true,
  },
  orderData: {
    type: Object,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const PaymentModel = mongoose.model("Payment", paymentSchema);

export default PaymentModel;
