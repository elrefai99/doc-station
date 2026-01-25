import axios from 'axios';
import { PaymobIntentionResponse } from './paymob.types';
import { PaymentProvider } from '../../interfaces/PaymentProvider';

class PaymobProvider implements PaymentProvider {
  constructor() {}

  async createPayment(): Promise<PaymobIntentionResponse | null> {
    try {
      const response = await axios

        .post<PaymobIntentionResponse>(
          process.env.PAYMOB_API_INTENTION as string,
          {
            amount: 10000,
            currency: 'EGP',
            payment_methods: ['pbe test card'],
            items: [
              {
                name: 'Item name 1',
                amount: 10000,
                description: 'Watch',
                quantity: 1,
                image: 'https://thenounproject.com/browse/icons/term/hospital-appointments/',
              },
            ],
            billing_data: {
              apartment: '6',
              first_name: 'test',
              last_name: 'testing',
              street: '938, Al-Jadeed Bldg',
              building: '939',
              phone_number: '+96824480228',
              country: 'OMN',
              email: 'AmmarSadek@gmail.com',
              floor: '1',
              state: 'Alkhuwair',
            },

            // customer: {
            //   first_name: 'test',
            //   last_name: 'testing',
            //   email: 'AmmarSadek@gmail.com',
            //   extras: {
            //     re: '22',
            //   },
            // },
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

export { PaymobProvider };
