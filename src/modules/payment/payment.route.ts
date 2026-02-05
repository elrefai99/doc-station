import { Router } from 'express';
import { PaymobCallbackController } from './controllers/paymob.callback.controller';
import { callbackPaymobMiddleware } from './providers/paymob/middleware/paymob.callback.middleware';

const router: Router = Router();

//router.post('', PaymentController);

router.post('/call-back/paymob',callbackPaymobMiddleware, PaymobCallbackController);

export default router;
