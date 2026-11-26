import { Request, Response } from "express";
import { authServices } from "./auth.services";

const logInUser = async (req: Request, res: Response) => {
  try {
    const result = await authServices.logInUserIntoDB(req.body);
    // console.log(result);
    const { refreshToken } = result;

    res.cookie("refreshToken", refreshToken, { 
      secure: false, //if http(in locally its http) -> use false and if https (in production) -> use true
      httpOnly :true, //to prevent XSS attack
      sameSite : "lax",
      path: "/",
      domain : "localhost"
     });

    res.status(200).json({
      success: true,
      message: "USER LOGGED IN SUCCESSFULLY!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: error,
    });
  }
};
export const authControllers = {
  logInUser,
};
