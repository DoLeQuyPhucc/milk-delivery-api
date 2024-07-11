/**
 * @swagger
 * tags:
 *   name: Package
 *   description: API for packages
 */

/**
 * @swagger
 * /api/packages/getAllPackages:
 *   get:
 *     summary: Retrieve a list of packages
 *     description: Retrieve a list of packages, each containing multiple products. Can be used to populate a list of packages for prototyping or testing an API.
 *     tags: [Package]
 *     responses:
 *       200:
 *         description: A list of packages.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Package'
 */

/**
 * @swagger
 * /api/packages/{id}:
 *   get:
 *     summary: Retrieve a package by ID
 *     description: Retrieve details of a specific package by its ID.
 *     tags: [Package]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The package ID
 *     responses:
 *       200:
 *         description: A package object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Package'
 *       404:
 *         description: Package not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 */

/**
 * @swagger
 * /api/packages/:
 *   post:
 *     summary: Create a new package
 *     description: Create a new package with the provided products.
 *     tags: [Package]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Package'
 *     responses:
 *       201:
 *         description: Package created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Package'
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 */

/**
 * @swagger
 * /api/packages/{id}:
 *   put:
 *     summary: Update a package by ID
 *     description: Update details of a specific package by its ID.
 *     tags: [Package]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The package ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Package'
 *     responses:
 *       200:
 *         description: Package updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Package'
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *       404:
 *         description: Package not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 */

/**
 * @swagger
 * /api/packages/{id}:
 *   delete:
 *     summary: Delete a package by ID
 *     description: Delete a specific package by its ID.
 *     tags: [Package]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The package ID
 *     responses:
 *       200:
 *         description: Package deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *       404:
 *         description: Package not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 */

/**
 * @swagger
 * /api/packages/getPackages/filtered:
 *   get:
 *     summary: Get paginated packages with optional filters
 *     tags: [Package]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: brandID
 *         schema:
 *           type: string
 *         description: Filter by brand ID
 *       - in: query
 *         name: productName
 *         schema:
 *           type: string
 *         description: Filter by product name
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum price
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum price
 *     responses:
 *       200:
 *         description: A list of packages
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 packages:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Package'
 *                 count:
 *                   type: integer
 *                   description: Total number of packages
 *                 page:
 *                   type: integer
 *                   description: Current page number
 *                 size:
 *                   type: integer
 *                   description: Number of items per page
 *             example:
 *               packages:
 *                 - id: 1
 *                   products:
 *                     - product: { id: 1, name: "Product 1" }
 *                       quantity: 2
 *                 - id: 2
 *                   products:
 *                     - product: { id: 2, name: "Product 2" }
 *                       quantity: 3
 *               count: 10
 *               page: 1
 *               size: 10
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *             example:
 *               error: "Invalid request parameters"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *             example:
 *               error: "Unauthorized access"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *             example:
 *               error: "Internal Server Error"
 */

/**
 * @swagger
 * /api/packages/getPackages/paged:
 *   get:
 *     summary: Get paginated packages
 *     tags: [Package]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: A list of packages
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 packages:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Package'
 *                 count:
 *                   type: integer
 *                   description: Total number of packages
 *                 page:
 *                   type: integer
 *                   description: Current page number
 *                 size:
 *                   type: integer
 *                   description: Number of items per page
 *             example:
 *               packages:
 *                 - id: 1
 *                   products:
 *                     - product: { id: 1, name: "Product 1" }
 *                       quantity: 2
 *                 - id: 2
 *                   products:
 *                     - product: { id: 2, name: "Product 2" }
 *                       quantity: 3
 *               count: 10
 *               page: 1
 *               size: 10
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *             example:
 *               error: "Invalid request parameters"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *             example:
 *               error: "Unauthorized access"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *             example:
 *               error: "Internal Server Error"
 */

/**
 * @swagger
 * /api/packages/getPackagesByBrandName/{brandName}:
 *   get:
 *     summary: Get packages by brand name
 *     tags: [Package]
 *     parameters:
 *       - in: path
 *         name: brandName
 *         schema:
 *           type: string
 *         required: true
 *         description: Brand name
 *     responses:
 *       200:
 *         description: List of packages for the given brand name
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Package'
 *             example:
 *               - id: 1
 *                 products:
 *                   - product: { id: 1, name: "Product 1", brandID: 1 }
 *                     quantity: 2
 *               - id: 2
 *                 products:
 *                   - product: { id: 2, name: "Product 2", brandID: 1 }
 *                     quantity: 3
 *       404:
 *         description: Brand not found or no packages found for the given brand name
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *             example:
 *               message: "Brand not found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *             example:
 *               message: "Error fetching packages by brand name"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         brandID:
 *           type: string
 *           description: The brand's ID.
 *         name:
 *           type: string
 *           description: The product's name.
 *         productImage:
 *           type: string
 *           description: The product's image URL.
 *         description:
 *           type: string
 *           description: The product's description.
 *         price:
 *           type: number
 *           description: The product's price.
 *         stockQuantity:
 *           type: number
 *           description: The product's stock quantity.
 *     ProductInPackage:
 *       type: object
 *       properties:
 *         product:
 *           $ref: '#/components/schemas/Product'
 *         quantity:
 *           type: number
 *           description: The quantity of the product in the package.
 *     Package:
 *       type: object
 *       properties:
 *         products:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ProductInPackage'
 *         totalAmount:
 *           type: number
 *           description: The total amount of products in the package.
 *         totalPrice:
 *           type: number
 *           description: The total price of the package.
 *       example:
 *         products:
 *           - product:
 *               brandID: "66679ee91e0d9ffecd7df6d7"
 *               name: "Vinamilk Fresh Milk 500ml"
 *               productImage: "image_url_2"
 *               description: "Vinamilk Fresh Milk 500ml, high quality and delicious."
 *               price: 20000
 *               stockQuantity: 200
 *             quantity: 2
 *           - product:
 *               brandID: "66679ee91e0d9ffecd7df6d7"
 *               name: "Vinamilk Soy Milk 1L"
 *               productImage: "image_url_3"
 *               description: "Vinamilk Soy Milk 1L, nutritious and tasty."
 *               price: 35000
 *               stockQuantity: 150
 *             quantity: 3
 *         totalAmount: 5
 *         totalPrice: 125000
 */

import PackageModel from "../models/packageModel.js";
import BrandModel from "../models/brandModel.js";
import mongoose from "mongoose";

export const createPackage = async (req, res) => {
  const { products } = req.body;

  try {
    let totalAmount = 0;
    let totalPrice = 0;

    // Using map to create an array of product data
    const productDetails = products.map((product) => {
      const { product: productData, quantity } = product;
      return {
        product: productData,
        quantity,
      };
    });

    productDetails.forEach((productDetail) => {
      totalAmount += productDetail.quantity;
      totalPrice += productDetail.quantity * productDetail.product.price;
    });

    const newPackage = new PackageModel({
      products: productDetails,
      totalAmount,
      totalPrice,
    });

    const savedPackage = await newPackage.save();
    res.status(201).json(savedPackage);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ message: err.message });
  }
};

export const getAllPackages = async (req, res) => {
  try {
    const packages = await PackageModel.find().populate({
      path: "products.product",
      populate: {
        path: "brandID",
        model: "Brand",
      },
    });
    res.status(200).json(packages);
  } catch (err) {
    console.error(err.message);
    res.status(404).json({ message: err.message });
  }
};

export const getPackageById = async (req, res) => {
  const { id } = req.params;

  try {
    const packages = await PackageModel.findById(id).populate({
      path: 'products.product',
      populate: {
        path: 'brandID',
        model: 'Brand'
      }
    });
    res.status(200).json(packages);
  } catch (err) {
    console.error(err.message);
    res.status(404).json({ message: err.message });
  }
};

export const updatePackage = async (req, res) => {
  const { id } = req.params;
  const { products } = req.body;

  try {
    let totalAmount = 0;
    let totalPrice = 0;

    const productDetails = products.map((product) => {
      const { product: productData, quantity } = product;
      return {
        product: productData,
        quantity,
      };
    });

    productDetails.forEach((productDetail) => {
      totalAmount += productDetail.quantity;
      totalPrice += productDetail.quantity * productDetail.product.price;
    });

    const updatedPackage = await PackageModel.findByIdAndUpdate(
      id,
      {
        products: productDetails,
        totalAmount,
        totalPrice,
      },
      { new: true }
    );

    res.status(200).json(updatedPackage);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ message: err.message });
  }
};

export const deletePackage = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No package with that id" });
  }

  try {
    await PackageModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Package deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
};

export const getFilteredPackages = async (req, res) => {
  const { page = 1, size = 10 } = req.query;
  const { brandID, productName, minPrice, maxPrice } = req.query;

  const filter = {};

  if (brandID) {
    filter["products.product.brandID"] = brandID;
  }

  if (productName) {
    filter["products.product.name"] = { $regex: productName, $options: "i" };
  }

  if (minPrice && maxPrice) {
    filter.totalPrice = { $gte: minPrice, $lte: maxPrice };
  }

  try {
    const packages = await PackageModel.find(filter)
      .skip((page - 1) * size)
      .limit(size)
      .exec();

    const count = await PackageModel.countDocuments(filter).exec();

    res.json({
      packages,
      count,
      page,
      size,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getPagedPackages = async (req, res) => {
  const { page = 1, size = 10 } = req.query;

  try {
    const packages = await PackageModel.find()
      .skip((page - 1) * size)
      .limit(size)
      .exec();

    const count = await PackageModel.countDocuments().exec();

    res.json({
      packages,
      count,
      page,
      size,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const getPackagesByBrandName = async (req, res) => {
  const { brandName } = req.query;

  try {
    const brand = await BrandModel.findOne({ name: brandName });
    if (!brand) {
      return res.status(404).send({ message: 'Brand not found' });
    }

    // use the brandID to find packages
    const packages = await PackageModel.find({
      'products.product.brandID': brand._id
    });

    if (packages.length === 0) {
      return res.status(404).send({ message: 'No packages found for the given brand name' });
    }

    res.json(packages);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error fetching packages by brand nam" });
  }
}