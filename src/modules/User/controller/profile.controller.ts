import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../utils/asyncHandler.utils";
import { cacheService } from "../../../Common/shared/Redis/cache.service.fun";

export const profileController = asyncHandler(
     async (req: Request, res: Response, _next: NextFunction) => {

          const redis = new cacheService()
          await redis.setData(`user:${req.user.id}`, req.user)
          res.status(200).json({ code: 200, status: "OK", data: req.user })
     }
)
