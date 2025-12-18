const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Create email transporter
const createTransporter = () => {
  // Gmail configuration (you can change this to your preferred email service)
  if (process.env.EMAIL_SERVICE === 'gmail') {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD // Use App Password for Gmail
      }
    });
  }

  // SMTP configuration for other email services
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

// Generate unique submission ID
const generateSubmissionId = () => {
  return crypto.randomBytes(16).toString('hex');
};

// Format contact data for email
const formatContactEmail = (contactData) => {
  const {
    email,
    firstName,
    lastName,
    jobTitle,
    countryCode,
    phoneNumber,
    companyName,
    country,
    contactType,
    challenges,
    message,
    marketingConsent,
    submittedAt,
    ipAddress
  } = contactData;

  const fullName = `${firstName} ${lastName}`;
  const fullPhone = phoneNumber ? `${countryCode} ${phoneNumber}` : null;
  const challengesList = Array.isArray(challenges) && challenges.length > 0 
    ? challenges.join(', ') 
    : 'Not specified';

  const html = `
  <!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
  <style>
    body { 
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
      line-height: 1.6; 
      color: #2c3e50; 
      background-color: #f4f6f9;
      margin: 0;
      padding: 0;
    }
    .container { 
      max-width: 650px; 
      margin: 30px auto; 
      background: white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      border-radius: 8px;
      overflow: hidden;
    }
    .header { 
      background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%); 
      color: white; 
      padding: 30px; 
    }
    .header h2 {
      margin: 0 0 8px 0;
      font-size: 24px;
      font-weight: 600;
    }
    .header p {
      margin: 0;
      opacity: 0.9;
      font-size: 14px;
    }
    .content { 
      padding: 30px; 
    }
    .field { 
      margin-bottom: 20px;
      border-bottom: 1px solid #ecf0f1;
      padding-bottom: 15px;
    }
    .field:last-child {
      border-bottom: none;
      margin-bottom: 0;
    }
    .label { 
      font-weight: 600; 
      color: #34495e; 
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
    }
    .value { 
      color: #2c3e50;
      font-size: 15px;
      padding-left: 2px;
    }
    .value a {
      color: #3498db;
      text-decoration: none;
    }
    .value a:hover {
      text-decoration: underline;
    }
    .message-box { 
      background: #f8f9fa; 
      padding: 15px; 
      border: 1px solid #e9ecef; 
      border-radius: 4px; 
      margin-top: 8px;
      color: #2c3e50;
      line-height: 1.7;
    }
    .contact-type { 
      display: inline-block; 
      padding: 6px 14px; 
      background: #3498db; 
      color: white; 
      border-radius: 4px; 
      font-size: 13px; 
      font-weight: 600; 
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .footer { 
      background: #f8f9fa; 
      padding: 25px 30px; 
      text-align: center; 
      font-size: 12px; 
      color: #7f8c8d; 
      border-top: 1px solid #ecf0f1; 
      line-height: 1.8;
    }
    .footer strong {
      color: #34495e;
      display: block;
      margin-bottom: 8px;
    }
    .consent-yes {
      color: #27ae60;
      font-weight: 600;
    }
    .consent-no {
      color: #95a5a6;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Contact Form Submission</h2>
      <p>Received on ${new Date(submittedAt).toLocaleString()}</p>
    </div>
    
    <div class="content">
      <div class="field">
        <div class="label">Full Name</div>
        <div class="value">${fullName}</div>
      </div>
      
      <div class="field">
        <div class="label">Email Address</div>
        <div class="value"><a href="mailto:${email}">${email}</a></div>
      </div>
      
      ${jobTitle ? `
      <div class="field">
        <div class="label">Job Title</div>
        <div class="value">${jobTitle}</div>
      </div>
      ` : ''}
      
      ${fullPhone ? `
       <div class="field">
         <div class="label">Phone Number</div>
         <div class="value">${fullPhone}</div>
       </div>
       ` : ''}
      
      ${companyName ? `
      <div class="field">
        <div class="label">Company Name</div>
        <div class="value">${companyName}</div>
      </div>
      ` : ''}
      
      ${country ? `
      <div class="field">
        <div class="label">Country</div>
        <div class="value">${country}</div>
      </div>
      ` : ''}
      
      <div class="field">
        <div class="label">Contact Type</div>
        <div class="value"><span class="contact-type">${contactType}</span></div>
      </div>
      
      <div class="field">
        <div class="label">Challenges & Interests</div>
        <div class="value">${challengesList}</div>
      </div>
      
      ${message ? `
      <div class="field">
        <div class="label">Message</div>
        <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
      </div>
      ` : ''}
      
      <div class="field">
        <div class="label">Marketing Consent</div>
        <div class="value"><span class="${marketingConsent ? 'consent-yes' : 'consent-no'}">${marketingConsent ? 'Granted' : 'Not Granted'}</span></div>
      </div>
    </div>
    
    <div class="footer">
      <strong>Submission Information</strong>
      Timestamp: ${new Date(submittedAt).toLocaleString()}<br>
      <em>This email was automatically generated from the Xorvo contact form system.</em>
    </div>
  </div>
</body>
</html>
  `;

  const text = `
New Contact Form Submission

Name: ${fullName}
Email: ${email}
${jobTitle ? `Job Title: ${jobTitle}` : ''}
${fullPhone ? `Phone: ${fullPhone}` : ''}
${companyName ? `Company: ${companyName}` : ''}
${country ? `Country: ${country}` : ''}
Contact Type: ${contactType}
Challenges/Interests: ${challengesList}
Marketing Consent: ${marketingConsent ? 'Yes' : 'No'}

${message ? `Message:\n${message}` : ''}

---
Submitted: ${new Date(submittedAt).toLocaleString()}
IP Address: ${ipAddress}
  `;

  return { html, text };
};

// Send contact email
const sendContactEmail = async (contactData) => {
  try {
    const transporter = createTransporter();
    const submissionId = generateSubmissionId();
    const { html, text } = formatContactEmail(contactData);

    // Email to admin/company only
    const adminMailOptions = {
      from: `"Xorvo Contact Form" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: ` New Contact: ${contactData.contactType} - ${contactData.firstName} ${contactData.lastName}`,
      text: text,
      html: html,
      replyTo: contactData.email
    };

    // Send only admin email
    await transporter.sendMail(adminMailOptions);

    console.log(` Contact form email sent successfully to admin - ID: ${submissionId}`);
    
    return {
      success: true,
      submissionId: submissionId,
      message: 'Admin notification email sent successfully'
    };

  } catch (error) {
    console.error(' Error sending contact email:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Test email configuration
const testEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log(' Email configuration is valid');
    return { success: true };
  } catch (error) {
    console.error(' Email configuration error:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendContactEmail,
  testEmailConfig
};