import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  package: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      required: true,
    },
    products: [
      {
        product: {
          _id: { type: mongoose.Schema.Types.ObjectId, required: true },
          name: { type: String, required: true },
          productImage: { type: String, required: true },
          description: { type: String, required: true },
          price: { type: Number, required: true },
          stockQuantity: { type: Number, required: true },
          brandID: { type: mongoose.Schema.Types.ObjectId, required: true },
        },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  shippingAddress: {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  paymentMethod: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  isPaid: { type: Boolean, default: false },
  paidAt: { type: String },
  deliveredAt: { type: String },
  circleShipment: {
    numberOfShipment: { type: Number, required: true },
    tracking: [
      {
        trackingNumber: { type: String, required: true },
        isDelivered: { type: Boolean, default: false },
        deliveredAt: { type: String },
        isPaid: { type: Boolean, default: false },
      },
    ],
  },
});

const OrderModel = mongoose.model("Order", OrderSchema);

export default OrderModel;
