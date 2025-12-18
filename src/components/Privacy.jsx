import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Privacy = () => {
  const location = useLocation();

  useEffect(() => {
    const sectionMap = {
      '/privacy-policy': 'privacy',
      '/terms': 'terms',
      '/disclaimer': 'disclaimer',
      '/cookies': 'cookies',
    };
    const id = sectionMap[location.pathname];
    if (id) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location.pathname]);

  return (
    <main className="min-h-screen bg-background pt-24 sm:pt-28 pb-16 sm:pb-24">
      {/* Header */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">LEGAL &amp; POLICY PAGES — XORVO TECHNOLOGIES</h1>
      </section>

      {/* 1. Privacy Policy */}
      <section id="privacy" className="border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-xl font-semibold">1. Privacy Policy — Data Handling &amp; User Consent</h2>
          <p className="mt-4 text-muted-foreground">
            Xorvo Technologies values your privacy and protects your data with the highest level of transparency and care.
          </p>
          <p className="mt-2 text-muted-foreground">
            We collect only the information necessary to deliver our services, improve user experience, and maintain communication with our clients.
          </p>

          <div className="mt-6">
            <h3 className="font-medium">What We Collect:</h3>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>Contact details (name, email, phone) shared through forms or communication channels.</li>
              <li>Technical information (browser, device, and location data) for website optimization.</li>
              <li>Business details necessary for service delivery and project execution.</li>
            </ul>
          </div>

          <div className="mt-6">
            <h3 className="font-medium">How We Use Your Information:</h3>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>To respond to inquiries and provide requested services.</li>
              <li>To enhance website functionality and client experience.</li>
              <li>To maintain lawful communication and marketing (with consent).</li>
            </ul>
          </div>

          <div className="mt-6">
            <h3 className="font-medium">Data Security:</h3>
            <p className="mt-2 text-muted-foreground">
              All personal data is stored securely using industry-standard encryption and restricted access protocols.
            </p>
            <p className="mt-2 text-muted-foreground">
              We do not sell, rent, or distribute personal data to any third party without explicit consent.
            </p>
          </div>

          <div className="mt-6">
            <p className="text-muted-foreground">For any data-related queries:</p>
            <p className="mt-1"><a href="mailto:privacy@xorvotechnologies.com" className="text-blue-600 hover:underline">privacy@xorvotechnologies.com</a></p>
          </div>

          <div className="mt-6">
            <Link to="/contact" className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
              Contact Data Officer <span className="ml-2" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Terms & Conditions */}
      <section id="terms" className="border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-xl font-semibold">2. Terms &amp; Conditions — Service &amp; Website Usage</h2>
          <p className="mt-4 text-muted-foreground">By accessing or using the Xorvo Technologies website, you agree to the following terms:</p>

          <div className="mt-6">
            <h3 className="font-medium">Usage Rights:</h3>
            <p className="mt-2 text-muted-foreground">
              All content, materials, and visuals on this website are the property of Xorvo Technologies and protected by copyright laws.
            </p>
            <p className="mt-2 text-muted-foreground">Reproduction, distribution, or modification without written permission is prohibited.</p>
          </div>

          <div className="mt-6">
            <h3 className="font-medium">Service Agreements:</h3>
            <p className="mt-2 text-muted-foreground">
              Engagements with Xorvo Technologies are governed by specific project contracts and service-level agreements (SLAs).
            </p>
            <p className="mt-2 text-muted-foreground">
              Website content is provided for informational purposes and does not constitute a binding offer or warranty.
            </p>
          </div>

          <div className="mt-6">
            <h3 className="font-medium">Liability:</h3>
            <p className="mt-2 text-muted-foreground">
              While we maintain accurate and updated information, Xorvo Technologies is not responsible for any direct or indirect damages arising from the use of this website or its content.
            </p>
          </div>

          <div className="mt-6">
            <Link to="/" className="inline-flex items-center rounded-md border px-4 py-2 hover:bg-gray-50">
              Back to Home <span className="ml-2" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Legal Disclaimer */}
      <section id="disclaimer" className="border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-xl font-semibold">3. Legal Disclaimer — Accuracy, Liability &amp; Ownership</h2>
          <p className="mt-4 text-muted-foreground">All information on this website is provided in good faith for general informational purposes only.</p>
          <p className="mt-2 text-muted-foreground">Xorvo Technologies makes no warranty of completeness, reliability, or accuracy of this content.</p>
          <p className="mt-2 text-muted-foreground">Any actions taken based on information from this site are at the user’s discretion.</p>
          <p className="mt-2 text-muted-foreground">External links (if any) may lead to third-party sites, over which we have no control or responsibility.</p>

          <div className="mt-6">
            <h3 className="font-medium">Intellectual Property:</h3>
            <p className="mt-2 text-muted-foreground">
              All product names, logos, and brand references belong to their respective owners. Use of such marks does not imply partnership or endorsement unless explicitly stated.
            </p>
          </div>

          <div className="mt-6">
            <Link to="/about" className="inline-flex items-center rounded-md border px-4 py-2 hover:bg-gray-50">
              Visit About Us <span className="ml-2" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Cookie Policy */}
      <section id="cookies" className="border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-xl font-semibold">4. Cookie Policy — Usage, Analytics &amp; Preferences</h2>
          <p className="mt-4 text-muted-foreground">
            Xorvo Technologies uses cookies to enhance functionality, analyze performance, and personalize user experience.
          </p>

          <div className="mt-6">
            <h3 className="font-medium">Types of Cookies Used:</h3>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>Essential Cookies: Required for basic website operation.</li>
              <li>Analytics Cookies: Help analyze traffic patterns and site performance.</li>
              <li>Preference Cookies: Remember your settings and language preferences.</li>
            </ul>
          </div>

          <p className="mt-6 text-muted-foreground">
            You can choose to disable cookies via your browser settings, though some site features may not function properly.
          </p>
          <p className="mt-2 text-muted-foreground">
            By continuing to browse, you consent to our cookie usage as per this policy.
          </p>

          <div className="mt-6">
            <Link to="/contact" className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
              Manage Cookie Settings <span className="ml-2" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-xl font-semibold">Closing Section (Optional for Footer Integration)</h2>
          <p className="mt-3 text-muted-foreground">
            Xorvo Technologies is committed to transparency, compliance, and trust. Our policies ensure that every user interaction and engagement remains secure, ethical, and aligned with global data protection standards.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/privacy-policy" className="inline-flex items-center rounded-md border px-4 py-2 hover:bg-gray-50">
              Privacy Policy <span className="ml-2" aria-hidden="true">→</span>
            </Link>
            <Link to="/terms" className="inline-flex items-center rounded-md border px-4 py-2 hover:bg-gray-50">
              Terms &amp; Conditions <span className="ml-2" aria-hidden="true">→</span>
            </Link>
            <Link to="/disclaimer" className="inline-flex items-center rounded-md border px-4 py-2 hover:bg-gray-50">
              Legal Disclaimer <span className="ml-2" aria-hidden="true">→</span>
            </Link>
            <Link to="/cookies" className="inline-flex items-center rounded-md border px-4 py-2 hover:bg-gray-50">
              Cookie Policy <span className="ml-2" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Privacy;
