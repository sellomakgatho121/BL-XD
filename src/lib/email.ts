import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY) 
  : null;

interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
}

export async function sendEmail(options: EmailOptions) {
  if (!resend) {
    console.warn('Resend API key missing. Email not sent:', options.subject);
    return { success: false, error: 'Missing API key' };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: options.from || 'Blacklight Web Designs <noreply@blacklightwebdesigns.co.za>',
      to: Array.isArray(options.to) ? options.to : [options.to],
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo,
    });

    if (error) {
      console.error('Resend error:', error);
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email send error:', error);
    throw error;
  }
}

// Email templates
export const emailTemplates = {
  contactSubmission: (data: {
    name: string;
    email: string;
    businessName?: string;
    businessType?: string;
    budget?: string;
    message: string;
  }) => ({
    subject: `New Contact Form Submission from ${data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0a0a0a;">
        <div style="background-color: #1a1a1a; padding: 30px; border-radius: 8px; border: 1px solid #333;">
          <h1 style="color: #00ff41; margin: 0 0 20px 0; font-size: 24px; font-weight: bold;">
            New Contact Form Submission
          </h1>
          
          <div style="color: #ffffff; line-height: 1.6;">
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            ${data.businessName ? `<p><strong>Business:</strong> ${data.businessName}</p>` : ''}
            ${data.businessType ? `<p><strong>Business Type:</strong> ${data.businessType}</p>` : ''}
            ${data.budget ? `<p><strong>Budget Range:</strong> R${data.budget}</p>` : ''}
            
            <div style="margin-top: 20px; padding: 20px; background-color: #0a0a0a; border-radius: 4px;">
              <p><strong>Message:</strong></p>
              <p style="margin: 10px 0; white-space: pre-wrap;">${data.message}</p>
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #333; color: #666; font-size: 12px;">
            <p>This message was sent from the Blacklight Web Designs contact form.</p>
            <p>Received: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
    `,
  }),

  welcomeEmail: (data: { name: string; email: string }) => ({
    subject: 'Welcome to Blacklight Web Designs',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0a0a0a;">
        <div style="background-color: #1a1a1a; padding: 30px; border-radius: 8px; border: 1px solid #333;">
          <h1 style="color: #00ff41; margin: 0 0 20px 0; font-size: 24px; font-weight: bold;">
            Welcome to Blacklight Web Designs
          </h1>
          
          <div style="color: #ffffff; line-height: 1.6;">
            <p>Hi ${data.name},</p>
            <p>Thank you for joining Blacklight Web Designs! We're excited to work with you.</p>
            
            <div style="margin: 30px 0; padding: 20px; background-color: #0a0a0a; border-radius: 4px; border-left: 4px solid #00ff41;">
              <h3 style="color: #00ff41; margin: 0 0 10px 0;">Next Steps:</h3>
              <ul style="margin: 0; padding-left: 20px;">
                <li>Complete your profile information</li>
                <li>Explore your client dashboard</li>
                <li>Submit your first project brief</li>
              </ul>
            </div>
            
            <p>If you have any questions, feel free to reach out to our support team.</p>
          </div>
          
          <div style="margin-top: 30px; text-align: center;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}/portal/dashboard" 
               style="background-color: #00ff41; color: #0a0a0a; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 4px; display: inline-block;">
              Go to Dashboard
            </a>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #333; color: #666; font-size: 12px;">
            <p>Blacklight Web Designs</p>
            <p>Building digital experiences that convert</p>
          </div>
        </div>
      </div>
    `,
  }),

  invoiceNotification: (data: {
    invoiceNumber: string;
    amount: number;
    dueDate: string;
    clientName: string;
  }) => ({
    subject: `Invoice ${data.invoiceNumber} - Blacklight Web Designs`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0a0a0a;">
        <div style="background-color: #1a1a1a; padding: 30px; border-radius: 8px; border: 1px solid #333;">
          <h1 style="color: #00ff41; margin: 0 0 20px 0; font-size: 24px; font-weight: bold;">
            Invoice ${data.invoiceNumber}
          </h1>
          
          <div style="color: #ffffff; line-height: 1.6;">
            <p>Dear ${data.clientName},</p>
            <p>You have a new invoice from Blacklight Web Designs.</p>
            
            <div style="margin: 30px 0; padding: 20px; background-color: #0a0a0a; border-radius: 4px;">
              <p style="margin: 0 0 10px 0;"><strong>Invoice Details:</strong></p>
              <p style="margin: 5px 0;">Invoice Number: ${data.invoiceNumber}</p>
              <p style="margin: 5px 0;">Amount Due: R${data.amount.toFixed(2)}</p>
              <p style="margin: 5px 0;">Due Date: ${data.dueDate}</p>
            </div>
            
            <p>Please ensure payment is made by the due date to avoid any service interruptions.</p>
          </div>
          
          <div style="margin-top: 30px; text-align: center;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}/portal/invoices" 
               style="background-color: #00ff41; color: #0a0a0a; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 4px; display: inline-block;">
              View Invoice
            </a>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #333; color: #666; font-size: 12px;">
            <p>Blacklight Web Designs</p>
            <p>If you have questions about this invoice, please contact our billing department.</p>
          </div>
        </div>
      </div>
    `,
  }),

  projectUpdate: (data: {
    projectName: string;
    updateMessage: string;
    clientName: string;
  }) => ({
    subject: `Project Update: ${data.projectName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0a0a0a;">
        <div style="background-color: #1a1a1a; padding: 30px; border-radius: 8px; border: 1px solid #333;">
          <h1 style="color: #00ff41; margin: 0 0 20px 0; font-size: 24px; font-weight: bold;">
            Project Update
          </h1>
          
          <div style="color: #ffffff; line-height: 1.6;">
            <p>Hi ${data.clientName},</p>
            <p>There's an update on your project: <strong>${data.projectName}</strong></p>
            
            <div style="margin: 30px 0; padding: 20px; background-color: #0a0a0a; border-radius: 4px; border-left: 4px solid #00ff41;">
              <p style="margin: 0; white-space: pre-wrap;">${data.updateMessage}</p>
            </div>
            
            <p>You can view more details and track progress in your client dashboard.</p>
          </div>
          
          <div style="margin-top: 30px; text-align: center;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}/portal/dashboard" 
               style="background-color: #00ff41; color: #0a0a0a; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 4px; display: inline-block;">
              View Project
            </a>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #333; color: #666; font-size: 12px;">
            <p>Blacklight Web Designs</p>
            <p>Building digital experiences that convert</p>
          </div>
        </div>
      </div>
    `,
  }),
};
