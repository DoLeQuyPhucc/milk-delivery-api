import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    address: String,
    phone: Number,
  },
  {
    versionKey: false,
  }
);

const BrandModel = mongoose.model("brands", brandSchema);
export default BrandModel;
