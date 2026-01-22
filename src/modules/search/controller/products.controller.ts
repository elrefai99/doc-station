import prisma from "../../../config/prisma";
import { asyncHandler } from "../../../utils/asyncHandler.utils";
import { NextFunction, Request, Response } from "express";
import { matchProduct } from "../utils/match.products";
import { SearchDoctorDto } from "../DTO/index.dto";
import { cacheService } from "../../../Common/shared/Redis/cache.service.fun";

export const productsSearchController = asyncHandler(
     async (req: Request, res: Response, _next: NextFunction) => {
          const { limit = 10, page = 1, ...search } = req.query as SearchDoctorDto
          const redis: cacheService = new cacheService()
          const cacheKey = `${process.env.products_search}_${JSON.stringify(search)}`

          const cachedProducts = await redis.getData(cacheKey)
          if (cachedProducts) {
               res.status(200).json({ ...cachedProducts })
               return
          }

          const products = await prisma.products.findMany({
               where: {
                    ...matchProduct(search),
               },

               select: {
                    id: true,
                    createdAt: true,
                    title: true,
                    slug: true,
                    description: true,
                    content: true,
                    price: true,
                    image: {
                         select: {
                              url: true
                         }
                    },
               },
               orderBy: {
                    createdAt: 'desc'
               },
               skip: (Number(page) - 1) * Number(limit),
               take: Number(limit),
          });

          const count = await prisma.products.count({
               where: {
                    ...matchProduct(search),
               }
          });
          const productsWithData = products.map((product: any) => {
               return {
                    ...product,
                    image: product.image?.map((img: any) => img.url) || [],
               }
          })
          const data = { code: 200, status: "Success", products: productsWithData, count }
          await redis.setExData(cacheKey, data, 60 * 60 * 1000)
          res.status(200).json({ code: 200, status: "Success", products: productsWithData, count })
     }
)
