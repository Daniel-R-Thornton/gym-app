import UserProfileModel from "../models/userProfileModel";
import { Request, Response } from "express";
export const updateUserProfile = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { userId, units, height, weight } = req.body;

  const userProfile = await UserProfileModel.findByPk(userId);

  if (!userProfile) {
    return res.status(404).json({ message: "User profile not found." });
  }

  userProfile.units = units;
  userProfile.height = height;
  userProfile.weight = weight;

  await userProfile.save();

  return res.json({ message: "User profile updated successfully." });
};

export const getUserProfile = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { userId } = req.body;

  const userProfile = await UserProfileModel.findByPk(userId);

  if (!userProfile) {
    return res.status(404).json({ message: "User profile not found." });
  }

  return res.json(userProfile);
};

export const createUserProfile = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { userId, units, height, weight } = req.body;

  if (!userId || !units) {
    return res.status(400).json({ message: "All fields are required." });
  }
  console.log(userId, units, height, weight);

  const userProfile = await UserProfileModel.create({
    userId,
    units,
    height,
    weight,
  });

  return res.json(userProfile);
};
