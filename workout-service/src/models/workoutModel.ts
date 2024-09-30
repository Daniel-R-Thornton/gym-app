// src/models/WorkoutModel.ts
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database";
import Set from "./setModel";
// Represents a workout session
class Workout extends Model {
  public id!: number;
  public name!: string; // Name of the workout
  public date!: Date; // Date of the workout
  public notes?: string; // Optional notes about the workout
  public readonly createdAt!: Date; // Timestamps
  public readonly updatedAt!: Date;

  // Associations
  public readonly sets?: Set[]; // One-to-many relationship with Set
}

// Initialize the Workout model
Workout.init(
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
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    notes: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize, // We need to pass the connection instance
    modelName: "Workout", // We need to choose the model name
  }
);

// Define associations after the model is initialized
Workout.hasMany(Set, {
  foreignKey: "workoutId", // The foreign key in the Set model
  as: "sets", // Alias for the association
});

export default Workout;
