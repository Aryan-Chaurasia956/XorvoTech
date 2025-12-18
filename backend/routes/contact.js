const express = require('express');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const { sendContactEmail } = require('../controllers/contactController');
const { sanitizeInput } = require('../middleware/sanitization');
const { verifyRecaptcha } = require('../middleware/recaptcha');

const router = express.Router();

// Rate limiting specifically for contact form
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 5 contact form submissions per windowMs
  message: {
    error: 'Too many contact form submissions from this IP, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Validation rules for contact form - matching frontend exactly
const contactValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email address is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail()
    .isLength({ max: 254 })
    .withMessage('Email address is too long'),
  
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage('First name can only contain letters, spaces, hyphens, and apostrophes'),
  
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage('Last name can only contain letters, spaces, hyphens, and apostrophes'),
  
  body('jobTitle')
    .trim()
    .notEmpty()
    .withMessage('Job title is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Job title must be between 2 and 100 characters'),
  
  body('countryCode')
    .trim()
    .notEmpty()
    .withMessage('Country code is required')
    .matches(/^\+\d{1,4}$/)
    .withMessage('Please provide a valid country code'),
  
  body('phoneNumber')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^\d{6,15}$/)
    .withMessage('Please provide a valid phone number (6-15 digits)'),
  
  body('companyName')
    .trim()
    .notEmpty()
    .withMessage('Company name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Company name must be between 2 and 100 characters'),
  
  body('country')
    .trim()
    .notEmpty()
    .withMessage('Country selection is required')
    .isIn(['US', 'CA', 'UK', 'AU', 'IN', 'Other'])
    .withMessage('Please select a valid country'),
  
  body('contactType')
    .trim()
    .notEmpty()
    .withMessage('Contact type is required')
    .isIn(['client', 'partner'])
    .withMessage('Please select either client or partner'),
  
  body('challenges')
    .isArray({ min: 1 })
    .withMessage('Please select at least one challenge'),
  
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters'),
  
  body('marketingConsent')
    .optional()
    .isBoolean()
    .withMessage('Marketing consent must be a boolean value'),
  
  body('recaptchaToken')
    .trim()
    .notEmpty()
    .withMessage('reCAPTCHA verification is required')
    .isLength({ min: 10 })
    .withMessage('Invalid reCAPTCHA token format'),
];

// GET /api/contact - Get contact form configuration
router.get('/', (req, res) => {
  res.json({
    message: 'Contact API endpoint',
    version: '2.0.0',
    endpoints: {
      submit: 'POST /api/contact/submit',
      status: 'GET /api/contact/status'
    },
    validation: {
      email: 'Required, valid email format',
      firstName: 'Required, 2-50 characters, letters only',
      lastName: 'Required, 2-50 characters, letters only',
      jobTitle: 'Required, 2-100 characters',
      countryCode: 'Required, valid country code format (+1234)',
      phoneNumber: 'Required, 6-15 digits',
      companyName: 'Required, 2-100 characters',
      country: 'Required, predefined country codes (US, CA, UK, AU, IN, Other)',
      contactType: 'Required, either "client" or "partner"',
      challenges: 'Required, array with at least one challenge/interest',
      message: 'Required, 10-2000 characters',
      marketingConsent: 'Optional, boolean'
    }
  });
});

// POST /api/contact/submit - Submit contact form
router.post('/submit', 
  contactLimiter,
  contactValidation,
  verifyRecaptcha,
  sanitizeInput,
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array().map(error => ({
            field: error.path,
            message: error.msg,
            value: error.value
          }))
        });
      }

      // Extract frontend form data
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
        marketingConsent
      } = req.body;

      // Create contact data object with frontend fields
      const contactData = {
        email,
        firstName,
        lastName,
        jobTitle: jobTitle || null,
        countryCode,
        phoneNumber: phoneNumber || null,
        companyName: companyName || null,
        country: country || null,
        contactType,
        challenges: challenges || [],
        message: message || null,
        marketingConsent: marketingConsent || false,
        submittedAt: new Date().toISOString(),
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      };

      // Send email
      const emailResult = await sendContactEmail(contactData);

      if (emailResult.success) {
        res.status(200).json({
          success: true,
          message: 'Thank you for your message! We will get back to you soon.',
          submissionId: emailResult.submissionId
        });
      } else {
        throw new Error(emailResult.error);
      }

    } catch (error) {
      console.error('Contact form submission error:', error);
      res.status(500).json({
        success: false,
        message: 'Sorry, there was an error sending your message. Please try again later.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
);

// GET /api/contact/status - Check API status
router.get('/status', (req, res) => {
  res.json({
    status: 'operational',
    timestamp: new Date().toISOString(),
    services: {
      email: 'operational',
      validation: 'operational',
      rateLimit: 'operational'
    }
  });
});

module.exports = router;