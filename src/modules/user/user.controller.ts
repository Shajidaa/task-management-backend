import type { Request, Response } from "express";
import { userService } from "./user.service";
import sendResponse from "../../utility/sendResponse";

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

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Users fetched successfully",
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
