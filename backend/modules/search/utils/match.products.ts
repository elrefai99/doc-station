import { SearchDoctorDto } from "../DTO/index.dto";

export const matchProduct = (payload: SearchDoctorDto) => {
     const where: any = {};

     if (payload.fullname) {
          where.user = {
               fullname: {
                    contains: payload.fullname,
                    mode: 'insensitive' as const
               }
          }
     }
     if (payload.fullname) {
          where.user = {};

          where.user.fullname = {
               contains: payload.fullname,
               mode: 'insensitive'
          };
     }

     // Price range filter
     if (payload.priceFrom || payload.priceTo) {
          where.price = {};

          if (payload.priceFrom) {
               where.price.gte = Number(payload.priceFrom);
          }

          if (payload.priceTo) {
               where.price.lte = Number(payload.priceTo);
          }
     }

     return where
}
