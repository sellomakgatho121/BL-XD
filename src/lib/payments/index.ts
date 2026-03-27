export interface PaymentLink {
  id: string;
  url: string;
  qrCode?: string;
  amount: number;
  currency: string;
  status: 'pending' | 'paid' | 'failed' | 'expired';
  expiresAt: string;
  metadata?: Record<string, unknown>;
}

export interface CreatePaymentParams {
  amount: number;
  currency?: string;
  description: string;
  orderId?: string;
  customerEmail?: string;
  customerPhone?: string;
}

export interface PaymentWebhookPayload {
  id: string;
  status: 'completed' | 'failed' | 'expired';
  amount: number;
  currency: string;
  metadata?: Record<string, unknown>;
}

export class ZapperService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.ZAPPER_API_KEY || '';
    this.baseUrl = 'https://api.zapper.co.za/v1';
  }

  async createPaymentLink(params: CreatePaymentParams): Promise<PaymentLink> {
    const response = await fetch(`${this.baseUrl}/payment-requests`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Math.round(params.amount * 100),
        currency: params.currency || 'ZAR',
        description: params.description,
        reference: params.orderId,
        callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/payments/zapper/callback`,
        redirect_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/success?order=${params.orderId}`,
        customer: {
          email: params.customerEmail,
          phone: params.customerPhone,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Zapper error: ${JSON.stringify(error)}`);
    }

    const data = await response.json();

    return {
      id: data.id,
      url: data.url,
      qrCode: data.qr_code,
      amount: params.amount,
      currency: params.currency || 'ZAR',
      status: 'pending',
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      metadata: { orderId: params.orderId },
    };
  }

  async verifyPayment(paymentId: string): Promise<PaymentLink> {
    const response = await fetch(`${this.baseUrl}/payment-requests/${paymentId}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to verify payment');
    }

    const data = await response.json();

    return {
      id: data.id,
      url: data.url,
      amount: data.amount / 100,
      currency: data.currency,
      status: data.status,
      expiresAt: data.expires_at,
    };
  }

  handleWebhook(payload: PaymentWebhookPayload): PaymentWebhookPayload {
    return payload;
  }
}

export class SnapScanService {
  private apiKey: string;
  private merchantId: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.SNAPSCAN_API_KEY || '';
    this.merchantId = process.env.SNAPSCAN_MERCHANT_ID || '';
    this.baseUrl = 'https://posapi.snapscan.com';
  }

  async createPaymentLink(params: CreatePaymentParams): Promise<PaymentLink> {
    const response = await fetch(`${this.baseUrl}/api/v1/invoices`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        merchant_id: this.merchantId,
        amount: Math.round(params.amount * 100),
        currency: params.currency || 'ZAR',
        description: params.description,
        reference: params.orderId,
        callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/payments/snapscan/callback`,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`SnapScan error: ${JSON.stringify(error)}`);
    }

    const data = await response.json();

    return {
      id: data.id,
      url: `https://pay.snapscan.com/qr/${data.qr_code}`,
      qrCode: data.qr_code,
      amount: params.amount,
      currency: params.currency || 'ZAR',
      status: 'pending',
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      metadata: { orderId: params.orderId },
    };
  }

  handleWebhook(payload: { id: string; status: string; amount: number }): PaymentWebhookPayload {
    return {
      id: payload.id,
      status: payload.status === 'completed' ? 'paid' : 'failed',
      amount: payload.amount / 100,
      currency: 'ZAR',
    };
  }
}

export function createPaymentProvider(provider: 'zapper' | 'snapscan') {
  if (provider === 'zapper') {
    return new ZapperService();
  }
  return new SnapScanService();
}
