import { Request, Response, RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import { PaymobProvider } from '../providers/paymob/paymob.service';
import { PaymentProviderType } from '../../../Common/enum';
// import { IPaymobCallback } from '../providers/paymob/paymob.callback.types';
// import crypto from 'crypto';

export const PaymobCallbackController: RequestHandler = asyncHandler(async (req: Request, res: Response) => {
  if (!req.body?.obj?.id) {
    res.status(400).json({
      success: false,
      message: 'Invalid callback data: missing transaction ID',
    });
    return;
  }

  const paymobProvider = new PaymobProvider();

  const result = await paymobProvider.verifyPayment({
    transactionId: req.body.obj.id,
    provider: PaymentProviderType.PAYMOB,
    hmacSignature: req.headers['x-paymob-hmac-sha256'] as string,
    callbackData: req.body,
  });

  if (!result.success) {
    res.status(400).json({
      success: false,
      message: result.message || 'Payment verification failed',
    });
    return;
  }

  if (!result.verified) {
    res.status(400).json({
      success: false,
      verified: false,
      message: result.message || 'Payment was not successful',
    });
    return;
  }

  // TODO: Update order status in database here
  // await prisma.order.update({ where: { Trnx_id: result.transactionId }, data: { status: OrderStatus.PAID } });

  res.status(200).json({
    success: true,
    verified: true,
    transactionId: result.transactionId,
    message: 'Payment verified successfully',
  });
});
