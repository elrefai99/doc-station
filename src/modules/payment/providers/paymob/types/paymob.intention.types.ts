 interface PaymentKey {
  integration: number;
  key: string;
  gateway_type: string;
  iframe_id: string | null;
  order_id: number;
  redirection_url: string;
  save_card: boolean;
}

 interface IntentionDetailItem {
  name: string;
  amount: number;
  description: string;
  quantity: number;
  image: string | null;
}

 interface BillingData {
  apartment: string;
  floor: string;
  first_name: string;
  last_name: string;
  street: string;
  building: string;
  phone_number: string;
  shipping_method: string;
  city: string;
  country: string;
  state: string;
  email: string;
  postal_code: string;
}

 interface IntentionDetail {
  amount: number;
  items: IntentionDetailItem[];
  currency: string;
  billing_data: BillingData;
}

interface PaymentMethod {
  integration_id: number;
  alias: string | null;
  name: string;
  method_type: string;
  currency: string;
  live: boolean;
  use_cvc_with_moto: boolean;
}

 interface CreationExtras {
  ee?: number;
  merchant_order_id: string | null;
  [key: string]: any;
}

 interface Extras {
  creation_extras: CreationExtras;
  confirmation_extras: string | Record<string, any> | null;
}

export interface PaymobIntentionResponse {
  payment_keys: PaymentKey[];
  intention_order_id: number;
  split_payment_methods: any[];
  id: string;
  intention_detail: IntentionDetail;
  client_secret: string;
  payment_methods: PaymentMethod[];
  special_reference: string | null;
  extras: Extras;
  confirmed: boolean;
  status: string;
  created: string;
  card_detail: string | null;
  card_tokens: any[];
  object: string;
}
