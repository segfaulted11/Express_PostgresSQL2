import express, { Application, NextFunction, Request, Response } from "express";
import { userRouter } from "./modules/users/users.routes";
import { profilesRouter } from "./modules/profiles/profiles.routes";
import { authRouter } from "./modules/auth/auth.routes";
import loggerMiddleWare from "./middleware/logger";
const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//logger middle
app.use(loggerMiddleWare);

// root route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "this is root route",
  });
});

//how its all connected :
//server.ts -> app.ts -> users.routes.ts -> users.controllers.ts -> users.services.ts
//creating endpoints for every feature (e.g. users/profiles,auth) ->

//users endpoint
app.use("/api/v1/users", userRouter);

//profiles endpoint
app.use("/api/v1/profiles", profilesRouter);

//auth endpoint
app.use("/api/v1/auth", authRouter);

export default app;
