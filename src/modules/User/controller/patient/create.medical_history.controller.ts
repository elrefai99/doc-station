import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../../utils/asyncHandler.utils";
import prisma from "../../../../config/prisma";
import { imagesUpload } from "../../shared/upload.image.shared";

export const createNewMedicalHistoryController = asyncHandler(
     async (req: Request, res: Response, _next: NextFunction) => {
          const body = req.body

          const check_medicals = await prisma.medical_history.findFirst({
               where: {
                    userId: Number(req.user.id)
               }
          })

          if (check_medicals) {
               res.status(400).json({ code: 400, status: "Bad Request", message: "This Account is already have medical report already" })
               return
          }
          const multiImageFunction: any = await imagesUpload(req.files, String(req.user.id))

          await prisma.medical_history.create({
               data: {
                    images: multiImageFunction?.map((item: any) => item.image).filter((url: string) => url),
                    start_date: body.start_date,
                    description: body.description,
                    userId: Number(req.user.id)
               }
          })

          res.status(200).json({ code: 200, status: "OK", message: "Success add new report" })
          return
     }
)
