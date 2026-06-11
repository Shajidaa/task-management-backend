import type { Request, Response } from "express";
import { userService } from "./user.service";
import sendResponse from "../../utility/sendResponse";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.registerUser(req.body);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User created successfully!",
      data: result.rows[0],
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Internal service error",
      error: error,
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
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Internal service error",
      error: error,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userService.singleUserFromDB(id as string);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Single user get successfully",
      data: result.rows,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Internal service error",
      error: error,
    });
  }
};

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userService.updateSingleUserFromDB(
      req.body,
      id as string,
    );
    console.log(req.body, id, result);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Single user Update successfully",
      data: result.rows[0],
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Internal service error",
      error: error,
    });
  }
};

const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userService.deletedSingleUserFromDB(id as string);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Single user deleted successfully",
      data: result.rows[0],
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Internal service error",
      error: error,
    });
  }
};

export const userController = {
  createUser,
  getUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
};
