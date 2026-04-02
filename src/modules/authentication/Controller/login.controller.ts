import prisma from "../../../config/prisma";
import { UserStatus } from "../../../generated/prisma";
import { asyncHandler } from "../../../utils/asyncHandler.utils";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { loginDto } from "../DTO/index.dto";
import { addJobToQueue } from "../../../Queue/Emails/queue.email";
import { BasedAuthService } from "../Service/base-auth.service";

export const loginController = asyncHandler(
     async (req: Request, res: Response, _next: NextFunction) => {
          const { email, password } = req.body as loginDto
          const baseAuth = new BasedAuthService()
          const cUser = await prisma.user.findFirst({
               where: {
                    email: email.toLowerCase(),
                    status: UserStatus.ACTIVE
               }
          })

          if (!cUser) {
               res.status(404).json({ code: 404, status: "Not Found", message: "User not found" })
               return
          }

          const cPassword = await bcrypt.compare(password, cUser?.password);

          if (!cPassword) {
               res.status(400).json({ code: 400, status: "Bad Request", message: "Invalid password" })
               return
          }

          const email_body = {
               email: email,
               temp: `Success Login`,
               subject: "Login",
               type: "login"
          }
          await addJobToQueue("emails", email_body)

          const token = await baseAuth.create_token({ _id: cUser.id.toString(), type: "access" })
          const refresh_token = await baseAuth.create_token({ _id: cUser.id.toString(), type: "refresh" })

          res.cookie("access_token", token, { httpOnly: true, secure: true, sameSite: "strict", maxAge: 1000 * 60 * 60 * 2 });
          res.cookie("refresh_token", refresh_token, { httpOnly: true, secure: true, sameSite: "strict", maxAge: 1000 * 60 * 60 * 24 * 30, });
          res.status(200).json({ code: 200, status: "Success", token })
          return
     }
)
