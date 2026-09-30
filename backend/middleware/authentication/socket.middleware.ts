import jwt from "jsonwebtoken";
import { Socket } from "socket.io";
import ServerError from "../../utils/api.errors.utils";
import { asyncSocketHandler } from "../../utils/asyncHandler.utils";
import prisma from "../../config/prisma";
import { UserStatus } from "../../generated/prisma";

export const socketMiddleware = asyncSocketHandler(
     async (socket: Socket, next: (err?: Error) => void) => {
          const token =
               socket.handshake.auth?.token ||
               socket.handshake.headers?.token ||
               socket.handshake.query?.token;
          if (!token) {
               console.error("Authentication Error: No token provided in socket handshake");
               console.debug("Socket handshake details:", {
                    auth: socket.handshake.auth,
                    headers: socket.handshake.headers,
                    query: socket.handshake.query,
               });
               return next(new Error("Unauthorized: No token provided"));
          }
          const TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET as string;
          jwt.verify(token as string, TOKEN_SECRET_KEY, async (err: any, decoded: any) => {
               if (err) {
                    return next(new Error("Unauthorized: Invalid or expired token"));
               }
               const user = await prisma.user.findFirst({
                    where: {
                         id: Number(decoded.id),
                         status: UserStatus.ACTIVE
                    },
               })

               if (user) {
                    socket.data.user = user;
                    next();
               }
               else {
                    next(new ServerError("The server is refusing to give the requested resource", 403));
                    return
               }
          });
     }
)
