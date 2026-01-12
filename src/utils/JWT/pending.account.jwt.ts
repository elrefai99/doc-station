import jwt from "jsonwebtoken";

export const pending_token = (id: string) => {
     const SECRET_KEY = process.env.PENDING_TOKEN_SECRET as string
     return jwt.sign({ id }, SECRET_KEY, { expiresIn: "1d", });
}

export const otp_token = (number: number) => {
     const SECRET_KEY = process.env.OTP_EXPIRE_SECRET_KY as string
     return jwt.sign({ otp: number }, SECRET_KEY, { expiresIn: "5m", });
}
