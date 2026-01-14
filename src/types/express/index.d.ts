import "express";

declare global {
     namespace Express {
          export interface Request {
               user?: any;
               lang?: string;
               clientIP?: any;
               governorate?: any
               city?: any;
          }
     }
}

export { };
