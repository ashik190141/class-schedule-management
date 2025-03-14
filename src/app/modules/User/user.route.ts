import { Role } from "@prisma/client";
import express from "express";
import { auth } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validateRequest";
import { userController } from "./user.controller";
import { userValidation } from "./user.validation";

const router = express.Router();

router.post("/create-admin", auth(Role.ADMIN),  validateRequest(userValidation.createAdminSchema), userController.createAdmin);

router.post("/create-trainee", validateRequest(userValidation.createTraineeSchema), userController.createTrainee);

router.post("/create-trainer", auth(Role.ADMIN), validateRequest(userValidation.createTrainerSchema), userController.createTrainer);

router.delete("/remove-trainer/:id", auth(Role.ADMIN), userController.removeTrainer);

router.get("/me", auth(Role.ADMIN, Role.TRAINEE, Role.TRAINER), userController.getMyProfile);

router.put("/update-my-profile", auth(Role.ADMIN, Role.TRAINEE, Role.TRAINER), validateRequest(userValidation.updateProfileSchema), userController.updateMyProfile);

export const userRoutes = router;