import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import "./Services.css"

const CybersecurityServices = () => {
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
      {/* Cybersecurity Services - Full Screen Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-white services-hero">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{backgroundImage: "url('pexels-divinetechygirl-1181354.jpg')"}}></div>
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-blue-900/60 to-gray-900/80"></div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-12">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            {/* Headline with animation */}
            <h1 className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <span className="block text-white mb-4">
                CYBERSECURITY
              </span>
              <span className="block text-white">
                SERVICES
              </span>
            </h1>

            {/* Subtitle */}
            <p className={`text-xl md:text-2xl lg:text-3xl text-gray-200 max-w-4xl mx-auto transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Protect your enterprise from modern threats with our end-to-end cybersecurity solutions. We combine real-time monitoring, advanced analytics, and proactive defense to safeguard every layer of your network and data infrastructure.
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <Link to="/?contact=true">
                <button type="button" className="bg-[#727CAB] text-white hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 font-semibold rounded-lg text-lg px-8 py-4 text-center transition-all duration-300 hover:shadow-xl hover:scale-105">
                  Talk to a Security Expert
                </button>
              </Link>
              <Link to="#cybersecurity-cards">
                <button type="button" className="border-2 border-white text-white hover:bg-white hover:text-[#727CAB] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 font-semibold rounded-lg text-lg px-8 py-4 text-center transition-all duration-300 hover:shadow-xl hover:scale-105">
                  View Cybersecurity Services
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

      <div className='noah services-cards' id="cybersecurity-cards">
        {/* Network Security */}
        <div id='network-security' className='john scroll-anchor' data-heading='Network Security'>
          <div className='text-2xl'>Network Security</div>
          <div>A secure network is the foundation of every digital business. Xorvo Technologies delivers robust network security solutions that protect your infrastructure from unauthorized access, cyber intrusions, and advanced persistent threats.</div>
          
          <div>We design and implement secure network architectures using next-generation firewalls, intrusion detection and prevention systems (IDS/IPS), network segmentation, VPNs, and zero-trust principles. Our continuous monitoring and policy enforcement ensure safe data flow across on-premises, cloud, and hybrid environments.</div>
          
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Prevents unauthorized access to critical business systems</li>
            <li>• Protects sensitive data moving across internal and external networks</li>
            <li>• Reduces the risk of ransomware and network-based attacks</li>
            <li>• Ensures high availability and uninterrupted business operations</li>
            <li>• Strengthens overall IT infrastructure resilience</li>
          </ul>
          <div className='center-row'>
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* Endpoint Protection */}
        <div id='endpoint-protection' className='felix scroll-anchor' data-heading='Endpoint Protection'>
          <div className='text-2xl'>Endpoint Protection</div>
          <div>Endpoints are often the primary entry point for cyberattacks. Xorvo Technologies provides advanced endpoint protection to secure laptops, desktops, servers, and mobile devices across your organization.</div>
          
          <div>We deploy next-generation antivirus, endpoint detection and response (EDR), real-time threat monitoring, and automated containment to protect against malware, ransomware, and zero-day attacks. Our centralized management ensures complete visibility and control across office, remote, and hybrid environments.</div>
          
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Stops malware, ransomware, and zero-day threats at the device level</li>
            <li>• Secures employee devices in remote and hybrid work environments</li>
            <li>• Prevents compromised endpoints from spreading attacks internally</li>
            <li>• Protects business data stored on user devices</li>
            <li>• Improves visibility and control over all connected endpoints</li>
          </ul>
          <div className='center-row'>
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* Threat Detection & SOC */}
        <div id='threat-detection-soc' className='akash scroll-anchor' data-heading='Threat Detection & SOC'>
          <div className='text-2xl'>Threat Detection & SOC</div>
          <div>Cyber threats require constant vigilance. Xorvo's Threat Detection and SOC services provide continuous monitoring to identify and respond to security incidents in real time.</div>
          
          <div>Using SIEM, threat intelligence, behavioral analytics, and expert-led monitoring, we detect suspicious activity, investigate threats, and initiate rapid response actions. Our SOC ensures proactive defense, reduced response time, and continuous security assurance for your business.</div>
          
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Enables 24/7 monitoring of security events and suspicious activity</li>
            <li>• Detects threats early before they cause major damage</li>
            <li>• Reduces response time to cyber incidents</li>
            <li>• Provides expert-led investigation and threat containment</li>
            <li>• Ensures continuous security oversight without internal overhead</li>
          </ul>
          <div className='center-row'>
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* Vulnerability Management */}
        <div id='vulnerability-management' className='john scroll-anchor' data-heading='Vulnerability Management'>
          <div className='text-2xl'>Vulnerability Management</div>
          <div>Unidentified vulnerabilities can expose organizations to serious security risks. Xorvo's Vulnerability Management services help identify, assess, and remediate security weaknesses across your IT environment.</div>
          
          <div>We conduct regular vulnerability scans, configuration assessments, and risk-based prioritization to address critical issues efficiently. Our approach helps strengthen system security while reducing exposure to known and emerging threats.</div>
          
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Identifies security weaknesses before attackers exploit them</li>
            <li>• Prioritizes risks based on business impact</li>
            <li>• Reduces exposure to known vulnerabilities and exploits</li>
            <li>• Supports secure patching and configuration management</li>
            <li>• Strengthens long-term security posture</li>
          </ul>
          <div className='center-row'>
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* Incident Response & Forensics */}
        <div id='incident-response-forensics' className='felix scroll-anchor' data-heading='Incident Response & Forensics'>
          <div className='text-2xl'>Incident Response & Forensics</div>
          <div>When a cyber incident occurs, rapid response is critical. Xorvo provides structured incident response and digital forensics services to minimize damage and restore operations quickly.</div>
          
          <div>Our experts contain active threats, investigate the root cause, collect forensic evidence, and support recovery while ensuring regulatory and legal compliance. We help organizations recover with confidence and prevent future incidents.</div>
          
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Minimizes business disruption during cyber incidents</li>
            <li>• Quickly contains and eradicates active threats</li>
            <li>• Identifies root causes to prevent recurrence</li>
            <li>• Preserves digital evidence for compliance and legal needs</li>
            <li>• Accelerates recovery and restores normal operations</li>
          </ul>
          <div className='center-row'>
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* Email & Web Security */}
        <div id='email-web-security' className='akash scroll-anchor' data-heading='Email & Web Security'>
          <div className='text-2xl'>Email & Web Security</div>
          <div>Email and web channels remain the most common attack vectors. Xorvo delivers advanced email and web security solutions to protect users from phishing, malware, and malicious content.</div>
          
          <div>We implement secure email gateways, URL filtering, malware sandboxing, and data protection controls to ensure safe communication and browsing. Our solutions reduce human risk while safeguarding sensitive business information.</div>
          
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Prevents phishing, spam, and malicious email attacks</li>
            <li>• Protects users from unsafe websites and malicious links</li>
            <li>• Reduces risk of credential theft and data leakage</li>
            <li>• Secures daily communication channels</li>
            <li>• Lowers chances of human-driven security breaches</li>
          </ul>
          <div className='center-row'>
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* Security Awareness & Training */}
        <div id='security-awareness-training' className='john scroll-anchor' data-heading='Security Awareness & Training'>
          <div className='text-2xl'>Security Awareness & Training</div>
          <div>Technology alone cannot stop cyber threats—people play a vital role. Xorvo's Security Awareness and Training programs educate employees on identifying and responding to cyber risks.</div>
          
          <div>We deliver role-based training, phishing simulations, and awareness campaigns designed to build a strong security culture. Our programs reduce human error and strengthen your organization's first line of defense.</div>
          
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Reduces human error, the leading cause of cyber incidents</li>
            <li>• Empowers employees to identify and report threats</li>
            <li>• Strengthens the organization's first line of defense</li>
            <li>• Builds a security-first culture</li>
            <li>• Supports regulatory and compliance requirements</li>
          </ul>
          <div className='center-row'>
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* Compliance & Audit */}
        <div id='compliance-audit' className='felix scroll-anchor' data-heading='Compliance & Audit'>
          <div className='text-2xl'>Compliance & Audit</div>
          <div>Meeting regulatory requirements is essential for trust and business continuity. Xorvo supports organizations through the complete compliance and audit lifecycle.</div>
          
          <div>We provide gap analysis, policy development, risk assessments, audit preparation, and continuous compliance management aligned with global standards. Our services help organizations achieve compliance while strengthening overall security governance.</div>
          
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Ensures adherence to industry regulations and standards</li>
            <li>• Reduces legal and financial risks of non-compliance</li>
            <li>• Demonstrates commitment to security best practices</li>
            <li>• Supports customer trust and business partnerships</li>
            <li>• Provides structured approach to continuous compliance</li>
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
              Everything you need to know about our cybersecurity services, partnerships, and how we protect your business from evolving threats
            </p>
          </div>

          <div className="space-y-6">
            {/* FAQ 1 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <button className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">What cybersecurity services does Xorvo Technologies offer?</h3>
                <svg className="w-5 h-5 text-gray-500 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="px-8 pb-6">
                <div className="text-gray-600 space-y-4">
                  <p>Xorvo Technologies provides comprehensive cybersecurity services including network security, endpoint protection, cloud security, threat detection and response, vulnerability management, security compliance, and incident response. We partner with industry leaders like Fortinet, Palo Alto Networks, CrowdStrike, Check Point, Sophos, and ESET to deliver enterprise-grade protection.</p>
                  <p>Our services cover everything from firewall management and intrusion detection to advanced threat hunting, security awareness training, and 24/7 security monitoring. We also specialize in VPS security, ensuring your virtual private servers are hardened against attacks while maintaining optimal performance.</p>
                </div>
              </div>
            </div>

            {/* FAQ 2 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <button className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">How do you ensure 24/7 security monitoring?</h3>
                <svg className="w-5 h-5 text-gray-500 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="px-8 pb-6">
                <div className="text-gray-600 space-y-4">
                  <p>Our 24/7 security monitoring is powered by advanced Security Information and Event Management (SIEM) systems combined with our Security Operations Center (SOC) staffed by certified security professionals. We utilize AI-powered threat detection from partners like CrowdStrike and Palo Alto Networks to identify potential threats in real-time.</p>
                  <p>We implement automated incident response playbooks, continuous vulnerability scanning, and proactive threat hunting. Our monitoring covers all endpoints, network traffic, cloud environments, and VPS infrastructure, ensuring immediate detection and response to security incidents across your entire IT ecosystem.</p>
                </div>
              </div>
            </div>

            {/* FAQ 3 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <button className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">Which cybersecurity partners and technologies do you use?</h3>
                <svg className="w-5 h-5 text-gray-500 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="px-8 pb-6">
                <div className="text-gray-600 space-y-4">
                  <p>We partner with the world's leading cybersecurity companies to provide best-in-class protection. Our key partners include Fortinet for next-generation firewalls and network security, Palo Alto Networks for advanced threat prevention, CrowdStrike for endpoint detection and response, Check Point for comprehensive security solutions, Sophos for synchronized security, and ESET for advanced malware protection.</p>
                  <p>We also integrate solutions from Kaspersky for threat intelligence, Rapid7 for vulnerability management, and Trellix for extended detection and response (XDR). These partnerships ensure we have access to the latest threat intelligence, advanced security technologies, and expert support to protect your business against sophisticated cyber threats.</p>
                </div>
              </div>
            </div>

            {/* FAQ 4 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <button className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">What is included in your VPS security services?</h3>
                <svg className="w-5 h-5 text-gray-500 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="px-8 pb-6">
                <div className="text-gray-600 space-y-4">
                  <p>Our VPS security services include comprehensive hardening of your virtual private servers, firewall configuration, intrusion detection systems, regular security patching, malware scanning, DDoS protection, and secure backup solutions. We deploy both open-source and licensed security tools based on your specific requirements and budget.</p>
                  <p>We provide 24/7 monitoring of your VPS infrastructure, automated security updates, vulnerability assessments, and incident response services. Our team ensures your servers comply with industry standards and regulations, implementing security best practices for operating systems, applications, and network configurations.</p>
                </div>
              </div>
            </div>

            {/* FAQ 5 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <button className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">How quickly can you respond to security incidents?</h3>
                <svg className="w-5 h-5 text-gray-500 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="px-8 pb-6">
                <div className="text-gray-600 space-y-4">
                  <p>Our incident response team operates on a 15-minute SLA for critical security incidents. We have predefined response procedures for different types of threats, including malware outbreaks, data breaches, DDoS attacks, and unauthorized access attempts. Our 24/7 SOC ensures immediate detection and response regardless of when incidents occur.</p>
                  <p>We maintain a dedicated incident response team with certifications from CompTIA Security+, CISSP, and vendor-specific certifications from our partners like Fortinet and CrowdStrike. Our response includes containment, eradication, recovery, and post-incident analysis to prevent future occurrences and improve your security posture.</p>
                </div>
              </div>
            </div>

            {/* FAQ 6 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <button className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">Do you provide cybersecurity compliance and audit support?</h3>
                <svg className="w-5 h-5 text-gray-500 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="px-8 pb-6">
                <div className="text-gray-600 space-y-4">
                  <p>Yes, we provide comprehensive compliance support for various regulatory frameworks including GDPR, HIPAA, PCI DSS, ISO 27001, SOC 2, and industry-specific requirements. Our compliance services include gap analysis, policy development, risk assessments, audit preparation, and continuous compliance monitoring.</p>
                  <p>We help implement security controls that meet regulatory requirements, maintain documentation for audits, conduct regular compliance assessments, and provide training for your staff. Our partnerships with compliance-focused vendors ensure we have the tools and expertise to help you achieve and maintain compliance with evolving regulations.</p>
                </div>
              </div>
            </div>

            {/* FAQ 7 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <button className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">What makes your cybersecurity services different from other providers?</h3>
                <svg className="w-5 h-5 text-gray-500 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="px-8 pb-6">
                <div className="text-gray-600 space-y-4">
                  <p>Our cybersecurity services stand out through our integrated approach combining enterprise-grade technologies with personalized service. Unlike generic providers, we offer customized security solutions tailored to your specific industry, size, and risk profile. Our partnerships with 21+ leading security companies give us access to cutting-edge technologies and threat intelligence.</p>
                  <p>We provide true 24/7 support with local experts who understand your business context, comprehensive reporting, and proactive security posture management. Our unique selling proposition is the combination of advanced threat detection, rapid incident response, compliance expertise, and cost-effective solutions that scale with your business growth.</p>
                </div>
              </div>
            </div>

            {/* FAQ 8 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <button className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">How do you handle data protection and privacy in your security services?</h3>
                <svg className="w-5 h-5 text-gray-500 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="px-8 pb-6">
                <div className="text-gray-600 space-y-4">
                  <p>Data protection is fundamental to our cybersecurity approach. We implement encryption for data at rest and in transit, strict access controls, comprehensive audit logging, and regular security assessments. Our services comply with GDPR, CCPA, and other data protection regulations, ensuring your sensitive information remains protected.</p>
                  <p>We use privacy-enhancing technologies, conduct privacy impact assessments, maintain data residency requirements, and provide transparent data handling policies. Our security operations include data loss prevention (DLP) solutions, secure data backup and recovery, and continuous monitoring for data breaches or unauthorized access attempts.</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link to="/?contact=true&security=true" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
              <span>Get a Free Security Assessment</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 lg:px-12 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Secure Your Business?
          </h2>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Protect your enterprise with our comprehensive cybersecurity solutions. Our experts are ready to assess your security needs and implement the right protection for your business.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] text-white hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 font-semibold rounded-lg text-lg px-8 py-4 text-center transition-all duration-300 hover:shadow-xl hover:scale-105">
                Get a Security Assessment
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

export default CybersecurityServices;
