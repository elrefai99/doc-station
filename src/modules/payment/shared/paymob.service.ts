import axios from 'axios';
import { PaymobIntentionResponse } from '../types/paymob.types';

class PaymentService {
  constructor() {}

  async generateIntention(): Promise<PaymobIntentionResponse> {
    const response = await axios

      .post<PaymobIntentionResponse>(
        process.env.PAYMOB_API_INTENTION as string,
        {
          amount: 10,
          currency: 'EGP',
          payment_methods: ['pbe test card'],
          items: [
            {
              name: 'Item name 1',
              amount: 10,
              description: 'Watch',
              quantity: 1,
            },
          ],
          billing_data: {
            apartment: '6',
            first_name: 'Ammar',
            last_name: 'Sadek',
            street: '938, Al-Jadeed Bldg',
            building: '939',
            phone_number: '+96824480228',
            country: 'OMN',
            email: 'AmmarSadek@gmail.com',
            floor: '1',
            state: 'Alkhuwair',
          },
          customer: {
            first_name: 'Ammar',
            last_name: 'Sadek',
            email: 'AmmarSadek@gmail.com',
            extras: {
              re: '22',
            },
          },
          extras: {
            ee: 22,
          },
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
    return response.data;
  }

  executePayment(amount: number, method: string): boolean {
    // Simulate payment processing logic
    console.log(`Processing payment of $${amount} via ${method}`);
    return true; // Assume payment is always successful for this example
  }
}

export const paymentService = new PaymentService();
