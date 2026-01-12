import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../utils/asyncHandler.utils";
import prisma from "../../../config/prisma";
import ServerError from "../../../utils/api.errors.utils";
import bcrypt from "bcrypt";

export const registerController = asyncHandler(
     async (req: Request, res: Response, next: NextFunction) => {
          const { email, fullname, password } = req.body

          const user = await prisma.user.findFirst({
               where: {
                    email: email as string
               }
          })
          if (user) {
               next(new ServerError("User already exists", 409));
               return
          }

          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);

          const username = `${fullname.toLowerCase()}_${Math.floor(Math.random() * 1000)}`

          await prisma.user.create({
               data: {
                    email,
                    fullname,
                    username,
                    password: hashedPassword,
               }
          })

          res.status(201).json({ code: 201, status: "Created", message: "User created successfully" });
          return
     }
)
