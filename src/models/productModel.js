import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  brandID: mongoose.Schema.Types.ObjectId,
  name: String,
  productImage: String,
  description: String,
  price: Number,
  stockQuantity: Number,
});

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
