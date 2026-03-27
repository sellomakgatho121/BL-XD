export interface WhatsAppMessage {
  messaging_product: string;
  to: string;
  type: string;
  text?: {
    body: string;
  };
  template?: {
    name: string;
    language: {
      code: string;
    };
    components?: WhatsAppTemplateComponent[];
  };
}

export interface WhatsAppTemplateComponent {
  type: string;
  sub_type?: string;
  index?: string;
  parameters?: {
    type: string;
    text?: string;
    image?: {
      id: string;
    };
  }[];
}

export interface WhatsAppIncomingMessage {
  object: string;
  entry: WhatsAppEntry[];
}

export interface WhatsAppEntry {
  id: string;
  changes: WhatsAppChange[];
}

export interface WhatsAppChange {
  value: WhatsAppMessageValue;
  field: string;
}

export interface WhatsAppMessageValue {
  messaging_product: string;
  metadata: {
    display_phone_number: string;
    phone_number_id: string;
  };
  messages?: WhatsAppReceivedMessage[];
}

export interface WhatsAppReceivedMessage {
  from: string;
  id: string;
  timestamp: string;
  type: string;
  text?: {
    body: string;
  };
  image?: {
    id: string;
    mime_type: string;
    sha256: string;
  };
  button?: {
    payload: string;
    text: string;
  };
}

export interface Conversation {
  id: string;
  business_id: string;
  customer_phone: string;
  customer_name?: string;
  status: 'active' | 'pending' | 'resolved' | 'closed';
  started_at: string;
  last_message_at: string;
  context: Record<string, unknown>;
}

export interface Message {
  id: string;
  conversation_id: string;
  direction: 'inbound' | 'outbound';
  content: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  metadata?: Record<string, unknown>;
}

export interface Business {
  id: string;
  name: string;
  phone_number: string;
  description?: string;
  created_at: string;
}

export interface Product {
  id: string;
  business_id: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  images: string[];
  category?: string;
  in_stock: boolean;
  metadata?: Record<string, unknown>;
}

export interface Order {
  id: string;
  conversation_id: string;
  business_id: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  total: number;
  currency: string;
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  payment_method?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  total: number;
}
