import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import axios from "axios";
import { rateLimit } from "express-rate-limit";
import { slowDown } from "express-slow-down";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS setup
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:8081",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

// Trust first proxy for correct IP parsing under reverse proxies
app.set("trust proxy", 1);

// Rate Limiter middleware
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000, // default 15 mins
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP
  message: {
    success: false,
    message: "Too many contact form submissions from this IP. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Speed Limiter middleware (slows down responses after threshold is reached)
const speedLimiter = slowDown({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000,
  delayAfter: parseInt(process.env.SLOW_DOWN_DELAY_AFTER) || 50,
  delayMs: () => parseInt(process.env.SLOW_DOWN_DELAY_MS) || 500,
});

// Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "UP", timestamp: new Date() });
});

// Contact Form Submit Endpoint
app.post("/api/contact/submit", limiter, speedLimiter, async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    jobTitle,
    countryCode,
    phoneNumber,
    companyName,
    country,
    contactType,
    challenges,
    message,
    recaptchaToken,
  } = req.body;

  // Basic validation of fields
  if (!email || !firstName || !lastName || !message || !recaptchaToken) {
    return res.status(400).json({
      success: false,
      message: "Please fill in all required fields and complete the reCAPTCHA.",
    });
  }

  try {
    // 1. Verify reCAPTCHA token with Google API
    const recaptchaVerifyUrl = "https://www.google.com/recaptcha/api/siteverify";
    const verificationResponse = await axios.post(
      recaptchaVerifyUrl,
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: recaptchaToken,
        },
      }
    );

    const { success, score, "error-codes": errorCodes } = verificationResponse.data;

    if (!success) {
      console.warn("reCAPTCHA validation failed:", errorCodes);
      return res.status(400).json({
        success: false,
        message: "reCAPTCHA verification failed. Please try again.",
      });
    }

    // 2. Format a gorgeous HTML email body
    const formattedChallenges = Array.isArray(challenges)
      ? challenges.join(", ")
      : challenges || "None selected";

    const mailOptions = {
      from: `"${firstName} ${lastName}" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `[Xorvo Inquiry] ${contactType.toUpperCase()} - ${firstName} ${lastName} from ${companyName || "N/A"}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f9; color: #333; margin: 0; padding: 20px; }
            .container { max-width: 600px; background-color: #ffffff; margin: 0 auto; border-radius: 8px; border: 1px solid #e1e8ed; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
            .header { background-color: #001f3f; color: #ffffff; padding: 25px; text-align: center; }
            .header h2 { margin: 0; font-size: 24px; letter-spacing: 1px; }
            .badge { background-color: #ff851b; color: #ffffff; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; text-transform: uppercase; display: inline-block; margin-top: 5px; }
            .content { padding: 30px; }
            .section-title { font-size: 16px; font-weight: bold; color: #001f3f; border-bottom: 2px solid #f0f2f5; padding-bottom: 8px; margin-top: 25px; margin-bottom: 15px; }
            .info-grid { display: table; width: 100%; }
            .info-row { display: table-row; }
            .info-label { display: table-cell; font-weight: bold; color: #555; padding: 8px 10px 8px 0; width: 35%; border-bottom: 1px solid #f0f2f5; }
            .info-value { display: table-cell; color: #222; padding: 8px 0; border-bottom: 1px solid #f0f2f5; }
            .message-box { background-color: #f7f9fa; border-left: 4px solid #001f3f; padding: 15px; font-style: italic; color: #444; margin-top: 10px; line-height: 1.6; border-radius: 0 4px 4px 0; }
            .footer { background-color: #f7f9fa; text-align: center; padding: 15px; font-size: 12px; color: #777; border-top: 1px solid #e1e8ed; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Xorvo Inquiry</h2>
              <span class="badge">${contactType}</span>
            </div>
            <div class="content">
              <div class="section-title">Sender Information</div>
              <div class="info-grid">
                <div class="info-row">
                  <div class="info-label">Full Name:</div>
                  <div class="info-value">${firstName} ${lastName}</div>
                </div>
                <div class="info-row">
                  <div class="info-label">Email:</div>
                  <div class="info-value"><a href="mailto:${email}">${email}</a></div>
                </div>
                <div class="info-row">
                  <div class="info-label">Phone:</div>
                  <div class="info-value">${countryCode} ${phoneNumber || "N/A"}</div>
                </div>
                <div class="info-row">
                  <div class="info-label">Company:</div>
                  <div class="info-value">${companyName || "N/A"}</div>
                </div>
                <div class="info-row">
                  <div class="info-label">Job Title:</div>
                  <div class="info-value">${jobTitle || "N/A"}</div>
                </div>
                <div class="info-row">
                  <div class="info-label">Country:</div>
                  <div class="info-value">${country || "N/A"}</div>
                </div>
              </div>

              <div class="section-title">Challenges to Solve</div>
              <p style="margin: 0; font-size: 14px; color: #222; line-height: 1.5;">${formattedChallenges}</p>

              <div class="section-title">Message Details</div>
              <div class="message-box">
                ${message.replace(/\n/g, "<br/>")}
              </div>
            </div>
            <div class="footer">
              This is an automated notification from the Xorvo Website Contact Service.
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // 3. Send email using Nodemailer
    await transporter.sendMail(mailOptions);
    console.log("Contact form email sent successfully!");

    return res.status(200).json({
      success: true,
      message: "Your message has been sent successfully!",
    });
  } catch (error) {
    console.error("Error processing form submission:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error occurred while processing your request.",
    });
  }
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`Xorvo Contact Form Backend listening on port ${PORT}`);
});
