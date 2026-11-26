import { Pool } from "pg";
import config from "../config";

//take the pool and initDB to the db/index.ts and import them both from here and export them where u will need them.

//database
// (creating the connection between the backend server and the database) ->
export const pool = new Pool({
  connectionString: config.connection_string,
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
        role VARCHAR(20) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        );
        `);
    //creating another table (profiles) and building the connection between it and the users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS profiles(
        id SERIAL PRIMARY KEY,
        user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
        bio TEXT,
        address TEXT,
        phone VARCHAR(11),
        gender VARCHAR(1),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log("database is connected!");
  } catch (error) {
    console.log(error);
  }
};
