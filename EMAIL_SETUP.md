# Email Service Setup Guide

The newsletter form now actually delivers emails! Here's how to configure it:

## 🚀 Quick Setup Options

### Option 1: Resend (Recommended)
1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Add these environment variables:
   ```bash
   RESEND_API_KEY=re_your_api_key_here
   FROM_EMAIL=noreply@yourdomain.com
   ADMIN_EMAIL=your-email@yourdomain.com
   ```

### Option 2: SendGrid
1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Get your API key
3. Add these environment variables:
   ```bash
   SENDGRID_API_KEY=your_sendgrid_api_key_here
   FROM_EMAIL=noreply@yourdomain.com
   ADMIN_EMAIL=your-email@yourdomain.com
   ```

### Option 3: Development Fallback
If no email service is configured, leads are saved to `leads.log` file.

## 📧 What Happens Now?

1. **Lead Capture**: When user enters email, it's validated and sent
2. **Admin Notification**: You receive an email with the lead details
3. **User Confirmation**: User gets a confirmation email (if Resend is configured)
4. **Fallback Logging**: All leads are logged to `leads.log` as backup

## 🔧 Environment Variables

Add these to your Vercel dashboard or local `.env` file:

```bash
# Required for real email delivery
RESEND_API_KEY=your_api_key
FROM_EMAIL=noreply@blacklightwebdesigns.com
ADMIN_EMAIL=your-admin@email.com

# Optional: Site password protection
SITE_PASSWORD=blacklight2026
```

## ✅ Testing

1. Enter your email in the newsletter form
2. Check your admin email for the lead notification
3. Check your spam folder if needed
4. Verify `leads.log` file for fallback entries

The form now provides real email delivery with proper error handling and user feedback!
