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

//getting users 
const getUsers =  async (req: Request, res: Response) => {
  try {
 const result = await userServices.getUsersFromDB();
    res.status(200).json({
      success: true,
      message: "USERS RETRIEVED SUCCESSFULLY!",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: true,
      message: "FAILED TO GET THE USERS!",
      data: error,
    });
  }
}

//getting user
const getUser =  async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userServices.getUserFromDB(id as string);

    //if the user(you are wanting to delete) doesnt exist in the first place
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "USER NOT FOUND!",
      });
    }
    res.status(200).json({
      success: true,
      message: "USER RETRIEVED SUCCESSFULLY!",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: true,
      message: "FAILED TO GET THE USER!",
      data: error,
    });
  }
}

//updating user
const updateUser =  async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
const result = await userServices.updateUserFromDB(req.body,id as string)
    //if the user(you are wanting to delete) doesnt exist in the first place
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "USER NOT FOUND!",
      });
    }
    res.status(200).json({
      success: true,
      message: "USER UPDATED SUCCESSFULLY!",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "FAILED TO UPDATE THE USER!",
      data: error,
    });
  }
}
//deleting user 
const deleteUser = async (req: Request, res: Response)=>{
     
  try {
    const { id } = req.params;
    const result = await userServices.deleteUserFromDB(id as string);
 
    //if the user(you are wanting to delete) doesnt exist in the first place
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "USER NOT FOUND!",
      });
    }
    res.status(200).json({
      success: true,
      message: "USER DELETED SUCCESSFULLY!",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "FAILED TO DELETE THE USER!",
      data: error,
    });
  }
}


export const userControllers = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
}