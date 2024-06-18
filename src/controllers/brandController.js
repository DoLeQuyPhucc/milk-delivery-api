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
import mongoose from "mongoose";
import BrandModel from "../models/brandModel.js";

export const getAllBrands = async (req, res) => {
  try {
    const brands = await BrandModel.find();
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