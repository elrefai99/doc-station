import { Router } from "express";
import { profileController } from "./user.controller";
import { userMiddleware } from "../../middleware/authentication/user.middleware";

const router: Router = Router();

router.get("/profile", userMiddleware, profileController);


export default router;
