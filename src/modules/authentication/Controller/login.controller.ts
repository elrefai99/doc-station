import { asyncHandler } from "../../../utils/asyncHandler.utils";
import { NextFunction, Request, Response } from "express";
import { loginDto } from "../DTO/index.dto";
import { baseAuthService } from "../service/base.auth.service";
import { token_PASETO } from "../utils/paseto.utils";

export const loginController = asyncHandler(
     async (req: Request, res: Response, _next: NextFunction) => {
          const { email, password } = req.body as loginDto

          const baseAuth = new baseAuthService()
          const result = await baseAuth.login({ email, password })
          if (result.error) {
               res.status(404).json({ code: 404, status: "Not Found", message: "User not found" })
               return
          }

          const token = token_PASETO({ data: { user_id: result?.data?.user_id, email, role: "user" }, access_device: req.headers["user-agent"] || "unknown" }, "access")
          const refreshToken = token_PASETO({ data: { user_id: result?.data?.user_id }, access_device: req.headers["user-agent"] || "unknown" }, "refresh")

          res.cookie("refresh_token", refreshToken, { httpOnly: true, secure: true, sameSite: "none", maxAge: 1000 * 60 * 60 * 24 * 7 });
          res.cookie("access_token", token, { httpOnly: true, secure: true, sameSite: "none", maxAge: 1000 * 60 * 60 * 24 * 1 });
          res.status(200).json({ code: 200, status: "Success", token })
          return
     }
)
