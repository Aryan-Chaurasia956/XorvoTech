import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import "./Services.css"

const ManagedITServices = () => {
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
      {/* Managed IT Services - Full Screen Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-white services-hero-3">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{backgroundImage: "url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"}}></div>
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-gray-800/60 to-gray-900/80"></div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-12">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            {/* Headline with animation */}
            <h1 className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ fontFamily: "'Roboto', 'Arial', sans-serif" }}>
              <span className="block text-white mb-4">
                MANAGED IT
              </span>
              <span className="block text-white">
                SERVICES
              </span>
            </h1>

            {/* Subtitle */}
            <p className={`text-xl md:text-2xl lg:text-3xl text-gray-200 max-w-4xl mx-auto transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Focus on your business while we handle your IT. Our comprehensive managed services provide 24/7 monitoring, proactive maintenance, and expert support to keep your systems running at peak performance and security.
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <Link to="/?contact=true">
                <button type="button" className="bg-[#727CAB] text-white hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 font-semibold rounded-lg text-lg px-8 py-4 text-center transition-all duration-300 hover:shadow-xl hover:scale-105">
                  Talk to an IT Expert
                </button>
              </Link>
              <Link to="#managed-it-cards">
                <button type="button" className="border-2 border-white text-white hover:bg-white hover:text-[#727CAB] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 font-semibold rounded-lg text-lg px-8 py-4 text-center transition-all duration-300 hover:shadow-xl hover:scale-105">
                  View Managed IT Services
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

      <div className='noah services-cards' id="managed-it-cards">
        {/* Monitoring & Maintenance */}
        <div id="monitoring-maintenance" className='john' data-heading='Monitoring & Maintenance'>
          <div className='text-2xl'>Monitoring & Maintenance</div>
          <div>24/7 proactive monitoring and maintenance to ensure optimal system performance and prevent issues before they occur. Our comprehensive monitoring solutions provide real-time visibility into your IT infrastructure, allowing us to identify and resolve potential problems before they impact your business operations.</div>
          
          <div>We implement advanced monitoring tools that track system health, performance metrics, and security events across your entire IT environment. Our automated maintenance schedules ensure your systems are always up-to-date, secure, and running at peak efficiency.</div>
          
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Prevents system failures and downtime before they occur</li>
            <li>• Ensures optimal performance of all IT infrastructure components</li>
            <li>• Reduces emergency repair costs and business disruption</li>
            <li>• Provides peace of mind with continuous system oversight</li>
            <li>• Maintains system security through regular updates and patches</li>
          </ul>
          <div className='center-row'>
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* Remote Support */}
        <div id="remote-support" className='felix' data-heading='Remote Support'>
          <div className='text-2xl'>Remote Support (Helpdesk & RMM)</div>
          <div>Expert remote support and helpdesk services with advanced RMM tools for quick issue resolution. Our certified technicians provide immediate assistance for all IT issues, ensuring your employees can stay productive and focused on their work.</div>
          
          <div>We leverage cutting-edge Remote Monitoring and Management (RMM) tools to provide instant remote access to your systems, diagnose problems, and implement solutions without disrupting your business operations. Our helpdesk is available 24/7 to address any technical concerns.</div>
          
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Provides immediate technical support when issues arise</li>
            <li>• Reduces employee downtime and maintains productivity</li>
            <li>• Offers expert assistance without requiring on-site visits</li>
            <li>• Ensures consistent IT support across all locations</li>
            <li>• Delivers cost-effective support solutions for businesses</li>
          </ul>
          <div className='center-row'>
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* Asset & Patch Management */}
        <div id="asset-management" className='akash' data-heading='Asset & Patch Management'>
          <div className='text-2xl'>Asset & Patch Management</div>
          <div>Complete asset tracking and automated patch management to keep systems secure and up-to-date. Our comprehensive asset management solutions provide full visibility into your hardware and software inventory, while automated patching ensures all systems remain protected against vulnerabilities.</div>
          
          <div>We implement sophisticated asset tracking systems that monitor every device, software license, and IT component in your organization. Our automated patch management system deploys security updates and software patches across all systems, ensuring consistent protection and compliance.</div>
          
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Maintains comprehensive visibility of all IT assets</li>
            <li>• Protects systems from security vulnerabilities through timely patches</li>
            <li>• Ensures software license compliance and prevents legal issues</li>
            <li>• Reduces manual workload through automated patch deployment</li>
            <li>• Provides accurate asset lifecycle management and planning</li>
          </ul>
          <div className='center-row'>
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* SLA & Reporting */}
        <div id="sla-reporting" className='john' data-heading='SLA & Reporting'>
          <div className='text-2xl'>SLA & Reporting</div>
          <div>Service Level Agreements with comprehensive reporting and analytics for complete transparency. Our SLA-based approach ensures guaranteed service quality and performance, while detailed reporting provides insights into your IT operations and service delivery.</div>
          
          <div>We establish clear Service Level Agreements that define performance metrics, response times, and service quality standards. Our advanced reporting systems provide real-time dashboards, monthly performance reports, and trend analysis to help you make informed decisions about your IT infrastructure.</div>
          
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Guarantees consistent service quality and performance standards</li>
            <li>• Provides complete transparency into IT operations and costs</li>
            <li>• Enables data-driven decision making for IT investments</li>
            <li>• Ensures accountability and measurable service delivery</li>
            <li>• Helps optimize IT budget allocation and resource planning</li>
          </ul>
          <div className='center-row'>
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* IT Strategy & Budget Planning */}
        <div id="it-strategy" className='felix' data-heading='IT Strategy & Budget Planning'>
          <div className='text-2xl'>IT Strategy & Budget Planning</div>
          <div>Strategic IT planning and budget optimization to align technology with business goals. Our expert consultants work with you to develop comprehensive IT strategies that support your business objectives while optimizing costs and maximizing ROI.</div>
          
          <div>We analyze your current IT infrastructure, business requirements, and future growth plans to create strategic roadmaps that guide technology investments. Our budget planning services help you allocate resources effectively, identify cost-saving opportunities, and ensure your IT spending delivers maximum business value.</div>
          
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Aligns technology investments with business objectives</li>
            <li>• Optimizes IT budget allocation and reduces unnecessary spending</li>
            <li>• Provides long-term technology roadmap for business growth</li>
            <li>• Ensures scalability and future-proofing of IT infrastructure</li>
            <li>• Delivers measurable ROI on technology investments</li>
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
              Everything you need to know about our managed IT services, 24/7 support, partnerships with leading technology providers, and how we optimize your IT infrastructure
            </p>
          </div>

          <div className="space-y-6">
            {/* FAQ 1 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <button className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">What managed IT services does Xorvo Technologies offer?</h3>
                <svg className="w-5 h-5 text-gray-500 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="px-8 pb-6">
                <div className="text-gray-600 space-y-4">
                  <p>Xorvo Technologies provides comprehensive managed IT services including 24/7 network monitoring, server management, help desk support, cybersecurity management, backup and disaster recovery, cloud infrastructure management, and strategic IT planning. We partner with industry leaders like Microsoft, Dell, HP, Lenovo, Fortinet, and Veeam to deliver enterprise-grade IT management.</p>
                  <p>Our services cover complete IT infrastructure management from hardware procurement and deployment to ongoing maintenance, security patching, performance optimization, and technology refresh planning. We act as your dedicated IT department, providing expertise across all aspects of your technology environment while ensuring alignment with your business objectives.</p>
                </div>
              </div>
            </div>

            {/* FAQ 2 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <button className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">How does your 24/7 monitoring and support work?</h3>
                <svg className="w-5 h-5 text-gray-500 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="px-8 pb-6">
                <div className="text-gray-600 space-y-4">
                  <p>Our 24/7 monitoring and support system utilizes advanced Network Operations Center (NOC) tools combined with our Security Operations Center (SOC) for comprehensive IT oversight. We monitor network performance, server health, application availability, security threats, and backup status around the clock using enterprise-grade monitoring platforms from partners like Microsoft and Fortinet.</p>
                  <p>Our support team operates on tiered response times with immediate response for critical issues. We provide multiple support channels including phone, email, chat, and remote access. Our proactive monitoring identifies potential issues before they impact your business, with automated alerts and predefined response procedures ensuring rapid resolution of any IT problems.</p>
                </div>
              </div>
            </div>

            {/* FAQ 3 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <button className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">Which technology partners and vendors do you work with?</h3>
                <svg className="w-5 h-5 text-gray-500 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="px-8 pb-6">
                <div className="text-gray-600 space-y-4">
                  <p>We partner with leading technology vendors to provide comprehensive IT solutions. Our hardware partners include Dell, HP, and Lenovo for servers, workstations, and networking equipment. We work with Microsoft for Windows Server, Microsoft 365, and Azure services, and partner with Fortinet, Palo Alto Networks, and Check Point for network security solutions.</p>
                  <p>Our software partnerships include Veeam for backup and disaster recovery, VMware for virtualization, and various cloud providers. We maintain certified partnerships ensuring access to enterprise support, training, and the latest technologies. These relationships enable us to provide cost-effective solutions with reliable vendor backing and expert technical support.</p>
                </div>
              </div>
            </div>

            {/* FAQ 4 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <button className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">What is included in your help desk and user support services?</h3>
                <svg className="w-5 h-5 text-gray-500 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="px-8 pb-6">
                <div className="text-gray-600 space-y-4">
                  <p>Our help desk services provide comprehensive user support including hardware and software troubleshooting, account management, password resets, software installation, and user training. We offer multiple support channels with guaranteed response times based on priority levels. Our team supports Windows, Mac, and mobile devices, along with Microsoft 365, Adobe, and other business applications.</p>
                  <p>We implement ticketing systems for issue tracking, knowledge bases for self-service support, and regular user training sessions. Our help desk operates during business hours with 24/7 emergency support available. We maintain detailed service level agreements (SLAs) and provide regular performance reports to ensure transparency and accountability in our support services.</p>
                </div>
              </div>
            </div>

            {/* FAQ 5 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <button className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">How do you handle backup and disaster recovery?</h3>
                <svg className="w-5 h-5 text-gray-500 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="px-8 pb-6">
                <div className="text-gray-600 space-y-4">
                  <p>Our backup and disaster recovery solutions utilize Veeam and other enterprise backup platforms to ensure comprehensive data protection. We implement 3-2-1 backup strategies with local, cloud, and offsite backups. Our services include automated daily backups, regular restore testing, encryption for data security, and detailed backup reporting and monitoring.</p>
                  <p>We develop comprehensive disaster recovery plans with defined recovery time objectives (RTO) and recovery point objectives (RPO). Our DR solutions include server failover, cloud recovery options, and rapid restoration capabilities. We conduct quarterly disaster recovery tests to ensure business continuity and maintain updated documentation for all recovery procedures.</p>
                </div>
              </div>
            </div>

            {/* FAQ 6 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <button className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">How do you ensure cybersecurity in managed IT services?</h3>
                <svg className="w-5 h-5 text-gray-500 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="px-8 pb-6">
                <div className="text-gray-600 space-y-4">
                  <p>Our managed cybersecurity services include network security with next-generation firewalls from Fortinet and Palo Alto Networks, endpoint protection with CrowdStrike and ESET, email security, web filtering, and security awareness training. We provide 24/7 security monitoring, vulnerability assessments, patch management, and incident response services.</p>
                  <p>We implement defense-in-depth security strategies with regular security audits, penetration testing, and compliance monitoring for GDPR, HIPAA, PCI DSS, and other regulations. Our security team maintains up-to-date threat intelligence and provides strategic security planning to protect your business against evolving cyber threats.</p>
                </div>
              </div>
            </div>

            {/* FAQ 7 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <button className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">What makes your managed IT services cost-effective?</h3>
                <svg className="w-5 h-5 text-gray-500 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="px-8 pb-6">
                <div className="text-gray-600 space-y-4">
                  <p>Our managed IT services provide cost-effectiveness through predictable monthly pricing, elimination of unexpected IT expenses, and optimized resource utilization. We leverage our partnerships with vendors like Dell, HP, and Microsoft to obtain enterprise discounts on hardware and software. Our proactive maintenance reduces costly downtime and extends equipment lifespan.</p>
                  <p>We provide access to enterprise-grade tools and expertise at a fraction of the cost of building an in-house IT team. Our services include strategic IT planning, technology roadmaps, and budget forecasting to help you make informed technology investments. We typically reduce IT operational costs by 20-30% while improving service quality and reliability.</p>
                </div>
              </div>
            </div>

            {/* FAQ 8 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <button className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">How do you handle IT asset management and lifecycle planning?</h3>
                <svg className="w-5 h-5 text-gray-500 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="px-8 pb-6">
                <div className="text-gray-600 space-y-4">
                  <p>Our IT asset management services include comprehensive inventory tracking, lifecycle management, and technology refresh planning. We maintain detailed records of all hardware, software licenses, warranties, and maintenance agreements. Our team monitors asset performance, plans for end-of-life replacements, and ensures compliance with software licensing requirements.</p>
                  <p>We develop 3-5 year technology roadmaps aligned with your business goals, budget cycles, and technology trends. Our lifecycle planning includes hardware refresh schedules, software upgrade paths, and migration strategies for legacy systems. We help optimize your IT investments through strategic procurement, vendor negotiation, and disposal planning for outdated equipment.</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link to="/?contact=true&managed-it=true" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-emerald-700 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
              <span>Get a Free IT Assessment</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 lg:px-12 bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Optimize Your IT Operations?
          </h2>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Let our managed IT experts handle your infrastructure while you focus on growing your business. We provide comprehensive IT management, 24/7 support, and strategic planning to ensure your technology works for you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] text-white hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 font-semibold rounded-lg text-lg px-8 py-4 text-center transition-all duration-300 hover:shadow-xl hover:scale-105">
                Get IT Management Assessment
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

export default ManagedITServices;
