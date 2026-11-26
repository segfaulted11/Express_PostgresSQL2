import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";
import { Role } from "../types";

//auth middleware
//making authMiddleWare a higher order function to send the '...roles' as parameters of whose argumets are coming from authMiddleWare() [users.routes.ts -> router.get("/",authMiddleWare("admin","mod"),userControllers.getUsers) ]
const authMiddleWare = (...roles: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(roles); //returns an array -> [ 'admin', 'mod' ]

      //if the token exists show the data (for all users) if not, show the following response of 'unauthorze access'. this way we are protecting the 'api/v1/users' route for the get method, meaning when the user logs in, if they exist in the database, a token will be generated for them and using that token we are protecting the route.
      const token = req.headers.authorization; //the token u r sending thru postman, read the following comment to understand more.
      //check if a token exists
      if (!token) {
       return res.status(401).json({
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
        return res.status(404).json({
          success: false,
          message: "user not found!",
        });
      }
      //checking if user is active
      if (!user.rows[0].is_active) {
        return res.status(403).json({
          success: false,
          message: "Forbidden!",
        });
      }
      // console.log(req.body); //it returns undefined bcz for GET method, its not possible to send body or we dont send it.

      //if 'roles' array has elements(designated roles) but if the role of a particular user doesnt match w any of the element(role) of roles then acccess denied! ->
      if (roles.length && !roles.includes(user.rows[0].role)) {
        return res.status(401).json({
          success: false,
          message: "unauthorized access (you dont have the access)!",
        });
      } //for example if a user's role is only user then their request to get the data of all users will be denied bcz we used this as the parameter of authMiddleWare("admin","mod"), meaning only if a user is admin or mod then they will have acccess.

      req.user = decode;
      // console.log(req);//now theres object called 'user' and it contains the properties of jwtPayLoad(the obj u created in auth.services.ts)
      //now u can access 'req.user' from getUsers controller (from users/users.controllers.ts/getUsers)
      next();
    } catch (error) {
      next(error);
    }
  };
};
export default authMiddleWare;
