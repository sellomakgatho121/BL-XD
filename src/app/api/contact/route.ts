import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data: submission, error } = await supabase
      .from('contact_submissions')
      .insert({
        name: body.name,
        email: body.email,
        business_name: body.business_name || null,
        business_type: body.business_type || null,
        budget_range: body.budget_range || null,
        message: body.message,
        status: 'new',
      })
      .select()
      .single();

    if (error) {
      console.error('Contact submission error:', error);
      return NextResponse.json(
        { error: 'Failed to submit contact form' },
        { status: 500 }
      );
    }

    // TODO: Send notification email to admin
    // This would integrate with your email service (Resend, SendGrid, etc.)

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your message. We will get back to you within 24 hours.',
        id: submission.id 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Admin-only endpoint to get all submissions
export async function GET() {
  try {
    const supabase = await createClient();
    
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    const isAdmin = profile?.role === 'admin' || profile?.role === 'superadmin';

    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }

    const { data: submissions, error } = await supabase
      .from('contact_submissions')
      .select(`
        *,
        assigned_to_profile:profiles!assigned_to(id, full_name, email)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ submissions });
  } catch (error) {
    console.error('Contact GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
