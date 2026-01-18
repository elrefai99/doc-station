import { Router } from "express";
import { doctorsSearchController } from "./controller/doctors.controller";
const router: Router = Router();

router.get("/doctors", doctorsSearchController);
// router.post("/products",);

export default router;
