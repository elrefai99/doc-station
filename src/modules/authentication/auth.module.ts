import { Router } from "express";
import { loginController, logoutController, refreshController, registerController } from "./auth.controller";

const router: Router = Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.post("/refresh", refreshController);

export default router;
