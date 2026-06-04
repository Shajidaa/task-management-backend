import { Pool } from "pg";
import config from "../config";
export const pool = new Pool({
  connectionString: config.connection_string,
});

export const initDB = async () => {
  try {
    console.log("Database connected successfully!");
  } catch (error) {
    // console.log(error);
    const err = error as Error;
    throw new Error("Database connection failed");
  }
};
