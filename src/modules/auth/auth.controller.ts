import type { Response, Request } from "express";
import { authService } from "./auth.service";
import sendResponse from "../../utility/sendResponse";

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginUserFromDB(req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User Login successfully!",
      data: result,
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

export const authController = {
  loginUser,
};
