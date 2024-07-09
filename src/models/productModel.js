import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
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
