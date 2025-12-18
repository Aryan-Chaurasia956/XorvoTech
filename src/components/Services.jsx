import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
 
import "./Services.css"

const Services = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [isEnterpriseVisible, setIsEnterpriseVisible] = useState(false);
  const [shouldLoadEnterprise, setShouldLoadEnterprise] = useState(false);
  const [shouldLoadCybersecurity, setShouldLoadCybersecurity] = useState(false);

  // Trigger animation when Enterprise section loads
  useEffect(() => {
    if (shouldLoadEnterprise) {
      // Small delay to ensure DOM is rendered
      const timer = setTimeout(() => {
        setIsEnterpriseVisible(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [shouldLoadEnterprise]);

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

    // Lazy load observer - triggers loading before section is visible
    const lazyLoadObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === 'enterprise-it-trigger') {
              setShouldLoadEnterprise(true);
            }
            if (entry.target.id === 'cybersecurity-trigger') {
              setShouldLoadCybersecurity(true);
            }
          }
        });
      },
      { rootMargin: '200px' } // Load 200px before section comes into view
    );

    // Animation observer - triggers animations when section is visible
    const animationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id === 'enterprise-it-hero') {
            setIsEnterpriseVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const enterpriseTrigger = document.getElementById('enterprise-it-trigger');
    const cybersecurityTrigger = document.getElementById('cybersecurity-trigger');

    if (enterpriseTrigger) {
      lazyLoadObserver.observe(enterpriseTrigger);
    }
    if (cybersecurityTrigger) {
      lazyLoadObserver.observe(cybersecurityTrigger);
    }

    // Set up animation observer after a short delay to ensure DOM is ready
    const setupAnimationObserver = () => {
      const enterpriseSection = document.getElementById('enterprise-it-hero');
      if (enterpriseSection) {
        animationObserver.observe(enterpriseSection);
      }
    };
    
    // Check immediately and also after a delay
    setupAnimationObserver();
    const timeoutId = setTimeout(setupAnimationObserver, 100);

    return () => {
      clearTimeout(timeoutId);
      if (enterpriseTrigger) {
        lazyLoadObserver.unobserve(enterpriseTrigger);
      }
      if (cybersecurityTrigger) {
        lazyLoadObserver.unobserve(cybersecurityTrigger);
      }
      const enterpriseSection = document.getElementById('enterprise-it-hero');
      if (enterpriseSection) {
        animationObserver.unobserve(enterpriseSection);
      }
    };
  }, [shouldLoadEnterprise]);
  return (
    <div className="bg-gradient-to-br from-cyan-50 via-blue-50 to-white">
      {/* Integration & Engineering Solutions - Full Screen Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-white services-hero">
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-12">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            {/* Headline with animation */}
            <h1 className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <span className="block text-white mb-4">
                INTEGRATION & ENGINEERING
              </span>
              <span className="block text-white">
                SOLUTIONS
              </span>
            </h1>

            {/* Subtitle */}
            <p className={`text-xl md:text-2xl lg:text-3xl text-gray-200 max-w-4xl mx-auto transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Modern enterprises demand more than individual tools — they require complete ecosystems that integrate seamlessly across security, cloud, and application layers. Xorvo Technologies delivers unified engineering and integration frameworks that help organizations build cohesive, automated, and scalable IT environments.
            </p>

            {/* CTA Button */}
            <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <Link to="/?contact=true">
                <button type="button" className="bg-white text-blue-900 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-lg px-8 py-4 text-center transition-all duration-300 hover:shadow-xl hover:scale-105">
                  Talk to an Integration Expert
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

      <div className='noah services-cards'>
        {/* System Integration Framework */}
        <div className='john' data-heading='System Integration Framework'>
          <div className='text-2xl'>System Integration Framework</div>
          <div>We specialize in connecting diverse platforms, applications, and cloud infrastructures into one synchronized ecosystem. Our integration models ensure performance consistency, data integrity, and seamless interoperability.</div>
          <ul>
            <li>• API Integration and Middleware Development</li>
            <li>• Cloud-to-Cloud and Cloud-to-On-Premise Sync</li>
            <li>• Network-to-Application Orchestration</li>
            <li>• Secure Identity Federation and Access Management</li>
            <li>• Automation via CI/CD and ITSM platforms</li>
          </ul>
          <div className='center-row'>
            <Link to="/services/consulting/app-deployment">
              <button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Explore Integration Services</button>
            </Link>
          </div>
        </div>

        {/* Enterprise Architecture & Engineering */}
        <div className='felix' data-heading='Enterprise Architecture & Engineering'>
          <div className='text-2xl'>Enterprise Architecture & Engineering</div>
          <div>Our engineers design enterprise architectures that combine cloud efficiency, security compliance, and automation intelligence. We align every component — from infrastructure to applications — with your business performance goals.</div>
          <ul>
            <li>• Enterprise Architecture Planning and Blueprinting</li>
            <li>• Hybrid Infrastructure Design (Cloud + On-Prem)</li>
            <li>• Multi-layer Security and Compliance Architecture</li>
            <li>• Virtualization and Resource Pooling (VMware, Hyper-V, KVM)</li>
            <li>• Unified Monitoring and Performance Benchmarking</li>
          </ul>
          <div className='center-row'>
            <Link to="/services/consulting/network-design">
              <button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Request Architecture Review</button>
            </Link>
          </div>
        </div>

        {/* Hybrid & Multi-Cloud Integration */}
        <div className='akash' data-heading='Hybrid & Multi-Cloud Integration'>
          <div className='text-2xl'>Hybrid & Multi-Cloud Integration</div>
          <div>Enterprises today operate across multiple cloud environments — AWS, Azure, GCP, and private data centers. We simplify this complexity through hybrid cloud integration frameworks that enhance visibility, security, and control.</div>
          <ul>
            <li>• Unified Cloud Management Consoles</li>
            <li>• Automated Workload Distribution and Migration</li>
            <li>• Identity and Access Synchronization</li>
            <li>• Multi-Region High Availability Architecture</li>
            <li>• Security Compliance Across Cloud Environments</li>
          </ul>
          <div className='center-row'>
            <Link to="/services/cloud-infrastructure">
              <button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More About Cloud Integration</button>
            </Link>
          </div>
        </div>

        {/* Continuous Engineering & Automation */}
        <div className='john' data-heading='Continuous Engineering & Automation'>
          <div className='text-2xl'>Continuous Engineering & Automation</div>
          <div>Automation ensures speed, reliability, and consistency across every deployment. We enable continuous engineering pipelines that connect development, security, and operations in real time.</div>
          <ul>
            <li>• CI/CD Automation Pipelines</li>
            <li>• DevSecOps Implementation and Integration</li>
            <li>• Infrastructure as Code (IaC) with Terraform and Ansible</li>
            <li>• Automated Testing and Rollback</li>
            <li>• Centralized Observability and Monitoring</li>
          </ul>
          <div className='center-row'>
            <Link to="/services/consulting/ci-cd-automation">
              <button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Automate My Environment</button>
            </Link>
          </div>
        </div>

        {/* Unified Security and Performance Operations */}
        <div className='felix' data-heading='Unified Security & Performance'>
          <div className='text-2xl'>Unified Security and Performance Operations</div>
          <div>Integration is only complete when security and monitoring operate as one system. Our solutions bring SOC and NOC together — enabling predictive defense and proactive performance optimization.</div>
          <ul>
            <li>• SOC & NOC Integration</li>
            <li>• Threat Intelligence Automation</li>
            <li>• Centralized Alert Management and Response</li>
            <li>• Compliance-driven Reporting and Logging</li>
            <li>• SLA-driven Operations Frameworks</li>
          </ul>
          <div className='center-row'>
            <Link to="/services/cybersecurity">
              <button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Request Integrated Ops Demo</button>
            </Link>
          </div>
        </div>

        {/* Full-Stack Application Ecosystem */}
        <div className='akash' data-heading='Full-Stack Application Ecosystem'>
          <div className='text-2xl'>Full-Stack Application Ecosystem</div>
          <div>From backend systems to user-facing interfaces, we build application ecosystems that work across every layer of your enterprise.</div>
          <ul>
            <li>• Application Layer Integration with Databases and APIs</li>
            <li>• Secure Data Exchange Across Systems</li>
            <li>• Scalable Middleware Development</li>
            <li>• Containerized Deployments (Docker, Kubernetes)</li>
            <li>• Performance Engineering and Optimization</li>
          </ul>
          <div className='center-row'>
            <Link to="/services/consulting/custom-applications">
              <button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Explore Application Engineering</button>
            </Link>
          </div>
        </div>

        {/* Collaborative Engineering */}
        <div className='john' data-heading='Collaborative Engineering'>
          <div className='text-2xl'>Collaborative Engineering (Cross-Platform Alignment)</div>
          <div>Our team works closely with technology leaders — Fortinet, Cisco, Check Point, Microsoft, AWS, and ServiceNow — to ensure your stack remains integrated and future-proof. We align engineering practices across platforms, ensuring compatibility, scalability, and ongoing optimization.</div>
          <div className='center-row'>
            <Link to="/partners">
              <button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">View Partner Ecosystem</button>
            </Link>
          </div>
        </div>
      </div>

      {/* Closing CTA */}
      <div className='intro-card intro-stack p-30'>
        <div className='krishna'>Integration is where real digital transformation happens. Xorvo Technologies brings together systems, security, and intelligence into one unified ecosystem — delivering performance without compromise and protection without limits.</div>
        <div className='cta-row'>
          <Link to="/?contact=true"><button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Request Integration Consultation</button></Link>
          <Link to="/services"><button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Explore All Services</button></Link>
        </div>
      </div>

      {/* Lazy load trigger for Enterprise IT section */}
      <div id="enterprise-it-trigger" style={{ height: '1px' }}></div>

      {/* Services Page 1 — Enterprise IT & Cybersecurity Solutions */}
      {shouldLoadEnterprise && (
        <section id="enterprise-it-hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-white services-hero-2">
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-12">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            {/* Headline with animation */}
            <h1 className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight transition-all duration-700 delay-100 ${isEnterpriseVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <span className="block text-white mb-4">
                ENTERPRISE IT &
              </span>
              <span className="block text-white">
                CYBERSECURITY SOLUTIONS
              </span>
            </h1>

            {/* Subtitle */}
            <p className={`text-xl md:text-2xl lg:text-3xl text-gray-200 max-w-4xl mx-auto transition-all duration-700 delay-300 ${isEnterpriseVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              At Xorvo Technologies, our services are engineered to simplify IT management, strengthen security, and enhance operational efficiency. We help organizations design, deploy, and maintain secure digital ecosystems — aligning infrastructure, cloud, and applications into one cohesive system.
            </p>

            {/* CTA Button */}
            <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 transition-all duration-700 delay-500 ${isEnterpriseVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <Link to="/services">
                <button type="button" className="bg-white text-blue-900 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-lg px-8 py-4 text-center transition-all duration-300 hover:shadow-xl hover:scale-105">
                  Explore Service Categories
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-700 delay-700 ${isEnterpriseVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </section>
      )}

      {/* Lazy load trigger for Cybersecurity section */}
      <div id="cybersecurity-trigger" style={{ height: '1px' }}></div>

      {shouldLoadCybersecurity && (
      <div className='noah services-cards'>
        {/* Cybersecurity Services */}
        <div id='cybersecurity' className='felix scroll-anchor' data-heading='Cybersecurity Services'>
          <div className='text-2xl'>Cybersecurity Services</div>
          <div>Protect your enterprise from modern threats with our end-to-end cybersecurity solutions. We combine real-time monitoring, advanced analytics, and proactive defense to safeguard every layer of your network and data infrastructure.</div>
          <div>Core Offerings:</div>
          <ul>
            <li>• Network and Endpoint Security</li>
            <li>• Threat Detection, SOC & Incident Response</li>
            <li>• Email and Web Security Controls</li>
            <li>• Compliance and Risk Governance</li>
          </ul>
          <div className='center-row'>
            <Link to="/services/cybersecurity">
              <button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* Cloud & Infrastructure */}
        <div id='cloud-infrastructure' className='akash scroll-anchor' data-heading='Cloud & Infrastructure'>
          <div className='text-2xl'>Cloud & Infrastructure</div>
          <div>Empower your business with cloud scalability and resilient infrastructure. From migration to automation, our cloud services deliver security, speed, and flexibility across hybrid and multi-cloud environments.</div>
          <div>Core Offerings:</div>
          <ul>
            <li>• Cloud Migration & Deployment</li>
            <li>• VPS Hosting and Management</li>
            <li>• Infrastructure Design and Redundancy</li>
            <li>• Multi-Cloud Monitoring and Optimization</li>
          </ul>
          <div className='center-row'>
            <Link to="/services/cloud-infrastructure">
              <button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Explore Cloud Solutions</button>
            </Link>
          </div>
        </div>
      </div>
      )}

      {/* Additional Services Sections */}
      <div className='noah services-cards'>
        {/* Managed IT Services */}
        <div id='managed-it' className='john scroll-anchor' data-heading='Managed IT Services'>
          <div className='text-2xl'>Managed IT Services</div>
          <div>We manage your IT operations end-to-end, ensuring performance, uptime, and reliability. Our managed service framework is designed for enterprises that demand consistent efficiency and predictive problem resolution.</div>
          <div>Core Offerings:</div>
          <ul>
            <li>• 24×7 Monitoring & Maintenance</li>
            <li>• Remote Support & Helpdesk</li>
            <li>• Asset and Patch Management</li>
            <li>• Proactive Optimization</li>
          </ul>
          <div className='center-row'>
            <Link to="/services/managed-it">
              <button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">View Managed Services</button>
            </Link>
          </div>
        </div>

        {/* Workspace & Collaboration */}
        <div id='workspace' className='felix scroll-anchor' data-heading='Workspace & Collaboration'>
          <div className='text-2xl'>Workspace & Collaboration</div>
          <div>Enable your teams to work securely and efficiently across any device or location. We deploy and manage workspace environments built on trusted platforms — simplifying collaboration while maintaining control.</div>
          <div>Core Offerings:</div>
          <ul>
            <li>• Microsoft 365 Deployment</li>
            <li>• Google Workspace & Zoho Setup</li>
            <li>• Email Migration & Identity Management</li>
            <li>• Security, Backup, and Access Control</li>
          </ul>
          <div className='center-row'>
            <Link to="/services/workspace">
              <button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Discover Workspace Solutions</button>
            </Link>
          </div>
        </div>

        {/* Data Protection & Compliance */}
        <div id='data-protection' className='akash scroll-anchor' data-heading='Data Protection & Compliance'>
          <div className='text-2xl'>Data Protection & Compliance</div>
          <div>Safeguard your critical data with automated protection, encrypted recovery, and compliance alignment. Our data protection services ensure that business continuity is never compromised.</div>
          <div>Core Offerings:</div>
          <ul>
            <li>• Backup & Recovery Solutions</li>
            <li>• Data Loss Prevention (DLP)</li>
            <li>• Encryption and Key Management</li>
            <li>• Compliance Audits (ISO, GDPR, HIPAA)</li>
          </ul>
          <div className='center-row'>
            <Link to="/services/data-protection">
              <button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Secure My Data</button>
            </Link>
          </div>
        </div>

        {/* IT Consulting & Deployment */}
        <div id='consulting' className='john scroll-anchor' data-heading='IT Consulting & Deployment'>
          <div className='text-2xl'>IT Consulting & Deployment</div>
          <div>We design and implement technology environments that drive efficiency and long-term reliability. Our consulting team combines deep technical knowledge with business understanding to ensure every deployment delivers measurable value.</div>
          <div>Core Offerings:</div>
          <ul>
            <li>• Network & Infrastructure Design</li>
            <li>• Application Deployment & Integration</li>
            <li>• CI/CD Automation & Optimization</li>
            <li>• Custom Application Engineering</li>
          </ul>
          <div className='center-row'>
            <Link to="/services/consulting">
              <button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Schedule a Consultation</button>
            </Link>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className='intro-card intro-stack p-30'>
        <div className='krishna'>Every service we deliver is backed by real-world expertise and enterprise-grade technology partnerships. With Xorvo Technologies, you get more than IT support — you get a partner committed to securing and scaling your digital future.</div>
        <div className='cta-row'>
          <Link to="/?contact=true"><button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Contact Our Experts</button></Link>
            <Link to="/services"><button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Explore All Services</button></Link>
        </div>
      </div>
 
    </div>
  )
}

export default Services
