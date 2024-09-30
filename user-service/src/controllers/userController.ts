// src/controllers/userController.ts

import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/userModel";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config";

/**
 * @function registerUser
 * @description Register a new user
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Promise<Response>} Promise that resolves when the user is created
 *
 * @example
 * // Request
 * POST /register HTTP/1.1
 * Content-Type: application/json
 * {
 *   "username": "johnDoe",
 *   "email": "john.doe@example.com",
 *   "password": "password123"
 * }
 *
 * // Response
 * HTTP/1.1 201 Created
 * Content-Type: application/json
 * {
 *   "message": "User created successfully!",
 *   "userId": 1,
 *   "username": "johnDoe",
 *   "email": "john.doe@example.com"
 * }
 */
export const registerUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }
  const existingUser = await UserModel.findOne({ where: { email } });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists." });
  }

  const saltRounds = 12;

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User created successfully!",
      userId: newUser.id,
      username: newUser.username,
      email: newUser.email,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

/**
 * @function loginUser
 * @description Login an existing user
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Promise<Response>} Promise that resolves when the user is logged in
 *
 * @example
 * // Request
 * POST /login HTTP/1.1
 * Content-Type: application/json
 * {
 *   "email": "john.doe@example.com",
 *   "password": "password123"
 * }
 *
 * // Response
 * HTTP/1.1 200 OK
 * Content-Type: application/json
 * {
 *   "message": "Login successful!",
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3MjUxNjA4NCwiZXhwIjoxNjcyNjQwNDg0fQ.0Tqj4eGyfB7cTqJn4aBj5w"
 * }
 */
export const loginUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ where: { email } });

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  const token = jwt.sign({ userId: user.id }, jwtSecret ?? "", {
    expiresIn: "1h",
  });

  return res.json({ message: "Login successful!", token });
};
