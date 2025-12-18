const nodemailer = require('nodemailer');

// Email service configurations
const emailConfigs = {
  // Gmail configuration
  gmail: {
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD
    }
  },

  // Outlook/Hotmail configuration
  outlook: {
    service: 'hotmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  },

  // Yahoo configuration
  yahoo: {
    service: 'yahoo',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  },

  // Custom SMTP configuration
  smtp: {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  },

  // SendGrid SMTP configuration
  sendgrid: {
    host: 'smtp.sendgrid.net',
    port: 587,
    secure: false,
    auth: {
      user: 'apikey',
      pass: process.env.SENDGRID_API_KEY
    }
  },

  // Mailgun SMTP configuration
  mailgun: {
    host: 'smtp.mailgun.org',
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAILGUN_SMTP_LOGIN,
      pass: process.env.MAILGUN_SMTP_PASSWORD
    }
  }
};

// Create transporter based on service
const createEmailTransporter = () => {
  const service = process.env.EMAIL_SERVICE || 'gmail';
  const config = emailConfigs[service];

  if (!config) {
    throw new Error(`Unsupported email service: ${service}`);
  }

  // Validate required environment variables
  if (service === 'gmail' && (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD)) {
    throw new Error('Gmail configuration requires EMAIL_USER and EMAIL_APP_PASSWORD');
  }

  if (service === 'smtp' && (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS)) {
    throw new Error('SMTP configuration requires SMTP_HOST, SMTP_USER, and SMTP_PASS');
  }

  return nodemailer.createTransporter(config);
};

// Test email configuration
const testEmailConnection = async () => {
  try {
    const transporter = createEmailTransporter();
    await transporter.verify();
    console.log('✅ Email server connection verified');
    return { success: true, message: 'Email configuration is valid' };
  } catch (error) {
    console.error('❌ Email server connection failed:', error.message);
    return { success: false, error: error.message };
  }
};

// Email templates
const emailTemplates = {
  // Contact form notification template
  contactNotification: (data) => ({
    subject: ` New Contact: ${data.subject}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #555; }
          .value { margin-top: 5px; padding: 8px; background: white; border-radius: 4px; border-left: 4px solid #667eea; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>🚀 New Contact Form Submission</h2>
            <p>Received: ${new Date().toLocaleString()}</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">👤 Name:</div>
              <div class="value">${data.name}</div>
            </div>
            <div class="field">
              <div class="label">📧 Email:</div>
              <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
            </div>
            ${data.phone ? `
            <div class="field">
              <div class="label">📞 Phone:</div>
              <div class="value">${data.phone}</div>
            </div>
            ` : ''}
            <div class="field">
              <div class="label">💬 Message:</div>
              <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
${data.phone ? `Phone: ${data.phone}` : ''}
Subject: ${data.subject}

Message:
${data.message}

Submitted: ${new Date().toLocaleString()}
    `
  }),

  // Auto-reply template
  autoReply: (data) => ({
    subject: 'Thank you for contacting Xorvo - We\'ll be in touch soon!',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🚀 XORVO</div>
            <h2>Thank You for Reaching Out!</h2>
          </div>
          <div class="content">
            <p>Hi <strong>${data.name}</strong>,</p>
            <p>Thank you for contacting Xorvo! We've received your message and our team will review it shortly.</p>
            <p><strong>What happens next?</strong></p>
            <ul>
              <li>🔍 Our team will review your inquiry within 24 hours</li>
              <li>📞 We'll reach out to discuss your needs in detail</li>
              <li>💡 We'll provide tailored solutions for your requirements</li>
            </ul>
            <p>Best regards,<br><strong>The Xorvo Team</strong></p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
Hi ${data.name},

Thank you for contacting Xorvo! We've received your message and our team will review it shortly.

What happens next?
- Our team will review your inquiry within 24 hours
- We'll reach out to discuss your needs in detail
- We'll provide tailored solutions for your requirements

Best regards,
The Xorvo Team
    `
  })
};

module.exports = {
  createEmailTransporter,
  testEmailConnection,
  emailTemplates,
  emailConfigs
};