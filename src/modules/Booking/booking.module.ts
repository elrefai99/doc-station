import { Router } from "express";
import { createBookingController } from "./controller/create.controller";
import { patientMiddleware } from "../../middleware/authentication/patieny.middleware";
import { getDocReservationsController, getPatientReservationsController } from "./booking.controller";
import { doctorMiddleware } from "../../middleware/authentication/doctor.middleware";

const router: Router = Router();

router.post("/create", patientMiddleware, createBookingController);
router.get("/doctor/reservations", doctorMiddleware, getDocReservationsController);
router.get("/patient/reservations", patientMiddleware, getPatientReservationsController);

export default router;

