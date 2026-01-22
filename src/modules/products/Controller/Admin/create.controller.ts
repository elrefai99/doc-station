import { asyncHandler } from "../../../../utils/asyncHandler.utils";
import { NextFunction, Request, Response } from "express";
import prisma from "../../../../config/prisma";
import { imageProcess } from "../../Shared/image.process";
import { CreateProductDto } from "../../DTO/index.dto";

export const createProductController = asyncHandler(
     async (req: Request, res: Response, _next: NextFunction) => {
          const { name, description, price } = req.body as CreateProductDto

          const product = await prisma.products.create({
               data: {
                    title: name,
                    description,
                    price: Number(price),
                    adminId: req.user?.id,
                    slug: name.toLowerCase().replace(/\s+/g, "-"),
                    content: description,
               },
          })

          const imageUpload: imageProcess = new imageProcess()
          if (req.files && typeof req.files === 'object' && !Array.isArray(req.files) && req.files['multiImage']) {
               const uploadResults: any = await imageUpload.albumUpload(req.files, String(product.id))

               if (Array.isArray(uploadResults)) {
                    const successfulUploads = uploadResults.filter((result: any) => result.image && !result.error)

                    if (successfulUploads.length > 0) {
                         await Promise.all(
                              successfulUploads.map((upload: any) =>
                                   prisma.gallery.create({
                                        data: {
                                             url: upload.image,
                                             productId: product.id
                                        }
                                   })
                              )
                         )
                    }
               }
          }

          const productWithImages = await prisma.products.findUnique({
               where: { id: product.id },
               include: { image: true }
          })

          res.status(201).json({ code: 201, status: "Success", data: productWithImages })
     }
)
