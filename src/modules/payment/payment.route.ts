import { Router } from 'express';
import { PaymobCallbackController } from './controllers/paymob.callback.controller';
//import { PaymentController } from './payment.controller';

const router: Router = Router();

//router.post('', PaymentController);

router.post('/call-back/paymob', PaymobCallbackController);

export default router;
