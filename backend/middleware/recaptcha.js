const axios = require('axios');

/**
 * Middleware to verify Google reCAPTCHA v2 token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const verifyRecaptcha = async (req, res, next) => {
  try {
    const { recaptchaToken } = req.body;

    // Check if reCAPTCHA token is provided
    if (!recaptchaToken) {
      return res.status(400).json({
        success: false,
        message: 'reCAPTCHA verification is required',
        error: 'Missing reCAPTCHA token'
      });
    }

    // Check if reCAPTCHA secret key is configured
    if (!process.env.RECAPTCHA_SECRET_KEY) {
      console.error(' RECAPTCHA_SECRET_KEY not configured in environment variables');
      return res.status(500).json({
        success: false,
        message: 'Server configuration error',
        error: 'reCAPTCHA not properly configured'
      });
    }

    // Verify the reCAPTCHA token with Google's API
    const verificationURL = 'https://www.google.com/recaptcha/api/siteverify';
    const verificationData = {
      secret: process.env.RECAPTCHA_SECRET_KEY,
      response: recaptchaToken,
      remoteip: req.ip // Optional: include user's IP address
    };

    // Make request to Google's reCAPTCHA verification endpoint
    const response = await axios.post(verificationURL, null, {
      params: verificationData,
      timeout: 10000 // 10 second timeout
    });

    const { success, score, action, hostname, 'error-codes': errorCodes } = response.data;

    // Log verification attempt for debugging
    console.log('🔐 reCAPTCHA verification attempt:', {
      success,
      score,
      action,
      hostname,
      ip: req.ip,
      timestamp: new Date().toISOString()
    });

    // Check if verification was successful
    if (!success) {
      console.warn('⚠️ reCAPTCHA verification failed:', {
        errorCodes,
        ip: req.ip,
        timestamp: new Date().toISOString()
      });

      return res.status(400).json({
        success: false,
        message: 'reCAPTCHA verification failed',
        error: 'Invalid reCAPTCHA response',
        details: errorCodes || ['verification-failed']
      });
    }

    // For reCAPTCHA v2, we don't have a score, so we just check success
    // For reCAPTCHA v3, you would check the score here (typically > 0.5)
    
    // Add verification info to request object for potential use in route handlers
    req.recaptchaVerified = true;
    req.recaptchaData = {
      success,
      score,
      action,
      hostname,
      verifiedAt: new Date().toISOString()
    };

    console.log(' reCAPTCHA verification successful for IP:', req.ip);
    
    // Continue to the next middleware/route handler
    next();

  } catch (error) {
    console.error(' reCAPTCHA verification error:', {
      message: error.message,
      stack: error.stack,
      ip: req.ip,
      timestamp: new Date().toISOString()
    });

    // Handle different types of errors
    if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
      return res.status(503).json({
        success: false,
        message: 'reCAPTCHA verification service temporarily unavailable',
        error: 'Service timeout'
      });
    }

    if (error.response) {
      // Google API returned an error response
      return res.status(502).json({
        success: false,
        message: 'reCAPTCHA verification service error',
        error: 'External service error'
      });
    }

    // Generic server error
    return res.status(500).json({
      success: false,
      message: 'Internal server error during reCAPTCHA verification',
      error: 'Server error'
    });
  }
};

module.exports = {
  verifyRecaptcha
};