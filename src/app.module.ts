import { Application } from "express";
import authModule from "./modules/authentication/auth.module";
import otpModule from "./modules/OTP/otp.module";

export default (app: Application) => {
     app.use("/api/v1/auth", authModule);
     app.use("/api/v1/otp", otpModule);
}
