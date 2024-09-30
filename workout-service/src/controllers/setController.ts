import { Request, Response } from "express";
import Set from "../models/setModel"; // Import the Set model
import Equipment from "../models/equipmentModel"; // Import the Equipment model if you need to reference it

// Get all sets
export const getAllSets = async (req: Request, res: Response) => {
  try {
    const sets = await Set.findAll({
      include: [
        {
          model: Equipment,
          as: "equipment", // You may include Equipment if you want to return equipment details with each set
        },
      ],
    });
    res.status(200).json({ sets });
  } catch (error) {
    console.error("Error fetching sets:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Get a specific set by ID
export const getSetById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const set = await Set.findByPk(id, {
      include: [
        {
          model: Equipment,
          as: "equipment", // Include Equipment if necessary
        },
      ],
    });
    if (!set) {
      res.status(404).json({ message: "Set not found." });
    }
    res.status(200).json({ set });
  } catch (error) {
    console.error("Error fetching set:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Create a new set
export const createSet = async (req: Request, res: Response) => {
  const { weight, reps, equipmentId } = req.body;
  try {
    const newSet = await Set.create({ weight, reps, equipmentId });
    res.status(201).json({ newSet });
  } catch (error) {
    console.error("Error creating set:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Update a set by ID
export const updateSet = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { weight, reps, equipmentId } = req.body;
  try {
    const set = await Set.findByPk(id);
    if (!set) {
      res.status(404).json({ message: "Set not found." });
      return;
    }
    // Update only the provided fields
    set.weight = weight ?? set.weight;
    set.reps = reps ?? set.reps;
    set.equipmentId = equipmentId ?? set.equipmentId;

    await set.save(); // Save the updated set
    res.status(200).json({ set });
  } catch (error) {
    console.error("Error updating set:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Delete a set by ID
export const deleteSet = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const set = await Set.findByPk(id);
    if (!set) {
      res.status(404).json({ message: "Set not found." });
      return;
    }
    await set.destroy(); // Delete the set
    res.status(204).send(); // No content
  } catch (error) {
    console.error("Error deleting set:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
