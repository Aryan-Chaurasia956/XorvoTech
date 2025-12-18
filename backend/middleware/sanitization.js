const validator = require('validator');

// HTML entities to escape
const htmlEntities = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;'
};

// Escape HTML entities
const escapeHtml = (text) => {
  if (typeof text !== 'string') return text;
  return text.replace(/[&<>"'\/]/g, (s) => htmlEntities[s]);
};

// Remove potentially dangerous characters
const sanitizeString = (str) => {
  if (typeof str !== 'string') return str;
  
  // Remove null bytes and control characters
  str = str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  
  // Remove script tags and their content
  str = str.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remove potentially dangerous HTML tags
  str = str.replace(/<(iframe|object|embed|link|meta|style|base)[^>]*>/gi, '');
  
  // Remove javascript: and data: protocols
  str = str.replace(/javascript:/gi, '');
  str = str.replace(/data:/gi, '');
  
  // Remove on* event handlers
  str = str.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '');
  
  return str.trim();
};

// Sanitize phone number
const sanitizePhone = (phone) => {
  if (!phone) return null;
  // Remove all non-digit characters except + at the beginning
  return phone.replace(/[^\d+]/g, '').replace(/(?!^)\+/g, '');
};

// Sanitize email
const sanitizeEmail = (email) => {
  if (!email) return email;
  return validator.normalizeEmail(email.toLowerCase().trim());
};

// Main sanitization middleware
const sanitizeInput = (req, res, next) => {
  try {
    if (req.body) {
      // Sanitize each field
      if (req.body.name) {
        req.body.name = sanitizeString(req.body.name);
      }
      
      if (req.body.email) {
        req.body.email = sanitizeEmail(req.body.email);
      }
      
      if (req.body.phone) {
        req.body.phone = sanitizePhone(req.body.phone);
      }
      
      if (req.body.company) {
        req.body.company = sanitizeString(req.body.company);
      }
      
      if (req.body.subject) {
        req.body.subject = sanitizeString(req.body.subject);
      }
      
      if (req.body.message) {
        // For message, we want to preserve line breaks but escape HTML
        req.body.message = escapeHtml(sanitizeString(req.body.message));
      }
      
      // Sanitize select fields (ensure they match allowed values)
      if (req.body.service) {
        const allowedServices = ['cybersecurity', 'cloud-solutions', 'managed-services', 'consulting', 'other'];
        req.body.service = allowedServices.includes(req.body.service) ? req.body.service : 'other';
      }
      
      if (req.body.budget) {
        const allowedBudgets = ['under-10k', '10k-50k', '50k-100k', 'over-100k', 'not-specified'];
        req.body.budget = allowedBudgets.includes(req.body.budget) ? req.body.budget : 'not-specified';
      }
      
      if (req.body.timeline) {
        const allowedTimelines = ['immediate', '1-3-months', '3-6-months', '6-12-months', 'flexible'];
        req.body.timeline = allowedTimelines.includes(req.body.timeline) ? req.body.timeline : 'flexible';
      }
      
      // Ensure newsletter is boolean
      if (req.body.newsletter !== undefined) {
        req.body.newsletter = Boolean(req.body.newsletter);
      }
    }
    
    next();
  } catch (error) {
    console.error('Sanitization error:', error);
    res.status(400).json({
      success: false,
      message: 'Invalid input data format'
    });
  }
};

// Additional security headers middleware
const securityHeaders = (req, res, next) => {
  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY');
  
  // Enable XSS protection
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Referrer policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  next();
};

module.exports = {
  sanitizeInput,
  securityHeaders,
  escapeHtml,
  sanitizeString,
  sanitizePhone,
  sanitizeEmail
};