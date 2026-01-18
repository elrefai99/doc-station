import prisma from "../../../config/prisma";
import { asyncHandler } from "../../../utils/asyncHandler.utils";
import { NextFunction, Request, Response } from "express";
import { matchDoctor } from "../utils/match.doctor";
import { governorateData } from "../../../json/governorate.json";
import { cityData } from "../../../json/region.json";
import { SearchDoctorDto } from "../DTO/index.dto";

export const doctorsSearchController = asyncHandler(
     async (req: Request, res: Response, _next: NextFunction) => {
          const { limit = 10, page = 1, ...search } = req.query as SearchDoctorDto

          const doctors = await prisma.doctor_profile.findMany({
               where: {
                    ...matchDoctor(search),
               },
               select: {
                    id: true,
                    createdAt: true,
                    governorateId: true,
                    cityId: true,
                    timeStart: true,
                    timeEnd: true,
                    dateFrom: true,
                    dateTo: true,
                    price: true,
                    user: {
                         select: {
                              fullname: true,
                              avatar: true,
                              email: true,
                              phone: true,
                              code: true,
                              role: true,
                              status: true,
                         }
                    }
               },
               orderBy: {
                    createdAt: 'desc'
               },
               skip: (Number(page) - 1) * Number(limit),
               take: Number(limit),
          });

          const count = await prisma.doctor_profile.count({
               where: {
                    ...matchDoctor(search),
               }
          });
          const doctorsWithData = doctors.map((doctor: any) => {
               const governorate = governorateData.find((governorate) => governorate.id === doctor.governorateId)
               const city = cityData.find((city) => city.id === doctor.cityId)
               delete doctor?.governorateId
               delete doctor?.cityId
               return {
                    ...doctor,
                    governorate,
                    city
               }
          })
          res.status(200).json({ code: 200, status: "Success", doctors: doctorsWithData, count })
     }
)
