import { Router } from 'express';
import { PaymentController } from './payment.controller';

const router: Router = Router();

router.post('/payment', PaymentController);

export default router;