import { Router } from "express";
import { userControllers } from "./users.controllers";

//create a router variable and call Router() in it. export the variable as userRouter

const router = Router();

//creating a user on the database using post method
router.post("/",userControllers.createUser);

export const userRouter = router;
