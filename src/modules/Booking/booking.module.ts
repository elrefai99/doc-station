import { Router } from "express";
import { createBookingController } from "./controller/create.controller";
import { patientMiddleware } from "../../middleware/authentication/patieny.middleware";

const router: Router = Router();

router.post("/create", patientMiddleware, createBookingController);

export default router;

