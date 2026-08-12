import express from "express";
import {
  getWeddingInfo,
  updateWeddingInfo,
} from "../controllers/WeddingController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", getWeddingInfo);
router.put("/", verifyToken, updateWeddingInfo);
export default router;
