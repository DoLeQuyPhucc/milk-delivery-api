import express from "express";
import { getAllUsers } from "../controllers/usersController.js";

const router = express.Router();

router.get("/getAllUsers", getAllUsers);

export default router;
