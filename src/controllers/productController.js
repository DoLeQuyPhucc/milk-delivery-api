/**
 * @swagger
 * tags:
 *   name: Product
 *   description: API for products
 */

/**
 * @swagger
 * /api/products/getAllProducts:
 *   get:
 *     summary: Retrieve all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error
 *
 * /api/products/{id}:
 *   get:
 *     summary: Retrieve a product by ID
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to retrieve
 *     responses:
 *       200:
 *         description: A product object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 *
 *   put:
 *     summary: Update a product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       200:
 *         description: Updated product object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       409:
 *         description: Conflict, unable to update product
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to delete
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/products/:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       201:
 *         description: Created product object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '404':
 *         description: No product with that id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 * /api/products/getProductByName:
 *   get:
 *     summary: get products by name
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Product name to get for
 *     responses:
 *       200:
 *         description: A list of products matching the name
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request, missing name parameter
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/products/getProducts/filtered:
 *   get:
 *     summary: Get filtered list of products
 *     tags: [Product]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number of the products list
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of products per page
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by product name
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Filter by minimum price
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Filter by maximum price
 *     responses:
 *       200:
 *         description: A filtered and paginated list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *                 pageSize:
 *                   type: integer
 *                 totalItems:
 *                   type: integer
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/products/getProducts/paged:
 *  get:
 *    summary: Get products by page
 *    tags: [Product]
 *    description: Retrieves products in a paginated format based on the provided page and size parameters.
 *    parameters:
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *          format: int32
 *        required: true
 *        description: The page number of the paginated results.
 *      - in: query
 *        name: size
 *        schema:
 *          type: integer
 *          format: int32
 *        required: true
 *        description: The number of items to return per page.
 *    responses:
 *      '200':
 *        description: A paginated list of products.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                products:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Product'
 *                currentPage:
 *                  type: integer
 *                  format: int32
 *                totalPages:
 *                  type: integer
 *                  format: int32
 *                totalProducts:
 *                  type: integer
 *                  format: int32
 *      '400':
 *        description: Invalid page or size parameter.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *      '500':
 *        description: Internal server error.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         brandID:
 *           type: string
 *         name:
 *           type: string
 *         productImage:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         stockQuantity:
 *           type: integer
 *     ProductInput:
 *       type: object
 *       properties:
 *         brandID:
 *           type: string
 *         name:
 *           type: string
 *         productImage:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         stockQuantity:
 *           type: integer
 */




import mongoose from "mongoose";
import ProductModel from "../models/productModel.js";

// Get all products
// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find().sort({ name: 1 });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No product with that ID" });
  }

  try {
    const product = await ProductModel.findById(id).populate('brandID');
    if (!product) {
      return res.status(404).json({ message: "No product with that ID" });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new product
export const createProduct = async (req, res) => {
  const { brandID, name, productImage, description, price, stockQuantity } =
    req.body;

  if (!brandID || !name || !price || !stockQuantity) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newProduct = new ProductModel({
    _id: new mongoose.Types.ObjectId(),
    brandID,
    name,
    productImage,
    description,
    price,
    stockQuantity,
  });

  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  const { id: _id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json({ message: "No product with that ID" });
  }

  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      _id,
      { ...product, _id },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "No product with that ID" });
    }
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No product with that ID" });
  }

  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "No product with that ID" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Tìm kiếm sản phẩm theo tên
export const getProductByName = async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res
      .status(400)
      .json({ message: "Missing required query parameter: name" });
  }

  try {
    const products = await ProductModel.find({
      name: { $regex: name, $options: "i" },
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get products by page
export const getProductsPaged = async (req, res) => {
  const { page, size } = req.query;
  const limit = parseInt(size, 10);
  const skip = (parseInt(page, 10) - 1) * limit;

  if (!page || !size || isNaN(limit) || isNaN(skip)) {
    return res.status(400).json({ message: "Invalid page or size parameter" });
  }

  try {
    const products = await ProductModel.find().limit(limit).skip(skip);
    const totalProducts = await ProductModel.countDocuments();
    res.status(200).json({
      products,
      currentPage: parseInt(page, 10),
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const getProductsFiltered = async (req, res) => {
  try {
    const { page = 1, size = 10, name, minPrice, maxPrice } = req.query;
    let query = {};

    if (name) query.name = { $regex: name, $options: 'i' };
    if (minPrice && maxPrice) query.price = { $gte: minPrice, $lte: maxPrice };

    const skip = (page - 1) * size;

    const products = await ProductModel.find(query).skip(skip).limit(size);

    const total = await ProductModel.countDocuments(query);

    res.status(200).json({
      data: products,
      totalPages: Math.ceil(total / size),
      currentPage: parseInt(page),
      pageSize: parseInt(size),
      totalItems: total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
