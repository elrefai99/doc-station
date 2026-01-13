import { Router } from "express";
import { createNewMedicalHistoryController, editProfileController, getMedicalDataController, profileController } from "./user.controller";
import { userMiddleware } from "../../middleware/authentication/user.middleware";
import { medical_historyImage, uploadAvatar } from "../../middleware/multer";
import { activeMiddleware } from "../../middleware/authentication/active.middleware";
import { patientMiddleware } from "../../middleware/authentication/patieny.middleware";

const router: Router = Router();

router.get("/profile", userMiddleware, profileController);
router.put("/edit", activeMiddleware, uploadAvatar, editProfileController);

// Patient Pages
router.post('/medical/create', patientMiddleware, medical_historyImage, createNewMedicalHistoryController)
router.get('/medical/get', patientMiddleware, getMedicalDataController)

export default router;
