import prisma from "../../../config/prisma";
import { addJobToQueue } from "../../../Queue/Emails/queue.email";
import ServerError from "../../../utils/api.errors.utils";
import { asyncHandler } from "../../../utils/asyncHandler.utils";
import { NextFunction, Request, Response } from "express";

export const createBookingController = asyncHandler(
     async (req: Request, res: Response, next: NextFunction) => {
          const { doctorId, date, time } = req.body;

          const doctor = await prisma.doctor_profile.findFirst({
               where: {
                    userId: doctorId
               },
               include: {
                    user: true
               }
          })

          if (!doctor) {
               next(new ServerError("Doctor not found", 404))
               return
          }
          const booking = await prisma.booking.create({
               data: {
                    doctorId: doctor.userId as number,
                    patientId: req.user.id as number,
                    date,
                    time,
                    price: doctor.price as number
               }
          })
          await prisma.rooms.create({
               data: {
                    senderID: req.user.id,
                    receiverID: doctor.userId as number,
                    bookingId: booking.id as number,
                    lastMassage: "Hi Doctor"
               }
          })

          const emailBody = {
               subject: "Booking created successfully",
               email: req.user?.email as string,
               html: `
               <h1>Booking created successfully</h1>
               <p>Booking ID: ${booking.id}</p>
               <p>Doctor: ${doctor.user?.fullname}</p>
               <p>Date: ${date}</p>
               <p>Time: ${time}</p>
               <p>Price: ${doctor.price}</p>
               `,
               type: "NewBooking"
          }
          await addJobToQueue("emails", emailBody)

          res.status(201).json({ code: 201, status: "Created", message: "Booking created successfully", })
     }
)
