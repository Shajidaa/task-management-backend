import { Pool } from "pg";
import config from "../config";
export const pool = new Pool({
  connectionString: config.connection_string,
});

export const initDB = async () => {
  try {
    // -- Enums for Type Safety
    await pool.query(`
      CREATE TYPE user_role AS ENUM ('Admin', 'Project Manager', 'Team Member');
    `);
    // -- 1. Users Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'Team Member',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
    `);
    console.log("Database connected successfully!");
  } catch (error) {
    // console.log(error);
    const err = error as Error;
    throw new Error("Database connection failed", err);
  }
};
