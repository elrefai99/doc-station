import jwt from "jsonwebtoken";

export const otpExpire = (number: number) => {
     const SECRET_KEY = process.env.OTP_EXPIRE_SECRET_KY as string
     return jwt.sign({ otp: number }, SECRET_KEY, { expiresIn: "5m", });
}
