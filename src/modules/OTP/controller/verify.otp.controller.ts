import prisma from "../../../config/prisma";
import { OTPStatus } from "../../../generated/prisma";
import { asyncHandler } from "../../../utils/asyncHandler.utils";
import { NextFunction, Request, Response } from "express";
import { access_token, refresh_token } from "../../../utils/JWT/active.accounts.jwt";

export const verifyOtpController = asyncHandler(
     async (req: Request, res: Response, _next: NextFunction) => {
          const { otp } = req.body;
          const cUser = await prisma.oTP.findFirst({
               where: {
                    userId: Number(req.user.id),
                    status: OTPStatus.PENDING
               }
          });

          if (!cUser) {
               res.status(404).json({ code: 404, status: "Not Found", message: "OTP not found" })
               return
          }

          if (cUser.otp !== Number(otp)) {
               res.status(400).json({ code: 400, status: "Bad Request", message: "Invalid OTP" })
               return
          }

          await prisma.oTP.update({
               where: {
                    id: Number(cUser.id)
               },
               data: {
                    status: OTPStatus.VERIFIED
               }
          })

          const token = access_token(req.user.id)
          const refreshToken = refresh_token(req.user.id)

          res.cookie("refresh_token", refreshToken, { httpOnly: true, secure: true, sameSite: "none", maxAge: 1000 * 60 * 60 * 24 * 7 });
          res.cookie("access_token", token, { httpOnly: true, secure: true, sameSite: "none", maxAge: 1000 * 60 * 60 * 24 * 1 });
          res.clearCookie("pending_token", { httpOnly: true, secure: true, sameSite: "none" })
          res.status(200).json({ code: 200, status: "Success", message: "OTP verified successfully" })
          return
     }
)
