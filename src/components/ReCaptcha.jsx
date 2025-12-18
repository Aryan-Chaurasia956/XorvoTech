import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

/**
 * ReCAPTCHA component wrapper for Google reCAPTCHA v2
 * @param {Object} props - Component props
 * @param {Function} props.onChange - Callback function when reCAPTCHA value changes
 * @param {Function} props.onExpired - Callback function when reCAPTCHA expires
 * @param {Function} props.onError - Callback function when reCAPTCHA encounters an error
 * @param {string} props.theme - Theme for reCAPTCHA ('light' or 'dark')
 * @param {string} props.size - Size of reCAPTCHA ('normal', 'compact', or 'invisible')
 * @param {string} props.className - Additional CSS classes
 */
const ReCaptcha = forwardRef(({
  onChange,
  onExpired,
  onError,
  theme = 'light',
  size = 'normal',
  className = ''
}, ref) => {
  const recaptchaRef = useRef(null);

  // Get site key from environment variables
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    // Reset the reCAPTCHA
    reset: () => {
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
    },
    
    // Get the current reCAPTCHA value
    getValue: () => {
      if (recaptchaRef.current) {
        return recaptchaRef.current.getValue();
      }
      return null;
    },
    
    // Execute reCAPTCHA (for invisible reCAPTCHA)
    execute: () => {
      if (recaptchaRef.current) {
        return recaptchaRef.current.execute();
      }
      return null;
    }
  }));

  // Handle reCAPTCHA change
  const handleChange = (value) => {
    if (onChange) {
      onChange(value);
    }
  };

  // Handle reCAPTCHA expiration
  const handleExpired = () => {
    if (onExpired) {
      onExpired();
    }
  };

  // Handle reCAPTCHA error
  const handleError = () => {
    if (onError) {
      onError();
    }
  };

  // Show error if site key is not configured
  if (!siteKey) {
    return (
      <div className={`p-4 bg-red-50 border border-red-200 rounded-md ${className}`}>
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              reCAPTCHA Configuration Error
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <p>
                reCAPTCHA site key is not configured. Please add VITE_RECAPTCHA_SITE_KEY to your environment variables.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`recaptcha-container ${className}`}>
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={siteKey}
        onChange={handleChange}
        onExpired={handleExpired}
        onError={handleError}
        theme={theme}
        size={size}
      />
    </div>
  );
});

ReCaptcha.displayName = 'ReCaptcha';

export default ReCaptcha;