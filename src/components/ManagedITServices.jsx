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
