import { Router } from "express";
import { profilesControllers } from "./profiles.controllers";

const router = Router();

router.post("/",profilesControllers.createProfile);

export const profilesRouter = router;