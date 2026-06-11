import { pool } from "../../db";
import type { IUser } from "./user.interface";
import bcrypt from "bcrypt";

export const registerUser = async (payload: IUser) => {
  const { name, email, password, role } = payload;

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

const getAllUser = async () => {
  const result = await pool.query(
    `
    SELECT id,name,email,role,created_at FROM users 
    `,
  );

  return result;
};

const singleUserFromDB = async (id: string) => {
  const result = await pool.query(
    `
    SELECT * FROM users WHERE id=$1
    `,
    [id],
  );
  delete result.rows[0].password;
  return result;
};
const updateSingleUserFromDB = async (payload: IUser, id: string) => {
  const { name, password, role } = payload;

  const result = await pool.query(
    `
    UPDATE users 
    SET 
    name=COALESCE ($1,name),
    password=COALESCE ($2,password),
    role=COALESCE ($3,role) 
    WHERE id=$4 RETURNING *
    `,
    [name, password, role, id],
  );
  delete result.rows[0].password;
  return result;
};
const deletedSingleUserFromDB = async (id: string) => {
  const result = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING *",
    [id],
  );
  return result;
};
export const userService = {
  registerUser,
  getAllUser,
  singleUserFromDB,
  updateSingleUserFromDB,
  deletedSingleUserFromDB,
};
