import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    storeID: mongoose.Schema.Types.ObjectId,
  },
  { _id: false }
);

export const shipperSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    shipperName: String,
    phone: String, // Change from Number to String
    store: storeSchema,
  },
  {
    versionKey: false,
  }
);

const ShipperModel = mongoose.model("shippers", shipperSchema);
export default ShipperModel;
