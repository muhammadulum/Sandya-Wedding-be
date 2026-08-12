import express from "express";
import {
  submitRSVP,
  getAllRSVPs,
  getRSVPById,
  updateRSVP,
  deleteRSVP,
} from "../controllers/RSVPController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", getAllRSVPs);
router.post("/", submitRSVP);
router.get("/:id", verifyToken, getRSVPById);
router.put("/:id", verifyToken, updateRSVP);
router.delete("/:id", verifyToken, deleteRSVP);
export default router;
