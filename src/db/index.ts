import { Pool } from "pg";
import config from "../config";
import { AppError } from "../middlewares/error.middleware";
export const pool = new Pool({
  connectionString: config.connection_string,
  ssl: config.ssl,
});

export const initDB = async () => {
  try {
    // -- 1. Users Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'Team Member',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
    `);
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("CRITICAL DB ERROR:", error);
    throw new AppError(500, "Database connection failed");
  }
};
