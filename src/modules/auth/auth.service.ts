import { pool } from "../../db";
import bcrypt from "bcrypt";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { AppError } from "../../middlewares/error.middleware";
const loginUserFromDB = async (payload: {
  email: string;
  password: string;
}) => {
  const { email, password } = payload;
  const userData = await pool.query(`SELECT * FROM users  WHERE email=$1`, [
    email,
  ]);

  if (userData.rows.length === 0) {
    throw new AppError(401, "Invalid email or password!");
  }
  //password compare
  const user = userData.rows[0];

  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    throw new AppError(401, "Invalid email or password!");
  }
  const { password: _, ...safeUser } = user;
  //3. generate token
  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  } as JwtPayload;
  if (!config.secret) {
    throw new AppError(
      500,
      "JWT Secret is not defined in environment configuration",
    );
  }
  const accessToken = jwt.sign(jwtPayload, config.secret, {
    expiresIn: config.jwt_access_expires_in || ("1d" as any),
  });
  return accessToken;
};
export const authService = {
  loginUserFromDB,
};
