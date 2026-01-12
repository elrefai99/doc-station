import { Router } from "express";
import { sendOtpController, verifyOtpController } from "./otp.controller";
import { pendingMiddleware } from "../../middleware/authentication/pending.middleware";

const router: Router = Router();

router.post("/send", pendingMiddleware, sendOtpController);
router.post("/verify", pendingMiddleware, verifyOtpController);

export default router;
