import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../../../utils/asyncHandler.utils";
import ServerError from "../../../utils/api.errors.utils";
import { access_token } from "../../../utils/JWT/active.accounts.jwt";
import prisma from "../../../config/prisma";
import { UserStatus } from "../../../generated/prisma";

export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

export const refreshController = asyncHandler(
     async (req: Request, res: Response, next: NextFunction) => {
          const cookie = req.cookies;
          if (!cookie.refresh_token) {
               next(new ServerError("No refrsh token founded, please sign in agin", 401));
               return
          }
          jwt.verify(cookie.refresh_token, REFRESH_TOKEN_SECRET, async (err: any, decoded: any): Promise<any> => {
               if (err) {
                    next(new ServerError("Refrsh token is not valid, please sign in again", 401));
                    return
               }

               const cUser = await prisma.user.findFirst({
                    where: {
                         id: Number(decoded.id),
                         status: UserStatus.active,
                    }
               })

               if (!cUser) {
                    next(new ServerError("User not founded", 404));
                    return
               }
               const token = access_token(String(cUser.id))
               res.cookie("access_token", token, { httpOnly: true, secure: true, sameSite: "none", maxAge: 1000 * 60 * 60 * 24 * 1 });
               res.status(200).json({ code: 200, status: "OK", message: "Success create new access token" });
          });
     }
)
