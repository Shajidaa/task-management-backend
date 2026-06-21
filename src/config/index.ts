import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

const config = {
  connection_string: process.env.CONNECTION_STRING as string,
  ssl: process.env.SSL === "true",
  port: process.env.PORT as string,
  secret: process.env.SECRET as string,
  jwt_access_expires_in: process.env.EXPIRESIN as string,
  jwt_refresh_secret: process.env.REFRESH_TOKEN_SECRET as string,
  jwt_refresh_expires_in: process.env.REFRESH_TOKEN_EXPIRES_IN as string,
};

export default config;
