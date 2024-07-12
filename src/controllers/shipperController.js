/**
 * @swagger
 * components:
 *  schemas:
 *    Shippers:
 *      type: object
 *      required:
 *        - shipperName
 *        - phone
 *      properties:
 *        shipperName:
 *          type: string
 *          description: Shippers shipperName
 *        phone:
 *          type: string
 *          description: Shippers phone number
 *        store:
 *          type: object
 *          properties:
 *            storeID:
 *              type: string
 *              description: Store ID
 */

/**
 * @swagger
 * /api/shippers/getAllShippers:
 *   get:
 *     summary: Get all shippers
 *     tags: [Shippers]
 *     responses:
 *       200:
 *         description: List of shippers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   shipperName:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   store:
 *                     type: object
 *                     properties:
 *                       storeID:
 *                         type: string
 *                 required:
 *                   - shipperName
 *                   - phone
 *                   - store
 *       404:
 *         description: No shippers found
 *       500:
 *         description: Internal server error
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Forbidden access
 */

/**
 * @swagger
 * /api/shippers:
 *   post:
 *     summary: Create a new shipper
 *     tags: [Shippers]
 *     requestBody:
 *       description: Shippers details
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shipperName:
 *                 type: string
 *               phone:
 *                 type: string
 *               store:
 *                 type: object
 *                 properties:
 *                   storeID:
 *                     type: string
 *             required:
 *               - shipperName
 *               - phone
 *               - store
 *     responses:
 *       201:
 *         description: Shippers created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       409:
 *         description: Shippers already exists
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Forbidden access
 */

/**
 * @swagger
 * /api/shippers/{id}:
 *   get:
 *     summary: Get a shipper by ID
 *     tags: [Shippers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Shippers details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 shipperName:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 store:
 *                   type: object
 *                   properties:
 *                     storeID:
 *                       type: string
 *               required:
 *                 - shipperName
 *                 - phone
 *                 - store
 *       404:
 *         description: Shippers not found
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Forbidden access
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/shippers/{id}:
 *   delete:
 *     summary: Delete a shipper
 *     tags: [Shippers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Shippers deleted successfully
 *       404:
 *         description: Shippers not found
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Forbidden access
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/shippers/{id}:
 *   put:
 *     summary: Update a shipper
 *     tags: [Shippers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       description: Shippers details
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shipperName:
 *                 type: string
 *               phone:
 *                 type: string
 *               store:
 *                 type: object
 *                 properties:
 *                   storeID:
 *                     type: string
 *             required:
 *               - shipperName
 *               - phone
 *               - store
 *     responses:
 *       200:
 *         description: Shippers updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 shipperName:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 store:
 *                   type: object
 *                   properties:
 *                     storeID:
 *                       type: string
 *               required:
 *                 - shipperName
 *                 - phone
 *                 - store
 *       404:
 *         description: Shippers not found
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Forbidden access
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/shippers/assignStoreToShipper/{shipperId}/{storeId}:
 *   post:
 *     summary: Assign a store to a shipper
 *     tags: [Shippers]
 *     parameters:
 *       - in: path
 *         name: shipperId
 *         required: true
 *         schema:
 *           type: string
 *         description: The shipper ID
 *       - in: path
 *         name: storeId
 *         required: true
 *         schema:
 *           type: string
 *         description: The store ID to assign
 *     responses:
 *       200:
 *         description: Store assigned to shipper successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Store assigned to shipper successfully
 *       400:
 *         description: Invalid ID supplied
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid ID supplied
 *       404:
 *         description: Shipper or store not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Shipper not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error message
 */

import mongoose from "mongoose";
import ShipperModel from "../models/shipperModel.js";
import StoreModel from "../models/storeModel.js";
import OrderModel from "../models/orderModel.js";
import UserModel from "../models/userModel.js";

export const getAllShippers = async (req, res) => {
  try {
    const shipper = await ShipperModel.find().sort({ shipperName: 1 });
    res.status(200).json(shipper);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createShipper = async (req, res) => {
  const { shipperName, phone, store } = req.body;

  const newShipper = new ShipperModel({
    _id: new mongoose.Types.ObjectId(),
    shipperName,
    phone,
    store,
  });

  newShipper
    .save()
    .then((result) => {
      res.status(201).json({ message: "Shippers created successfully" });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
};

export const getShipperById = async (req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID supplied" });
  }
  try {
    const shipper = await ShipperModel.findById(id);
    if (!shipper) {
      res.status(404).json({ message: "Shippers not found" });
    } else {
      res.status(200).json(shipper);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteShipper = async (req, res) => {
  const { id } = req.params;

  // Check if the provided id is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID supplied" });
  }

  try {
    // Find the shipper by ID
    const shipper = await ShipperModel.findById(id).exec();

    if (!shipper) {
      return res.status(404).json({ message: "Shipper not found" });
    }

    const userId = shipper.user;

    // Delete the shipper
    await ShipperModel.findByIdAndDelete(id).exec();

    // Delete the associated user
    if (userId) {
      await UserModel.findByIdAndDelete(userId).exec();
    }

    await OrderModel.updateMany(
      { shipper: id },
      { $unset: { shipper: 1 } } 
    );

    res.json({ message: "Shipper deleted successfull" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting shipper", error: error.message });
  }
};

export const updateShipper = async (req, res) => {
  const { id } = req.params;
  const shipper = req.body;

  ShipperModel.updateOne({ _id: id }, { $set: shipper })
    .then((result) => {
      if (result.nModified === 0) {
        res.status(404).json({ message: "Shipper not found" });
      } else {
        res.status(200).json({ message: "Shipper updated successfully" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
};

// Assign store to shipper
export const assignStoreToShipper = async (req, res) => {
  const { shipperId, storeId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(shipperId) || !mongoose.Types.ObjectId.isValid(storeId)) {
    return res.status(400).json({ message: "Invalid ID supplied" });
  }

  try {
    const shipper = await ShipperModel.findById(shipperId);
    if (!shipper) {
      return res.status(404).json({ message: "Shipper not found" });
    }

    const store = await StoreModel.findById(storeId);
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    // Add the new store to the stores array
    shipper.store.push({ storeID: store._id });
    await shipper.save();

    // Optionally, verify the update by querying the shipper again
    const updatedShipper = await ShipperModel.findById(shipperId).populate('user');
    console.log('Updated Shipper:', updatedShipper);

    res.status(200).json({ message: "Store assigned to shipper successfully", shipper: updatedShipper });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
