import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();
type USER_ROLE = {
  admin: "Admin";
  project_manager: "Project Manager";
  team_member: "Team Member";
};
router.post("/", userController.createUser);
router.get("/", userController.getUsers);
router.get("/:id", userController.getSingleUser);
router.put("/:id", userController.updateSingleUser);
router.delete("/:id", userController.deleteSingleUser);

export const userRoute = router;
