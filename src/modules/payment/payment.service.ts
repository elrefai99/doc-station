import { PaymentProvider } from './interfaces/PaymentProvider';
import { CreatePaymentDTO, VerifyPaymentDTO } from './DTO/payment.dto';

export class PaymentService {
  constructor(private provider: PaymentProvider) {}

  createPayment(data: CreatePaymentDTO) {
    return this.provider.createPayment(data);
  }

  verifyPayment(data: VerifyPaymentDTO) {
    return this.provider.verifyPayment(data);
  }
}
