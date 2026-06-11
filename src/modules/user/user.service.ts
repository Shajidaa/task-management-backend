import { pool } from "../../db";
import type { IUser } from "./user.interface";
import bcrypt from "bcrypt";
export const registerUser = async (payload: IUser) => {
  const { name, email, password, role } = payload;
  // console.log(payload);
  if (!name || !email || !password) {
    throw new Error(
      "Missing required fields: name, email, and password are required.",
    );
  }

  const hash_password = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `
    
    INSERT INTO users  (name, email,password, role)
    VALUES ($1,$2,$3,$4)  RETURNING *
    `,
    [name, email, hash_password, role],
  );
  delete result.rows[0].password;
  return result;
};

export const userService = {
  registerUser,
};
