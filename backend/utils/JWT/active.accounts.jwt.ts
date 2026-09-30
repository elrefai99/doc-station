import jwt from "jsonwebtoken";

export const access_token = (id: string) => {
     const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET as string
     return jwt.sign({ id }, SECRET_KEY, { expiresIn: "1d", });
}

export const refresh_token = (id: string) => {
     const SECRET_KEY = process.env.REFRESH_TOKEN_SECRET as string
     return jwt.sign({ id }, SECRET_KEY, { expiresIn: "7d", });
}

export const payment_token = (payment: any, booking: any, user: any) => {
     const SECRET_KEY = process.env.PAYMENT_SECRET_KEY as string
     return jwt.sign({ payment, booking, user }, SECRET_KEY, { expiresIn: "1d", });
}
