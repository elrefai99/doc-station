import { PaymentProvider } from './interfaces/PaymentProvider';
import { PaymobProvider } from './providers/paymob/paymob.service';
//import { PayfortProvider } from './providers/payfort/payfort.provider';

export type PaymentProviderType = 'paymob' | 'payfort';

export class PaymentFactory {
  static getProvider(provider: PaymentProviderType): PaymentProvider {
    switch (provider) {
      case 'paymob':
        return new PaymobProvider();
      case 'payfort':
        // return new PayfortProvider();
        throw new Error('Payfort provider is not implemented yet');
      default:
        throw new Error('Unsupported payment provider');
    }
  }
}
