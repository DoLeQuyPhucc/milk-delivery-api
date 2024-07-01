/**
 * @swagger
 * tags:
 *   storeName: Stores
 *   description: API for managing stores
 */

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
    const stores = await StoreModel.find().exec();
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
