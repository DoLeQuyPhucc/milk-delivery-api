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
  try {
    const { name, email, address, phone } = req.body;
    const brand = new BrandModel({ name, email, address, phone });
    await brand.save();
    res.status(201).json({ message: "Brand created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBrand = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, address, phone } = req.body;
    const brand = await BrandModel.findByIdAndUpdate(
      id,
      { name, email, address, phone },
      { new: true }
    );
    if (!brand) {
      res.status(404).json({ message: "Brand not found" });
    } else {
      res.status(200).json({ message: "Brand updated successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBrand = async (req, res) => {
  try {
    const id = req.params.id;
    await BrandModel.findByIdAndRemove(id);
    res.status(200).json({ message: "Brand deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
