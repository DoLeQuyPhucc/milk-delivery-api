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
  typeOfDelivery: {
    type: String,
    enum: ["1-WEEK", "1-MONTH", "2-MONTHS", "3-MONTHS", "6-MONTHS"],
    required: true,
  },
  numberOfShipment: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  totalPriceDiscount: {
    type: Number,
    required: true,
  },
});

const PackageModel = mongoose.model("Package", packageSchema);

export default PackageModel;
