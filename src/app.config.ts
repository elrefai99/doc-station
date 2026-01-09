import { Application, NextFunction, Request } from "express";
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import cookieParser from "cookie-parser";

export default (app: Application) => {
     const allowedOrigins: string[] = [
          process.env.SITE_URL_TEST as string,
          process.env.SITE_URL_LIVE as string,
          process.env.SITE_URL_LIVE_VERCEL as string,
          process.env.SITE_URL_LIVE_FLYIO as string,
          process.env.SITE_URL_LIVE_DASHBOARD as string,
          process.env.APS_SANDBOX_LINK as string,
          process.env.APS_LIVE_LINK as string,
     ];
     const corsOptions: object = {
          origin: (origin: any, callback: any) => {
               if (!origin || origin === "null" || allowedOrigins.includes(origin)) {
                    callback(null, true);
               } else {
                    callback(new Error("Not allowed by CORS"));
               }
          },
          credentials: true,
          optionsSuccessState: 200,
     };

     app.use(express.json({
          limit: '75mb'
     }))
     app.use(express.urlencoded({
          extended: true,
          limit: '75mb'
     }))
     app.use(helmet())
     app.use("/v0/public", express.static("cdn"));
     app.use(cors(corsOptions));
     app.use(cookieParser());
     app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'))
     app.use(rateLimit({
          windowMs: 15 * 60 * 1000,
          max: 100
     }))

     app.set("trust proxy", true);

     app.use(async (req: Request, _, next: NextFunction) => {
          // get langouage of headers
          req.lang = (req.headers['accept-language'] === 'ar' || req.headers['accept-language'] === 'en') ? req.headers['accept-language'] : 'en' as string
          req.clientIP = req.headers["cf-connecting-ip"] || req.headers["x-real-ip"] || req.headers["x-forwarded-for"] || req.socket.remoteAddress || "" as string

          if (req.path === "/metrics") {
               return next();
          }
          next();
     });
}
