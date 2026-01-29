import { PaymentProviderType } from '../../Common/enum';
import { PaymentProvider } from './interfaces/PaymentProvider';
import { PaymobProvider } from './providers/paymob/paymob.service';
//import { PayfortProvider } from './providers/payfort/payfort.provider';


export class PaymentFactory {
  static getProvider(provider: PaymentProviderType): PaymentProvider {
    switch (provider) {
      case PaymentProviderType.PAYMOB:
        return new PaymobProvider();
      case PaymentProviderType.PAYFORT:
        // return new PayfortProvider();
        throw new Error('Payfort provider is not implemented yet');
      default:
        throw new Error('Unsupported payment provider');
    }
  }
}
