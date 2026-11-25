import { NextFunction, Request, Response } from "express";
import fs from "fs";

const loggerMiddleWare = (req: Request, res: Response, next: NextFunction) => {
  const log = `\nMethod : ${req.method} | URL : ${req.url} | Time : ${new Date().toLocaleString()}\n`;
  //creates a logger.txt file and writes the content(in that file) that log contains everytime theres a new request on client.
  fs.appendFile("logger.txt", log, (err) => console.log(err));
  next();
};
export default loggerMiddleWare;
