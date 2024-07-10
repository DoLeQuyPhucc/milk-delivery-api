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
import mongoose from "mongoose";
import ShipperModel from "../models/shipperModel.js";

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
    const shipper = await ShipperModel.findByIdAndDelete(id).exec();

    if (!shipper) {
      return res.status(404).json({ message: "Shippers not found" });
    }

    res.json({ message: "Shippers deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting shipper" });
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
