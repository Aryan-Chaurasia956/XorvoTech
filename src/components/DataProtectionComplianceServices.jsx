import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import "./Services.css"

const DataProtectionComplianceServices = () => {
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
      {/* Data Protection & Compliance Services - Full Screen Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-white services-hero-3">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{backgroundImage: "url('https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"}}></div>
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-gray-800/60 to-gray-900/80"></div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-12">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            {/* Headline with animation */}
            <h1 className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ fontFamily: "'Roboto', 'Arial', sans-serif" }}>
              <span className="block text-white mb-4">
                DATA PROTECTION &
              </span>
              <span className="block text-white">
                COMPLIANCE
              </span>
            </h1>

            {/* Subtitle */}
            <p className={`text-xl md:text-2xl lg:text-3xl text-gray-200 max-w-4xl mx-auto transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Safeguard your critical data and ensure regulatory compliance with comprehensive protection strategies. Our expert solutions protect your business from data breaches, ensure compliance with industry standards, and maintain business continuity through robust disaster recovery planning.
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <Link to="/?contact=true">
                <button type="button" className="bg-[#727CAB] text-white hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 font-semibold rounded-lg text-lg px-8 py-4 text-center transition-all duration-300 hover:shadow-xl hover:scale-105">
                  Talk to a Compliance Expert
                </button>
              </Link>
              <Link to="#data-protection-cards">
                <button type="button" className="border-2 border-white text-white hover:bg-white hover:text-[#727CAB] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 font-semibold rounded-lg text-lg px-8 py-4 text-center transition-all duration-300 hover:shadow-xl hover:scale-105">
                  View Data Protection Services
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

      <div className='noah services-cards' id="data-protection-cards">
        {/* Backup & Recovery */}
        <div id="backup-recovery" className='john' data-heading='Backup & Recovery'>
          <div className='text-2xl'>Backup & Recovery</div>
          <div>Enterprise-grade backup and disaster recovery solutions to protect your critical business data and ensure business continuity. Our comprehensive backup strategies safeguard your organization against data loss, system failures, and cyber threats.</div>
          
          <div>We implement automated backup solutions with point-in-time recovery, offsite storage, and rapid restoration capabilities. Our disaster recovery plans ensure minimal downtime and quick recovery of critical systems and data in any disruption scenario.</div>
          
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Prevents catastrophic data loss from system failures or cyber attacks</li>
            <li>• Ensures business continuity with rapid recovery capabilities</li>
            <li>• Protects against ransomware with immutable backup solutions</li>
            <li>• Meets regulatory requirements for data retention and availability</li>
            <li>• Reduces financial impact of downtime and data breaches</li>
          </ul>
          <div className='center-row'>
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* Data Loss Prevention */}
        <div id="dlp" className='felix' data-heading='Data Loss Prevention'>
          <div className='text-2xl'>DLP (Data Loss Prevention)</div>
          <div>Advanced Data Loss Prevention solutions to monitor, detect, and prevent unauthorized data exfiltration. Our DLP strategies protect sensitive information from accidental or malicious data leaks while maintaining legitimate business operations.</div>
          
          <div>We deploy comprehensive DLP systems that classify sensitive data, monitor data movement across networks and endpoints, and enforce policies to prevent unauthorized data transfers. Our solutions provide real-time visibility and control over your organization's critical information assets.</div>
          
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Prevents sensitive data from leaving your organization unauthorized</li>
            <li>• Protects intellectual property and competitive advantages</li>
            <li>• Ensures compliance with data protection regulations</li>
            <li>• Reduces risk of data breaches and financial penalties</li>
            <li>• Provides visibility into data flow across the organization</li>
          </ul>
          <div className='center-row'>
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* Compliance Audits */}
        <div id="compliance-audits" className='akash' data-heading='Compliance Audits'>
          <div className='text-2xl'>Compliance Audits</div>
          <div>Comprehensive compliance audit services to ensure your organization meets industry standards and regulatory requirements. Our expert auditors evaluate your systems, processes, and controls against various compliance frameworks including GDPR, HIPAA, PCI DSS, and more.</div>
          
          <div>We conduct thorough assessments of your security posture, data handling practices, and governance frameworks. Our audit reports provide detailed findings, remediation recommendations, and roadmaps to achieve and maintain compliance with relevant regulations and standards.</div>
          
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Ensures adherence to regulatory requirements and industry standards</li>
            <li>• Reduces risk of regulatory fines and legal penalties</li>
            <li>• Builds trust with customers and partners through compliance</li>
            <li>• Identifies security gaps and areas for improvement</li>
            <li>• Provides documentation for regulatory reviews and certifications</li>
          </ul>
          <div className='center-row'>
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* Encryption & Key Management */}
        <div id="encryption-key" className='john' data-heading='Encryption & Key Management'>
          <div className='text-2xl'>Encryption & Key Management</div>
          <div>Robust encryption solutions and comprehensive key management to protect your data at rest, in transit, and in use. Our encryption strategies ensure that even if data is compromised, it remains unreadable and unusable to unauthorized parties.</div>
          
          <div>We implement enterprise-grade encryption across all data stores, communications channels, and endpoints. Our key management solutions provide secure key generation, storage, rotation, and access control to maintain the integrity and confidentiality of your encrypted data.</div>
          
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Protects sensitive data even if systems are compromised</li>
            <li>• Ensures compliance with data protection regulations</li>
            <li>• Provides defense-in-depth security strategy</li>
            <li>• Safeguards data throughout its entire lifecycle</li>
            <li>• Reduces impact of data breaches through encryption</li>
          </ul>
          <div className='center-row'>
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* DR Planning & Testing */}
        <div id="dr-planning" className='felix' data-heading='DR Planning & Testing'>
          <div className='text-2xl'>DR Planning & Testing</div>
          <div>Comprehensive Disaster Recovery planning and regular testing to ensure your business can quickly recover from any disruption. Our DR strategies minimize downtime, protect critical operations, and maintain business continuity under any circumstances.</div>
          
          <div>We develop detailed disaster recovery plans, establish recovery time objectives (RTO) and recovery point objectives (RPO), and conduct regular testing to validate recovery procedures. Our DR solutions include failover systems, backup sites, and automated recovery processes.</div>
          
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Ensures business continuity during disasters and disruptions</li>
            <li>• Minimizes downtime and financial impact of outages</li>
            <li>• Provides confidence in recovery capabilities through testing</li>
            <li>• Protects brand reputation and customer trust</li>
            <li>• Meets regulatory requirements for disaster preparedness</li>
          </ul>
          <div className='center-row'>
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 lg:px-12 bg-gradient-to-br from-gray-900 via-orange-900 to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Secure Your Data?
          </h2>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Protect your critical data and ensure regulatory compliance with our comprehensive data protection and compliance solutions. Our experts are ready to implement robust security frameworks that safeguard your business from threats and ensure compliance with industry standards.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] text-white hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 font-semibold rounded-lg text-lg px-8 py-4 text-center transition-all duration-300 hover:shadow-xl hover:scale-105">
                Get Data Protection Assessment
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

export default DataProtectionComplianceServices;
