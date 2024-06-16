import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  brandID: mongoose.Schema.Types.ObjectId,
  name: String,
  productImage: String,
  description: String,
  price: Number,
  stockQuantity: Number,
});

const productInPackageSchema = new mongoose.Schema({
  product: {
    type: productSchema,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const packageSchema = new mongoose.Schema({
  products: {
    type: [productInPackageSchema],
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

const PackageModel = mongoose.model("Package", packageSchema);

export default PackageModel;
