import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../utils/asyncHandler.utils";
import { bookingModel } from "../../../Schema/Booking/booking.schema";

export const bookingChatController = asyncHandler(
     async (req: Request, res: Response, _next: NextFunction) => {
          const { id } = req.params

          const data = await bookingModel.findOne({ chatID: id, status: "pending" }, {
               owner: 0,
               buyer: 0,
               ad_id: 0
          })


          res.status(200).json({ code: 200, status: "OK", data })
     }
)
