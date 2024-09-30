// src/database.ts

import { Sequelize } from "sequelize";
import { dbConfig } from "./config";

export const sequelize = new Sequelize(
  dbConfig.database ?? "",
  dbConfig.user ?? "",
  dbConfig.password ?? "",
  {
    host: dbConfig.host,
    dialect: "postgres",
    logging: false, // Set to true to see SQL queries
  }
);

// Test the connection (optional, can be removed later)
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

testConnection();
