import { Application } from "express";
import authModule from "./modules/authentication/auth.module";
import userModule from "./modules/User/user.module";
import otpModule from "./modules/OTP/otp.module";
import searchModule from "./modules/search/search.module";
import bookingModule from "./modules/Booking/booking.module";
import productModule from "./modules/products/products.module";

export default (app: Application) => {
     app.use("/api/v1/auth", authModule);
     app.use("/api/v1/user", userModule);
     app.use("/api/v1/otp", otpModule);
     app.use("/api/v1/search", searchModule);
     app.use("/api/v1/booking", bookingModule);
     app.use("/api/v1/product", productModule);
}
