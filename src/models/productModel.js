import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    brandID: String,
    name: String,
    productImage: String,
    description: String,
    price: Number,
    stockQuantity: Number,
  },
  { versionKey: false }
); // set versionKey to false

const ProductModel = mongoose.model("products", productSchema);

export default ProductModel;
