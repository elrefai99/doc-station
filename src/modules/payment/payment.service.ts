import { IPaymentProvider } from './types/PaymentProvider';
import { ICreatePayment, IVerifyPayment } from './types/payment.types';

export class PaymentService {
  constructor(private provider: IPaymentProvider) {}

  createPayment(data: ICreatePayment) {
    return this.provider.createPayment(data);
  }

  verifyPayment(data: IVerifyPayment) {
    return this.provider.verifyPayment(data);
  }
}
