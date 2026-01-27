import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import "./Services.css"

const CloudInfrastructureServices = () => {
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
      {/* Cloud & Infrastructure Services - Full Screen Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-white services-hero-2">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{backgroundImage: "url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"}}></div>
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-blue-900/60 to-gray-900/80"></div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-12">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            {/* Headline with animation */}
            <h1 className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <span className="block text-white mb-4">
                CLOUD &
              </span>
              <span className="block text-white">
                INFRASTRUCTURE
              </span>
            </h1>

            {/* Subtitle */}
            <p className={`text-xl md:text-2xl lg:text-3xl text-gray-200 max-w-4xl mx-auto transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              At Xorvo Technologies, our services are engineered to simplify IT management, strengthen security, and enhance operational efficiency. We help organizations design, deploy, and maintain secure digital ecosystems — aligning infrastructure, cloud, and applications into one cohesive system.
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <Link to="/?contact=true">
                <button type="button" className="bg-[#727CAB] text-white hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 font-semibold rounded-lg text-lg px-8 py-4 text-center transition-all duration-300 hover:shadow-xl hover:scale-105">
                  Talk to a Cloud Expert
                </button>
              </Link>
              <Link to="#cloud-infrastructure-cards">
                <button type="button" className="border-2 border-white text-white hover:bg-white hover:text-[#727CAB] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 font-semibold rounded-lg text-lg px-8 py-4 text-center transition-all duration-300 hover:shadow-xl hover:scale-105">
                  View Cloud & Infrastructure Services
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

      <div className='noah services-cards' id="cloud-infrastructure-cards">
        {/* Cloud Migration */}
        <div id='cloud-migration' className='felix scroll-anchor' data-heading='Cloud Migration'>
          <div className='text-2xl'>Cloud Migration</div>
          <div>Seamlessly transition your infrastructure to the cloud with minimal disruption. Our cloud migration services ensure secure, efficient, and scalable migration of applications, data, and workloads to leading cloud platforms.</div>
          <div>We provide comprehensive migration planning, execution, and optimization services. Our experts handle everything from assessment and strategy to implementation and post-migration support, ensuring your business continuity throughout the process.</div>
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Reduces infrastructure costs while improving scalability</li>
            <li>• Enables access to advanced cloud services and capabilities</li>
            <li>• Enhances business agility and disaster recovery options</li>
            <li>• Provides better performance and global reach</li>
            <li>• Supports modern application architectures and DevOps practices</li>
          </ul>
          <div className='center-row'>
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* VPS Hosting */}
        <div id='vps-hosting' className='akash scroll-anchor' data-heading='VPS Hosting'>
          <div className='text-2xl'>VPS Hosting</div>
          <div>Get reliable, high-performance virtual private server hosting tailored to your business needs. Our VPS solutions offer dedicated resources, full root access, and enterprise-grade security at competitive prices.</div>
          <div>We provide managed and unmanaged VPS hosting on cutting-edge infrastructure with SSD storage, automated backups, and 24/7 monitoring. Choose from multiple operating systems and configurations to match your specific requirements.</div>
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Delivers dedicated resources without shared hosting limitations</li>
            <li>• Provides full control over server configuration and software</li>
            <li>• Ensures better performance and reliability for applications</li>
            <li>• Offers scalable resources as your business grows</li>
            <li>• Includes enterprise security and backup solutions</li>
          </ul>
          <div className='center-row'>
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* Infrastructure Design */}
        <div id='infrastructure-design' className='john scroll-anchor' data-heading='Infrastructure Design'>
          <div className='text-2xl'>Infrastructure Design</div>
          <div>Design robust, scalable, and secure IT infrastructure optimized for your business requirements. Our infrastructure design services ensure your systems are built for performance, reliability, and future growth.</div>
          <div>We architect comprehensive infrastructure solutions including network design, server architecture, storage systems, and security frameworks. Our designs follow industry best practices and are tailored to your specific business needs and compliance requirements.</div>
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Creates scalable infrastructure that grows with your business</li>
            <li>• Optimizes performance and reduces operational costs</li>
            <li>• Ensures high availability and disaster recovery capabilities</li>
            <li>• Aligns technology with business objectives and compliance</li>
            <li>• Provides foundation for digital transformation initiatives</li>
          </ul>
          <div className='center-row'>
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* Hybrid & Multi-Cloud Management */}
        <div id='hybrid-multi-cloud' className='felix scroll-anchor' data-heading='Hybrid & Multi-Cloud Management'>
          <div className='text-2xl'>Hybrid & Multi-Cloud Management</div>
          <div>Manage complex hybrid and multi-cloud environments with unified visibility and control. Our multi-cloud management services help you optimize costs, ensure compliance, and maintain security across all cloud platforms.</div>
          <div>We provide centralized management, monitoring, and automation for workloads distributed across multiple cloud providers and on-premises infrastructure. Our solutions enable seamless workload mobility and consistent governance.</div>
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Prevents vendor lock-in and maximizes cloud provider benefits</li>
            <li>• Provides unified visibility and control across all environments</li>
            <li>• Optimizes costs through intelligent workload placement</li>
            <li>• Ensures consistent security and compliance across clouds</li>
            <li>• Enables seamless workload mobility and disaster recovery</li>
          </ul>
          <div className='center-row'>
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* Backup & Disaster Recovery */}
        <div id='backup-disaster-recovery' className='akash scroll-anchor' data-heading='Backup & Disaster Recovery'>
          <div className='text-2xl'>Backup & Disaster Recovery</div>
          <div>Protect your critical data and ensure business continuity with comprehensive backup and disaster recovery solutions. Our services provide automated backups, rapid recovery, and robust disaster recovery planning.</div>
          <div>We implement enterprise-grade backup solutions with automated scheduling, encryption, and both on-site and cloud storage options. Our disaster recovery services include comprehensive planning, testing, and rapid recovery capabilities to minimize downtime.</div>
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Prevents data loss from hardware failure, cyber attacks, or disasters</li>
            <li>• Ensures business continuity with rapid recovery capabilities</li>
            <li>• Meets compliance requirements for data retention and protection</li>
            <li>• Reduces downtime and associated business impact</li>
            <li>• Provides peace of mind with automated, reliable backup systems</li>
          </ul>
          <div className='center-row'>
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* Infrastructure Monitoring (NOC) */}
        <div id='infrastructure-monitoring' className='john scroll-anchor' data-heading='Infrastructure Monitoring (NOC)'>
          <div className='text-2xl'>Infrastructure Monitoring (NOC)</div>
          <div>Ensure optimal performance and availability with 24/7 infrastructure monitoring and Network Operations Center (NOC) services. Our monitoring solutions provide real-time visibility into your entire IT infrastructure.</div>
          <div>We deliver comprehensive monitoring of servers, networks, applications, and cloud resources with proactive alerting, performance analysis, and rapid incident response. Our NOC team ensures continuous monitoring and immediate threat detection.</div>
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Detects and resolves issues before they impact business operations</li>
            <li>• Provides 24/7 visibility into infrastructure health and performance</li>
            <li>• Reduces downtime through proactive monitoring and alerting</li>
            <li>• Enables data-driven decisions for capacity planning and optimization</li>
            <li>• Ensures compliance with service level agreements (SLAs)</li>
          </ul>
          <div className='center-row'>
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 lg:px-12 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Infrastructure?
          </h2>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Modernize your IT infrastructure with our comprehensive cloud and infrastructure solutions. Our experts are ready to design, deploy, and manage the perfect infrastructure for your business needs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] text-white hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 font-semibold rounded-lg text-lg px-8 py-4 text-center transition-all duration-300 hover:shadow-xl hover:scale-105">
                Get Infrastructure Assessment
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

export default CloudInfrastructureServices;
