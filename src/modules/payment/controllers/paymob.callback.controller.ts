import { Request, Response } from 'express';
import { asyncHandler } from '../../../utils/asyncHandler.utils';
import {  PaymobProvider } from '../providers/paymob/paymob.service';
// import { IPaymobCallback } from '../providers/paymob/paymob.callback.types';
// import crypto from 'crypto';

export const PaymobCallbackController = asyncHandler(async (req: Request, res: Response) => {
  // implemnt the logic to handle the paymob callback here


  console.log(req.headers);

  const paymobProvider = new PaymobProvider();
  paymobProvider.verifyPayment( );






  res.status(200).json({
    success: true,
    message: 'payment verified successfully',
  });
});
