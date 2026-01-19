import { Request, Response } from "express";
import { asyncHandler } from "../../../../../utils/asyncHandler.utils";
import prisma from "../../../../../config/prisma";
import { BookingStatus } from "../../../../../generated/prisma";

export const getPatientOverviewController = asyncHandler(
     async (req: Request, res: Response) => {
          const reservationStats = await prisma.booking.groupBy({
               by: ['status'],
               where: {
                    doctorId: req.user.id,
               },
               _count: {
                    status: true,
               },
          });

          const stats = reservationStats.reduce((acc, curr) => {
               acc[curr.status] = curr._count.status;
               return acc;
          }, {} as Record<string, number>);

          const pendingReservations = stats[BookingStatus.PENDING] || 0;
          const completedReservations = stats[BookingStatus.ACCEPTED] || 0;
          const canceledReservations = stats[BookingStatus.REJECTED] || 0;
          const totalReservations = Object.values(stats).reduce((sum, count) => sum + count, 0);

          res.status(200).json({
               code: 200,
               status: "OK",
               data: {
                    pendingReservations,
                    completedReservations,
                    canceledReservations,
                    totalReservations
               }
          });
     }
)
