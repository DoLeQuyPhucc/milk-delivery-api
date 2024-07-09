import express from "express";
import {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
  getBrandsFiltered,
  getBrandsPaged
} from "../controllers/brandController.js";

const router = express.Router();

router.post("/", createBrand);
router.get("/getAllBrands", getAllBrands);
router.get("/:id", getBrandById);
router.put("/:id", updateBrand);
router.delete("/:id", deleteBrand);
router.get("/getBrands/filtered", getBrandsFiltered);
router.get("/getBrands/paged", getBrandsPaged);

export default router;
