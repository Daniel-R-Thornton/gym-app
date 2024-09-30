// src/index.ts

import express from "express";
import { sequelize } from "./database"; // Import your database connection

const app = express();
app.use(express.json());

// Start the server
const PORT = process.env.PORT ?? 3000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  // Sync the database
  try {
    await sequelize.sync();
    console.log("Database synced successfully.");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
});
