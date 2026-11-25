import { Request, Response } from "express";
import { authServices } from "./auth.services";

const logInUser = async (req: Request, res: Response) => {
  try {
    const result = await authServices.logInUserIntoDB(req.body);
    // console.log(result);
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
