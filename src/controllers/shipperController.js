import mongoose from "mongoose";
import { shipperSchema } from "../models/shipperModel.js";

const Shipper = mongoose.model("Shipper", shipperSchema);

export const getAllShippers = async (req, res) => {
  try {
    const shippers = await Shipper.find();
    res.status(200).json(shippers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createShipper = async (req, res) => {
  const shipper = req.body;
  const newShipper = new Shipper(shipper);

  try {
    await newShipper.save();
    res.status(201).json(newShipper);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getShipperById = async (req, res) => {
  const { id } = req.params;

  try {
    const shipper = await Shipper.findById(id);
    if (!shipper) {
      res.status(404).json({ message: "Shipper not found" });
    } else {
      res.status(200).json(shipper);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteShipper = async (req, res) => {
  const { id } = req.params;

  try {
    const shipper = await Shipper.findByIdAndRemove(id);
    if (!shipper) {
      res.status(404).json({ message: "Shipper not found" });
    } else {
      res.status(200).json({ message: "Shipper deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateShipper = async (req, res) => {
  const { id } = req.params;
  const shipper = req.body;

  try {
    const updatedShipper = await Shipper.findByIdAndUpdate(id, shipper, {
      new: true,
    });
    if (!updatedShipper) {
      res.status(404).json({ message: "Shipper not found" });
    } else {
      res.status(200).json(updatedShipper);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
