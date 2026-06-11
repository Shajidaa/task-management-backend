import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

router.post("/", userController.createUser);
router.get("/", userController.getUsers);
router.get("/:id", userController.getSingleUser);
router.put("/:id", userController.updateSingleUser);
router.delete("/:id", userController.deleteSingleUser);

export const userRoute = router;
