import { asyncHandler } from "../../utils/asyncHandler.utils";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../../config/prisma";
import { UserStatus } from "../../generated/prisma";

export const userMiddleware = asyncHandler(
     async (req: Request, res: Response, next: NextFunction) => {
          const authHeader = req.headers.authorization;
          const tokenFromAuthHeader = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
          const tokenFromHeader = req.headers.token as string;
          const tokenFromQuery = req.query.token as string;
          const cookie = req.cookies;

          // Use the first available token
          const token = tokenFromAuthHeader || tokenFromHeader || tokenFromQuery || cookie.access_token;

          if (token) {
               const TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET as string;
               jwt.verify(token, TOKEN_SECRET_KEY, async (err: any, decoded: any) => {
                    if (err) {
                         res.status(403).json({ code: 403, status: "Forbidden", message: "This token has expired. Please request a new one", });
                         return;
                    }
                    const user = await prisma.user.findFirst({
                         where: {
                              id: Number(decoded.id),
                              status: UserStatus.ACTIVE
                         },
                         select: {
                              id: true,
                         }
                    })
                    if (user) {
                         req.user = user;
                         next();
                    }
                    else {
                         res.status(403).json({ code: 403, status: "Forbidden", message: "The server is refusing to give the requested resource" });
                    }
               });
          } else {
               res.status(401).json({ code: 401, status: "Unauthorized", message: "Authentication failed", });
          }
     }
)
