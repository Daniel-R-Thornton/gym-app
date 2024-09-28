// src/models/UserModel.ts
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database"; // Ensure you have your Sequelize instance exported from config.ts

class UserModel extends Model {
  public id!: number; // Primary key
  public username!: string;
  public email!: string;
  public password!: string;
  // Add other fields as necessary

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the UserModel
UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Users",
  }
);

export default UserModel;
