import { pool } from "../../db";
import { IUser } from "./users.interface";

//creating createUserIntoDB to handle the databse stuff for creating a user in the database and connecting it w the users.controllers.ts for the createUser function.
const createUserIntoDB = async (payLoad : IUser ) => {
      const { name, email, password, age } = payLoad;
  //storing it(the data u r gonna send thru postman using the post method) on the database ->
  const result = await pool.query(
    `
    INSERT INTO users (name,email,password,age) VALUES($1,$2,$3,$4) RETURNING *
    `,
    [name, email, password, age],
  );
  return result;
};
export const userServices = {
  createUserIntoDB,
};
