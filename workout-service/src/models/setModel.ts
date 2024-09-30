// src/models/UserModel.ts
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database"; // Ensure you have your Sequelize instance exported from config.ts

//represents a set in a workout, links to workout and equipment
class Set extends Model {
  public id!: number;
  public weight!: number;
  public reps!: number;
  public time!: Date;
  public notes?: string;
  public duration?: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public ownerId!: number;

  //relationships
  public workoutId!: number;
  public equipmentId!: number;
}

// Initialize the UserModel
Set.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    reps: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    notes: {
      type: DataTypes.STRING,
    },
    duration: {
      type: DataTypes.FLOAT,
    },

    //relationships
    workoutId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Workouts",
        key: "id",
      },
    },
    equipmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Equipment",
        key: "id",
      },
    },
    // In your workout model
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "UserProfiles",
        key: "id",
      },
    },
  },
  {
    sequelize, // We need to pass the connection instance
    modelName: "Set", // We need to choose the model name
  }
);

export default Set;
