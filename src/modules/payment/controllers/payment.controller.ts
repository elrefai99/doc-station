import { Request, Response } from 'express';
import { asyncHandler } from '../../../utils/asyncHandler.utils';
import { PaymentFactory } from '../payment.factory';
import { PaymentService } from '../payment.service';

export const createPaymentController = asyncHandler(async (req: Request, res: Response) => {
  const provider = PaymentFactory.getProvider(req.body.provider);
  const service = new PaymentService(provider);

  const result = await service.createPayment(req.body);

  res.status(200).json({
    success: true,
    data: result,
  });
});
