/**
 * @swagger
 * tags:
 *   name: Brands
 *   description: API for managing brands
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Brand:
 *      type: object
 *      required:
 *        - name
 *        - email
 *        - address
 *        - phone
 *      properties:
 *        name:
 *          type: string
 *          description: Brand name
 *        email:
 *          type: string
 *          description: Brand email
 *        address:
 *          type: string
 *          description: Brand address
 *        phone:
 *          type: string
 *          description: Brand phone number
 */

/**
 * @swagger
 * /api/brands/getAllBrands:
 *   get:
 *     summary: Get all brands
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: List of brands
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Brand'
 */

/**
 * @swagger
 * /api/brands/{id}:
 *   get:
 *     summary: Get a brand by ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Brand details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       404:
 *         description: Brand not found
 */

/**
 * @swagger
 * /api/brands:
 *   post:
 *     summary: Create a new brand
 *     tags: [Brands]
 *     requestBody:
 *       description: Brand details
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Brand'
 *     responses:
 *       201:
 *         description: Brand created successfully
 */

/**
 * @swagger
 * /api/brands/{id}:
 *   put:
 *     summary: Update a brand
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       description: Brand details
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Brand'
 *     responses:
 *       200:
 *         description: Brand updated successfully
 */

/**
 * @swagger
 * /api/brands/{id}:
 *   delete:
 *     summary: Delete a brand
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The brand ID
 *     responses:
 *       200:
 *         description: Brand deleted successfully
 *       404:
 *         description: Brand not found
 */

/**
 * @swagger
 * /api/brands/getBrands/paged:
 *   get:
 *     summary: Get paginated list of brands
 *     tags: [Brands]
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
 *         description: Number of brands per page
 *     responses:
 *       200:
 *         description: A paginated list of brands
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *                 pageSize:
 *                   type: integer
 *                 totalBrands:
 *                   type: integer
 *                 brands:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Brand'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/brands/getBrands/filtered:
 *   get:
 *     summary: Get filtered list of brands
 *     tags: [Brands]
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
 *         description: Number of brands per page
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by brand name
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Filter by brand email
 *       - in: query
 *         name: address
 *         schema:
 *           type: string
 *         description: Filter by brand address
 *       - in: query
 *         name: phone
 *         schema:
 *           type: string
 *         description: Filter by brand phone number
 *     responses:
 *       200:
 *         description: A filtered list of brands
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Brand'
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *                 pageSize:
 *                   type: integer
 *                 totalBrands:
 *                   type: integer
 *       500:
 *         description: Internal server error
 */

import mongoose from "mongoose";
import BrandModel from "../models/brandModel.js";

export const getAllBrands = async (req, res) => {
  try {
    const brands = await BrandModel.find().sort({ name: 1 });
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBrandById = async (req, res) => {
  try {
    const id = req.params.id;
    const brand = await BrandModel.findById(id);
    if (!brand) {
      res.status(404).json({ message: "Brand not found" });
    } else {
      res.status(200).json(brand);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBrand = async (req, res) => {
  const{ name, email, address, phone } = req.body;

  if (!name || !email || !address || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const brand = new BrandModel({
    _id: new mongoose.Types.ObjectId(),
    name,
    email,
    address,
    phone,
  });
  
  try{
    const newBrand = await brand.save();
    res.status(200).json({message: "Brand created successfully"});
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteBrand = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No brand with that id" });
  }

  try {
    await BrandModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Brand deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBrand = async (req, res) => {
  const { id } = req.params;
  const { name, email, address, phone } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No brand with that id" });
  }

  try {
    const updatedBrand = await BrandModel.findByIdAndUpdate(
      id,
      { name, email, address, phone, id },
      { new: true }
    );
    res.status(200).json({ message: "Brand updated successfully" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getBrandsPaged = async (req, res) => {
  try {
    let { page = 1, size = 10 } = req.query;
    page = parseInt(page);
    size = parseInt(size);
    const skip = (page - 1) * size;

    const totalBrands = await BrandModel.countDocuments();

    const totalPages = Math.ceil(totalBrands / size);

    const brands = await BrandModel.find().skip(skip).limit(size);

    res.status(200).json({
      totalPages,
      currentPage: page,
      pageSize: size,
      totalBrands,
      brands,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBrandsFiltered = async (req, res) => {
  try {
    const { page = 1, size = 10, name, email, address, phone } = req.query;
    let query = {};

    if (name) {
      query.name = { $regex: name, $options: "i" };
    }
    if (email) {
      query.email = { $regex: email, $options: "i" };
    }
    if (address) {
      query.address = { $regex: address, $options: "i" };
    }
    if (phone) {
      query.phone = { $regex: phone, $options: "i" };
    }

    const skip = (page - 1) * size;
    const brands = await BrandModel.find(query).skip(skip).limit(size);
    const totalBrands = await BrandModel.countDocuments(query);

    res.status(200).json({
      data: brands,
      totalPages: Math.ceil(totalBrands / size),
      currentPage: parseInt(page),
      pageSize: parseInt(size),
      totalBrands,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};