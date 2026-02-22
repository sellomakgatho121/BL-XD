import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createCheckoutSession } from '@/lib/payments';

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { invoiceId } = body;

    if (!invoiceId) {
      return NextResponse.json({ error: 'Invoice ID required' }, { status: 400 });
    }

    // Fetch invoice details
    const { data: invoice, error: invoiceError } = await supabase
      .from('invoices')
      .select('*')
      .eq('id', invoiceId)
      .single();

    if (invoiceError || !invoice) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }

    if (invoice.status === 'paid') {
      return NextResponse.json({ error: 'Invoice already paid' }, { status: 400 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const session = await createCheckoutSession({
      invoiceId: invoice.id,
      amount: invoice.amount,
      description: invoice.description || `Invoice #${invoice.id.slice(0, 8)}`,
      customerEmail: user.email || '',
      successUrl: `${siteUrl}/portal/invoices/${invoiceId}?payment=success`,
      cancelUrl: `${siteUrl}/portal/invoices/${invoiceId}?payment=cancelled`,
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch {
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
