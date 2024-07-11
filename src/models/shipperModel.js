import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    storeID: mongoose.Schema.Types.ObjectId,
  },
  { _id: false }
);

export const shipperSchema = new mongoose.Schema(
  {
    shipperName: String,
    phone: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    },
    store: storeSchema // This should be an embedded document
  },
  {
    versionKey: false,
  }
);

const ShipperModel = mongoose.model("shippers", shipperSchema);
export default ShipperModel;
