import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../../../utils/asyncHandler.utils";
import prisma from "../../../../../config/prisma";
import ServerError from "../../../../../utils/api.errors.utils";

export const workHoursController = asyncHandler(
     async (req: Request, res: Response, next: NextFunction) => {
          const doctor_profile = await prisma.doctor_profile.findFirst({
               where: {
                    userId: Number(req.user.id)
               }
          })

          if (!doctor_profile) {
               next(new ServerError("Doctor profile not found", 404))
               return
          }
          const data = req.body

          await prisma.doctor_profile.update({
               where: {
                    id: doctor_profile.id,
                    userId: Number(req.user.id)
               },
               data: {
                    address: data.address ? data.address : doctor_profile.address,
                    governorateId: req.governorate ? req.governorate.id : doctor_profile.governorateId,
                    cityId: req.city ? req.city.id : doctor_profile.cityId,
                    ...data
               }
          })
          res.status(200).json({ code: 200, status: "Success", message: "Doctor profile found", data: doctor_profile })
          return
     }
)
