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
    typeOfDelivery: {
      type: String,
      enum: ["1-WEEK", "1-MONTH", "2-MONTHS", "3-MONTHS", "6-MONTHS"],
      required: true,
    },
    numberOfShipment: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    totalPriceDiscount: {
      type: Number,
      required: true,
    },
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
  shipper: { type: mongoose.Schema.Types.ObjectId, ref: "shippers" },
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
        price: { type: Number, required: true },
        status: {
          type: String,
          enum: [
            "Pending",
            "Out for Delivery",
            "Cancelled",
            "Failed",
          ],
          default: "Pending",
        },
        shipper: { type: mongoose.Schema.Types.ObjectId, ref: "shippers" },
        isPaid: { type: Boolean, default: false },
        reason: { type: String },
        newDate: { type: String },
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
      },
    ],
  },
}, { timestamps: true });

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
