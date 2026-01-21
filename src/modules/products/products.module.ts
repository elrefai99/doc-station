import { Router } from "express";
import { adminMiddleware } from "../../middleware/authentication/admin.middleware";
import { createProductController, deleteProductController, editProductController, singleProductController } from "./products.controller";
import { uploadMultiImage } from "../../middleware/multer";

const router: Router = Router();

router.post("/create", adminMiddleware, uploadMultiImage, createProductController);
router.get("/single/:id", singleProductController);
router.put("/edit/:id", adminMiddleware, uploadMultiImage, editProductController);
router.delete("/delete/:id", adminMiddleware, deleteProductController);

export default router;
