import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    brandID: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
    name: String,
    productImage: String,
    description: String,
    price: Number,
    stockQuantity: Number,
  },
  { versionKey: false }
);

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
