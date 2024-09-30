// src/controllers/EquipmentController.ts
import { Request, Response } from "express";
import Equipment from "../models/equipmentModel";

// Create a new piece of equipment
export const createEquipment = async (req: Request, res: Response) => {
  try {
    const { name, type } = req.body;
    const equipment = await Equipment.create({ name, type });
    res.status(201).json({ equipment });
  } catch (error) {
    console.error("Error creating equipment:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Get all equipment
export const getAllEquipment = async (req: Request, res: Response) => {
  try {
    const equipmentList = await Equipment.findAll();
    res.status(200).json({ equipmentList });
  } catch (error) {
    console.error("Error fetching equipment:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Get a specific piece of equipment by ID
export const getEquipmentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const equipment = await Equipment.findByPk(id);
    if (!equipment) {
      res.status(404).json({ message: "Equipment not found." });
    }
    res.status(200).json({ equipment });
  } catch (error) {
    console.error("Error fetching equipment:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Update a piece of equipment
export const updateEquipment = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [updated] = await Equipment.update(req.body, {
      where: { id },
    });
    if (!updated) {
      res.status(404).json({ message: "Equipment not found." });
    }
    const updatedEquipment = await Equipment.findByPk(id);
    res.status(200).json({ equipment: updatedEquipment });
  } catch (error) {
    console.error("Error updating equipment:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Delete a piece of equipment
export const deleteEquipment = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleted = await Equipment.destroy({
      where: { id },
    });
    if (!deleted) {
      res.status(404).json({ message: "Equipment not found." });
    }
    res.status(204).send(); // No content
  } catch (error) {
    console.error("Error deleting equipment:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
