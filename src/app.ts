import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cookieParser from "cookie-parser";
import { userRoute } from "./modules/user/user.route";
import { authRouter } from "./modules/auth/auth.route";

const app: Application = express();

app.use(express.json());
app.use(express.text());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ status: "Task management API is running smoothly" });
});

app.use("/api/users", userRoute);

app.use("/api/auth", authRouter);

export default app;
