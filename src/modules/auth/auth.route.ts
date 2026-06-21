import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router.post("/", authController.loginUser);
router.post("/refresh_token", authController.generateRefreshToken);
export const authRouter = router;
