import { Pool } from "pg";
import config from "../config";

//take the pool and initDB to the db/index.ts and import them both from here and export them where u will need them.

//database
// (creating the connection between the backend server and the database) ->
export const pool = new Pool({
  connectionString:
    config.connection_string,
});
//initializing the database(creating table) ->
export const initDB = async () => {
  try {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255),
        age INT,
        is_active BOOLEAN DEFAULT(true),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        );
        `);
    console.log("database is connected!");
  } catch (error) {
    console.log(error);
  }
};