import { Router } from "express";
import {
  getAllSets,
  getSetById,
  createSet,
  updateSet,
  deleteSet,
} from "../controllers/setController"; // Adjust the import path as necessary
import { authMiddleware } from "../middleware/authMiddleware"; // Import the auth middleware

const router = Router();

// Define the routes for sets
router.get("/sets/", authMiddleware, getAllSets); // Get all sets
router.get("/sets/:id", authMiddleware, getSetById); // Get set by ID
router.post("/sets/", authMiddleware, createSet); // Create new set
router.put("/sets/:id", authMiddleware, updateSet); // Update set by ID
router.delete("/sets/:id", authMiddleware, deleteSet); // Delete set by ID

export default router;
