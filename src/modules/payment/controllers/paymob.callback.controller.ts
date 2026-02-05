import { Request, Response, RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import { PaymobProvider } from '../providers/paymob/paymob.service';
import { PaymentProviderType } from '../../../Common/enum';
import { OrderService } from '../../order/order.service';
// import { IPaymobCallback } from '../providers/paymob/paymob.callback.types';
// import crypto from 'crypto';

export const PaymobCallbackController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
  // implemnt the logic to handle the paymob callback here

  console.log(req.query.hmac);

  const paymobProvider = new PaymobProvider();
  const verifiyResult = await paymobProvider.verifyPayment({
    transactionId: req.body.obj.id,
    provider: PaymentProviderType.PAYMOB,
    hmacSignature: req.query.hmac as string,
    callbackData: req.body, // Callback data comes from the request body
  });
  console.log('Verification Result:', verifiyResult);

  if (verifiyResult.success) {
    if (verifiyResult.verified) {
      const orderService = new OrderService();
      orderService
        .updateOrderAfterVerification(verifiyResult)
        .then(() => {
          console.log('Order payment status updated successfully');
        })
        .catch((err) => {
          console.log('Error updating order payment status:', err);
        });
    }
  }

  res.status(200).json({
    success: true,
    message: 'payment verified successfully',
  });
});
