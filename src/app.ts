import express, { Application, Request, Response } from "express";
import { userRouter } from "./modules/users/users.routes";
const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// root route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "this is root route",
  });
});

//how its all connected :
//server.ts -> app.ts -> users.routes.ts -> users.controllers.ts -> users.services.ts

//connecting the sub routers of Users w the main router ->
app.use("/api/v1/users",userRouter)



export default app;
