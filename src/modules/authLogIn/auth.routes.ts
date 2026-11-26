import { Router } from "express";
import { authControllers } from "./auth.controllers";

const router = Router();
router.post("/login",authControllers.logInUser);
router.post("/refresh-token",authControllers.generateToken)
export const authRouter = router;