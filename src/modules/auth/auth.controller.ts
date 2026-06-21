import type { Response, Request } from "express";
import { authService } from "./auth.service";
import sendResponse from "../../utility/sendResponse";

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginUserFromDB(req.body);
    const { refreshToken, accessToken, safeUser } = result;
    //cookie save the refresh code on browser cookie
    res.cookie("refreshToken", refreshToken, {
      secure: process.env.NODE_ENV === "production", //automatically true -> production
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", //production cross site --> none and locally for lax
      maxAge: Number(process.env.COOKIE_REFRESH_MAX_AGE),
    });
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User Login successfully!",
      data: { accessToken, safeUser },
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

const generateRefreshToken = async (req: Request, res: Response) => {
  const result = await authService.generateRefreshTokenFromDB(
    req.cookies.refreshToken,
  );
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User Login successfully!",
    data: result,
  });
};
export const authController = {
  loginUser,
  generateRefreshToken,
};
