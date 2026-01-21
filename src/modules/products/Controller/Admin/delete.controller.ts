import { asyncHandler } from "../../../../utils/asyncHandler.utils"
import prisma from "../../../../config/prisma"
import { NextFunction, Request, Response } from "express"

export const deleteProductController = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
     const { id } = req.params
     const product = await prisma.products.delete({
          where: { id: Number(id) },
     })
     if (!product) {
          res.status(404).json({ code: 404, status: "Not Found", message: "Product not found" })
          return
     }
     res.status(200).json({ code: 200, status: "OK", message: "Product deleted successfully" })
     return
})
