import express from "express";
import {
  getAllShippers,
  createShipper,
  getShipperById,
  deleteShipper,
  updateShipper,
} from "../controllers/shipperController.js";

const router = express.Router();

router.get("/getAllShippers", getAllShippers);
router.post("/", createShipper);
router.get("/:id", getShipperById);
router.delete("/:id", deleteShipper);
router.put("/:id", updateShipper);

export default router;
