import { Request, Response } from "express";
import prisma from "../../../../config/prisma";
import { asyncHandler } from "../../../../utils/asyncHandler.utils";
import { imagesUpload } from "../../shared/upload.image.shared";

export const editMedicalHistoryController = asyncHandler(
     async (req: Request, res: Response) => {
          const body = req.body

          const check_medicals = await prisma.medical_history.findFirst({
               where: {
                    userId: Number(req.user.id)
               }
          })

          const multiImageFunction: any = await imagesUpload(req.files, String(req.user.id))

          await prisma.medical_history.update({
               where: {
                    id: Number(req.params.id),
                    userId: Number(req.user.id),
               },
               data: {
                    images: req.file ? multiImageFunction?.map((item: any) => item.image).filter((url: string) => url) : check_medicals?.images,
                    start_date: body.start_date ? body.start_date : check_medicals?.start_date,
                    description: body.description ? body.description : check_medicals?.description,
               },
          });
          res.status(200).json({ code: 200, status: "OK", message: "Medical history updated successfully", });
     }
);
