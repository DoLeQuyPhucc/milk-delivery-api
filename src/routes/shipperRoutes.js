import express from "express";
import {
  getAllShippers,
  createShipper,
  getShipperById,
  deleteShipper,
  updateShipper,
  assignStoreToShipper
} from "../controllers/shipperController.js";
import { authenticateToken, isManager, isManagerOrAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/getAllShippers", authenticateToken, isManagerOrAdmin, getAllShippers);
router.post("/", authenticateToken, isManager, createShipper);
router.get("/:id", authenticateToken, isManager, getShipperById);
router.delete("/:id", authenticateToken, isManager, deleteShipper);
router.put("/:id", authenticateToken, isManager, updateShipper);
router.post("/assignStoreToShipper", authenticateToken, isManager, assignStoreToShipper);

export default router;
