import { Request, Response } from "express";
import { userServices } from "./users.services";

//creating a createUser function to handle request and response stuff and exporting it to use in the users.routes.ts for the most method in /v1/api/users route.
const createUser = async (req: Request, res: Response) => {
  const reqBody = req.body;

const result = await userServices.createUserIntoDB(reqBody);
  try {
    res.status(200).json({
      success: true,
      message: "USER CREATED SUCCESSFULLY!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: true,
      message: "FAILED TO CREATE THE USER!",
      data: error,
    });
  }
};

export const userControllers = {
    createUser,
}