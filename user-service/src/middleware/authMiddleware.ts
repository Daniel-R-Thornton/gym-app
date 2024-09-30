import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config";

/**
 * authMiddleware - Middleware function to verify the JWT token from the Authorization header
 * @function
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express middleware next function
 * @returns {void}
 * @throws {Error} If the token is invalid or missing
 */
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ message: "Access denied. No token provided." });
    return; // Ensure no further execution
  }

  try {
    const verified = jwt.verify(token, jwtSecret ?? "");
    (req as any).user = verified; // Attach verified user to req object
    next(); // Call next to continue to the next middleware or route
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
    return; // Ensure no further execution
  }
};
