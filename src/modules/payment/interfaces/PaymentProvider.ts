import { ICreatePayment, IVerifyPayment, IPaymentResult, IVerifyResult } from '../DTO/payment.types';

export interface IPaymentProvider {
  createPayment(data: ICreatePayment): Promise<IPaymentResult>;
  verifyPayment(data: IVerifyPayment): Promise<IVerifyResult>;
  //refundPayment?(data: RefundDTO): Promise<RefundResult>;
}
