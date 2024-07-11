import express from "express";
import { getAllStores, createStore , getStoreById, deleteStore, updateStore, getStoresFiltered, getStoresPaged } from "../controllers/storeController.js";
import { authenticateToken, isManager, isManagerOrAdmin} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/getAllStores", authenticateToken, getAllStores);
router.post("/", authenticateToken, isManager, createStore);
router.get("/:id", authenticateToken, isManagerOrAdmin, getStoreById);
router.delete("/:id", authenticateToken, isManager, deleteStore);
router.put("/:id", authenticateToken, isManager, updateStore);
router.get("/getStores/filtered", authenticateToken, getStoresFiltered);
router.get("/getStores/paged", authenticateToken, getStoresPaged);

export default router;
