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
import { authenticateToken, isManager } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticateToken, isManager, createBrand);
router.get("/getAllBrands", getAllBrands);
router.get("/:id", getBrandById);
router.put("/:id", authenticateToken, isManager, updateBrand);
router.delete("/:id", authenticateToken, isManager, deleteBrand);
router.get("/getBrands/filtered", getBrandsFiltered);
router.get("/getBrands/paged", getBrandsPaged);

export default router;
