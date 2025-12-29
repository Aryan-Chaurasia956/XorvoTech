import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Linkedin, Instagram, Facebook, Twitter } from "lucide-react";
import ReCaptcha from "./ReCaptcha";

const ContactSection = () => {
  const recaptchaRef = useRef(null);
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    jobTitle: "",
    countryCode: "+1",
    phoneNumber: "",
    companyName: "",
    country: "",
    contactType: "client",
    challenges: [],
    message: "",
    marketingConsent: false,
    recaptchaToken: "",
  });

  // Check URL parameters for partner selection
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('partner') === 'true') {
      setFormData(prev => ({
        ...prev,
        contactType: "partner"
      }));
    }
  }, [location.search]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  const [errors, setErrors] = useState({});

  const challenges = [
    "Cybersecurity Services",
    "Cloud & Infrastructure",
    "Managed IT Services",
    "Workspace & Collaboration",
    "Data Protection & Compliance",
    "IT Consulting & Deployment",
    "Others"
  ];

  const countryCodes = [
    { code: "+1", country: "US/Canada" },
    { code: "+44", country: "UK" },
    { code: "+91", country: "India" },
    { code: "+61", country: "Australia" },
    { code: "+81", country: "Japan" },
    { code: "+86", country: "China" },
    { code: "+49", country: "Germany" },
    { code: "+33", country: "France" },
    { code: "+39", country: "Italy" },
    { code: "+34", country: "Spain" },
    { code: "+7", country: "Russia" },
    { code: "+55", country: "Brazil" },
    { code: "+27", country: "South Africa" },
    { code: "+971", country: "UAE" },
    { code: "+65", country: "Singapore" },
  ];

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    return nameRegex.test(name);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{6,15}$/;
    return phoneRegex.test(phone);
  };

  const validateField = (name, value) => {
    let error = '';
    
    // Check if field is required and empty
    const requiredFields = ['email', 'firstName', 'lastName', 'jobTitle', 'phoneNumber', 'companyName', 'country', 'message'];
    if (requiredFields.includes(name) && (!value || value.toString().trim() === '')) {
      error = 'This field is required';
      return error;
    }
    
    // Special validation for challenges array
    if (name === 'challenges' && (!value || value.length === 0)) {
      error = 'Please select at least one challenge';
      return error;
    }
    
    switch(name) {
      case 'email':
        if (value && !validateEmail(value)) {
          error = 'Invalid email format';
        }
        break;
      case 'firstName':
      case 'lastName':
        if (value && !validateName(value)) {
          error = 'Only letters allowed (2-50 characters)';
        }
        break;
      case 'phoneNumber':
        if (value && !validatePhone(value)) {
          error = 'Only numbers allowed (6-15 digits)';
        }
        break;
      case 'jobTitle':
      case 'companyName':
        if (value && (value.length < 2 || value.length > 100)) {
          error = 'Must be 2-100 characters';
        }
        break;
      case 'country':
        if (value && value === 'Select a country') {
          error = 'Please select a valid country';
        }
        break;
      case 'message':
        if (value && (value.length < 10 || value.length > 1000)) {
          error = 'Message must be 10-1000 characters';
        }
        break;
      default:
        break;
    }
    
    return error;
  };

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    
    // Validate on change
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleCheckboxChange = (challenge) => {
    const newChallenges = formData.challenges.includes(challenge)
      ? formData.challenges.filter((c) => c !== challenge)
      : [...formData.challenges, challenge];
    
    setFormData((prev) => ({
      ...prev,
      challenges: newChallenges,
    }));
    
    // Validate challenges field
    const error = validateField('challenges', newChallenges);
    setErrors(prev => ({
      ...prev,
      challenges: error
    }));
  };

  // Handle reCAPTCHA change
  const handleRecaptchaChange = (token) => {
    setFormData(prev => ({
      ...prev,
      recaptchaToken: token || ""
    }));
    
    // Clear reCAPTCHA error if token is provided
    if (token) {
      setErrors(prev => ({
        ...prev,
        recaptcha: ""
      }));
    }
  };

  // Handle reCAPTCHA expiration
  const handleRecaptchaExpired = () => {
    setFormData(prev => ({
      ...prev,
      recaptchaToken: ""
    }));
    setErrors(prev => ({
      ...prev,
      recaptcha: "reCAPTCHA has expired. Please verify again."
    }));
  };

  // Handle reCAPTCHA error
  const handleRecaptchaError = () => {
    setFormData(prev => ({
      ...prev,
      recaptchaToken: ""
    }));
    setErrors(prev => ({
      ...prev,
      recaptcha: "reCAPTCHA verification failed. Please try again."
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all required fields
    const requiredFields = ['email', 'firstName', 'lastName', 'jobTitle', 'phoneNumber', 'companyName', 'country', 'message'];
    const newErrors = {};
    let hasErrors = false;
    
    // Check all required fields
    requiredFields.forEach(field => {
      const value = formData[field];
      if (!value || value.toString().trim() === '' || (field === 'country' && value === 'Select a country')) {
        newErrors[field] = 'This field is required';
        hasErrors = true;
      } else {
        // Validate field format if not empty
        const error = validateField(field, value);
        if (error) {
          newErrors[field] = error;
          hasErrors = true;
        }
      }
    });
    
    // Check challenges field separately
    if (!formData.challenges || formData.challenges.length === 0) {
      newErrors.challenges = 'Please select at least one challenge';
      hasErrors = true;
    }
    
    // Check reCAPTCHA token
    if (!formData.recaptchaToken || formData.recaptchaToken.trim() === '') {
      newErrors.recaptcha = 'Please complete the reCAPTCHA verification';
      hasErrors = true;
    }
    
    // Check existing validation errors
    const existingErrors = Object.values(errors).some(error => error !== '');
    if (hasErrors || existingErrors) {
      setErrors(newErrors);
      setSubmitStatus('error');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Send all frontend form data to match the frontend structure
      const submissionData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        jobTitle: formData.jobTitle,
        countryCode: formData.countryCode,
        phoneNumber: formData.phoneNumber,
        companyName: formData.companyName,
        country: formData.country,
        contactType: formData.contactType,
        challenges: formData.challenges,
        message: formData.message,
        marketingConsent: formData.marketingConsent,
        recaptchaToken: formData.recaptchaToken,
        // Also include the combined fields for backend compatibility
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        phone: formData.phoneNumber ? `${formData.countryCode}${formData.phoneNumber}` : '',
        company: formData.companyName || '',
        subject: formData.challenges.length > 0 ? formData.challenges.join(', ') : 'General Inquiry',
        service: 'cybersecurity', // Default service
        newsletter: formData.marketingConsent
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://xorvo-website.vercel.app'}/api/contact/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus('success');
        // Reset form and errors on success
        setFormData({
          email: "",
          firstName: "",
          lastName: "",
          jobTitle: "",
          countryCode: "+1",
          phoneNumber: "",
          companyName: "",
          country: "",
          contactType: "client",
          challenges: [],
          message: "",
          marketingConsent: false,
          recaptchaToken: "",
        });
        setErrors({});
        // Reset reCAPTCHA
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
      } else {
        setSubmitStatus('error');
        console.error('Submission failed:', data.message || 'Unknown error');
        // Reset reCAPTCHA on error
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
        setFormData(prev => ({ ...prev, recaptchaToken: "" }));
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      // Reset reCAPTCHA on error
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
      setFormData(prev => ({ ...prev, recaptchaToken: "" }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-section" className="bg-gradient-to-r from-[#001f3f] via-[#003366] to-[#001f3f] text-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Rostex', 'Arial Black', sans-serif" }}>
                Ready to <span className="text-gray-300">get started?</span>
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                We're here to help. Reach out to schedule an introductory call with one of our team members
                and learn more about how Xorvo can benefit your organization.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information:</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg">+91 97929 08405</span>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                  <span className="text-lg">tech@avinyax.com</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                  <div className="text-lg">
                    <p className="font-semibold mb-2">Registered Office:</p>
                    <p className="text-gray-300">403 B Wing, Vakola Bridge, Santacruz, Mumbai MH – 400055</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                  <div className="text-lg">
                    <p className="font-semibold mb-2">Corporate Office:</p>
                    <p className="text-gray-300">Majestic Signia, 1st Floor, Plot No. A-27, Sector 62 Noida UP- 201309</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="text-xl font-bold mb-4">Follow Us:</h4>
                <div className="flex gap-4">
                  <a
                    href="https://www.linkedin.com/company/xorvo-technologies-private-limited/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    <Linkedin className="h-6 w-6" />
                  </a>
                  <a
                    href="https://www.instagram.com/xorvo_tech/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=61579183072232"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a
                    href="https://x.com/xorvotechno"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    <Twitter className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-white rounded-lg p-8 text-gray-900">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Contact Type Selection */}
              <div>
                <label className="block text-sm font-medium mb-3">
                  I am contacting as: *
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="contactType"
                      value="client"
                      checked={formData.contactType === "client"}
                      onChange={(e) => handleInputChange('contactType', e.target.value)}
                      className="w-4 h-4 text-accent focus:ring-accent focus:ring-2"
                    />
                    <span className="text-sm">Client</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="contactType"
                      value="partner"
                      checked={formData.contactType === "partner"}
                      onChange={(e) => handleInputChange('contactType', e.target.value)}
                      className="w-4 h-4 text-accent focus:ring-accent focus:ring-2"
                    />
                    <span className="text-sm">Partner</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-accent outline-none ${
                      errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-accent'
                    }`}
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-accent outline-none ${
                      errors.firstName ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-accent'
                    }`}
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-accent outline-none ${
                      errors.lastName ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-accent'
                    }`}
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    required
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-accent outline-none ${
                      errors.jobTitle ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-accent'
                    }`}
                    value={formData.jobTitle}
                    onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                  />
                  {errors.jobTitle && (
                    <p className="text-red-500 text-xs mt-1">{errors.jobTitle}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Phone Number *
                  </label>
                  <div className="flex gap-2">
                    <select
                      className="w-20 px-1 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent outline-none bg-white"
                      value={formData.countryCode}
                      onChange={(e) =>
                        setFormData({ ...formData, countryCode: e.target.value })
                      }
                    >
                      {countryCodes.map((item) => (
                        <option key={item.code} value={item.code}>
                          {item.code}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      required
                      placeholder="1234567890"
                      className={`flex-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-accent outline-none ${
                        errors.phoneNumber ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-accent'
                      }`}
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    />
                  </div>
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-accent outline-none ${
                      errors.companyName ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-accent'
                    }`}
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                  />
                  {errors.companyName && (
                    <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Select Country *
                </label>
                <select
                  required
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-accent outline-none ${
                    errors.country ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-accent'
                  }`}
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                >
                  <option value="">Select a country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AU">Australia</option>
                  <option value="IN">India</option>
                  <option value="Other">Other</option>
                </select>
                {errors.country && (
                  <p className="text-red-500 text-xs mt-1">{errors.country}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">
                  What challenges are you looking to solve? *
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {challenges.map((challenge) => (
                    <label
                      key={challenge}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
                        checked={formData.challenges.includes(challenge)}
                        onChange={() => handleCheckboxChange(challenge)}
                      />
                      <span className="text-sm">{challenge}</span>
                    </label>
                  ))}
                </div>
                {errors.challenges && (
                  <p className="text-red-500 text-xs mt-1">{errors.challenges}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  How Can We Help? *
                </label>
                <textarea
                  rows="4"
                  required
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-accent outline-none resize-none ${
                    errors.message ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-accent'
                  }`}
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Tell us more about your needs..."
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                )}
              </div>

              <div className="space-y-3">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 mt-1 text-accent border-gray-300 rounded focus:ring-accent"
                    checked={formData.marketingConsent}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        marketingConsent: e.target.checked,
                      })
                    }
                  />
                  <span className="text-xs text-gray-600">
                    Yes, I would like to receive marketing emails from Xorvo about solutions that may be of interest to me.
                  </span>
                </label>
                <p className="text-xs text-gray-500">
                  By submitting this form, you agree to the{" "}
                  <Link to="/terms" className="text-accent hover:underline">
                    Xorvo Website Terms of Use
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy-policy" className="text-accent hover:underline">
                    Xorvo Privacy Policy
                  </Link>
                  .
                </p>
              </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
                  <p className="font-semibold">Success!</p>
                  <p className="text-sm">Your message has been sent successfully. We'll get back to you soon.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
                  <p className="font-semibold">Error</p>
                  <p className="text-sm">Something went wrong. Please try again later or contact us directly.</p>
                </div>
              )}

              {/* reCAPTCHA */}
              <div className="flex justify-center">
                <ReCaptcha
                  ref={recaptchaRef}
                  onChange={handleRecaptchaChange}
                  onExpired={handleRecaptchaExpired}
                  onError={handleRecaptchaError}
                />
              </div>
              {errors.recaptcha && (
                <p className="text-red-500 text-xs text-center">{errors.recaptcha}</p>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#001f3f] hover:bg-[#003366] text-white py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Submit'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
