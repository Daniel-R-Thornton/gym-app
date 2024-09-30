// src/routes/equipmentRoutes.ts
import { Router } from "express";
import {
  createEquipment,
  getAllEquipment,
  getEquipmentById,
  updateEquipment,
  deleteEquipment,
} from "../controllers/equipmentController"; // Adjust the import based on your project structure
import { authMiddleware } from "../middleware/authMiddleware"; // Assuming you have an auth middleware

const router = Router();

// Define routes with middleware
router.post("/", authMiddleware, createEquipment); // Create a new equipment
router.get("/", authMiddleware, getAllEquipment); // Get all equipment
router.get("/:id", authMiddleware, getEquipmentById); // Get equipment by ID
router.put("/:id", authMiddleware, updateEquipment); // Update equipment by ID
router.delete("/:id", authMiddleware, deleteEquipment); // Delete equipment by ID

export default router;
