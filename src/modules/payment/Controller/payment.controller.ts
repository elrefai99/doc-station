import { Request, Response } from 'express';
import { asyncHandler } from '../../../utils/asyncHandler.utils';

export const PaymentController = asyncHandler(async (req: Request, res: Response) => {
    // TODO: Implement payment logic
    
    res.status(200).json({
        success: true,
        message: 'payment executed successfully'
    });
});