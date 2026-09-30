import { NextFunction, Request, Response } from "../../types/express";
import { asyncHandler } from "../../utils/asyncHandler.utils";
import { governorateData } from "../../../prisma/seeds/data/governorate.json";

export const governorateMiddleware = asyncHandler(
     async (req: Request, _res: Response, next: NextFunction) => {
          console.log(req.body);

          if (req.body.address) {
               const gov = governorateData.find(g => g.governorate_name_ar === req.body.address.governorate || g.governorate_name_en.toLowerCase() === req.body.address.governorate.toLowerCase());
               if (gov) {
                    req.governorate = gov
                    next()
               }
               else {
                    next()
               }
          }
          else {
               next()
          }
     }
);
