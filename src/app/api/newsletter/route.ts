import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Email service configuration - you can replace with your preferred service
const EMAIL_SERVICE = {
  // Option 1: Resend (recommended)
  resend: {
    apiKey: process.env.RESEND_API_KEY,
    from: process.env.FROM_EMAIL || 'noreply@blacklightwebdesigns.com',
    to: process.env.ADMIN_EMAIL || 'admin@blacklightwebdesigns.com',
  },
  // Option 2: SendGrid
  sendgrid: {
    apiKey: process.env.SENDGRID_API_KEY,
    from: process.env.FROM_EMAIL || 'noreply@blacklightwebdesigns.com',
    to: process.env.ADMIN_EMAIL || 'admin@blacklightwebdesigns.com',
  },
  // Option 3: Simple email forwarding (fallback)
  forward: {
    email: process.env.FORWARD_EMAIL || 'leads@blacklightwebdesigns.com',
  }
};

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

    // Try different email services in order of preference
    let emailSent = false;
    let lastError = null;

    // Try Resend first
    if (EMAIL_SERVICE.resend.apiKey) {
      try {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${EMAIL_SERVICE.resend.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: EMAIL_SERVICE.resend.from,
            to: [EMAIL_SERVICE.resend.to],
            subject: `🚀 New Blacklight Lead: ${email}`,
            html: `
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
          }),
        });

        if (response.ok) {
          emailSent = true;
        } else {
          lastError = await response.text();
        }
      } catch (error) {
        lastError = error;
      }
    }

    // Fallback: Store in a simple log file (for development)
    if (!emailSent) {
      try {
        // Dynamic import for fs (Node.js module)
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
        emailSent = true; // Consider this a success for demo purposes
      } catch (logError) {
        console.error('Failed to log email:', logError);
      }
    }

    if (emailSent) {
      // Send confirmation to the user (optional)
      if (EMAIL_SERVICE.resend.apiKey) {
        try {
          await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${EMAIL_SERVICE.resend.apiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from: EMAIL_SERVICE.resend.from,
              to: [email],
              subject: '✨ You\'re on the Blacklight Notification List!',
              html: `
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
            }),
          });
        } catch (error) {
          console.error('Failed to send confirmation email:', error);
        }
      }

      return NextResponse.json({ 
        success: true, 
        message: 'Successfully subscribed to newsletter' 
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
