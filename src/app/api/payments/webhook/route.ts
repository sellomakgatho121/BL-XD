import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sendWebhookNotification } from '@/lib/webhooks';

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature') || '';

    // Verify webhook signature (placeholder until Stripe/Payfast is configured)
    // const isValid = verifyWebhookSignature(body, signature);
    // if (!isValid) {
    //   return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    // }

    const event = JSON.parse(body);

    if (event.type === 'checkout.session.completed' || event.pf_payment_id) {
      const invoiceId = event.metadata?.invoice_id || event.custom_str1;
      const amount = event.amount_total ? event.amount_total / 100 : parseFloat(event.amount_gross || '0');

      if (invoiceId) {
        const supabase = await createClient();

        await supabase
          .from('invoices')
          .update({
            status: 'paid',
            paid_at: new Date().toISOString(),
          })
          .eq('id', invoiceId);

        // Send webhook notification
        await sendWebhookNotification('payment_received', {
          invoice_id: invoiceId,
          amount: `R${amount.toFixed(2)}`,
          provider: event.pf_payment_id ? 'Payfast' : 'Stripe',
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Payment webhook error:', err);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
