import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sendEmail, emailTemplates } from '@/lib/email';
import { analyzeLead } from '@/lib/ai/lead-scoring';
import { sendWebhookNotification } from '@/lib/webhooks';

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

    // AI Lead Scoring
    try {
      // Don't block the response significantly, but ensure execution
      const aiPromise = async () => {
        const scoreResult = await analyzeLead({
          name: body.name,
          email: body.email,
          business_name: body.business_name,
          business_type: body.business_type,
          budget_range: body.budget_range,
          message: body.message,
        });

        await supabase.from('lead_scores').insert({
          submission_id: submission.id,
          score: scoreResult.score,
          category: scoreResult.category,
          analysis: scoreResult.analysis,
        });
      };
      
      // In Vercel serverless, this might be killed if not awaited. 
      // We await it for reliability in this MVP phase.
      await aiPromise();
    } catch (aiError) {
      console.error('AI Analysis failed:', aiError);
    }

    // Send email notification
    try {
      await sendEmail({
        to: process.env.ADMIN_EMAIL || 'admin@blacklightwebdesigns.co.za',
        ...emailTemplates.contactSubmission({
          name: body.name,
          email: body.email,
          businessName: body.business_name,
          businessType: body.business_type,
          budget: body.budget_range,
          message: body.message,
        }),
      });
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      // Don't fail the request if email fails
    }

    // Send Slack/Discord webhook notification
    try {
      await sendWebhookNotification('new_lead', {
        name: body.name,
        email: body.email,
        business: body.business_name || 'Not specified',
        budget: body.budget_range || 'Not specified',
        message: body.message.slice(0, 200),
      });
    } catch (webhookError) {
      console.error('Webhook notification failed:', webhookError);
    }

    // Create notification for admins
    try {
      const { data: adminProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('role', 'admin')
        .limit(1)
        .single();

      if (adminProfile) {
        await supabase
          .from('notifications')
          .insert({
            user_id: adminProfile.id,
            type: 'lead',
            title: 'New Lead',
            message: `New contact form submission from ${body.name}`,
            data: { name: body.name, email: body.email, business_name: body.business_name },
            read: false,
          });
      }
    } catch (notificationError) {
      console.error('Failed to create notification:', notificationError);
    }

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
