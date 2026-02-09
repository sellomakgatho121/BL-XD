import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createNotification } from '@/lib/notifications';

// GET /api/invoices/[id] - Get single invoice
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const { id } = await params;
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

    // Fetch invoice
    const { data: invoice, error } = await supabase
      .from('invoices')
      .select(`
        *,
        client:profiles!client_id(id, full_name, email, company_name),
        project:projects(id, name),
        items:invoice_items(*)
      `)
      .eq('id', id)
      .single();

    if (error || !invoice) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }

    // Check permissions
    if (!isAdmin && invoice.client_id !== user.id) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    return NextResponse.json({ invoice });
  } catch (error) {
    console.error('Invoice fetch API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PATCH /api/invoices/[id] - Update invoice (admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const { id } = await params;
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
    const { status, notes, payment_method } = body;

    // Get current invoice for notification
    const { data: currentInvoice } = await supabase
      .from('invoices')
      .select('client_id, invoice_number, total_amount, status')
      .eq('id', id)
      .single();

    if (!currentInvoice) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }

    // Update invoice
    const updateData: any = {};
    if (status) updateData.status = status;
    if (notes) updateData.notes = notes;
    if (payment_method) updateData.payment_method = payment_method;
    if (status === 'paid') updateData.paid_at = new Date().toISOString();

    const { data: invoice, error } = await supabase
      .from('invoices')
      .update(updateData)
      .eq('id', id)
      .select(`
        *,
        client:profiles!client_id(id, full_name, email, company_name),
        project:projects(id, name),
        items:invoice_items(*)
      `)
      .single();

    if (error) {
      console.error('Invoice update error:', error);
      return NextResponse.json({ error: 'Failed to update invoice' }, { status: 500 });
    }

    // Notify client about status change
    if (status && status !== currentInvoice.status) {
      let notificationTitle = 'Invoice Updated';
      let notificationMessage = `Invoice ${currentInvoice.invoice_number} status changed to ${status}`;

      if (status === 'sent') {
        notificationTitle = 'Invoice Sent';
        notificationMessage = `Invoice ${currentInvoice.invoice_number} has been sent to you`;
      } else if (status === 'paid') {
        notificationTitle = 'Payment Received';
        notificationMessage = `Payment for invoice ${currentInvoice.invoice_number} has been received`;
      } else if (status === 'overdue') {
        notificationTitle = 'Invoice Overdue';
        notificationMessage = `Invoice ${currentInvoice.invoice_number} is now overdue`;
      }

      await createNotification(
        currentInvoice.client_id,
        'system',
        notificationTitle,
        notificationMessage,
        { invoice_id: id, status, amount: currentInvoice.total_amount }
      );
    }

    return NextResponse.json({ invoice });
  } catch (error) {
    console.error('Invoice update API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/invoices/[id] - Delete invoice (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const { id } = await params;
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

    // Get invoice for notification
    const { data: invoice } = await supabase
      .from('invoices')
      .select('client_id, invoice_number, status')
      .eq('id', id)
      .single();

    if (!invoice) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }

    // Don't allow deletion of paid invoices
    if (invoice.status === 'paid') {
      return NextResponse.json(
        { error: 'Cannot delete paid invoices' },
        { status: 400 }
      );
    }

    // Delete invoice (cascade will delete items)
    const { error } = await supabase
      .from('invoices')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Invoice deletion error:', error);
      return NextResponse.json({ error: 'Failed to delete invoice' }, { status: 500 });
    }

    // Notify client about deletion
    await createNotification(
      invoice.client_id,
      'system',
      'Invoice Cancelled',
      `Invoice ${invoice.invoice_number} has been cancelled`,
      { invoice_id: id }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Invoice deletion API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
