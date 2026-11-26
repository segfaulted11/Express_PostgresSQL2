import express, { Application, Request, Response } from "express";
import { userRouter } from "./modules/users/users.routes";
import { profilesRouter } from "./modules/profiles/profiles.routes";
import { authRouter } from "./modules/authLogIn/auth.routes";
import loggerMiddleWare from "./middleware/logger";
import globalErrorHandler from "./middleware/globalErrorHandler";
import cors from "cors";

//creating the server
const app: Application = express();

// Middleware :
// Allow requests from the frontend running at localhost:3000
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200
};

// Enable CORS using the specified options
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//logger middleware
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

// Global Error Handling Middleware
app.use(globalErrorHandler);

export default app;
