import { NextRequest, NextResponse } from 'next/server';
import { createWhatsAppClient, parseIncomingMessage } from '@/lib/whatsapp/client';
import { WhatsAppAgent, createAgent } from '@/lib/whatsapp/agent';
import { supabaseAdmin } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const mode = request.nextUrl.searchParams.get('hub.mode');
  const token = request.nextUrl.searchParams.get('hub.verify_token');
  const challenge = request.nextUrl.searchParams.get('hub.challenge');

  const verifyToken = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN;

  if (mode === 'subscribe' && token === verifyToken) {
    return new NextResponse(challenge, { status: 200 });
  }

  return new NextResponse('Verification failed', { status: 403 });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const message = parseIncomingMessage(body);

    if (!message) {
      return NextResponse.json({ status: 'ok' });
    }

    const { from, text, buttonPayload, type } = message;

    const client = createWhatsAppClient();
    let agent: WhatsAppAgent;

    const { data: existingConv } = await supabaseAdmin()
      .from('whatsapp_conversations')
      .select('id, context')
      .eq('customer_phone', from)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (existingConv?.context) {
      agent = new WhatsAppAgent(from, existingConv.context as any);
    } else {
      await supabaseAdmin().from('whatsapp_conversations').insert({
        customer_phone: from,
        status: 'active',
        context: {},
      });
      agent = new WhatsAppAgent(from);
    }

    let response: string;

    if (buttonPayload) {
      response = await handleBrandedButton(from, buttonPayload, agent);
    } else if (type === 'text' && text) {
      response = await agent.processMessage(text);
    } else {
      return NextResponse.json({ status: 'ok' });
    }

    await client.sendMessage(from, response);

    if (existingConv?.id) {
      await supabaseAdmin()
        .from('whatsapp_conversations')
        .update({
          last_message_at: new Date().toISOString(),
          context: agent.getContext(),
        })
        .eq('id', existingConv.id);
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('WhatsApp webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

async function handleBrandedButton(phone: string, payload: string, agent: WhatsAppAgent): Promise<string> {
  const [action, ...rest] = payload.split(':');
  const value = rest.join(':');

  switch (action) {
    case 'VIEW_PRODUCTS':
      return agent.processMessage('show me products');

    case 'VIEW_CART':
      return agent.processMessage('show my cart');

    case 'CHECKOUT':
      return agent.processMessage('checkout');

    case 'CATEGORIES':
    case 'CATEGORY':
      return agent.processMessage('categories');

    case 'TALK_HUMAN':
    case 'CONTACT':
      return agent.processMessage('talk to a human');

    case 'PRICING':
      return agent.processMessage('pricing');

    case 'HELP':
      return agent.processMessage('help');

    default:
      return agent.processMessage('help');
  }
}
