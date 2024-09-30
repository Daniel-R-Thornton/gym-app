import { Request, Response } from "express";
import Workout from "../models/workoutModel"; // Import the Workout model
import Set from "../models/setModel"; // Import the Set model if you need to reference it

// Get all workouts
export const getAllWorkouts = async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.findAll({
      include: [
        {
          model: Set,
          as: "sets", // Include related sets if necessary
        },
      ],
    });
    res.status(200).json({ workouts });
  } catch (error) {
    console.error("Error fetching workouts:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Get a specific workout by ID
export const getWorkoutById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const workout = await Workout.findByPk(id, {
      include: [
        {
          model: Set,
          as: "sets", // Include sets if necessary
        },
      ],
    });
    if (!workout) {
      res.status(404).json({ message: "Workout not found." });
    }
    res.status(200).json({ workout });
  } catch (error) {
    console.error("Error fetching workout:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Create a new workout
export const createWorkout = async (req: Request, res: Response) => {
  const { name, date, notes } = req.body;
  try {
    const newWorkout = await Workout.create({ name, date, notes });
    res.status(201).json({ newWorkout });
  } catch (error) {
    console.error("Error creating workout:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Update a workout by ID
export const updateWorkout = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, date, notes } = req.body;
  try {
    const workout = await Workout.findByPk(id);
    if (!workout) {
      res.status(404).json({ message: "Workout not found." });
      return;
    }
    // Update only the provided fields
    workout.name = name ?? workout.name;
    workout.date = date ?? workout.date;
    workout.notes = notes ?? workout.notes;

    await workout.save(); // Save the updated workout
    res.status(200).json({ workout });
  } catch (error) {
    console.error("Error updating workout:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Delete a workout by ID
export const deleteWorkout = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const workout = await Workout.findByPk(id);
    if (!workout) {
      res.status(404).json({ message: "Workout not found." });
      return;
    }
    await workout.destroy(); // Delete the workout
    res.status(204).send(); // No content
  } catch (error) {
    console.error("Error deleting workout:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
