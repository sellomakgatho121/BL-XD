/**
 * Payment integration placeholder for Stripe and Payfast.
 *
 * Production setup:
 * 1. Install: npm install stripe
 * 2. Set env vars: STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY, STRIPE_WEBHOOK_SECRET
 * 3. For Payfast: PAYFAST_MERCHANT_ID, PAYFAST_MERCHANT_KEY, PAYFAST_PASSPHRASE
 */

export interface PaymentSession {
  id: string;
  url: string;
  amount: number;
  currency: string;
  status: 'pending' | 'paid' | 'failed' | 'cancelled';
}

export interface CreatePaymentOptions {
  invoiceId: string;
  amount: number;
  currency?: string;
  description: string;
  customerEmail: string;
  successUrl: string;
  cancelUrl: string;
}

/**
 * Create a payment checkout session.
 * Currently returns a placeholder. Replace with Stripe or Payfast integration.
 */
export async function createCheckoutSession(
  options: CreatePaymentOptions
): Promise<PaymentSession> {
  const provider = process.env.PAYMENT_PROVIDER || 'stripe';

  if (provider === 'stripe') {
    return createStripeSession(options);
  }

  return createPayfastSession(options);
}

async function createStripeSession(options: CreatePaymentOptions): Promise<PaymentSession> {
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeKey) {
    console.warn('[Payments] Stripe not configured. Using placeholder.');
    return {
      id: `placeholder_${Date.now()}`,
      url: options.successUrl,
      amount: options.amount,
      currency: options.currency || 'ZAR',
      status: 'pending',
    };
  }

  // When Stripe is configured:
  // const stripe = new Stripe(stripeKey);
  // const session = await stripe.checkout.sessions.create({
  //   payment_method_types: ['card'],
  //   line_items: [{
  //     price_data: {
  //       currency: options.currency || 'zar',
  //       product_data: { name: options.description },
  //       unit_amount: options.amount * 100,
  //     },
  //     quantity: 1,
  //   }],
  //   mode: 'payment',
  //   success_url: options.successUrl,
  //   cancel_url: options.cancelUrl,
  //   customer_email: options.customerEmail,
  //   metadata: { invoice_id: options.invoiceId },
  // });

  return {
    id: `placeholder_${Date.now()}`,
    url: options.successUrl,
    amount: options.amount,
    currency: options.currency || 'ZAR',
    status: 'pending',
  };
}

async function createPayfastSession(options: CreatePaymentOptions): Promise<PaymentSession> {
  const merchantId = process.env.PAYFAST_MERCHANT_ID;
  const merchantKey = process.env.PAYFAST_MERCHANT_KEY;

  if (!merchantId || !merchantKey) {
    console.warn('[Payments] Payfast not configured. Using placeholder.');
    return {
      id: `placeholder_${Date.now()}`,
      url: options.successUrl,
      amount: options.amount,
      currency: 'ZAR',
      status: 'pending',
    };
  }

  // Payfast payment URL construction
  const payfastUrl = process.env.PAYFAST_SANDBOX === 'true'
    ? 'https://sandbox.payfast.co.za/eng/process'
    : 'https://www.payfast.co.za/eng/process';

  const params = new URLSearchParams({
    merchant_id: merchantId,
    merchant_key: merchantKey,
    return_url: options.successUrl,
    cancel_url: options.cancelUrl,
    notify_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/payments/webhook`,
    email_address: options.customerEmail,
    amount: options.amount.toFixed(2),
    item_name: options.description,
    custom_str1: options.invoiceId,
  });

  return {
    id: `payfast_${Date.now()}`,
    url: `${payfastUrl}?${params.toString()}`,
    amount: options.amount,
    currency: 'ZAR',
    status: 'pending',
  };
}

/**
 * Verify a payment webhook signature.
 */
export function verifyWebhookSignature(
  payload: string,
  signature: string
): boolean {
  const provider = process.env.PAYMENT_PROVIDER || 'stripe';

  if (provider === 'stripe') {
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    // stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET!);
    console.warn('[Payments] Stripe webhook verification not yet configured.');
    return false;
  }

  // Payfast signature verification
  console.warn('[Payments] Payfast webhook verification not yet configured.');
  return false;
}
