import express, { Application, Request, Response } from "express";
import { userRouter } from "./modules/users/users.routes";
import {profilesRouter } from "./modules/profiles/profiles.routes";
import { authRouter } from "./modules/auth/auth.routes";
import fs from "fs";
const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req: Request, res: Response, next) => {
  const log = `\nMethod : ${req.method} | URL : ${req.url} | Time : ${new Date().toLocaleString()}\n`;
  //creates a logger.txt file and writes the content(in that file) that log contains everytime theres a new request on client.
  fs.appendFile("logger.txt",log,err=>console.log(err))
  next();
});

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
app.use("/api/v1/users",userRouter)

//profiles endpoint
app.use("/api/v1/profiles",profilesRouter)

//auth endpoint
app.use("/api/v1/auth",authRouter);

export default app;
