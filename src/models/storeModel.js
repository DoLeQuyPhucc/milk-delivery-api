import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    address: String,
    phone: Number,
  },
  { versionKey: false }
);

const StoreModel = mongoose.model("stores", storeSchema);
export default StoreModel;
