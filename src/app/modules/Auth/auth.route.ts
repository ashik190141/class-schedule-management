import express from "express";
import { authController } from "./auth.controller";
import { validateRequest } from '../../middlewares/validateRequest';
import { loginUserSchema } from "./auth.validation";

const router = express.Router();

router.post("/login", validateRequest(loginUserSchema),  authController.loginUser);

export const authRoutes = router;
