// src/models/UserProfileModel.ts
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database"; // Ensure you have your Sequelize instance exported from config.ts
import UserModel from "./userModel";

class UserProfileModel extends Model {
  public id!: number; // Primary key
  public userId!: string;
  public units!: "kg" | "lbs";
  public height?: number;
  public weight?: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the UserProfileModel
UserProfileModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    units: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.FLOAT,
    },
    weight: {
      type: DataTypes.FLOAT,
    },
  },
  {
    sequelize,
    tableName: "UserProfiles",
  }
);
//link to the User model
UserProfileModel.belongsTo(UserModel, {
  foreignKey: "userId",
  as: "user",
});
export default UserProfileModel;
