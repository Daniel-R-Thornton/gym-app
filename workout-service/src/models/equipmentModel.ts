// src/models/EquipmentModel.ts
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database"; // Ensure you have your Sequelize instance exported from config.ts
import Set from "./setModel";

// Represents a piece of equipment used in workouts
class Equipment extends Model {
  public id!: number;
  public name!: string; // Name of the equipment
  public type!: string; // Type of equipment (e.g., dumbbell, barbell, machine)
  public readonly createdAt!: Date; // Timestamps
  public readonly updatedAt!: Date;

  // Associations
  public readonly sets?: Set[]; // One-to-many relationship with Set
}

// Initialize the Equipment model
Equipment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // We need to pass the connection instance
    modelName: "Equipment", // We need to choose the model name
  }
);

// Define associations after the model is initialized
Equipment.hasMany(Set, {
  foreignKey: "equipmentId", // The foreign key in the Set model
  as: "sets", // Alias for the association
});

export default Equipment;
