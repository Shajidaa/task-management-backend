import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

// Create a new user
router.post("/", userController.createUser);

export const userRoute = router;
