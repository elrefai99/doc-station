import axios from 'axios';
import { PaymobIntentionResponse } from './types/paymob.intention.types';
import { IPaymentProvider } from '../../types/PaymentProvider';
import { ICreatePayment, IPaymentResult, IVerifyResult, IVerifyPayment } from '../../types/payment.types';
import { OrderStatus, PaymentProviderType } from '../../../../Common/enum';
import ServerError from '../../../../utils/api.errors.utils';

export class PaymobProvider implements IPaymentProvider {
  constructor() {}

  async createPayment(createPaymentData: ICreatePayment): Promise<IPaymentResult> {
    try {
      const response = await axios

        .post<PaymobIntentionResponse>(
          process.env.PAYMOB_API_INTENTION as string,
          {
            amount: createPaymentData.amount * 100, // Paymob expects amount in the smallest currency unit
            currency: createPaymentData.currency || 'EGP',
            payment_methods: ['pbe test card'],
            items: createPaymentData.items?.map((item) => ({
              name: item.name,
              amount: item.amount * 100, // Convert to cents
              description: item.description,
              quantity: item.quantity,
              ...(item.image && { image: item.image }),
            })) || [
              {
                name: 'Default Item',
                amount: createPaymentData.amount * 100,
                description: 'Payment item',
                quantity: 1,
              },
            ],
            billing_data: createPaymentData.billingData
              ? {
                  first_name: createPaymentData.billingData.firstName,
                  last_name: createPaymentData.billingData.lastName,
                  email: createPaymentData.billingData.email,
                  phone_number: createPaymentData.billingData.phoneNumber,
                  street: createPaymentData.billingData.street,
                  building: createPaymentData.billingData.building,
                  floor: createPaymentData.billingData.floor,
                  apartment: createPaymentData.billingData.apartment,
                  city: createPaymentData.billingData.city,
                  state: createPaymentData.billingData.state,
                  country: createPaymentData.billingData.country,
                  postal_code: createPaymentData.billingData.postalCode,
                }
              : undefined,

            customer: createPaymentData.shippingData
              ? {
                  first_name: createPaymentData.shippingData.firstName,
                  last_name: createPaymentData.shippingData.lastName,
                  email: createPaymentData.shippingData.email,
                  phone_number: createPaymentData.shippingData.phoneNumber,
                  street: createPaymentData.shippingData.street,
                  building: createPaymentData.shippingData.building,
                  floor: createPaymentData.shippingData.floor,
                  apartment: createPaymentData.shippingData.apartment,
                  city: createPaymentData.shippingData.city,
                  state: createPaymentData.shippingData.state,
                  country: createPaymentData.shippingData.country,
                  postal_code: createPaymentData.shippingData.postalCode,
                }
              : undefined,
            extras: {
              ee: 22,
            },

            //you creat it, and paymob will return it back to you in the webhook , must be unique

            special_reference: createPaymentData.special_reference || undefined,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${process.env.PAYMOB_SECERT_KEY_TEST}`,
            },
          },
        )
        .catch((err) => {
          console.log('Error:', err);
          throw new Error('Failed to generate payment intention');
        });
      console.log('Payment Intention Response:', response);

      const paymentUrl = this.generatePaymentURL(response.data.client_secret);
      console.log(paymentUrl);

      return {
        success: true,
        transactionId: response.data.id,
        paymentUrl,
        clientSecret: response.data.client_secret,
        data: response.data,
        // Order schema fields
        orderId: createPaymentData.orderId,
        status: OrderStatus.PENDING,
        price: createPaymentData.amount,
        currencies: createPaymentData.currency || 'EGP',
        paymentGateway: PaymentProviderType.PAYMOB,
        paymentGatewayStatus: response.data.status,
        methodPayment: response.data.payment_methods?.[0]?.method_type,
        paymentType: response.data.payment_methods?.[0]?.name,
      };
    } catch (error) {
      console.error('Error generating payment intention:', error);
      return {
        success: false,
        transactionId: '',
        message: error instanceof Error ? error.message : 'Failed to create payment',
      };
    }
  }

  async verifyPayment(verifyPaymentData: IVerifyPayment): Promise<IVerifyResult> {

    if (verifyPaymentData.callbackData?.obj.success !== true) {
      throw new ServerError('Payment verification failed: Payment was not successful', 400);
    }

    const callbackObj = verifyPaymentData.callbackData?.obj;

    return {
      success: true,
      verified: true,
      transactionId: verifyPaymentData.transactionId,
      message: 'Verification handled via webhook',
      amountInCents: callbackObj?.amount_cents,
      currency: callbackObj?.currency,
      status: callbackObj?.pending ? OrderStatus.PENDING : OrderStatus.SUCCESS,
      order_id: callbackObj?.order?.merchant_order_id,
      rawData: verifyPaymentData.callbackData, // Keep raw data only for debugging
      card_number:callbackObj.data.card_num || '',
      hmacSignature: verifyPaymentData.hmacSignature || '',
    };
  }




  private generatePaymentURL(clientSecret: string): string {
    return `${process.env.PAYMOB_PAYMENT_URL}?publicKey=${process.env.PAYMOB_PUBLIC_KEY_TEST}&clientSecret=${clientSecret}`;
  }
}
