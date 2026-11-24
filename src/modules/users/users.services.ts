import { pool } from "../../db";
import { IUpdateUser, IUser } from "./users.interface";

//creating createUserIntoDB to handle the databse stuff for creating a user in the database and connecting it w the users.controllers.ts for the createUser function.
const createUserIntoDB = async (payLoad: IUser) => {
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

//getting users from the database
const getUsersFromDB = async () => {
  //getting users from the database ->
  const result = await pool.query(`
SELECT * FROM users
`);
  return result;
};
//getting user from the database
const getUserFromDB = async (id : string) => {
  const result = await pool.query(
    `
      SELECT * FROM users WHERE id =$1
      `,
    [id],
  );
  return result;
};
//updating user from the database
const updateUserFromDB = async(payLoad:IUpdateUser,id:string)=>{
const {name,password,age,is_active} = payLoad;
        const result = await pool.query(
      `
      UPDATE users 
      SET
      name = COALESCE($1,name),
      password = COALESCE($2,password),
      age = COALESCE($3,age),
      is_active = COALESCE($4,is_active)
      WHERE id=$5 RETURNING *
      `,
      [name ?? null, password ?? null, age ?? null, is_active ?? null, id],
    );
    return result;
}

//delete user from the database ->
const deleteUserFromDB = async(id:string)=>{
  const result = await pool.query(
    `DELETE FROM users WHERE id=$1 RETURNING *`,
    [id]
  );
return result;
}

export const userServices = {
  createUserIntoDB,
  getUsersFromDB,
  getUserFromDB,
  updateUserFromDB,
  deleteUserFromDB
};
