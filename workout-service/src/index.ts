// src/index.ts

import express from "express";
import { sequelize } from "./database";
import EquipmentRoutes from "./routes/equipmentRoutes";
import SetRoutes from "./routes/setRoutes";
import WorkoutRoutes from "./routes/workoutRoutes";

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.use(EquipmentRoutes);
app.use(SetRoutes);
app.use(WorkoutRoutes);

// Start the server
const PORT = process.env.PORT ?? 3001;

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
