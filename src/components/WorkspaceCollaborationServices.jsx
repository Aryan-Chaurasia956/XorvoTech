import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import "./Services.css"

const WorkspaceCollaborationServices = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const id = location.hash ? decodeURIComponent(location.hash.slice(1)) : null;
    if (id) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Scroll to top when navigating to the page without a hash
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="bg-gradient-to-br from-cyan-50 via-blue-50 to-white">
      {/* Workspace & Collaboration Services - Full Screen Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-white services-hero-3">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"}}></div>
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-gray-800/60 to-gray-900/80"></div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-12">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            {/* Headline with animation */}
            <h1 className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ fontFamily: "'Roboto', 'Arial', sans-serif" }}>
              <span className="block text-white mb-4">
                WORKSPACE &
              </span>
              <span className="block text-white">
                COLLABORATION
              </span>
            </h1>

            {/* Subtitle */}
            <p className={`text-xl md:text-2xl lg:text-3xl text-gray-200 max-w-4xl mx-auto transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Empower your team with modern collaboration tools and seamless workspace solutions. We provide comprehensive setup, migration, and management services for leading productivity platforms to enhance teamwork and streamline business operations.
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <Link to="/?contact=true">
                <button type="button" className="bg-[#727CAB] text-white hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 font-semibold rounded-lg text-lg px-8 py-4 text-center transition-all duration-300 hover:shadow-xl hover:scale-105">
                  Talk to a Workspace Expert
                </button>
              </Link>
              <Link to="#workspace-cards">
                <button type="button" className="border-2 border-white text-white hover:bg-white hover:text-[#727CAB] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 font-semibold rounded-lg text-lg px-8 py-4 text-center transition-all duration-300 hover:shadow-xl hover:scale-105">
                  View Workspace Services
                </button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      <div className='noah services-cards' id="workspace-cards">
        {/* Microsoft 365 */}
        <div id="microsoft-365" className='john' data-heading='Microsoft 365'>
          <div className='text-2xl'>Microsoft 365</div>
          <div>Complete Microsoft 365 deployment, migration, and management services for businesses of all sizes. Our experts handle everything from initial setup to ongoing administration, ensuring your team gets the most value from Microsoft's powerful productivity suite.</div>
          
          <div>We provide comprehensive Microsoft 365 services including tenant configuration, user management, security setup, and integration with existing systems. Our team ensures seamless migration from legacy systems and provides ongoing support for optimal performance and user adoption.</div>
          
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Provides enterprise-grade productivity tools for modern businesses</li>
            <li>• Enables seamless collaboration across teams and locations</li>
            <li>• Offers robust security and compliance features</li>
            <li>• Reduces IT overhead with cloud-based infrastructure</li>
            <li>• Scales with your business growth and changing needs</li>
          </ul>
          <div className='center-row'>
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* Zoho Workspace */}
        <div id="zoho-workspace" className='felix' data-heading='Zoho Workspace'>
          <div className='text-2xl'>Zoho Workspace</div>
          <div>Comprehensive Zoho Workspace implementation and customization to streamline your business operations. We help you leverage Zoho's extensive suite of applications to create a unified ecosystem for CRM, project management, finance, and more.</div>
          
          <div>Our Zoho experts handle complete workspace setup, application configuration, custom workflows, and integration with third-party systems. We ensure your Zoho environment is optimized for your specific business processes and provides maximum ROI for your investment.</div>
          
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Offers cost-effective alternative to enterprise software suites</li>
            <li>• Provides unified platform for multiple business functions</li>
            <li>• Enables extensive customization to match business workflows</li>
            <li>• Reduces software licensing and maintenance costs</li>
            <li>• Scales from small businesses to enterprise operations</li>
          </ul>
          <div className='center-row'>
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* Google Workspace */}
        <div id="google-workspace" className='akash' data-heading='Google Workspace'>
          <div className='text-2xl'>Google Workspace</div>
          <div>Professional Google Workspace deployment and management for enhanced team collaboration and productivity. Our services ensure smooth migration, proper configuration, and optimal utilization of Google's cloud-based productivity tools.</div>
          
          <div>We handle complete Google Workspace setup including user provisioning, security configuration, Gmail migration, Drive organization, and integration with business applications. Our team provides training and ongoing support to maximize user adoption and productivity gains.</div>
          
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Delivers industry-leading collaboration and communication tools</li>
            <li>• Provides seamless access from any device or location</li>
            <li>• Offers enterprise-grade security and data protection</li>
            <li>• Reduces infrastructure costs with cloud-based solutions</li>
            <li>• Enables real-time collaboration and document sharing</li>
          </ul>
          <div className='center-row'>
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* Email Migration */}
        <div id="email-migration" className='john' data-heading='Email Migration'>
          <div className='text-2xl'>Email Migration</div>
          <div>Seamless email migration services to move your organization's email systems to modern platforms with zero downtime. Our proven methodology ensures complete data integrity, minimal disruption, and smooth transition to cloud-based email solutions.</div>
          
          <div>We specialize in migrating from legacy email systems to Microsoft 365, Google Workspace, and other modern platforms. Our migration experts handle everything from planning and preparation to execution and post-migration support, ensuring no data loss and business continuity.</div>
          
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Ensures business continuity with zero-downtime migration</li>
            <li>• Preserves all email data, contacts, and calendar information</li>
            <li>• Reduces maintenance costs and improves email reliability</li>
            <li>• Provides access to modern email features and security</li>
            <li>• Enables better mobile access and collaboration capabilities</li>
          </ul>
          <div className='center-row'>
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* Identity & Access Management */}
        <div id="identity-access" className='felix' data-heading='Identity & Access Management'>
          <div className='text-2xl'>Identity & Access (SSO, MFA)</div>
          <div>Comprehensive identity and access management solutions including Single Sign-On (SSO) and Multi-Factor Authentication (MFA) to secure your digital workspace. We implement robust security frameworks that protect user identities while providing seamless access to resources.</div>
          
          <div>Our IAM services include SSO implementation, MFA deployment, conditional access policies, and integration with directory services. We ensure secure authentication across all applications while maintaining user convenience and productivity through streamlined access management.</div>
          
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Strengthens security posture with multi-factor authentication</li>
            <li>• Reduces password-related security risks and helpdesk calls</li>
            <li>• Provides seamless user experience with single sign-on</li>
            <li>• Enables granular access control and monitoring</li>
            <li>• Ensures compliance with security regulations and standards</li>
          </ul>
          <div className='center-row'>
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* SaaS Backup */}
        <div id="saas-backup" className='akash' data-heading='SaaS Backup'>
          <div className='text-2xl'>SaaS Backup (M365/Google/Zoho)</div>
          <div>Enterprise-grade backup solutions for SaaS applications including Microsoft 365, Google Workspace, and Zoho. Our comprehensive backup services protect your critical business data from accidental deletion, ransomware attacks, and service outages.</div>
          
          <div>We implement automated backup solutions that provide point-in-time recovery for all your SaaS data including emails, documents, calendars, and application data. Our backup services ensure business continuity and data protection beyond the native retention policies of SaaS providers.</div>
          
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Protects against data loss beyond native retention limits</li>
            <li>• Provides rapid recovery from ransomware and cyber attacks</li>
            <li>• Ensures compliance with data retention requirements</li>
            <li>• Offers granular recovery options for specific items</li>
            <li>• Maintains business continuity during service outages</li>
          </ul>
          <div className='center-row'>
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-20 px-4 md:px-8 lg:px-12 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#727CAB' }}>Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about our workspace and collaboration services, Microsoft 365 and Google Workspace migrations, and partnerships with leading productivity platforms
            </p>
          </div>

          <div className="space-y-6">
            {/* FAQ 1 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <button className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">What workspace and collaboration services does Xorvo Technologies provide?</h3>
                <svg className="w-5 h-5 text-gray-500 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="px-8 pb-6">
                <div className="text-gray-600 space-y-4">
                  <p>Xorvo Technologies offers comprehensive workspace and collaboration services including Microsoft 365 migration and management, Google Workspace deployment, Zoho Workplace implementation, team communication solutions, document management systems, and video conferencing setups. We partner with Microsoft, Google, Zoho, and other leading collaboration platform providers to deliver seamless productivity solutions.</p>
                  <p>Our services encompass complete migration planning, data transfer, user training, security configuration, integration with existing systems, and ongoing management. We specialize in hybrid work environments, ensuring your team can collaborate effectively regardless of location while maintaining security and compliance standards.</p>
                </div>
              </div>
            </div>

            {/* FAQ 2 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <button className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">How do you ensure zero-downtime migration to Microsoft 365 or Google Workspace?</h3>
                <svg className="w-5 h-5 text-gray-500 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="px-8 pb-6">
                <div className="text-gray-600 space-y-4">
                  <p>Our zero-downtime migration methodology utilizes advanced migration tools from Microsoft, Google, and specialized third-party solutions to ensure seamless data transfer without business interruption. We conduct thorough pre-migration assessments, pilot migrations, and comprehensive testing to identify and resolve potential issues before the final cutover.</p>
                  <p>We implement phased migration strategies with coexistence periods, allowing gradual user transition and minimal disruption. Our team provides 24/7 monitoring during migration, rollback capabilities, and user support to address any immediate needs. We typically achieve 99.9% migration success rates with zero data loss and minimal user impact.</p>
                </div>
              </div>
            </div>

            {/* FAQ 3 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <button className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">Which collaboration platforms and partners do you specialize in?</h3>
                <svg className="w-5 h-5 text-gray-500 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="px-8 pb-6">
                <div className="text-gray-600 space-y-4">
                  <p>We are certified partners with Microsoft for Microsoft 365 (Office 365) and Azure services, Google for Google Workspace (formerly G Suite), and Zoho for Zoho Workplace. Our Microsoft partnership includes certifications in Enterprise Mobility + Security, Teams administration, and SharePoint deployment. We maintain deep expertise in these platforms' latest features and security capabilities.</p>
                  <p>Our technology ecosystem includes partnerships with communication providers like Zoom and Microsoft Teams, document management solutions, and security vendors like Fortinet and Palo Alto Networks for securing collaboration environments. These partnerships ensure we have access to enterprise support, training resources, and advanced migration tools.</p>
                </div>
              </div>
            </div>

            {/* FAQ 4 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <button className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">How do you handle data security and compliance in collaboration platforms?</h3>
                <svg className="w-5 h-5 text-gray-500 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="px-8 pb-6">
                <div className="text-gray-600 space-y-4">
                  <p>Our collaboration security framework implements comprehensive data protection including encryption for data at rest and in transit, multi-factor authentication, conditional access policies, data loss prevention (DLP), and advanced threat protection. We configure security settings in Microsoft 365, Google Workspace, and Zoho to meet industry standards and regulatory requirements.</p>
                  <p>We ensure compliance with GDPR, HIPAA, PCI DSS, and other regulations through proper data classification, retention policies, audit logging, and regular security assessments. Our team implements information protection, rights management, and secure sharing controls to prevent unauthorized data access while maintaining user productivity.</p>
                </div>
              </div>
            </div>

            {/* FAQ 5 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <button className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">What kind of user training and adoption support do you provide?</h3>
                <svg className="w-5 h-5 text-gray-500 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="px-8 pb-6">
                <div className="text-gray-600 space-y-4">
                  <p>Our user adoption programs include comprehensive training sessions tailored to different user roles and skill levels. We provide hands-on workshops, video tutorials, quick reference guides, and best practices documentation. Our training covers Microsoft 365 applications (Teams, SharePoint, OneDrive), Google Workspace tools (Gmail, Drive, Meet), and Zoho Workplace applications.</p>
                  <p>We implement change management strategies including communication plans, champion programs, and ongoing support resources. Our team provides post-migration support with help desk services, adoption metrics tracking, and continuous improvement recommendations. We typically achieve 85-90% user adoption within the first 60 days.</p>
                </div>
              </div>
            </div>

            {/* FAQ 6 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <button className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">How do you support hybrid and remote work environments?</h3>
                <svg className="w-5 h-5 text-gray-500 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="px-8 pb-6">
                <div className="text-gray-600 space-y-4">
                  <p>Our hybrid work solutions enable seamless collaboration between office-based and remote employees through unified communication platforms, cloud-based document sharing, virtual meeting rooms, and mobile device management. We implement Microsoft Teams, Zoom, or Google Meet with proper licensing, security configurations, and integration with existing phone systems.</p>
                  <p>We provide secure remote access solutions, virtual desktop infrastructure (VDI), and endpoint management for home office setups. Our team ensures consistent user experience across all locations while maintaining security compliance and performance standards. We also implement digital workspace solutions that provide single sign-on and unified access to all applications.</p>
                </div>
              </div>
            </div>

            {/* FAQ 7 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <button className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">What backup and archiving solutions do you offer for collaboration data?</h3>
                <svg className="w-5 h-5 text-gray-500 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="px-8 pb-6">
                <div className="text-gray-600 space-y-4">
                  <p>We provide comprehensive backup and archiving solutions for Microsoft 365, Google Workspace, and Zoho environments using enterprise-grade tools from Veeam, Barracuda, and other specialized backup providers. Our services include automated daily backups of emails, documents, Teams conversations, and SharePoint sites with point-in-time recovery capabilities.</p>
                  <p>Our archiving solutions ensure compliance with legal and regulatory requirements through long-term data retention, e-discovery capabilities, and litigation hold features. We implement backup strategies that protect against ransomware, accidental deletion, and service outages while maintaining data integrity and accessibility for authorized users.</p>
                </div>
              </div>
            </div>

            {/* FAQ 8 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <button className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">How do you integrate collaboration platforms with existing business systems?</h3>
                <svg className="w-5 h-5 text-gray-500 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="px-8 pb-6">
                <div className="text-gray-600 space-y-4">
                  <p>Our integration services connect collaboration platforms with your existing business systems including CRM, ERP, HR systems, and custom applications. We utilize Microsoft Power Platform, Google Workspace APIs, Zoho's integration capabilities, and third-party middleware to create seamless workflows and data synchronization across systems.</p>
                  <p>We implement custom workflows, automated processes, and unified dashboards that enhance productivity while maintaining data integrity and security. Our team ensures proper API configurations, authentication setups, and data mapping to enable efficient information flow between collaboration tools and business applications.</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link to="/?contact=true&workspace=true" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-700 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
              <span>Get a Free Workspace Assessment</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 lg:px-12 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Workspace?
          </h2>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Empower your team with modern collaboration tools and seamless workspace solutions. Our experts are ready to set up, migrate, and manage the perfect productivity ecosystem for your business needs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] text-white hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 font-semibold rounded-lg text-lg px-8 py-4 text-center transition-all duration-300 hover:shadow-xl hover:scale-105">
                Get Workspace Assessment
              </button>
            </Link>
            <Link to="/services">
              <button type="button" className="border-2 border-white text-white hover:bg-white hover:text-[#727CAB] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 font-semibold rounded-lg text-lg px-8 py-4 text-center transition-all duration-300 hover:shadow-xl hover:scale-105">
                View All Services
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkspaceCollaborationServices;
