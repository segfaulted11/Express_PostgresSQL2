import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";

//auth middleware
const authMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  //if the token exists show the data (for all users) if not, show the following response of 'unauthorze access'. this way we are protecting the 'api/v1/users' route for the get method, meaning when the user logs in, if they exist in the database, a token will be generated for them and using that token we are protecting the route.
  const token = req.headers.authorization; //the token u r sending thru postman, read the following comment to understand more.
  //check if a token exists 
  if (!token) {
    res.status(401).json({
      success: false,
      message: "unauthorize access",
    });
  }
  //verifying if the token is valid(otherwise whtever u would pass on the key for Authorization in postman, it will give the response of getting all the users lol)
  const decode = jwt.verify(
    token as string,
    config.jwt_secret_token,
  ) as JwtPayload;
  // console.log(decode) //its going to return an object containing the jwtPayload object (id,name,email) for the user of which token is passed as the value of the Authorization key for GET method in this route -> api/v1/users.

  //checking ....
  const user = await pool.query(
    `
    SELECT * FROM users WHERE email=$1
    `,
    [decode.email],
  );
  // console.log(user.rows[0])

  //checking if user exists
  if (user.rowCount === 0) {
    res.status(404).json({
      success: false,
      message: "user not found!",
    });
  }
  //checking if user is active
  if(!user.rows[0].is_active){
    res.status(403).json({
      success: false,
      message: "Forbidden!",
    });
  }

  next();
};
export default authMiddleWare;
