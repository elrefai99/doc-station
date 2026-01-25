export interface IPaymobCallback {
  type: string;
  obj: IPaymobTransaction;
  accept_fees: number;
  issuer_bank: string | null;
  transaction_processed_callback_responses: string | any[];
}

export interface IPaymobTransaction {
  id: number;
  pending: boolean;
  amount_cents: number;
  success: boolean;
  is_auth: boolean;
  is_capture: boolean;
  is_standalone_payment: boolean;
  is_voided: boolean;
  is_refunded: boolean;
  is_3d_secure: boolean;
  integration_id: number;
  profile_id: number;
  has_parent_transaction: boolean;
  order: IPaymobOrder;
  created_at: string;
  transaction_processed_callback_responses: any[];
  currency: string;
  source_data: IPaymobSourceData;
  api_source: string;
  terminal_id: number | null;
  merchant_commission: number;
  accept_fees: number;
  installment: any | null;
  discount_details: any[];
  is_void: boolean;
  is_refund: boolean;
  data: IPaymobTransactionData;
  is_hidden: boolean;
  payment_key_claims: IPaymobPaymentKeyClaims;
  error_occured: boolean;
  is_live: boolean;
  other_endpoint_reference: any | null;
  refunded_amount_cents: number;
  source_id: number;
  is_captured: boolean;
  captured_amount: number;
  merchant_staff_tag: any | null;
  updated_at: string;
  is_settled: boolean;
  bill_balanced: boolean;
  is_bill: boolean;
  owner: number;
  parent_transaction: any | null;
}

export interface IPaymobOrder {
  id: number;
  created_at: string;
  delivery_needed: boolean;
  merchant: IPaymobMerchant;
  collector: any | null;
  amount_cents: number;
  shipping_data: IPaymobShippingData;
  currency: string;
  is_payment_locked: boolean;
  is_return: boolean;
  is_cancel: boolean;
  is_returned: boolean;
  is_canceled: boolean;
  merchant_order_id: string | null;
  wallet_notification: any | null;
  paid_amount_cents: number;
  notify_user_with_email: boolean;
  items: IPaymobOrderItem[];
  order_url: string;
  commission_fees: number;
  delivery_fees_cents: number;
  delivery_vat_cents: number;
  payment_method: string;
  merchant_staff_tag: any | null;
  api_source: string;
  data: Record<string, any>;
  payment_status: string;
  terminal_version: string | null;
}

export interface IPaymobMerchant {
  id: number;
  created_at: string;
  phones: string[];
  company_emails: string[];
  company_name: string;
  state: string;
  country: string;
  city: string;
  postal_code: string;
  street: string;
}

export interface IPaymobShippingData {
  id: number;
  first_name: string;
  last_name: string;
  street: string;
  building: string;
  floor: string;
  apartment: string;
  city: string;
  state: string;
  country: string;
  email: string;
  phone_number: string;
  postal_code: string;
  extra_description: string;
  shipping_method: string;
  order_id: number;
  order: number;
}

export interface IPaymobOrderItem {
  name: string;
  description: string;
  amount_cents: number;
  quantity: number;
}

export interface IPaymobSourceData {
  pan: string;
  type: string;
  tenure: any | null;
  sub_type: string;
}

export interface IPaymobTransactionData {
  gateway_integration_pk: number;
  klass: string;
  created_at: string;
  amount: number;
  currency: string;
  migs_order: IPaymobMigsOrder;
  merchant: string;
  migs_result: string;
  migs_transaction: IPaymobMigsTransaction;
  txn_response_code: string;
  acq_response_code: string;
  message: string;
  merchant_txn_ref: string;
  order_info: string;
  receipt_no: string;
  transaction_no: string;
  batch_no: number;
  authorize_id: string;
  card_type: string;
  card_num: string;
  secure_hash: string;
  avs_result_code: string;
  avs_acq_response_code: string;
  captured_amount: number;
  authorised_amount: number;
  refunded_amount: number;
  acs_eci: string;
}

export interface IPaymobMigsOrder {
  acceptPartialAmount: boolean;
  amount: number;
  authenticationStatus: string;
  chargeback: IPaymobChargeback;
  creationTime: string;
  currency: string;
  description: string;
  id: string;
  lastUpdatedTime: string;
  merchantAmount: number;
  merchantCategoryCode: string;
  merchantCurrency: string;
  reference: string;
  status: string;
  totalAuthorizedAmount: number;
  totalCapturedAmount: number;
  totalRefundedAmount: number;
}

export interface IPaymobChargeback {
  amount: number;
  currency: string;
}

export interface IPaymobMigsTransaction {
  acquirer: IPaymobAcquirer;
  amount: number;
  authenticationStatus: string;
  authorizationCode: string;
  currency: string;
  id: string;
  receipt: string;
  reference: string;
  source: string;
  stan: string;
  terminal: string;
  type: string;
}

export interface IPaymobAcquirer {
  batch: number;
  date: string;
  id: string;
  merchantId: string;
  settlementDate: string;
  timeZone: string;
  transactionId: string;
}

export interface IPaymobPaymentKeyClaims {
  extra: IPaymobExtra;
  user_id: number;
  currency: string;
  order_id: number;
  created_by: number;
  is_partner: boolean;
  amount_cents: number;
  billing_data: IPaymobBillingData;
  redirect_url: string;
  integration_id: number;
  lock_order_when_paid: boolean;
  next_payment_intention: string;
  single_payment_attempt: boolean;
}

export interface IPaymobExtra {
  ee: number;
  merchant_order_id: string | null;
}

export interface IPaymobBillingData {
  city: string;
  email: string;
  floor: string;
  state: string;
  street: string;
  country: string;
  building: string;
  apartment: string;
  last_name: string;
  first_name: string;
  postal_code: string;
  phone_number: string;
  extra_description: string;
}
