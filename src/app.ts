import './config/dotenv.conf';
import express, { Request, Response } from 'express';
import appConfig from './app.config';
import * as http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { setupSwagger } from './swagger';
import { OrderService } from './modules/order/order.service';
// import { PaymentService } from './modules/payment/payment.service';
// // import { paymentService } from './modules/payment/shared/paymob.service';
// import { PaymentFactory } from './modules/payment/payment.factory';
// import { PaymentProviderType } from './Common/enum';

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




const createOrder = new OrderService();
createOrder.placeOrder({
  bookingId: 12,
  patientId: 1,
});

// paymentService.generateIntention();
// const testPayment = new PaymentService(PaymentFactory.getProvider(PaymentProviderType.PAYMOB));
// testPayment.createPayment({
//   orderId: 1001,
//   provider: PaymentProviderType.PAYMOB,
//   amount: 250.5,
//   currency: 'EGP',
//   items: [
//     {
//       name: 'Medical Consultation',
//       amount: 150.0,
//       description: 'General checkup with Dr. Ahmed',
//       quantity: 1,
//       image: 'https://example.com/images/consultation.jpg',
//     },
//     {
//       name: 'Lab Tests',
//       amount: 100.5,
//       description: 'Blood test and X-ray',
//       quantity: 1,
//       image: 'https://example.com/images/lab-tests.jpg',
//     },
//   ],
//   billingData: {
//     firstName: 'Ahmed',
//     lastName: 'Hassan',
//     email: 'ahmed.hassan@example.com',
//     phoneNumber: '+201234567890',
//     street: '123 Tahrir Street',
//     building: '45',
//     floor: '3',
//     apartment: '12',
//     city: 'Cairo',
//     state: 'Cairo Governorate',
//     country: 'EGY',
//     postalCode: '11511',
//   },
//   shippingData: {
//     firstName: 'Ahmed',
//     lastName: 'Hassan',
//     email: 'ahmed.hassan@example.com',
//     phoneNumber: '+201234567890',
//     street: '123 Tahrir Street',
//     building: '45',
//     floor: '3',
//     apartment: '12',
//     city: 'Cairo',
//     state: 'Cairo Governorate',
//     country: 'EGY',
//     postalCode: '11511',
//   },
  // successUrl: 'https://example.com/payment/success',
  // errorUrl: 'https://example.com/payment/error',
  // metadata: {
  //   customerId: 'CUST-12345',
  //   orderNotes: 'Express delivery requested',
  // },
//});
