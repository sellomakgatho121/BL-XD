import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with proper error handling
const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

// Email Configuration
const EMAIL_CONFIG = {
  adminEmail: process.env.ADMIN_EMAIL || 'sellomakgatho121@gmail.com',
  fromEmail: process.env.FROM_EMAIL || 'onboarding@resend.dev',
};

// Send email via Resend
async function sendEmail(params: {
  to_email: string;
  subject: string;
  message: string;
  from_name?: string;
  reply_to?: string;
}) {
  if (!resend) {
    throw new Error('Resend API key not configured');
  }

  try {
    const { data, error } = await resend.emails.send({
      from: `${params.from_name || 'Blacklight Web Designs'} <${EMAIL_CONFIG.fromEmail}>`,
      to: [params.to_email],
      subject: params.subject,
      html: params.message,
      replyTo: params.reply_to || EMAIL_CONFIG.fromEmail,
    });

    if (error) {
      console.error('Resend API Error:', error);
      throw new Error(`Resend Error: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error('Resend API Error:', error);
    throw new Error(`Email Error: ${error}`);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check if Resend is configured
    if (!resend) {
      return NextResponse.json(
        { success: false, error: 'Email service not configured' },
        { status: 500 }
      );
    }

    let adminEmailSent = false;
    let subscriberEmailSent = false;
    let lastError = null;

    // Send admin notification
    try {
      console.log('Sending admin notification to:', EMAIL_CONFIG.adminEmail);
      await sendEmail({
        to_email: EMAIL_CONFIG.adminEmail,
        subject: '🚀 New Blacklight Lead Subscribed',
        message: `
          <div style="font-family: monospace; background: #0a0a0a; color: #00ff00; padding: 20px; border: 1px solid #00ff00;">
            <h2 style="color: #00ff00; margin-bottom: 20px;">BLACKLIGHT SYSTEMS: NEW LEAD DETECTED</h2>
            <div style="background: #111; padding: 15px; border-left: 3px solid #00ff00; margin: 10px 0;">
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
              <p><strong>Status:</strong> <span style="color: #00ff00;">CAPTURED</span></p>
            </div>
            <p style="margin-top: 20px; font-size: 12px; opacity: 0.7;">
              This lead was captured from the Blacklight Web Designs landing page.
            </p>
          </div>
        `,
      });
      console.log('Admin notification sent successfully');
      adminEmailSent = true;
    } catch (error) {
      console.error('Admin email failed:', error);
      lastError = error;
    }

    // Send subscriber confirmation
    try {
      console.log('Sending subscriber confirmation to:', email);
      // For development with Resend dev domain, send to admin email
      // In production, this will send to the actual user email
      const testEmail = process.env.NODE_ENV === 'development' ? EMAIL_CONFIG.adminEmail : email;
      
      await sendEmail({
        to_email: testEmail,
        subject: "You're on the Blacklight Notification List!",
        message: `
          <div style="font-family: monospace; background: #0a0a0a; color: #00ff00; padding: 20px; text-align: center;">
            <h1 style="color: #00ff00; margin-bottom: 20px;">BLACKLIGHT SYSTEMS ACTIVATED</h1>
            <div style="background: #111; padding: 20px; border: 1px solid #00ff00; margin: 20px 0;">
              <p style="font-size: 18px; margin-bottom: 15px;">🎉 You're Notified!</p>
              <p style="margin-bottom: 15px;">Thanks for joining the Blacklight Web Designs notification list.</p>
              <p style="font-size: 14px; opacity: 0.8;">We'll send you launch updates when we go live.</p>
            </div>
            <p style="margin-top: 30px; font-size: 12px; opacity: 0.6;">
              This is an automated message. Please don't reply to this email.
            </p>
          </div>
        `,
        reply_to: email,
      });
      console.log('Subscriber confirmation sent successfully');
      subscriberEmailSent = true;
    } catch (error) {
      console.error('Subscriber email failed:', error);
      lastError = error;
    }

    let emailSent = adminEmailSent || subscriberEmailSent;

    // Fallback: Log to file if EmailJS fails
    if (!emailSent) {
      try {
        const fs = await import('fs').then(m => m.promises);
        const path = await import('path');

        const logEntry = {
          email,
          timestamp: new Date().toISOString(),
          source: 'blacklight-landing-page',
          error: lastError ? String(lastError) : null,
        };

        const logFile = path.join(process.cwd(), 'leads.log');
        await fs.appendFile(logFile, JSON.stringify(logEntry) + '\n');
        emailSent = true;
      } catch (logError) {
        console.error('Failed to log email:', logError);
      }
    }

    if (emailSent) {
      return NextResponse.json({
        success: true,
        message: 'Successfully subscribed to newsletter',
        adminEmailSent,
        subscriberEmailSent,
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Failed to process subscription' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
