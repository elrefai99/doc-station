import crypto from 'crypto';
import { IPaymobCallback } from '../types/paymob.callback.types.js';
import { Request, Response, NextFunction } from 'express';

export const callbaclPaymobMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const callbackData: IPaymobCallback = req.body;
    const { obj } = callbackData;

    console.log('Query Params:', req.query);

    // amount_cents
    // created_at
    // currency
    // error_occured
    // has_parent_transaction
    // obj.id
    // integration_id
    // is_3d_secure
    // is_auth
    // is_capture
    // is_refunded
    // is_standalone_payment
    // is_voided
    // order.id
    // owner
    // pending
    // source_data.pan
    // source_data.sub_type
    // source_data.type
    // success

    // Concatenate the required fields
    const concatenatedData = `${obj.amount_cents}${obj.created_at}${obj.currency}${obj.error_occured}${obj.has_parent_transaction}${obj.id}${obj.integration_id}${obj.is_3d_secure}${obj.is_auth}${obj.is_capture}${obj.is_refunded}${obj.is_standalone_payment}${obj.is_voided}${obj.order.id}${obj.owner}${obj.pending}${obj.source_data.pan}${obj.source_data.sub_type}${obj.source_data.type}${obj.success}`;

    // Calculate HMAC SHA-512 hash with your Paymob HMAC secret

    const hashedHmac = crypto
      .createHmac('SHA512', process.env.PAYMOB_HMAC as string)
      .update(concatenatedData)
      .digest('hex');

    console.log('Calculated SHA-512 Hash:', hashedHmac);

    if (!req.query.hmac || req.query.hmac !== hashedHmac) {
      const data = {
        status: 'failed',
      };
      return res.status(400).json(data);
    }

    return next();
  } catch (err) {
    return res.status(500).json({ code: 500, status: 'Internal Server Error', message: err });
  }
};
