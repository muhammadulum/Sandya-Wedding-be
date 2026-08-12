import express from "express";
import {
  getAllGuests,
  createGuest,
  getGuestBySlug,
  updateGuest,
  deleteGuest,
  getPublicGuests,
} from "../controllers/GuestController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", verifyToken, getAllGuests);
// Public endpoint - minimal guest info for invitation landing page
router.get("/public", getPublicGuests);
router.post("/", verifyToken, createGuest);
router.get("/:slug", getGuestBySlug);
router.put("/:slug", verifyToken, updateGuest);
router.delete("/:slug", verifyToken, deleteGuest);
export default router;
