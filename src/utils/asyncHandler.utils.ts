import { Request, Response, NextFunction } from "express";
import { ExtendedError, Socket } from "socket.io";

export const asyncHandler =
     (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
          async (req: Request, res: Response, next: NextFunction) =>
               await fn(req, res, next)

export const asyncSocketHandler = (
     fn: (
          socket: Socket,
          next: (err?: ExtendedError) => void
     ) => Promise<void> | void
) => {
     return (socket: Socket, next: (err?: ExtendedError) => void): void => {
          Promise.resolve(fn(socket, next)).catch(next);
     };
};
