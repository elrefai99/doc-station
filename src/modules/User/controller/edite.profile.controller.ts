import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../utils/asyncHandler.utils";
import prisma from "../../../config/prisma";
import fs from 'fs-extra'
import { cacheService } from "../../../Common/shared/Redis/cache.service.fun";
import { userprofile } from "../DTO/index.dto";
import { avatarProcess } from "../shared/upload.image.shared";

export const editProfileController = asyncHandler(
     async (req: Request, res: Response, _next: NextFunction) => {
          const data: userprofile = req.body as userprofile
          let avatar
          if (req.file) {
               if (req.file.filename === "img") {
                    avatar = await avatarProcess(req.file.filename, req.user?.id)
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
                    ...data
               }
          })
          const redis: cacheService = new cacheService()
          await redis.deleteData(`user:${req.user.id}`)
          res.status(200).json({ code: 200, status: "OK", message: "Success update user data" })
          return
     }
)
