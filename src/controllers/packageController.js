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
    const packages = await PackageModel.find();
    res.status(200).json(packages);
  } catch (err) {
    console.error(err.message);
    res.status(404).json({ message: err.message });
  }
};

export const getPackageById = async (req, res) => {
  const { id } = req.params;

  try {
    const packages = await PackageModel.findById(id);
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
