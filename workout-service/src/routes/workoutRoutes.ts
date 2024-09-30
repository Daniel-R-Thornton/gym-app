import { Router } from "express";
import {
  getAllWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} from "../controllers/workoutController"; // Adjust the import path as necessary
import { authMiddleware } from "../middleware/authMiddleware"; // Import the auth middleware

const router = Router();

// Define the routes for workouts with auth middleware applied to each route
router.get("/", authMiddleware, getAllWorkouts); // Get all workouts
router.get("/:id", authMiddleware, getWorkoutById); // Get workout by ID
router.post("/", authMiddleware, createWorkout); // Create new workout
router.put("/:id", authMiddleware, updateWorkout); // Update workout by ID
router.delete("/:id", authMiddleware, deleteWorkout); // Delete workout by ID

export default router;
