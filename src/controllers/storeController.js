/**
 * @swagger
 * components:
 *  schemas:
 *    Store:
 *      type: object
 *      required:
 *        - storeName
 *        - address
 *        - phone
 *      properties:
 *        storeName:
 *          type: string
 *          description: Store storeName
 *        address:
 *          type: string
 *          description: Store address
 *        phone:
 *          type: string
 *          description: Store phone number
 */

/**
 * @swagger
 * /api/stores:
 *   post:
 *     summary: Create a new store
 *     tags: [Stores]
 *     requestBody:
 *       description: Store details
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Store'
 *     responses:
 *       201:
 *         description: Store created successfully
 */

/**
 * @swagger
 * /api/stores/getAllStores:
 *   get:
 *     summary: Get all stores
 *     tags: [Stores]
 *     responses:
 *       200:
 *         description: List of stores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Store'
 */

/**
 * @swagger
 * /api/stores/{id}:
 *   get:
 *     summary: Get a store by ID
 *     tags: [Stores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Store details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Store'
 *       404:
 *         description: Store not found
 */

/**
 * @swagger
 * /api/stores/{id}:
 *   put:
 *     summary: Update a store
 *     tags: [Stores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Store details
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Store'
 *     responses:
 *       200:
 *         description: Store updated successfully
 */

/**
 * @swagger
 * /api/stores/getStores/paged:
 *   get:
 *     summary: Get stores with pagination
 *     tags: [Stores]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number of the stores list
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of stores per page
 *     responses:
 *       200:
 *         description: A paginated list of stores
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Store'
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
 * /api/stores/getStores/filtered:
 *   get:
 *     summary: Get filtered list of stores
 *     tags: [Stores]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number of the stores list
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of stores per page
 *       - in: query
 *         name: storeName
 *         schema:
 *           type: string
 *         description: Filter by store name
 *       - in: query
 *         name: address
 *         schema:
 *           type: string
 *         description: Filter by store address
 *     responses:
 *       200:
 *         description: A filtered and paginated list of stores
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Store'
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 * 
 */

/**
 * @swagger
 * /api/stores/{id}:
 *   delete:
 *     summary: Delete a store
 *     tags: [Stores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Store deleted successfully
 *       400:
 *         description: Invalid ID supplied
 *       404:
 *         description: Store not found
 */



import mongoose from "mongoose";
import StoreModel from "../models/storeModel.js";

// Create a new store
export const createStore = async (req, res) => {
  try {
    const { storeName, address, phone } = req.body;
    const store = new StoreModel({
      _id: new mongoose.Types.ObjectId(),
      storeName,
      address,
      phone,
    });
    await store.save();
    res.status(201).json({ message: "Store created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating store" });
  }
};

// Get all stores
export const getAllStores = async (req, res) => {
  try {
    const stores = await StoreModel.find().sort({ storeName: 1 });
    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: "Error getting stores" });
  }
};

// Get a single store by ID
export const getStoreById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Store not found" });
  }

  try {
    const store = await StoreModel.findById(id);
    res.status(200).json(store);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update a store
export const updateStore = async (req, res) => {
  const { id } = req.params;
  const { storeName, address, phone } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Store not found" });
  }
  try {
    const updatedStore = await StoreModel.findByIdAndUpdate(
      id,
      { storeName, address, phone, id },
      { new: true }
    );
    res.status(200).json({ message: "Store updated successfully" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Delete a store
export const deleteStore = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID supplied" });
  }

  try {
    await StoreModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Store deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStoresPaged = async (req, res) => {
  try {
    const { page = 1, size = 10 } = req.query;
    const skip = (page - 1) * size;
    const stores = await StoreModel.find().skip(skip).limit(size);
    const total = await StoreModel.countDocuments();
    res.status(200).json({
      data: stores,
      totalPages: Math.ceil(total / size),
      currentPage: parseInt(page),
      pageSize: parseInt(size),
      totalItems: total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStoresFiltered = async (req, res) => {
  try {
    const { page = 1, size = 10, storeName, address } = req.query;
    let query = {};
    if (storeName) query.storeName = { $regex: storeName, $options: 'i' };
    if (address) query.address = { $regex: address, $options: 'i' };
    const skip = (page - 1) * size;
    const stores = await StoreModel.find(query).skip(skip).limit(size);
    const total = await StoreModel.countDocuments(query);
    res.status(200).json({
      data: stores,
      totalPages: Math.ceil(total / size),
      currentPage: parseInt(page),
      pageSize: parseInt(size),
      totalItems: total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};