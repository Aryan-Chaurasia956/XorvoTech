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

      {/* FAQ Section */}
      <section className="py-20 px-4 md:px-8 lg:px-12 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#727CAB' }}>Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about our data protection and compliance services, GDPR and HIPAA compliance, partnerships with security vendors, and how we safeguard your sensitive information
            </p>
          </div>

          <div className="space-y-6">
            {/* FAQ 1 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <button className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">What data protection and compliance services does Xorvo Technologies offer?</h3>
                <svg className="w-5 h-5 text-gray-500 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="px-8 pb-6">
                <div className="text-gray-600 space-y-4">
                  <p>Xorvo Technologies provides comprehensive data protection and compliance services including GDPR compliance implementation, HIPAA security solutions, PCI DSS compliance, ISO 27001 certification support, data loss prevention (DLP), encryption services, and privacy impact assessments. We partner with leading security vendors like Fortinet, Palo Alto Networks, CrowdStrike, and ESET to deliver enterprise-grade data protection.</p>
                  <p>Our services encompass data classification, access control management, security policy development, compliance auditing, risk assessments, and continuous monitoring. We help organizations protect sensitive data, meet regulatory requirements, and maintain customer trust through robust privacy and security frameworks.</p>
                </div>
              </div>
            </div>

            {/* FAQ 2 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <button className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">How do you ensure GDPR compliance for businesses?</h3>
                <svg className="w-5 h-5 text-gray-500 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="px-8 pb-6">
                <div className="text-gray-600 space-y-4">
                  <p>Our GDPR compliance services include comprehensive gap analysis, data mapping, privacy policy development, consent management implementation, data subject rights procedures, and breach notification protocols. We implement technical and organizational measures including encryption, pseudonymization, access controls, and audit logging to ensure GDPR compliance.</p>
                  <p>We provide Data Protection Officer (DPO) services, privacy impact assessments, vendor compliance management, and employee training programs. Our team helps you maintain Records of Processing Activities (ROPA), implement privacy by design principles, and establish data protection frameworks that adapt to evolving regulatory requirements.</p>
                </div>
              </div>
            </div>

            {/* FAQ 3 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <button className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">Which security partners and technologies do you use for data protection?</h3>
                <svg className="w-5 h-5 text-gray-500 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="px-8 pb-6">
                <div className="text-gray-600 space-y-4">
                  <p>We partner with industry-leading security vendors to provide comprehensive data protection solutions. Our network security partners include Fortinet and Palo Alto Networks for next-generation firewalls and intrusion prevention. For endpoint protection, we utilize CrowdStrike, ESET, and Kaspersky for advanced malware detection and prevention.</p>
                  <p>Our data protection partnerships include Microsoft Azure Information Protection, Varonis for data security, and specialized DLP solutions. We work with Veeam for secure backup and recovery, and maintain relationships with compliance-focused vendors to ensure access to the latest data protection technologies and threat intelligence.</p>
                </div>
              </div>
            </div>

            {/* FAQ 4 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <button className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">How do you implement HIPAA compliance for healthcare organizations?</h3>
                <svg className="w-5 h-5 text-gray-500 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="px-8 pb-6">
                <div className="text-gray-600 space-y-4">
                  <p>Our HIPAA compliance services include comprehensive risk assessments, security rule implementation, privacy rule compliance, breach notification procedures, and Business Associate Agreement (BAA) management. We implement administrative, physical, and technical safeguards as required by HIPAA, including access controls, audit controls, integrity controls, and transmission security.</p>
                  <p>We provide HIPAA training for healthcare staff, policy and procedure development, security awareness programs, and ongoing compliance monitoring. Our team ensures electronic Protected Health Information (ePHI) is properly encrypted, access is logged and monitored, and all systems meet the technical requirements of the HIPAA Security Rule.</p>
                </div>
              </div>
            </div>

            {/* FAQ 5 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <button className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">What data loss prevention (DLP) solutions do you implement?</h3>
                <svg className="w-5 h-5 text-gray-500 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="px-8 pb-6">
                <div className="text-gray-600 space-y-4">
                  <p>Our DLP solutions utilize enterprise-grade platforms from Microsoft, Forcepoint, and specialized security vendors to prevent unauthorized data exfiltration. We implement data classification, content inspection, policy enforcement, and real-time monitoring across endpoints, networks, and cloud environments. Our DLP strategies include data discovery, sensitive data tracking, and automated response to potential data breaches.</p>
                  <p>We configure DLP policies to detect and block unauthorized transfers of confidential information, implement encryption for sensitive data, and provide detailed reporting and alerting. Our solutions cover data in motion, data at rest, and data in use, ensuring comprehensive protection against both accidental and malicious data loss.</p>
                </div>
              </div>
            </div>

            {/* FAQ 6 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <button className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">How do you handle PCI DSS compliance for payment processing?</h3>
                <svg className="w-5 h-5 text-gray-500 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="px-8 pb-6">
                <div className="text-gray-600 space-y-4">
                  <p>Our PCI DSS compliance services cover all 12 requirements of the Payment Card Industry Data Security Standard. We implement network security, cardholder data protection, vulnerability management, access control measures, network monitoring, and information security policies. We help achieve and maintain PCI compliance through gap analysis, remediation planning, and validation support.</p>
                  <p>We provide secure payment processing architecture, tokenization solutions, encryption implementation, and secure coding practices for payment applications. Our team conducts quarterly vulnerability scans, annual penetration testing, and maintains documentation required for PCI DSS validation with Qualified Security Assessors (QSAs).</p>
                </div>
              </div>
            </div>

            {/* FAQ 7 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <button className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">What encryption and key management services do you provide?</h3>
                <svg className="w-5 h-5 text-gray-500 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="px-8 pb-6">
                <div className="text-gray-600 space-y-4">
                  <p>Our encryption services include comprehensive data protection for data at rest, in transit, and in use. We implement AES-256 encryption for databases and files, TLS/SSL for network communications, email encryption, and full disk encryption for endpoints. We utilize Microsoft BitLocker, Azure Information Protection, and enterprise encryption solutions from partners like Thales and Gemalto.</p>
                  <p>Our key management services include Hardware Security Module (HSM) implementation, key lifecycle management, secure key generation and distribution, and compliance with encryption standards. We implement proper key rotation policies, secure key storage, and disaster recovery procedures for encrypted data to ensure business continuity while maintaining security.</p>
                </div>
              </div>
            </div>

            {/* FAQ 8 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <button className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">How do you conduct compliance audits and assessments?</h3>
                <svg className="w-5 h-5 text-gray-500 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="px-8 pb-6">
                <div className="text-gray-600 space-y-4">
                  <p>Our compliance audit services include comprehensive assessments against GDPR, HIPAA, PCI DSS, ISO 27001, SOC 2, and other regulatory frameworks. We conduct gap analysis, risk assessments, policy reviews, technical evaluations, and documentation audits. Our team provides detailed findings, remediation plans, and implementation support to address compliance gaps.</p>
                  <p>We offer pre-audit preparation, continuous compliance monitoring, and support during external audits by certification bodies. Our assessments include security control testing, vulnerability assessments, penetration testing, and employee awareness evaluations. We provide comprehensive reporting and maintain evidence of compliance for regulatory requirements.</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link to="/?contact=true&compliance=true" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-orange-700 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
              <span>Get a Free Compliance Assessment</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>

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
