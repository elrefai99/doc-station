import { Request, Response } from "express";
import { asyncHandler } from "../../../utils/asyncHandler.utils";
import prisma from "../../../config/prisma";
import ServerError from "../../../utils/api.errors.utils";

export const registerController = asyncHandler(
     async (req: Request, res: Response) => {
          const { email, } = req.body;
          const user = await prisma.user.findFirst({
               where: {
                    email: email as string
               }
          })
          if (user) {
               throw new ServerError("User already exists", 400);
          }

          res.status(201).json(user);
     }
)
