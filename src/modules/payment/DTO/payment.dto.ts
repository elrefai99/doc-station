import { IsString, IsNumber, IsOptional, IsEnum, IsBoolean, IsObject } from 'class-validator';

export enum PaymentProviderType {
  PAYMOB = 'paymob',
  PAYFORT = 'payfort',
}

// DTO for creating a payment
export class CreatePaymentDTO {
  @IsNumber()
  orderId: number;

  @IsEnum(PaymentProviderType)
  provider: PaymentProviderType;

  @IsNumber()
  amount: number;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsString()
  @IsOptional()
  merchantReference?: string;

  @IsObject()
  @IsOptional()
  billingData?: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    street: string;
    building?: string;
    floor?: string;
    apartment?: string;
    city: string;
    state: string;
    country: string;
    postalCode?: string;
  };

  @IsObject()
  @IsOptional()
  shippingData?: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    street: string;
    building?: string;
    floor?: string;
    apartment?: string;
    city: string;
    state: string;
    country: string;
    postalCode?: string;
  };

  @IsString()
  @IsOptional()
  successUrl?: string;

  @IsString()
  @IsOptional()
  errorUrl?: string;

  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;
}

// Result returned after creating a payment
export interface PaymentResult {
  success: boolean;
  transactionId: string;
  paymentUrl?: string;
  clientSecret?: string;
  message?: string;
  data?: any;
}

// DTO for verifying a payment
export class VerifyPaymentDTO {
  @IsString()
  transactionId: string;

  @IsEnum(PaymentProviderType)
  provider: PaymentProviderType;

  @IsString()
  @IsOptional()
  hmacSignature?: string;

  @IsObject()
  @IsOptional()
  callbackData?: Record<string, any>;
}

// Result returned after verifying a payment
export interface VerifyResult {
  success: boolean;
  verified: boolean;
  transactionId: string;
  amount?: number;
  currency?: string;
  status?: string;
  message?: string;
  data?: any;
}

// DTO for refunding a payment
export class RefundDTO {
  @IsString()
  transactionId: string;

  @IsEnum(PaymentProviderType)
  provider: PaymentProviderType;

  @IsNumber()
  amount: number;

  @IsString()
  @IsOptional()
  reason?: string;
}

// Result returned after refunding a payment
export interface RefundResult {
  success: boolean;
  refundId: string;
  transactionId: string;
  amount: number;
  message?: string;
  data?: any;
}
