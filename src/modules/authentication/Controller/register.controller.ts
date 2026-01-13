import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../utils/asyncHandler.utils";
import prisma from "../../../config/prisma";
import ServerError from "../../../utils/api.errors.utils";
import bcrypt from "bcrypt";
import { pending_token } from "../../../utils/JWT/pending.account.jwt";
import { registerDto } from "../DTO/index.dto";
import { avatarProfile } from "../shared/avatar.image.fun";
import { UserRole } from "../../../generated/prisma";

export const registerController = asyncHandler(
     async (req: Request, res: Response, next: NextFunction) => {
          const { email, fullname, password, code, phone, role } = req.body as registerDto

          const cUser = await prisma.user.findFirst({
               where: {
                    email: email as string
               }
          })
          if (cUser) {
               next(new ServerError("User already exists", 409));
               return
          }

          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);

          const username = `${fullname.toLowerCase().split(' ').join('_')}_${Math.floor(Math.random() * 1000)}`
          const user = await prisma.user.create({
               data: {
                    email,
                    fullname,
                    username,
                    code,
                    phone,
                    role: role as UserRole,
                    password: hashedPassword,
               }
          })
          const avatar = await avatarProfile(fullname, user.id)

          // Update the user with the avatar
          await prisma.user.update({
               where: { id: user.id },
               data: { avatar }
          })

          const token = pending_token(user?.id.toString())

          res.cookie("pending_token", token, { httpOnly: true, secure: true, sameSite: "strict", maxAge: 24 * 60 * 60 * 1000 })
          res.status(201).json({ code: 201, status: "Created", message: "User created successfully" });
          return
     }
)
