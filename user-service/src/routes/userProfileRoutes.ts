import express from "express";
import {
  createUserProfile,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userProfileController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create", authMiddleware, createUserProfile);
router.get("/get", authMiddleware, getUserProfile);
router.put("/update", authMiddleware, updateUserProfile);

export default router;
