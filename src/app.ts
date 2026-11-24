import express, { Application, Request, Response } from "express";
import {pool } from "./db";
import { userRouter } from "./modules/users/users.routes";
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

//app.ts -> users.routes.ts -> users.controllers.ts -> users.services.ts

//connecting the sub routers w the main router ->
app.use("/api/v1/users",userRouter)

//getting users from the database using get method
app.get("/api/v1/users", async (req: Request, res: Response) => {
  try {
    //getting users from the database ->
    const result = await pool.query(`
SELECT * FROM users
            `);
    // console.log(result)
    res.status(200).json({
      success: true,
      message: "USERS RETRIEVED SUCCESSFULLY!",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: true,
      message: "FAILED TO GET THE USERS!",
      data: error,
    });
  }
});
//getting a particular user from the database using the get method
app.get("/api/v1/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `
      SELECT * FROM users WHERE id =$1
      `,
      [id],
    );
    // console.log(result);
    //if the user(you are wanting to delete) doesnt exist in the first place
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "USER NOT FOUND!",
      });
    }
    res.status(200).json({
      success: true,
      message: "USER RETRIEVED SUCCESSFULLY!",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: true,
      message: "FAILED TO GET THE USER!",
      data: error,
    });
  }
});
//updating a user's data using the put method
app.put("/api/v1/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, password, age, is_active } = req.body;
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
    //if the user(you are wanting to delete) doesnt exist in the first place
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "USER NOT FOUND!",
      });
    }
    res.status(200).json({
      success: true,
      message: "USER UPDATED SUCCESSFULLY!",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "FAILED TO UPDATE THE USER!",
      data: error,
    });
  }
});
//deleting a user from the database using th delete method
app.delete("/api/v1/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `
      DELETE FROM users WHERE id=$1
      `,
      [id],
    );
    // console.log(result);

    //if the user(you are wanting to delete) doesnt exist in the first place
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "USER NOT FOUND!",
      });
    }
    res.status(200).json({
      success: true,
      message: "USER DELETED SUCCESSFULLY!",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "FAILED TO DELETE THE USER!",
      data: error,
    });
  }
});

export default app;
