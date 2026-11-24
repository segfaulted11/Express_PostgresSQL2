import { Request, Response } from "express";
import { profilesServices } from "./profiles.services";

const createProfile = async (req: Request, res: Response) => {
    const reqBody = req.body;
    const result = await profilesServices.createProfileIntoDB(reqBody);
  try {
    res.status(200).json({
      success: true,
      message: "PROFILE CREATED SUCCESSFULLY!",
      data: result.rows[0],
    });
  } catch (error:any) { 
    res.status(500).json({
      success: false,
      message: "FAILED TO CREATE THE PROFILE!",
      data: error,
    });
  }
};
export const profilesControllers = {
  createProfile,
};
