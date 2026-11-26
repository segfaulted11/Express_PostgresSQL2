import { Request, Response } from "express";
import { authServices } from "./auth.services";

const logInUser = async (req: Request, res: Response) => {
  try {
    const result = await authServices.logInUserIntoDB(req.body);
    // console.log(result);
    const { accessToken, user } = result;

    res.cookie("refreshToken", result.refreshToken, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });

    res.status(200).json({
      success: true,
      message: "USER LOGGED IN SUCCESSFULLY!",
      data: {
        accessToken,
        user,
      },
    });
  }catch (error: any) {
  res.status(401).json({
    success: false,
    message: error.message || "Authentication failed",
  });
}
};
const generateToken = async (req: Request, res: Response) => {
  try {
    const result = await authServices.generateAccessToken(
      req.cookies.refreshToken,
    );

    res.status(200).json({
      success: true,
      message: "ACCESS TOKEN GENERATED SUCCESSFULLY!",
      data: result,
    });
  } catch (error: any) {
  res.status(401).json({
    success: false,
    message: error.message || "Authentication failed",
  });
}
};
export const authControllers = {
  logInUser,
  generateToken,
};
