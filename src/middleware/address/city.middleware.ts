import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.utils";
import { cityData } from "../../json/region.json";

export const cityMiddleware = asyncHandler(
     async (req: Request, _res: Response, next: NextFunction) => {
          if (req.body.address) {
               const city = req.body.address.city

               if (city) {
                    req.city = cityData.find(item => item.city_name_en.toLowerCase() === city.toLowerCase() || item.city_name_ar === city)
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
)
