import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createNotification } from '@/lib/notifications';

// GET /api/invoices - List invoices (admin: all, client: own)
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    const isAdmin = profile?.role === 'admin' || profile?.role === 'superadmin';

    // Build query based on role
    let query = supabase
      .from('invoices')
      .select(`
        *,
        client:profiles!client_id(id, full_name, email, company_name),
        project:projects(id, name),
        items:invoice_items(*)
      `)
      .order('issue_date', { ascending: false });

    if (!isAdmin) {
      query = query.eq('client_id', user.id);
    }

    const { data: invoices, error } = await query;

    if (error) {
      console.error('Invoices fetch error:', error);
      return NextResponse.json({ error: 'Failed to fetch invoices' }, { status: 500 });
    }

    return NextResponse.json({ invoices });
  } catch (error) {
    console.error('Invoices API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/invoices - Create new invoice (admin only)
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check admin role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    const isAdmin = profile?.role === 'admin' || profile?.role === 'superadmin';

    if (!isAdmin) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const body = await request.json();
    const {
      project_id,
      client_id,
      issue_date,
      due_date,
      items,
      notes,
      currency = 'ZAR'
    } = body;

    // Validate required fields
    if (!client_id || !due_date || !items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: 'Missing required fields: client_id, due_date, items' },
        { status: 400 }
      );
    }

    // Validate items
    if (items.length === 0) {
      return NextResponse.json(
        { error: 'At least one invoice item is required' },
        { status: 400 }
      );
    }

    for (const item of items) {
      if (!item.description || !item.quantity || !item.unit_price) {
        return NextResponse.json(
          { error: 'All items must have description, quantity, and unit_price' },
          { status: 400 }
        );
      }
    }

    // Create invoice
    const { data: invoice, error: invoiceError } = await supabase
      .from('invoices')
      .insert({
        project_id,
        client_id,
        issue_date: issue_date || new Date().toISOString().split('T')[0],
        due_date,
        notes,
        currency,
        status: 'draft'
      })
      .select()
      .single();

    if (invoiceError) {
      console.error('Invoice creation error:', invoiceError);
      return NextResponse.json({ error: 'Failed to create invoice' }, { status: 500 });
    }

    // Add invoice items
    const { error: itemsError } = await supabase
      .from('invoice_items')
      .insert(
        items.map((item: any) => ({
          invoice_id: invoice.id,
          description: item.description,
          quantity: item.quantity,
          unit_price: item.unit_price
        }))
      );

    if (itemsError) {
      console.error('Invoice items creation error:', itemsError);
      // Clean up invoice if items failed
      await supabase.from('invoices').delete().eq('id', invoice.id);
      return NextResponse.json({ error: 'Failed to add invoice items' }, { status: 500 });
    }

    // Notify client about new invoice
    await createNotification(
      client_id,
      'system',
      'New Invoice',
      `You have a new invoice: ${invoice.invoice_number}`,
      { invoice_id: invoice.id, amount: invoice.total_amount }
    );

    // Fetch complete invoice with relations
    const { data: completeInvoice } = await supabase
      .from('invoices')
      .select(`
        *,
        client:profiles!client_id(id, full_name, email, company_name),
        project:projects(id, name),
        items:invoice_items(*)
      `)
      .eq('id', invoice.id)
      .single();

    return NextResponse.json({ invoice: completeInvoice });
  } catch (error) {
    console.error('Invoice creation API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
