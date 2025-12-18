const fs = require('fs');
const path = require('path');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Log levels
const LOG_LEVELS = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG'
};

// Color codes for console output
const colors = {
  ERROR: '\x1b[31m', // Red
  WARN: '\x1b[33m',  // Yellow
  INFO: '\x1b[36m',  // Cyan
  DEBUG: '\x1b[35m', // Magenta
  RESET: '\x1b[0m'   // Reset
};

// Format timestamp
const formatTimestamp = () => {
  return new Date().toISOString();
};

// Format log message
const formatMessage = (level, message, meta = {}) => {
  const timestamp = formatTimestamp();
  const metaString = Object.keys(meta).length > 0 ? ` | ${JSON.stringify(meta)}` : '';
  return `[${timestamp}] [${level}] ${message}${metaString}`;
};

// Write to file
const writeToFile = (level, message, meta = {}) => {
  const logFile = path.join(logsDir, `${level.toLowerCase()}.log`);
  const formattedMessage = formatMessage(level, message, meta);
  
  fs.appendFile(logFile, formattedMessage + '\n', (err) => {
    if (err) {
      console.error('Failed to write to log file:', err);
    }
  });
};

// Write to console
const writeToConsole = (level, message, meta = {}) => {
  const color = colors[level] || colors.RESET;
  const formattedMessage = formatMessage(level, message, meta);
  console.log(`${color}${formattedMessage}${colors.RESET}`);
};

// Logger class
class Logger {
  constructor(options = {}) {
    this.writeToFile = options.writeToFile !== false;
    this.writeToConsole = options.writeToConsole !== false;
    this.level = options.level || (process.env.NODE_ENV === 'production' ? 'INFO' : 'DEBUG');
  }

  shouldLog(level) {
    const levels = ['ERROR', 'WARN', 'INFO', 'DEBUG'];
    return levels.indexOf(level) <= levels.indexOf(this.level);
  }

  log(level, message, meta = {}) {
    if (!this.shouldLog(level)) return;

    if (this.writeToConsole) {
      writeToConsole(level, message, meta);
    }

    if (this.writeToFile) {
      writeToFile(level, message, meta);
    }
  }

  error(message, meta = {}) {
    this.log(LOG_LEVELS.ERROR, message, meta);
  }

  warn(message, meta = {}) {
    this.log(LOG_LEVELS.WARN, message, meta);
  }

  info(message, meta = {}) {
    this.log(LOG_LEVELS.INFO, message, meta);
  }

  debug(message, meta = {}) {
    this.log(LOG_LEVELS.DEBUG, message, meta);
  }

  // Log HTTP requests
  logRequest(req, res, responseTime) {
    const meta = {
      method: req.method,
      url: req.originalUrl,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      statusCode: res.statusCode,
      responseTime: `${responseTime}ms`
    };

    const level = res.statusCode >= 400 ? LOG_LEVELS.ERROR : LOG_LEVELS.INFO;
    this.log(level, `${req.method} ${req.originalUrl}`, meta);
  }

  // Log contact form submissions
  logContactSubmission(contactData, success = true) {
    const meta = {
      email: contactData.email,
      name: contactData.name,
      subject: contactData.subject,
      service: contactData.service,
      success
    };

    if (success) {
      this.info('Contact form submitted successfully', meta);
    } else {
      this.error('Contact form submission failed', meta);
    }
  }

  // Log email sending
  logEmailSent(to, subject, success = true, error = null) {
    const meta = { to, subject };
    if (error) meta.error = error;

    if (success) {
      this.info('Email sent successfully', meta);
    } else {
      this.error('Email sending failed', meta);
    }
  }
}

// Create default logger instance
const logger = new Logger();

// Express middleware for request logging
const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const responseTime = Date.now() - start;
    logger.logRequest(req, res, responseTime);
  });
  
  next();
};

module.exports = {
  Logger,
  logger,
  requestLogger,
  LOG_LEVELS
};