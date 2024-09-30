import UserProfileModel from "../models/userProfileModel";
import { Request, Response } from "express";

/**
 * @function updateUserProfile
 * @description Update a user's profile. The user ID should be in the request body.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} Promise that resolves when the user profile is updated.
 *
 * @example
 * // Request
 * {
 *   "userId": 1,
 *   "units": "kg",
 *   "height": 180,
 *   "weight": 70
 * }
 */
export const updateUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, units, height, weight } = req.body;

  // Validate the user is logged in (authMiddleware should handle this)
  const userProfile = await UserProfileModel.findByPk(userId);

  if (!userProfile) {
    res.status(404).json({ message: "User profile not found." });
    return; // Return after sending the response
  }

  userProfile.units = units;
  userProfile.height = height;
  userProfile.weight = weight;

  await userProfile.save();

  res.json({ message: "User profile updated successfully." });
};

/**
 * @function getUserProfile
 * @description Retrieve a user's profile.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} Promise that resolves when the user profile is sent.
 *
 * @example
 * // Request
 * POST /profile/get HTTP/1.1
 * Content-Type: application/json
 * {
 *   "userId": 1
 * }
 *
 * // Response
 * HTTP/1.1 200 OK
 * Content-Type: application/json
 * {
 *   "id": 1,
 *   "userId": 1,
 *   "units": "kg",
 *   "height": 175,
 *   "weight": 70
 * }
 */
export const getUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.body;

  const userProfile = await UserProfileModel.findByPk(userId);

  if (!userProfile) {
    res.status(404).json({ message: "User profile not found." });
    return; // Return after sending the response
  }

  res.json(userProfile);
};

/**
 * @function createUserProfile
 * @description Create a user's profile.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} Promise that resolves when the user profile is created.
 *
 * @example
 * // Request
 * POST /profile/create HTTP/1.1
 * Content-Type: application/json
 * {
 *   "userId": 1,
 *   "units": "kg",
 *   "height": 180,
 *   "weight": 70
 * }
 *
 * // Response
 * HTTP/1.1 201 Created
 * Content-Type: application/json
 * {
 *   "id": 1,
 *   "userId": 1,
 *   "units": "kg",
 *   "height": 180,
 *   "weight": 70
 * }
 */
export const createUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, units, height, weight } = req.body;

  if (!userId || !units) {
    res.status(400).json({ message: "All fields are required." });
    return; // Return after sending the response
  }

  const userProfile = await UserProfileModel.create({
    userId,
    units,
    height,
    weight,
  });

  res.json(userProfile);
};
