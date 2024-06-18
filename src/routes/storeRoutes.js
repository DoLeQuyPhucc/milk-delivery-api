import express from "express";
import { getAllStores, createStore , getStoreById, deleteStore, updateStore } from "../controllers/storeController.js";

const router = express.Router();

router.get("/getAllStores", getAllStores);
router.post("/", createStore);
router.get("/:id", getStoreById);
router.delete("/:id", deleteStore);
router.put("/:id", updateStore);


export default router;
