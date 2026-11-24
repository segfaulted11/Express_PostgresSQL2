import { Router } from "express";
import { userControllers } from "./users.controllers";

//create a router variable and call Router() in it. export the variable as userRouter

const router = Router();

//creating a user on the database using post method
router.post("/",userControllers.createUser);
//getting users from the database using get method
router.get("/",userControllers.getUsers);
//getting a particular user from the database using the get method
router.get("/:id",userControllers.getUser);
//updating a user's data using the put method
router.put("/:id", userControllers.updateUser);
//deleting a user from the database using th delete method
router.delete("/:id", userControllers.deleteUser);

export const userRouter = router;
