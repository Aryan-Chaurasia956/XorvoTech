# Xorvo Backend API

A robust Node.js/Express backend API for handling contact form submissions with email notifications, validation, and security features.

## 🚀 Features

- **Contact Form API** - Secure form submission handling
- **Email Notifications** - Automated email sending with multiple provider support
- **Input Validation** - Comprehensive form validation and sanitization
- **Rate Limiting** - Protection against spam and abuse
- **Security Headers** - CORS, Helmet, and other security middleware
- **Error Handling** - Centralized error handling with proper logging
- **Email Templates** - Beautiful HTML email templates
- **Multiple Email Providers** - Support for Gmail, Outlook, SMTP, SendGrid, etc.

## 📁 Project Structure

```
backend/
├── config/
│   └── email.js          # Email service configuration
├── controllers/
│   └── contactController.js # Contact form logic
├── middleware/
│   ├── errorHandler.js   # Error handling middleware
│   └── sanitization.js   # Input sanitization
├── routes/
│   └── contact.js        # Contact API routes
├── utils/
│   └── logger.js         # Logging utility
├── logs/                 # Log files (auto-created)
├── .env.example          # Environment variables template
├── package.json          # Dependencies and scripts
├── server.js             # Main server file
└── README.md             # This file
```

## 🛠️ Installation

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```

4. **Configure your environment variables in `.env`:**
   ```env
   # Server Configuration
   NODE_ENV=development
   PORT=5002

   # Email Configuration (Gmail example)
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_APP_PASSWORD=your-app-password
   EMAIL_FROM=your-email@gmail.com
   EMAIL_TO=admin@yourcompany.com

   # CORS Configuration
   FRONTEND_URL=http://localhost:8080
   ```

## 📧 Email Setup

### Gmail Setup (Recommended for Development)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password:**
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. **Update .env file:**
   ```env
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_APP_PASSWORD=generated-app-password
   ```

### Other Email Providers

The backend supports multiple email services:
- **Gmail** - `EMAIL_SERVICE=gmail`
- **Outlook** - `EMAIL_SERVICE=outlook`
- **Yahoo** - `EMAIL_SERVICE=yahoo`
- **Custom SMTP** - `EMAIL_SERVICE=smtp`
- **SendGrid** - `EMAIL_SERVICE=sendgrid`
- **Mailgun** - `EMAIL_SERVICE=mailgun`

## 🚀 Running the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5002`

## 📡 API Endpoints

### Health Check
```
GET /health
```
Returns server status and uptime information.

### Contact Form
```
POST /api/contact/submit
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "company": "Acme Corp",
  "subject": "Business Inquiry",
  "message": "I'm interested in your services...",
  "service": "cybersecurity",
  "budget": "10k-50k",
  "timeline": "1-3-months",
  "newsletter": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for your message! We will get back to you soon.",
  "submissionId": "abc123def456"
}
```

### API Status
```
GET /api/contact/status
```
Returns API operational status.

## 🔒 Security Features

- **Rate Limiting** - 5 submissions per 15 minutes per IP
- **Input Validation** - Comprehensive form validation
- **Input Sanitization** - XSS and injection protection
- **CORS Protection** - Configurable origin restrictions
- **Security Headers** - Helmet.js security headers
- **Error Handling** - No sensitive data exposure

## 📝 Validation Rules

| Field | Rules |
|-------|-------|
| name | Required, 2-100 chars, letters only |
| email | Required, valid email format |
| phone | Optional, valid phone number |
| company | Optional, max 100 chars |
| subject | Required, 5-200 chars |
| message | Required, 10-2000 chars |
| service | Optional, predefined options |
| budget | Optional, predefined ranges |
| timeline | Optional, predefined options |
| newsletter | Optional, boolean |

## 🔧 Configuration Options

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `5002` |
| `EMAIL_SERVICE` | Email provider | `gmail` |
| `EMAIL_USER` | Email username | - |
| `EMAIL_APP_PASSWORD` | Email password/token | - |
| `EMAIL_FROM` | From email address | - |
| `EMAIL_TO` | Admin email address | - |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:8080` |

## 📊 Logging

The backend includes comprehensive logging:
- **Request Logging** - All HTTP requests
- **Error Logging** - Application errors
- **Email Logging** - Email sending status
- **Contact Logging** - Form submissions

Logs are stored in the `logs/` directory:
- `error.log` - Error messages
- `warn.log` - Warning messages
- `info.log` - Information messages
- `debug.log` - Debug messages

## 🧪 Testing

Test the API endpoints:

```bash
# Health check
curl http://localhost:5002/health

# Contact form submission
curl -X POST http://localhost:5002/api/contact/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Message",
    "message": "This is a test message"
  }'
```

## 🔄 Integration with Frontend

Update your frontend contact form to submit to:
```javascript
const response = await fetch('http://localhost:5002/api/contact/submit', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData)
});
```

## 🚀 Deployment

### Production Checklist

1. **Environment Variables:**
   - Set `NODE_ENV=production`
   - Configure production email settings
   - Update CORS origins for production domain

2. **Security:**
   - Use HTTPS in production
   - Set secure email credentials
   - Configure proper rate limits

3. **Monitoring:**
   - Set up log monitoring
   - Configure error alerting
   - Monitor email delivery

## 🆘 Troubleshooting

### Common Issues

1. **Email not sending:**
   - Check email credentials
   - Verify app password for Gmail
   - Check firewall/network settings

2. **CORS errors:**
   - Update `FRONTEND_URL` in .env
   - Check allowed origins configuration

3. **Rate limiting:**
   - Check IP-based rate limits
   - Adjust rate limit settings if needed

### Debug Mode

Enable debug logging:
```env
NODE_ENV=development
```

Check logs in the `logs/` directory for detailed error information.

## 📞 Support

For issues or questions:
1. Check the logs in `logs/` directory
2. Verify environment configuration
3. Test email configuration with `/health` endpoint
4. Review API documentation above

## 📄 License

MIT License - see LICENSE file for details.