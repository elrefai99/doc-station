import { Router } from "express";
import { doctorsSearchController } from "./controller/doctors.controller";
import { productsSearchController } from "./controller/products.controller";
const router: Router = Router();

router.get("/doctors", doctorsSearchController);
router.get("/products", productsSearchController);

export default router;
