import { pool } from "../../db";
import bcrypt from "bcrypt";
const loginUserFromDB = async (payload: {
  email: string;
  password: string;
}) => {
  const { email, password } = payload;
  const userData = await pool.query(`SELECT * FROM users  WHERE email=$1`, [
    email,
  ]);

  if (userData.rows.length === 0) {
    throw new Error("Invalid Credentials!");
  }
  //password compare
  const user = userData.rows[0];

  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    throw new Error("Invalid Credentials!");
  }
  const { password: _, ...safeUser } = user;

  return safeUser;
};
export const authService = {
  loginUserFromDB,
};
