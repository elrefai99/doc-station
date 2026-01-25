import { Router } from 'express';
import { PaymobCallbackController } from './Controller/paymob.callback.controller';
import { callbaclPaymobMiddleware } from './middleware/paymob.callback.middleware';
//import { PaymentController } from './payment.controller';

const router: Router = Router();

//router.post('', PaymentController);

router.post('/call-back/paymob', callbaclPaymobMiddleware, PaymobCallbackController);

export default router;
