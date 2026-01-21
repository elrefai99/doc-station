import prisma from "../../../config/prisma";
import { OTPStatus } from "../../../generated/prisma";
import { asyncHandler } from "../../../utils/asyncHandler.utils";
import { NextFunction, Request, Response } from "express";
import { generateOtp } from "../shared/otp.function";
import { addJobToQueue } from "../../../Queue/Emails/queue.email";

export const sendOtpController = asyncHandler(
     async (req: Request, res: Response, _next: NextFunction) => {
          const cUser = await prisma.oTP.findFirst({
               where: {
                    userId: Number(req.user.id),
                    status: OTPStatus.PENDING
               }
          });


          if (cUser) {
               await prisma.oTP.update({
                    where: {
                         id: Number(cUser.id)
                    },
                    data: {
                         status: OTPStatus.EXPIRED
                    }
               })
          }
          const otp = generateOtp()

          await prisma.oTP.create({
               data: {
                    userId: Number(req.user.id),
                    otp,
                    expire: String(new Date(Date.now() + 60 * 60 * 1000)),
                    status: OTPStatus.PENDING
               }
          })

          const email_body = {
               email: req.user.email,
               temp: `Your OTP is ${otp}`,
               subject: "Doctor Station OTP",
               type: "otp"
          }
          await addJobToQueue("emails", email_body)

          res.status(200).json({ code: 200, status: "Success", message: "OTP sent successfully" })
     }
)
