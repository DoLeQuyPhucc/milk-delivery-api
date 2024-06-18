import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    storeName: String,
    address: String,
    phone: Number,
  },
  { versionKey: false }
);

const StoreModel = mongoose.model("store", storeSchema);
export default StoreModel;
