import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../../utils/asyncHandler.utils";
import prisma from "../../../../config/prisma";

export const roomsController = asyncHandler(
     async (req: Request, res: Response, _next: NextFunction) => {
          const { limit = 9, page = 1 } = req.query

          const data = await prisma.rooms.findMany({
               where: {
                    senderID: req.user?.id,
               },
               orderBy: {
                    createdAt: 'desc'
               },
               skip: (Number(page) - 1) * Number(limit),
               take: Number(limit),
          })

          res.status(200).json({ code: 200, status: "OK", data });
     }
);
