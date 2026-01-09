import { Request, Response } from "express";
import { asyncHandler } from "../../../utils/asyncHandler.utils";
import prisma from "../../../config/prisma";
import ServerError from "../../../utils/api.errors.utils";

export const registerController = asyncHandler(
     async (req: Request, res: Response) => {
          const { fullname, email, username, password } = req.body;
          const user = await prisma.user.findUnique({
               where: {
                    email
               }
          })
          if (user) {
               throw new ServerError("User already exists", 400);
          }
          const newUser = await prisma.user.create({
               data: {
                    fullname,
                    email,
                    username,
                    password
               }
          })
          res.status(201).json(newUser);
     }
)
