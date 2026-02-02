import { PaymentProviderType } from '../../../Common/enum';

// Billing Data
export interface IBillingData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  street?: string;
  building?: string;
  floor?: string;
  apartment?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

// Payment Item
export interface IPaymentItem {
  name: string;
  amount: number;
  description: string;
  quantity: number;
  image?: string;
}

// Create payment data
export interface ICreatePayment {
  orderId: number;
  provider: PaymentProviderType;
  amount: number;
  currency?: string;
  items?: IPaymentItem[];
  merchantReference?: string;
  billingData?: IBillingData;
  shippingData?: IBillingData;
  special_reference?: string;
  successUrl?: string;
  errorUrl?: string;
  metadata?: Record<string, any>;
}

// Result returned after creating a payment
export interface IPaymentResult {
  success: boolean;
  transactionId: string;
  paymentUrl?: string;
  clientSecret?: string;
  message?: string;
  data?: any;
}

// Verify payment data
export interface IVerifyPayment {
  transactionId: string;
  provider: PaymentProviderType;
  hmacSignature?: string;
  callbackData?: Record<string, any>;
}

// Result returned after verifying a payment
export interface IVerifyResult {
  success: boolean;
  verified: boolean;
  transactionId: string;
  amount?: number;
  currency?: string;
  status?: string;
  message?: string;
  data?: any;
}
