import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../../utils/asyncHandler.utils";
import prisma from "../../../../config/prisma";

export const dmChatController = asyncHandler(
     async (req: Request, res: Response, _next: NextFunction) => {
          const { limit = 9, page = 1 } = req.query
          const data = await prisma.dmChat.findMany({
               where: {
                    chatID: req.params.id as unknown as number
               },
               select: {
                    sender: {
                         select: {
                              id: true,
                              fullname: true,
                              avatar: true
                         }
                    },
                    seen: true,
                    message: true,
                    createdAt: true
               },
               orderBy: {
                    createdAt: 'desc'
               },
               skip: (Number(page) - 1) * Number(limit),
               take: Number(limit),
          })
          const total = await prisma.dmChat.count({
               where: {
                    chatID: req.params.id as unknown as number
               }
          })
          res.status(200).json({ code: 200, status: "OK", data, total, totalPages: Math.ceil(total / Number(limit)) })
          return
     }
)
