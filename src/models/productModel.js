import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    productImage: String,
    description: String,
    price: Number,
    stockQuantity: Number,
})

const ProductModel = mongoose.model("products", productSchema);

export default ProductModel;