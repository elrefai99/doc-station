import { Request, Response } from 'express';
import { asyncHandler } from '../../../utils/asyncHandler.utils';
// import { IPaymobCallback } from '../types/paymob.callback.types';
// import crypto from 'crypto';

export const PaymobCallbackController = asyncHandler(async (req: Request, res: Response) => {
  // implemnt the logic to handle the paymob callback here

  console.log(req.headers);

  res.status(200).json({
    success: true,
    message: 'payment executed successfully',
  });
});
