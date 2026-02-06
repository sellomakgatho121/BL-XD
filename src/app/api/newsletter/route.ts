import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// EmailJS Configuration
const EMAILJS_CONFIG = {
  serviceId: process.env.EMAILJS_SERVICE_ID || 'service_jljtpma',
  templateId: process.env.EMAILJS_TEMPLATE_ID || 'template_prrf7h8',
  publicKey: process.env.EMAILJS_PUBLIC_KEY || '',
  privateKey: process.env.EMAILJS_PRIVATE_KEY || '', // Optional, for server-side
  adminEmail: process.env.ADMIN_EMAIL || 'sellomakgatho121@gmail.com',
};

// EmailJS API endpoint
const EMAILJS_API_URL = 'https://api.emailjs.com/api/v1.0/email/send';

// Send email via EmailJS
async function sendEmailJS(params: {
  to_email: string;
  subject: string;
  message: string;
  from_name?: string;
  reply_to?: string;
}) {
  const templateParams = {
    service_id: EMAILJS_CONFIG.serviceId,
    template_id: EMAILJS_CONFIG.templateId,
    user_id: EMAILJS_CONFIG.publicKey,
    accessToken: EMAILJS_CONFIG.privateKey || undefined,
    template_params: {
      to_email: params.to_email,
      subject: params.subject,
      message: params.message,
      from_name: params.from_name || 'Blacklight Web Designs',
      reply_to: params.reply_to || 'noreply@blacklightwebdesigns.com',
    },
  };

  const response = await fetch(EMAILJS_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(templateParams),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`EmailJS Error: ${error}`);
  }

  return await response.json();
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

    let emailSent = false;
    let lastError = null;

    // Try EmailJS first
    try {
      // Send notification to admin
      await sendEmailJS({
        to_email: EMAILJS_CONFIG.adminEmail,
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

      // Send confirmation to subscriber
      await sendEmailJS({
        to_email: email,
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
      });

      emailSent = true;
    } catch (error) {
      lastError = error;
      console.error('EmailJS failed:', error);
    }

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
