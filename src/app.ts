import express, { Application, Request, Response } from "express";
import { userRouter } from "./modules/users/users.routes";
import {profilesRouter } from "./modules/profiles/profiles.routes";
import { authRouter } from "./modules/auth/auth.routes";
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

//creating endpoint for every feature (e.g. users/profiles) ->
//users endpoint
app.use("/api/v1/users",userRouter)

//profiles endpoint
app.use("/api/v1/profiles",profilesRouter)

//auth endpoint
app.use("/api/v1/auth",authRouter);

export default app;
