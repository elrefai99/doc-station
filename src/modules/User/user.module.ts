import { Router } from "express";
import { editProfileController, profileController } from "./user.controller";
import { userMiddleware } from "../../middleware/authentication/user.middleware";
import { uploadAvatar } from "../../middleware/multer";
import { activeMiddleware } from "../../middleware/authentication/active.middleware";

const router: Router = Router();

router.get("/profile", userMiddleware, profileController);
router.put("/edit", activeMiddleware, uploadAvatar, editProfileController);


export default router;
