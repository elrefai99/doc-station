import { Request, Response } from "express";
import { asyncHandler } from "../../../utils/asyncHandler.utils";

export const logoutController = asyncHandler(
     async (_req: Request, res: Response) => {
          res.clearCookie("__ssdt", { httpOnly: true, secure: true, sameSite: "none", });
          res.clearCookie("__srmt", { httpOnly: true, secure: true, sameSite: "none", });
          res.clearCookie("refresh_token", { httpOnly: true, secure: true, sameSite: "none", });
          res.clearCookie("access_token", { httpOnly: true, secure: true, sameSite: "none", });
          res.clearCookie("__aadv", { httpOnly: true, secure: true, sameSite: "none", });
          res.clearCookie("userToken", { httpOnly: true, secure: true, sameSite: "none", });
          res.clearCookie("bookingCheckout", { httpOnly: true, secure: true, sameSite: "none", });

          res.status(200).json({ code: 200, status: 'OK', message: "Cookie is deleted" });
     }
)
