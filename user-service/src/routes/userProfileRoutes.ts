import express from "express";
import {
  createUserProfile,
  getUserProfile,
  updateUserProfile,
} from "../controllers/useProfileController";

const router = express.Router();
const asyncHandler =
  (fn: any) =>
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

router.post("/create", asyncHandler(createUserProfile));
router.get("/get", asyncHandler(getUserProfile));
router.put("/update", asyncHandler(updateUserProfile));

export default router;
