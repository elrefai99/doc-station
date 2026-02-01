import { IsString, IsNumber, IsOptional, IsEnum, IsObject, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PaymentProviderType } from '../../../Common/enum';

// Billing Data DTO
export class BillingDataDTO {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  street?: string;

  @IsString()
  @IsOptional()
  building?: string;

  @IsString()
  @IsOptional()
  floor?: string;

  @IsString()
  @IsOptional()
  apartment?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  postalCode?: string;
}

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

  @ValidateNested()
  @Type(() => BillingDataDTO)
  @IsOptional()
  billingData?: BillingDataDTO;

  @ValidateNested()
  @Type(() => BillingDataDTO)
  @IsOptional()
  shippingData?: BillingDataDTO;

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
