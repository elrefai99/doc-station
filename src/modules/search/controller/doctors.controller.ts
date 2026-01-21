import prisma from "../../../config/prisma";
import { asyncHandler } from "../../../utils/asyncHandler.utils";
import { NextFunction, Request, Response } from "express";
import { matchDoctor } from "../utils/match.doctor";
import { governorateData } from "../../../json/governorate.json";
import { cityData } from "../../../json/region.json";
import { SearchDoctorDto } from "../DTO/index.dto";
import { cacheService } from "../../../Common/shared/Redis/cache.service.fun";

export const doctorsSearchController = asyncHandler(
     async (req: Request, res: Response, _next: NextFunction) => {
          const { limit = 10, page = 1, ...search } = req.query as SearchDoctorDto

          const redis: cacheService = new cacheService()
          const cacheKey = `${process.env.doctors_search}_${JSON.stringify(search)}`

          const cachedDoctors = await redis.getData(cacheKey)
          if (cachedDoctors) {
               res.status(200).json({ ...cachedDoctors })
               return
          }

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
          const data = { code: 200, status: "Success", doctors: doctorsWithData, count }
          await redis.setExData(cacheKey, data, 60 * 60 * 1000)
          res.status(200).json({ code: 200, status: "Success", doctors: doctorsWithData, count })
     }
)
