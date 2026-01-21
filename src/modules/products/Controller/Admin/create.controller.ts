import { asyncHandler } from "../../../../utils/asyncHandler.utils";
import { NextFunction, Request, Response } from "express";
import prisma from "../../../../config/prisma";
import { imageProcess } from "../../../../Common/shared/upload/image.process";

export const createProductController = asyncHandler(
     async (req: Request, res: Response, _next: NextFunction) => {
          const { name, description, price } = req.body

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

          const imageUpload = new imageProcess()
          if (req.files && typeof req.files === 'object' && !Array.isArray(req.files) && req.files['multiImage']) {
               const uploadResults: any = await imageUpload.albumUpload(req.files, String(product.id))

               if (Array.isArray(uploadResults)) {
                    const successfulUploads = uploadResults.filter((result: any) => result.image && !result.error)

                    if (successfulUploads.length > 0) {
                         // Create gallery records individually to get their IDs
                         const createdGalleries = await Promise.all(
                              successfulUploads.map((upload: any) =>
                                   prisma.gallery.create({
                                        data: {
                                             url: upload.image,
                                             productId: product.id
                                        }
                                   })
                              )
                         )

                         // Extract gallery IDs
                         const galleryIds = createdGalleries.map(gallery => gallery.id)
                         console.log('Created gallery IDs:', galleryIds)
                    }
               }
          }

          // Fetch the product with its gallery images
          const productWithImages = await prisma.products.findUnique({
               where: { id: product.id },
               include: { image: true }
          })

          res.status(201).json({ code: 201, status: "Success", data: productWithImages })
     }
)
