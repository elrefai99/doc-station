import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../utils/asyncHandler.utils";
import prisma from "../../../config/prisma";
import { imageProcess } from "../../../Common/shared/upload/image.process";
import fs from 'fs-extra'
import { cacheService } from "../../../Common/shared/Redis/cache.service.fun";

export const editProfileController = asyncHandler(
     async (req: Request, res: Response, _next: NextFunction) => {
          let avatar
          const imageProcessing: imageProcess = new imageProcess()
          if (req.file) {
               if (req.file.filename === "img") {
                    avatar = await imageProcessing.avatarFunction(req.file.filename, req.user?.id)
                    fs.remove(req.file.path, (err: any) => {
                         if (err) throw err
                    })
               }

          }
          await prisma.user.update({
               where: {
                    id: req.user.id
               },
               data: {
                    avatar: avatar,
                    updatedAt: new Date(),
                    ...req.body
               }
          })
          const redis: cacheService = new cacheService()
          await redis.deleteData(`user:${req.user.id}`)
          res.status(200).json({ code: 200, status: "OK", message: "Success update user data" })
          return
     }
)
