import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../../utils/asyncHandler.utils";
import prisma from "../../../../config/prisma";

export const getMedicalDataController = asyncHandler(
     async (req: Request, res: Response, _next: NextFunction) => {
          const data = await prisma.medical_history.findFirst({
               where: {
                    userId: req.user.id
               }
          })

          res.status(200).json({ code: 200, status: "OK", data })
          return
     }
)
