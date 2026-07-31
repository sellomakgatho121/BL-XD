import { Resend } from "resend";
type SendEmailParams = {
  to: string;
  subject: string;
  html: string;
};

export async function sendEmail({ to, subject, html }: SendEmailParams) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log(`[EMAIL MOCK] To: ${to}, Subject: ${subject}`);
    console.log(`[EMAIL MOCK] Body: ${html.substring(0, 200)}...`);
    return { success: true, mock: true };
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || "Blacklight Web Designs <noreply@blacklightwebdesigns.com>",
      to,
      subject,
      html,
    });

    if (error) {
      console.error("[EMAIL ERROR]", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (e) {
    console.error("[EMAIL ERROR]", e);
    return { success: false, error: String(e) };
  }
}

export function renderContactNotification(name: string, email: string, message: string, businessName?: string) {
  return {
    subject: `New Lead: ${name} - ${businessName || "Website Inquiry"}`,
    html: `
      <div style="font-family: monospace; max-width: 600px; margin: 0 auto; background: #0A0A0F; color: #E8E6E3; padding: 40px;">
        <div style="border-bottom: 1px solid rgba(181,154,95,0.3); padding-bottom: 20px; margin-bottom: 30px;">
          <h1 style="color: #B59A5F; font-size: 18px; letter-spacing: 2px; text-transform: uppercase;">New Lead Received</h1>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 10px 0; color: #666;">Name</td><td style="padding: 10px 0; color: #E8E6E3;">${name}</td></tr>
          <tr><td style="padding: 10px 0; color: #666;">Email</td><td style="padding: 10px 0; color: #E8E6E3;">${email}</td></tr>
          ${businessName ? `<tr><td style="padding: 10px 0; color: #666;">Business</td><td style="padding: 10px 0; color: #E8E6E3;">${businessName}</td></tr>` : ""}
        </table>
        <div style="margin-top: 30px; padding: 20px; border: 1px solid rgba(181,154,95,0.2); border-radius: 8px;">
          <p style="color: #999; font-size: 12px;">Message</p>
          <p style="color: #E8E6E3; line-height: 1.6;">${message}</p>
        </div>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.05);">
          <a href="https://blacklight-web-designs.vercel.app/admin/leads" style="display: inline-block; padding: 12px 24px; background: #B59A5F; color: #0A0A0F; text-decoration: none; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">View in Admin</a>
        </div>
      </div>
    `,
  };
}
