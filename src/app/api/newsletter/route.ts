import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { sendEmail, emailTemplates } from '@/lib/email';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Check if already subscribed
    const { data: existing } = await supabase
      .from('newsletter_subscribers')
      .select('id')
      .eq('email', email)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: 'Email already subscribed' },
        { status: 409 }
      );
    }

    // Add to newsletter
    const { data: subscriber, error } = await supabase
      .from('newsletter_subscribers')
      .insert({
        email,
        status: 'active',
        source: 'landing_page',
      })
      .select()
      .single();

    if (error) {
      console.error('Newsletter subscription error:', error);
      return NextResponse.json(
        { error: 'Failed to subscribe to newsletter' },
        { status: 500 }
      );
    }

    // Send welcome email
    try {
      await sendEmail({
        to: email,
        ...emailTemplates.welcomeEmail({
          name: email.split('@')[0],
          email,
        }),
      });
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
      // Don't fail request if email fails
    }

    // Notify admin
    try {
      await sendEmail({
        to: process.env.ADMIN_EMAIL || 'Blacklight_Web_Designs@protonmail.com',
        subject: 'New Newsletter Subscription',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0a0a0a;">
            <div style="background-color: #1a1a1a; padding: 30px; border-radius: 8px; border: 1px solid #333;">
              <h1 style="color: #00ff41; margin: 0 0 20px 0; font-size: 24px; font-weight: bold;">
                New Newsletter Subscription
              </h1>
              
              <div style="color: #ffffff; line-height: 1.6;">
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
                <p><strong>Source:</strong> Landing Page</p>
              </div>
            </div>
          </div>
        `,
      });
    } catch (adminEmailError) {
      console.error('Failed to send admin notification:', adminEmailError);
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter!',
      subscriber,
    });
  } catch (error) {
    console.error('Newsletter API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
