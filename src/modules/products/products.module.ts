import { Router } from "express";
import { adminMiddleware } from "../../middleware/authentication/admin.middleware";
import { createProductController } from "./products.controller";
import { uploadMultiImage } from "../../middleware/multer";

const router: Router = Router();

router.post("/create", adminMiddleware, uploadMultiImage, createProductController);

export default router;
