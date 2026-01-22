import { asyncHandler } from "../../../../utils/asyncHandler.utils"
import prisma from "../../../../config/prisma"
import { NextFunction, Request, Response } from "express"
import { imageProcess } from "../../Shared/image.process"

export const editProductController = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
     const { id } = req.params
     const product = await prisma.products.findUnique({
          where: { id: Number(id) },
     })
     if (!product) {
          res.status(404).json({ code: 404, status: "Not Found", message: "Product not found" })
          return
     }
     await prisma.products.update({
          where: { id: Number(id) },
          data: {
               title: req.body.name ? req.body.name : product.title,
               description: req.body.description ? req.body.description : product.description,
               price: Number(req.body.price) ? Number(req.body.price) : product.price,
               content: req.body.description ? req.body.description : product.content,
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
     res.status(200).json({ code: 200, status: "OK", message: "Product updated successfully", data: productWithImages })
     return
})   
