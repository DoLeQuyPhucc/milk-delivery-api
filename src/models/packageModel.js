import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
  products: {
    type: Array,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

const PackageModel = mongoose.model("packages", packageSchema);

export default PackageModel;
