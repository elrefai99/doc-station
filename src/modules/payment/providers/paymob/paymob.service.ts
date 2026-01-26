import axios from 'axios';
import { PaymobIntentionResponse } from './types/paymob.intention.types';
import { PaymentProvider } from '../../interfaces/PaymentProvider';
import { CreatePaymentDTO } from '../../DTO/payment.dto';

export class PaymobProvider implements PaymentProvider {
  constructor() {}

  async createPayment(createPaymentDTO: CreatePaymentDTO): Promise<PaymobIntentionResponse | null> {
    try {
      const response = await axios

        .post<PaymobIntentionResponse>(
          process.env.PAYMOB_API_INTENTION as string,
          {
            amount: createPaymentDTO.amount * 100, // Paymob expects amount in the smallest currency unit
            currency: createPaymentDTO.currency || 'EGP',
            payment_methods: ['pbe test card'],
            items: createPaymentDTO.items?.map(item => ({
              name: item.name,
              amount: item.amount * 100, // Convert to cents
              description: item.description,
              quantity: item.quantity,
              ...(item.image && { image: item.image })
            })) || [
              {
                name: 'Default Item',
                amount: createPaymentDTO.amount * 100,
                description: 'Payment item',
                quantity: 1,
              },
            ],
            billing_data: createPaymentDTO.billingData ? {
              first_name: createPaymentDTO.billingData.firstName,
              last_name: createPaymentDTO.billingData.lastName,
              email: createPaymentDTO.billingData.email,
              phone_number: createPaymentDTO.billingData.phoneNumber,
              street: createPaymentDTO.billingData.street,
              building: createPaymentDTO.billingData.building,
              floor: createPaymentDTO.billingData.floor,
              apartment: createPaymentDTO.billingData.apartment,
              city: createPaymentDTO.billingData.city,
              state: createPaymentDTO.billingData.state,
              country: createPaymentDTO.billingData.country,
              postal_code: createPaymentDTO.billingData.postalCode,
            } : undefined,

            customer: createPaymentDTO.shippingData ? {
              first_name: createPaymentDTO.shippingData.firstName,
              last_name: createPaymentDTO.shippingData.lastName,
              email: createPaymentDTO.shippingData.email,
              phone_number: createPaymentDTO.shippingData.phoneNumber,
              street: createPaymentDTO.shippingData.street,
              building: createPaymentDTO.shippingData.building,
              floor: createPaymentDTO.shippingData.floor,
              apartment: createPaymentDTO.shippingData.apartment,
              city: createPaymentDTO.shippingData.city,
              state: createPaymentDTO.shippingData.state,
              country: createPaymentDTO.shippingData.country,
              postal_code: createPaymentDTO.shippingData.postalCode,
            } : undefined,
            extras: {
              ee: 22,
            },

            //you creat it, and paymob will return it back to you in the webhook , must be unique

            //special_reference: 'phe4sjw11q-1xxxxxxxxx',
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

      console.log(this.generatePaymentURL(response!.data.client_secret));

      return response.data;
    } catch (error) {
      console.error('Error generating payment intention:', error);
    }
    return null;
  }

  async verifyPayment(): Promise<any> {
    // TODO: Implement payment verification logic
    throw new Error('Method not implemented.');
  }

  private generatePaymentURL(clientSecret: string): String {
    return `${process.env.PAYMOB_PAYMENT_URL}?publicKey=${process.env.PAYMOB_PUBLIC_KEY_TEST}&clientSecret=${clientSecret}`;
  }
}
