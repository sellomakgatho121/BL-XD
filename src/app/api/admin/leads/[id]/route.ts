import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sendWebhookNotification } from '@/lib/webhooks';

type Params = Promise<{ id: string }>;

async function requireAdmin(supabase: Awaited<ReturnType<typeof createClient>>) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!profile || (profile.role !== 'admin' && profile.role !== 'superadmin')) {
    return null;
  }

  return user;
}

export async function GET(request: NextRequest, { params }: { params: Params }) {
  const { id } = await params;
  const supabase = await createClient();
  const user = await requireAdmin(supabase);

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function PUT(request: NextRequest, { params }: { params: Params }) {
  const { id } = await params;
  const supabase = await createClient();
  const user = await requireAdmin(supabase);

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();

    const { data, error } = await supabase
      .from('leads')
      .update({
        status: body.status,
        notes: body.notes,
        assigned_to: body.assigned_to,
        score: body.score,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Send webhook notification on status change
    if (body.status) {
      await sendWebhookNotification('lead_status_change', {
        lead_id: id,
        new_status: body.status,
        lead_name: data?.name,
        lead_email: data?.email,
      });
    }

    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
