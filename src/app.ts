import './config/dotenv.conf'
import express, { Request, Response } from 'express';
import appConfig from './app.config';
import * as http from 'http'
import { Server as SocketIOServer } from 'socket.io'
import { setupSwagger } from './swagger';
import prisma from './config/prisma';
import { logger } from './utils/logger';
import { redisConfig } from './config/redis';

const app = express()
const server = http.createServer(app)
export let ioSocket: SocketIOServer;

ioSocket = new SocketIOServer(server, {
     cors: {
          origin: '*',
     },
})

appConfig(app)
setupSwagger(app);

app.use(async (_req: Request, res: Response) => {
     res.status(404).send('This is not the API route you are looking for')
})

const PORT: number = Number(process.env.PORT) || 9999
async function startServer() {
     try {
          await Promise.all([
               prisma.$connect().then(async () => {
                    console.log(`✅ Success connected to ${process.env.NODE_ENV === 'development' ? 'development' : 'production'} Database`)
                    server.listen(PORT, () => {
                         console.log('🌐 Server is running on:', `http://${process.env.API_LINK as string}:${PORT}`)
                    })
               }).catch((error) => {
                    console.log(error);
               }).catch((err) => {
                    logger.error({
                         message: 'MongoDB connection failed',
                         error: err.message,
                         stack: err.stack,
                    })
                    process.exit(1)
               }),
               redisConfig().catch((err) => {
                    logger.error({
                         message: 'Redis connection failed',
                         error: err.message,
                         stack: err.stack,
                    })
                    process.exit(1)
               }),
          ])
     } catch (error) {
          console.error('❌ Failed to start server:', error)
          process.exit(1)
     }
}

startServer()
