import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import GradientBlinds from './GradientBlinds'
 
import "./Solution.css"

const Solution = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 0);
      }
    } else {
      // Scroll to top when navigating to the page without a hash
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.hash]);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  return (
    <div className="bg-gradient-to-br from-cyan-50 via-blue-50 to-white">
      {/* Xorvo Technologies Solutions - Full Screen Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-white">
        {/* GradientBlinds Background */}
        <div className="absolute inset-0 z-0">
          <GradientBlinds
            gradientColors={['#FF9FFC', '#5227FF']}
            angle={0}
            noise={0.3}
            blindCount={12}
            blindMinWidth={50}
            spotlightRadius={0.5}
            spotlightSoftness={1}
            spotlightOpacity={1}
            mouseDampening={0.15}
            distortAmount={0}
            shineDirection="left"
            mixBlendMode="lighten"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-12 pointer-events-none">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            {/* Headline with animation */}
            <h1 className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <span className="block text-white mb-4">
                XORVO TECHNOLOGIES
              </span>
              <span className="block text-white">
                SOLUTIONS
              </span>
            </h1>

            {/* Subtitle */}
            <p className={`text-xl md:text-2xl lg:text-3xl text-gray-200 max-w-4xl mx-auto transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              At Xorvo Technologies, we deliver solutions designed to strengthen your IT ecosystem and drive digital performance. From enterprise automation to intelligent infrastructure, our solutions connect every layer of your business — seamlessly, securely, and efficiently.
            </p>

            {/* CTA Button */}
            <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 transition-all duration-700 delay-500 pointer-events-auto ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <Link to="/?contact=true">
                <button type="button" className="bg-white text-blue-900 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-lg px-8 py-4 text-center transition-all duration-300 hover:shadow-xl hover:scale-105">
                  Discuss Your Requirements
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

      <div className=' noah '>
        <div id='business-solutions' className='john scroll-anchor' data-heading='Business Automation Solutions'>
          <div className='text-2xl flex justify-center'>
            Business Automation Solutions
          </div>
          <div>
            Our business automation suite helps organizations digitize processes and create smarter workflows.
            <ul>
              <li>• CRM Solutions - Manage client relationships, automate sales pipelines, and enhance customer engagement.</li>
              <li>• ERP Systems - Centralize operations, accounting, and inventory in one secure, unified platform.</li>
              <li>• HRMS Platforms - Simplify HR operations, employee data management, and compliance tracking.</li>
              <li>•	Custom Applications - Tailored applications designed to fit your specific operational requirements.</li>
              <li>•	Application Designing (UI/UX) - Modern interfaces that enhance usability and deliver functional aesthetics.</li>
            </ul>
          </div>
          <div className="flex justify-center">
            <button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Explore Business Automation </button>
          </div>
        </div>

        <div id='development-hosting' className='felix scroll-anchor' data-heading='Web & Application Solutions'>
          <div className='text-2xl '>
            Web & Application Solutions
          </div>
          <div>
            Your digital presence is the first impression of your business.
            We design, develop, and deploy web and mobile applications optimized for performance, scalability, and seamless user experience.
          </div>
          <ul>
            <li>•	Website Development - High-speed, responsive websites optimized for SEO, GEO, and AEO.</li>
            <li>•	Mobile App Development - Secure, cross-platform mobile apps built for modern business environments.</li>
            <li>•	VPS Hosting - Private and secure servers with full control and superior performance.</li>
            <li>•	Cloud Migration - Seamless workload transfer across AWS, Azure, and Google Cloud.</li>
            <li>•	Deployment Automation - CI/CD frameworks for continuous application delivery.</li>
          </ul>
          <div className="flex justify-center">
            <button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">View Application Services </button>
          </div>
        </div>

        <div id='digital-marketing-infrastructure' className='akash scroll-anchor' data-heading='Infrastructure & Cloud Solutions'>
          <div className='text-2xl'>
            Infrastructure & Cloud Solutions
          </div>
          <div>
            Digital visibility and operational intelligence are essential to performance.
            Our optimization services help you stay competitive in both search visibility and data-driven decision-making.
          </div>
          <ul>
            <li>•	SEO Optimization - Complete website health, structure, and content optimization.</li>
            <li>•	AEO (Answer Engine Optimization) - Voice and AI-driven search readiness for intelligent discovery.</li>
            <li>•	GEO Optimization - Local visibility through map listings and regional indexing.</li>
            <li>•	Monitoring & NOC Integration - 24×7 infrastructure visibility for uptime and reliability.</li>
            <li>•	Network Designing - Enterprise LAN/WAN and multi-site connectivity design.</li>
          </ul>
          <div className='flex flex-col gap-2 items-center'>
            <p>All three are merged into one integrated optimization platform — ensuring better visibility, ranking, and local reach.</p>
            <button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Improve Online Visibility </button>
          </div>
        </div>

        {/* Infrastructure Architecture & Deployment */}
        <div id='infrastructure-architecture' className='john scroll-anchor' data-heading='Infrastructure Architecture'>
          <div className='text-2xl flex justify-center'>Infrastructure Architecture & Deployment</div>
          <div>We design, build, and implement enterprise-ready infrastructure that delivers stability, scalability, and security.</div>
          <ul>
            <li>• Network Designing – Advanced LAN/WAN topologies, VPNs, and hybrid connectivity.</li>
            <li>• Infrastructure Deployment – Data center planning, hardware provisioning, and topology setup.</li>
            <li>• Server Virtualization – Efficient compute resource management and optimization.</li>
            <li>• Load Balancing & High Availability – Ensuring uptime through redundancy and failover architecture.</li>
          </ul>
          <div className='flex justify-center'>
            <Link to="/services/cloud-infrastructure"><button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Explore Infrastructure Services</button></Link>
          </div>
        </div>

        {/* Monitoring & Automation Solutions */}
        <div id='monitoring-automation' className='felix scroll-anchor' data-heading='Monitoring & Automation'>
          <div className='text-2xl'>Monitoring & Automation Solutions</div>
          <div>Visibility and control are at the core of every efficient IT ecosystem. Our real-time monitoring and automation solutions ensure every component performs at its best — continuously.</div>
          <ul>
            <li>• Monitoring & NOC Setup – 24×7 operational visibility across all systems and endpoints.</li>
            <li>• Automation Frameworks – Scripted task orchestration for faster deployments and fewer errors.</li>
            <li>• CI/CD Pipelines – Continuous integration and delivery with real-time rollback and testing.</li>
            <li>• Performance Analytics – Advanced metrics for capacity planning and infrastructure optimization.</li>
          </ul>
          <div className='flex justify-center'>
            <Link to="/services/consulting/monitoring-noc-setup"><button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn About Monitoring Solutions</button></Link>
          </div>
        </div>

        {/* Cloud Enablement & Scalability */}
        <div id='cloud-enablement' className='akash scroll-anchor' data-heading='Cloud Enablement'>
          <div className='text-2xl'>Cloud Enablement & Scalability</div>
          <div>We help enterprises modernize with scalable, hybrid cloud architectures — seamlessly connecting private and public environments.</div>
          <ul>
            <li>• Cloud Migration – Move workloads to AWS, Azure, or GCP with precision and zero downtime.</li>
            <li>• Hybrid Cloud Management – Unified visibility and control for multi-cloud setups.</li>
            <li>• Containerization (Docker & Kubernetes) – Application scalability with microservices architecture.</li>
            <li>• Backup & Disaster Recovery – Multi-region data resilience and policy-based recovery automation.</li>
          </ul>
          <div className='flex justify-center'>
            <Link to="/services/cloud-infrastructure"><button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Optimize My Cloud</button></Link>
          </div>
        </div>

        {/* Optimization & Digital Reach (SEO / AEO / GEO) */}
        <div id='optimization-digital-reach' className='john scroll-anchor' data-heading='Digital Optimization'>
          <div className='text-2xl'>Optimization & Digital Reach (SEO / AEO / GEO)</div>
          <div>Xorvo helps your business remain discoverable across every digital platform. Our integrated optimization framework covers visibility from search engines to AI-powered assistants — all in a single solution.</div>
          <ul>
            <li>• SEO Optimization – Structured content, performance tuning, and keyword integrity.</li>
            <li>• AEO (Answer Engine Optimization) – Conversational and voice-search readiness for AI platforms.</li>
            <li>• GEO Optimization – Enhanced local discovery with accurate business indexing and map listings.</li>
          </ul>
          <div className='flex flex-col gap-2 items-center'>
            <p>All three are combined into one managed optimization program for consistent growth across regions and platforms.</p>
            <Link to="/services/consulting/seo"><button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Improve Digital Presence</button></Link>
          </div>
        </div>

        {/* Application Engineering & Customization */}
        <div id='application-engineering' className='felix scroll-anchor' data-heading='Application Engineering'>
          <div className='text-2xl'>Application Engineering & Customization</div>
          <div>Every enterprise operates differently — your applications should too. We design and deploy solutions tailored to your operational needs and long-term scalability.</div>
          <ul>
            <li>• Application Deployment – Seamless app rollouts with environment validation.</li>
            <li>• Custom Application Development – Tailored solutions integrated with business workflows.</li>
            <li>• Application Designing (UI/UX) – User-focused front-end architecture aligned with enterprise standards.</li>
            <li>• API & System Integration – Secure connectivity between platforms and data sources.</li>
          </ul>
          <div className='flex justify-center'>
            <Link to="/services/consulting/app-deployment"><button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">View Application Services</button></Link>
          </div>
        </div>

        {/* Enterprise Network Security Integration */}
        <div id='network-security' className='akash scroll-anchor' data-heading='Network Security'>
          <div className='text-2xl'>Enterprise Network Security Integration</div>
          <div>Security is not a product — it’s a design principle. Our network and infrastructure solutions include integrated security layers that align with enterprise compliance standards.</div>
          <ul>
            <li>• Firewall & Access Policy Design – Layered protection with segmentation and rule enforcement.</li>
            <li>• VPN & Remote Access – Secure connectivity for distributed environments.</li>
            <li>• Traffic Optimization & SD-WAN – Intelligent routing for cloud-first networks.</li>
            <li>• Compliance Alignment – Network controls mapped to ISO, GDPR, and NIST frameworks.</li>
          </ul>
          <div className='flex justify-center'>
            <Link to="/services/cybersecurity"><button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Request Network Assessment</button></Link>
          </div>
        </div>

        {/* Unified Deployment Ecosystem */}
        <div id='unified-deployment' className='john scroll-anchor' data-heading='Unified Deployment'>
          <div className='text-2xl'>Unified Deployment Ecosystem</div>
          <div>We ensure every deployment — whether an application, server, or security stack — is part of a unified, automated environment. From CI/CD pipelines to integrated monitoring, Xorvo’s engineering approach ensures consistent performance and simplified management.</div>
          <div className='flex justify-center'>
            <Link to="/?contact=true"><button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Talk to a Deployment Engineer</button></Link>
          </div>
        </div>

      </div>

      {/* INTEGRATION & ENGINEERING SOLUTIONS (Xorvo Technologies) */}
      <div className=' noah '>
        {/* Overview */}
        <div id='integration-overview' className='john scroll-anchor' data-heading='Integration Solutions'>
          <div className='text-2xl flex justify-center'>INTEGRATION & ENGINEERING SOLUTIONS (Xorvo Technologies)</div>
          <div className='krishna'>(Overview)</div>
          <div>Modern enterprises demand more than individual tools — they require complete ecosystems that integrate seamlessly across security, cloud, and application layers. Xorvo Technologies delivers unified engineering and integration frameworks that help organizations build cohesive, automated, and scalable IT environments.</div>
          <div className='flex justify-center'>
            <Link to="/?contact=true"><button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Talk to an Integration Expert</button></Link>
          </div>
        </div>

        {/* System Integration Framework */}
        <div id='system-integration-framework' className='felix scroll-anchor' data-heading='System Integration'>
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
            <Link to="/services/consulting/app-deployment"><button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Explore Integration Services</button></Link>
          </div>
        </div>

        {/* Enterprise Architecture & Engineering */}
        <div id='enterprise-architecture-engineering' className='akash scroll-anchor' data-heading='Enterprise Architecture'>
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
            <Link to="/services/consulting/network-design"><button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Request Architecture Review</button></Link>
          </div>
        </div>

        {/* Hybrid & Multi-Cloud Integration */}
        <div id='hybrid-multi-cloud' className='john scroll-anchor' data-heading='Multi-Cloud Integration'>
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
            <Link to="/services/cloud-infrastructure"><button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More About Cloud Integration</button></Link>
          </div>
        </div>

        {/* Continuous Engineering & Automation */}
        <div id='continuous-engineering-automation' className='felix scroll-anchor' data-heading='Continuous Engineering'>
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
            <Link to="/services/consulting/ci-cd-automation"><button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Automate My Environment</button></Link>
          </div>
        </div>

        {/* Unified Security and Performance Operations */}
        <div id='unified-security-performance-ops' className='akash scroll-anchor' data-heading='Security Operations'>
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
            <Link to="/services/cybersecurity"><button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Request Integrated Ops Demo</button></Link>
          </div>
        </div>

        {/* Full-Stack Application Ecosystem */}
        <div id='full-stack-application-ecosystem' className='john scroll-anchor' data-heading='Full-Stack Applications'>
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
            <Link to="/services/consulting/custom-applications"><button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Explore Application Engineering</button></Link>
          </div>
        </div>

        {/* Collaborative Engineering (Cross-Platform Alignment) */}
        <div id='collaborative-engineering' className='felix scroll-anchor' data-heading='Collaborative Engineering'>
          <div className='text-2xl'>Collaborative Engineering (Cross-Platform Alignment)</div>
          <div>Our team works closely with technology leaders — Fortinet, Cisco, Check Point, Microsoft, AWS, and ServiceNow — to ensure your stack remains integrated and future-proof. We align engineering practices across platforms, ensuring compatibility, scalability, and ongoing optimization.</div>
          <div className='center-row'>
            <Link to="/partners"><button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">View Partner Ecosystem</button></Link>
          </div>
        </div>

        {/* Closing Section (Final CTA / Confidence Message) */}
      </div>
        <div id='integration-closing' className='bole scroll-anchor'>
          <div className='text-2xl'>Integration is where real digital transformation happens.</div>
          <div>Xorvo Technologies brings together systems, security, and intelligence into one unified ecosystem — delivering performance without compromise and protection without limits.</div>
          <div className='bat flex gap-2 justify-center'>
            <Link to="/?contact=true"><button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Request Integration Consultation</button></Link>
            <Link to="/services"><button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Explore All Services</button></Link>
          </div>
        </div>

 
    </div>
  )
}

export default Solution
