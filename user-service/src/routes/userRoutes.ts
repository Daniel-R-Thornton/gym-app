// src/routes/userRoutes.ts

import express from "express";
import { registerUser, loginUser } from "../controllers/userController";

const router = express.Router();

// Middleware to handle async errors
const asyncHandler =
  (fn: any) =>
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

router.post("/register", asyncHandler(registerUser));
router.post("/login", asyncHandler(loginUser));

export default router;
