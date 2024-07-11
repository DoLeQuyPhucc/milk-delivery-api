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
          productImage: { type: String },
          description: { type: String },
          price: { type: Number, required: true },
          stockQuantity: { type: Number },
          brandID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Brand",
            required: true,
          },
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
  status: {
    type: String,
    enum: ["Pending", "Out for Delivery", "Delivered", "Cancelled", "Failed"],
    default: "Pending",
  },
  circleShipment: {
    numberOfShipment: { type: Number, required: true },
    tracking: [
      {
        trackingNumber: { type: String, required: true },
        isDelivered: { type: Boolean, default: false },
        deliveredAt: { type: String },
        status: {
          type: String,
          enum: [
            "Pending",
            "Out for Delivery",
            "Delivered",
            "Cancelled",
            "Failed",
          ],
          default: "Pending",
        },
        isPaid: { type: Boolean, default: false },
        reason: { type: String },
        newDate: { type: String },
      },
    ],
  },
});

OrderSchema.methods.updateStatus = function () {
  const order = this;
  const allDelivered = order.circleShipment.tracking.every(
    (shipment) => shipment.isDelivered
  );
  const anyDelivered = order.circleShipment.tracking.some(
    (shipment) => shipment.isDelivered
  );

  if (allDelivered) {
    order.status = "Delivered";
  } else if (anyDelivered) {
    order.status = "Out for Delivery";
  } else {
    order.status = "Pending";
  }
};

const OrderModel = mongoose.model("Order", OrderSchema);

export default OrderModel;
