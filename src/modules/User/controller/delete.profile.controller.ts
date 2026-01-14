import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../utils/asyncHandler.utils";
import prisma from "../../../config/prisma";
import { cacheService } from "../../../Common/shared/Redis/cache.service.fun";


export const deleteProfileController = asyncHandler(
     async (req: Request, res: Response, _next: NextFunction) => {
          const userId = Number(req.user?.id);

          const doctor_profile = await prisma.doctor_profile.findFirst({
               where: {
                    userId: userId
               },
               select: {
                    id: true
               }
          });

          const medical_history = await prisma.medical_history.findFirst({
               where: {
                    userId: userId,
               },
               select: {
                    id: true
               }
          });

          if (doctor_profile?.id) {
               await prisma.doctor_profile.delete({
                    where: {
                         id: doctor_profile.id
                    }
               });
          }

          if (medical_history?.id) {
               await prisma.medical_history.delete({
                    where: {
                         id: medical_history.id
                    }
               });
          }

          await prisma.user.delete({
               where: {
                    id: userId
               }
          });

          const redis: cacheService = new cacheService();
          await redis.deleteData(`user:${userId}`);
          res.status(200).json({ code: 200, status: "OK", message: "Success delete user data" });
          return;
     }
)
