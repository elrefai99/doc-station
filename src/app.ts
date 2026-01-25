import './config/dotenv.conf';
import express, { Request, Response } from 'express';
import appConfig from './app.config';
import * as http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { setupSwagger } from './swagger';
// import { paymentService } from './modules/payment/shared/paymob.service';

const app = express();
const server = http.createServer(app);
export let ioSocket: SocketIOServer;

ioSocket = new SocketIOServer(server, {
  cors: {
    origin: '*',
  },
});

appConfig(app);
setupSwagger(app);

app.use(async (_req: Request, res: Response) => {
  res.status(404).send('This is not the API route you are looking for');
});

const PORT = process.env.PORT || 9999;
server.listen(PORT as string, () => {
  console.log(
    '🌐 Server is running on:',
    process.env.NODE_ENV === 'development' ? String(process.env.SITE_API_Local_URL) : String(process.env.SITE_API_URL),
  );
});

// paymentService.generateIntention();
