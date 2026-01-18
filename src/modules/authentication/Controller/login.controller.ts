import prisma from "../../../config/prisma";
import { UserStatus } from "../../../generated/prisma";
import { asyncHandler } from "../../../utils/asyncHandler.utils";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { access_token, refresh_token } from "../../../utils/JWT/active.accounts.jwt";
import { loginDto } from "../DTO/index.dto";

export const loginController = asyncHandler(
     async (req: Request, res: Response, _next: NextFunction) => {
          const { email, password } = req.body as loginDto

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

          const token = access_token(String(cUser.id))
          const refreshToken = refresh_token(String(cUser.id))

          res.cookie("refresh_token", refreshToken, { httpOnly: true, secure: true, sameSite: "none", maxAge: 1000 * 60 * 60 * 24 * 7 });
          res.cookie("access_token", token, { httpOnly: true, secure: true, sameSite: "none", maxAge: 1000 * 60 * 60 * 24 * 1 });
          res.status(200).json({ code: 200, status: "Success", token })
          return
     }
)
