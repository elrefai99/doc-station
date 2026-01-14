import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../utils/asyncHandler.utils";
import prisma from "../../../config/prisma";
import { cacheService } from "../../../Common/shared/Redis/cache.service.fun";


export const deleteProfileController = asyncHandler(
     async (req: Request, res: Response, _next: NextFunction) => {
          await prisma.user.delete({
               where: {
                    id: Number(req.user?.id)
               }
          })
          await prisma.doctor_profile.delete({
               where: {
                    id: Number(req.params.id),
                    userId: Number(req.user?.id)
               }
          })
          await prisma.medical_history.delete({
               where: {
                    id: Number(req.params.id),
                    userId: Number(req.user.id),
               },
          });

          const redis: cacheService = new cacheService()
          await redis.deleteData(`user:${req.user.id}`)
          res.status(200).json({ code: 200, status: "OK", message: "Success delete user data" })
          return
     }
)
