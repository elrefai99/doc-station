import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../../utils/asyncHandler.utils";
import prisma from "../../../../config/prisma";
import { BookingStatus } from "../../../../generated/prisma";

export const getPatientReservationsController = asyncHandler(
     async (req: Request, res: Response, _next: NextFunction) => {
          const { limit = 10, page = 1, status } = req.query
          const data = await prisma.booking.findMany({
               where: {
                    patientId: req.user.id,
                    status: status as BookingStatus,
               },
               select: {
                    id: true,
                    createdAt: true,
                    status: true,
                    date: true,
                    time: true,
                    price: true,
                    patient: {
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
          })
          const count = await prisma.booking.count({
               where: {
                    doctorId: req.user.id,
                    status: status as BookingStatus,
               }
          });
          res.status(200).json({ code: 200, status: "Success", data, total: count, totalPages: Math.ceil(count / Number(limit)) })
     }
)
