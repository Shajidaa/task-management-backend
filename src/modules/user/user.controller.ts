import type { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "User created successfully!",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal service error",
    });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUser();

    res.status(201).json({
      success: true,
      message: "Get all users successfully",
      data: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal service error",
    });
  }
};

export const userController = {
  createUser,
  getUsers,
};
