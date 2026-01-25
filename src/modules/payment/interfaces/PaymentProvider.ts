export interface PaymentProvider {
  createPayment(data: CreatePaymentDTO): Promise<PaymentResult>;
  verifyPayment(data: VerifyPaymentDTO): Promise<VerifyResult>;
  refundPayment?(data: RefundDTO): Promise<RefundResult>;
}
