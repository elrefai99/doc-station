import { IsString, IsNumber, IsOptional, IsEnum, IsObject, IsArray } from 'class-validator';
import { PaymentProviderType } from '../../../Common/enum';



// Item DTO
export class PaymentItemDTO {
  @IsString()
  name: string;

  @IsNumber()
  amount: number;

  @IsString()
  description: string;

  @IsNumber()
  quantity: number;

  @IsString()
  @IsOptional()
  image?: string;
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

  @IsArray()
  @IsOptional()
  items?: PaymentItemDTO[];

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
  special_reference?: string;

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
