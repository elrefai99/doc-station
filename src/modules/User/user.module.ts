import { Router } from "express";
import { createNewMedicalHistoryController, editProfileController, getMedicalDataController, profileController, deleteMedicalHistoryController, editMedicalHistoryController, workHoursController, deleteProfileController, getPatientOverviewController } from "./user.controller";
import { medical_historyImage, uploadAvatar } from "../../middleware/multer";
import { activeMiddleware } from "../../middleware/authentication/active.middleware";
import { patientMiddleware } from "../../middleware/authentication/patieny.middleware";
import { doctorMiddleware } from "../../middleware/authentication/doctor.middleware";
import { governorateMiddleware } from "../../middleware/address/governorate.middleware";
import { cityMiddleware } from "../../middleware/address/city.middleware";
import { userMiddleware } from "../../middleware/authentication/user.middleware";

const router: Router = Router();

router.get("/profile", userMiddleware, profileController);
router.put("/edit", activeMiddleware, uploadAvatar, editProfileController);
router.delete("/delete", activeMiddleware, deleteProfileController);

// Patient Pages
router.post('/medical/create', patientMiddleware, medical_historyImage, createNewMedicalHistoryController)
router.get('/medical/get', patientMiddleware, getMedicalDataController)
router.put('/medical/edit/:id', patientMiddleware, medical_historyImage, editMedicalHistoryController)
router.delete('/medical/delete/:id', patientMiddleware, deleteMedicalHistoryController)

// doctor pages
router.get('/overview/patient', doctorMiddleware, getPatientOverviewController)
router.post('/work-hours', doctorMiddleware, governorateMiddleware, cityMiddleware, workHoursController)
export default router;
