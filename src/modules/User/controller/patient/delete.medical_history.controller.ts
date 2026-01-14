import { Request, Response } from "express";
import prisma from "../../../../config/prisma";
import { asyncHandler } from "../../../../utils/asyncHandler.utils";

export const deleteMedicalHistoryController = asyncHandler(
     async (req: Request, res: Response) => {
          await prisma.medical_history.delete({
               where: {
                    id: Number(req.params.id),
                    userId: Number(req.user.id),
               },
          });
          res.status(200).json({ code: 200, status: "OK", message: "Medical history deleted successfully", });
     }
);
