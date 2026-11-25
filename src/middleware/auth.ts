import { NextFunction, Request, Response } from "express";

//auth middleware
const authMiddleWare = (req: Request, res: Response, next: NextFunction) =>{

    //if the token exists show the data (for all users) if not, show the following response of 'unauthorze access'. this way we are protecting the 'api/v1/users' route for the get method, meaning when the user logs in, if they exist in the database, a token will be generated for them and using that token we are protecting the route. 
const token = req.headers.authorization;
if(!token){
    res.status(401).json({
        success : false,
        message : "unauthorize access"
    })
}
next();
}
export default authMiddleWare;