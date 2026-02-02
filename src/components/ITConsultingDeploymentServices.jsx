import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import "./Services.css"

const ITConsultingDeploymentServices = () => {
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
      {/* IT Consulting & Deployment Services - Full Screen Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-white services-hero-3">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{backgroundImage: "url('/modern-equipped-computer-lab.jpg')"}}></div>
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-gray-800/60 to-gray-900/80"></div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-12">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            {/* Headline with animation */}
            <h1 className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ fontFamily: "'Roboto', 'Arial', sans-serif" }}>
              <span className="block text-white mb-4">
                IT CONSULTING &
              </span>
              <span className="block text-white">
                DEPLOYMENT
              </span>
            </h1>

            {/* Subtitle */}
            <p className={`text-xl md:text-2xl lg:text-3xl text-gray-200 max-w-4xl mx-auto transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Transform your business with expert IT consulting and seamless deployment solutions. Our comprehensive services cover application development, infrastructure design, and digital optimization to drive your organization's success.
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <Link to="/?contact=true">
                <button type="button" className="bg-[#727CAB] text-white hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 font-semibold rounded-lg text-lg px-8 py-4 text-center transition-all duration-300 hover:shadow-xl hover:scale-105">
                  Talk to a Consulting Expert
                </button>
              </Link>
              <Link to="#it-consulting-cards">
                <button type="button" className="border-2 border-white text-white hover:bg-white hover:text-[#727CAB] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 font-semibold rounded-lg text-lg px-8 py-4 text-center transition-all duration-300 hover:shadow-xl hover:scale-105">
                  View IT Consulting Services
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

      <div id="it-consulting-cards" className='noah services-cards'>
        {/* Application Deployment */}
        <div id='application-deployment' className='john scroll-anchor' data-heading='Application Deployment'>
          <div className='text-2xl'>Application Deployment</div>
          <div>Streamline your application deployment process with our expert deployment services. We ensure smooth, secure, and efficient deployment of your applications across various platforms and environments.</div>
          
          <div>Our deployment solutions include automated deployment pipelines, container orchestration, cloud-native deployments, and continuous integration/continuous deployment (CI/CD) setup. We handle everything from planning to execution and post-deployment monitoring.</div>
          
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Ensures reliable and consistent application deployments</li>
            <li>• Reduces deployment time and human errors</li>
            <li>• Enables rapid iteration and feature releases</li>
            <li>• Provides rollback capabilities for failed deployments</li>
            <li>• Supports multi-environment deployment strategies</li>
          </ul>
          <div className='center-row'>
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* Custom Applications */}
        <div id='custom-applications' className='felix scroll-anchor' data-heading='Custom Applications'>
          <div className='text-2xl'>Custom Applications</div>
          <div>Build tailored software solutions that perfectly match your business requirements. Our custom application development services deliver scalable, secure, and user-friendly applications designed for your specific needs.</div>
          
          <div>We develop custom web applications, mobile apps, enterprise software, and specialized business tools using modern technologies and best practices. Our solutions are built to scale with your business and integrate seamlessly with existing systems.</div>
          
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Addresses unique business challenges with tailored solutions</li>
            <li>• Provides competitive advantage through custom features</li>
            <li>• Ensures perfect fit with existing workflows</li>
            <li>• Offers flexibility for future enhancements</li>
            <li>• Delivers better ROI than off-the-shelf solutions</li>
          </ul>
          <div className='center-row'>
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* Application Designing (UI/UX) */}
        <div id='application-designing' className='akash scroll-anchor' data-heading='Application Designing (UI/UX)'>
          <div className='text-2xl'>Application Designing (UI/UX)</div>
          <div>Create intuitive and visually stunning user interfaces that delight your users. Our UI/UX design services focus on user-centered design principles to deliver exceptional digital experiences.</div>
          
          <div>We provide comprehensive design services including user research, wireframing, prototyping, visual design, and usability testing. Our designs are not just beautiful but also functional, accessible, and optimized for conversion.</div>
          
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Improves user satisfaction and engagement</li>
            <li>• Reduces learning curves and support costs</li>
            <li>• Increases conversion rates and user retention</li>
            <li>• Ensures accessibility for all users</li>
            <li>• Creates strong brand identity and trust</li>
          </ul>
          <div className='center-row'>
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* CI/CD Automation */}
        <div id='ci-cd-automation' className='felix scroll-anchor' data-heading='CI/CD Automation'>
          <div className='text-2xl'>CI/CD Automation</div>
          <div>Build robust continuous integration and continuous deployment pipelines to accelerate your software delivery. Our CI/CD automation services ensure faster, more reliable releases with minimal manual intervention.</div>
          
          <div>We design and implement complete CI/CD workflows including automated builds, testing, code quality checks, security scanning, and deployment pipelines. Our solutions integrate with your existing tools and support multiple deployment environments.</div>
          
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Accelerates time-to-market for new features</li>
            <li>• Reduces manual deployment errors and risks</li>
            <li>• Improves code quality through automated testing</li>
            <li>• Enables rapid rollback and recovery</li>
            <li>• Increases development team productivity</li>
          </ul>
          <div className='center-row'>
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* Deployment Automation */}
        <div id='deployment-automation' className='john scroll-anchor' data-heading='Deployment Automation'>
          <div className='text-2xl'>Deployment Automation</div>
          <div>Automate your entire deployment pipeline to achieve faster, more reliable releases. Our automation services eliminate manual errors and ensure consistent deployments across all environments.</div>
          
          <div>We implement CI/CD pipelines, infrastructure as code, automated testing, and monitoring solutions. Our automation frameworks support multiple platforms, cloud providers, and deployment strategies including blue-green and canary deployments.</div>
          
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Dramatically reduces deployment time and effort</li>
            <li>• Minimizes human errors and inconsistencies</li>
            <li>• Enables multiple daily deployments</li>
            <li>• Provides instant rollback capabilities</li>
            <li>• Improves team productivity and morale</li>
          </ul>
          <div className='center-row'>
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* Monitoring & NOC Setup */}
        <div id='monitoring-noc-setup' className='felix scroll-anchor' data-heading='Monitoring & NOC Setup'>
          <div className='text-2xl'>Monitoring & NOC Setup</div>
          <div>Establish comprehensive monitoring and Network Operations Center (NOC) capabilities to ensure optimal performance and availability of your IT infrastructure and applications.</div>
          
          <div>We provide end-to-end monitoring solutions including infrastructure monitoring, application performance monitoring, log management, alerting systems, and NOC setup. Our solutions give you complete visibility into your IT environment.</div>
          
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Proactively identifies and resolves issues before they impact users</li>
            <li>• Provides complete visibility into system performance</li>
            <li>• Enables data-driven decision making</li>
            <li>• Ensures compliance with SLA requirements</li>
            <li>• Reduces mean time to resolution (MTTR)</li>
          </ul>
          <div className='center-row'>
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* Website Development */}
        <div id='website-development' className='akash scroll-anchor' data-heading='Website Development'>
          <div className='text-2xl'>Website Development</div>
          <div>Create stunning, high-performance websites that drive business growth. Our web development services combine cutting-edge technology with creative design to deliver exceptional digital experiences.</div>
          
          <div>We develop responsive websites, web applications, e-commerce platforms, and content management systems. Our solutions are built with modern frameworks, optimized for search engines, and designed for scalability and performance.</div>
          
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Establishes strong online presence and credibility</li>
            <li>• Generates leads and drives business growth</li>
            <li>• Provides 24/7 accessibility to customers</li>
            <li>• Enables global market reach</li>
            <li>• Supports digital marketing initiatives</li>
          </ul>
          <div className='center-row'>
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* SEO Optimization */}
        <div id='seo-optimization' className='john scroll-anchor' data-heading='SEO Optimization'>
          <div className='text-2xl'>SEO Optimization</div>
          <div>Boost your online visibility and attract more organic traffic with our comprehensive SEO optimization services. We implement proven strategies to improve your search engine rankings and digital presence.</div>
          
          <div>Our SEO services include technical SEO, on-page optimization, content strategy, link building, local SEO, and performance monitoring. We stay updated with the latest search engine algorithms and best practices to deliver sustainable results.</div>
          
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Increases organic traffic and visibility</li>
            <li>• Improves brand credibility and trust</li>
            <li>• Provides cost-effective marketing solution</li>
            <li>• Targets high-intent users actively searching for your services</li>
            <li>• Delivers long-term sustainable results</li>
          </ul>
          <div className='center-row'>
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* AEO (Answer Engine Optimization) */}
        <div id='aeo-optimization' className='felix scroll-anchor' data-heading='AEO (Answer Engine Optimization)'>
          <div className='text-2xl'>AEO (Answer Engine Optimization)</div>
          <div>Optimize your content for AI-powered answer engines and voice search to capture the growing number of users seeking direct answers. Our AEO services ensure your brand appears in featured snippets and voice search results.</div>
          
          <div>We implement structured data markup, conversational content optimization, question-answer formats, and voice search optimization. Our strategies are designed to position your content as the definitive answer to user queries.</div>
          
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Captures zero-click searches and voice queries</li>
            <li>• Positions your brand as an authority in your industry</li>
            <li>• Adapts to changing search behavior patterns</li>
            <li>• Provides competitive advantage in AI-driven search</li>
            <li>• Future-proofs your digital marketing strategy</li>
          </ul>
          <div className='center-row'>
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* GEO (Local SEO) */}
        <div id='geo-local-seo' className='akash scroll-anchor' data-heading='GEO (Local SEO)'>
          <div className='text-2xl'>GEO (Local SEO)</div>
          <div>Dominate local search results and attract more customers in your service area. Our local SEO services optimize your online presence for location-based searches and help you stand out in your local market.</div>
          
          <div>We optimize Google Business Profile, local citations, location-specific content, customer reviews, and local link building. Our strategies ensure maximum visibility in local search results and map listings.</div>
          
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Increases foot traffic and local customer acquisition</li>
            <li>• Improves visibility in "near me" searches</li>
            <li>• Builds trust with local community</li>
            <li>• Provides competitive advantage in local markets</li>
            <li>• Supports multi-location business expansion</li>
          </ul>
          <div className='center-row'>
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* CRM Implementation */}
        <div id='crm-implementation' className='john scroll-anchor' data-heading='CRM Implementation'>
          <div className='text-2xl'>CRM Implementation</div>
          <div>Transform your customer relationships with comprehensive CRM solutions. Our CRM implementation services help you manage customer data, streamline sales processes, and improve customer satisfaction.</div>
          
          <div>We implement leading CRM platforms including Salesforce, HubSpot, Zoho, and custom CRM solutions. Our services include data migration, process automation, custom development, and user training to ensure successful adoption.</div>
          
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Centralizes customer data for better insights</li>
            <li>• Improves sales team productivity and efficiency</li>
            <li>• Enhances customer experience and satisfaction</li>
            <li>• Enables data-driven decision making</li>
            <li>• Scales with your business growth</li>
          </ul>
          <div className='center-row'>
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* ERP Implementation */}
        <div id='erp-implementation' className='felix scroll-anchor' data-heading='ERP Implementation'>
          <div className='text-2xl'>ERP Implementation</div>
          <div>Streamline your business operations with comprehensive ERP solutions that integrate all aspects of your organization. Our ERP implementation services ensure seamless integration and optimal performance.</div>
          
          <div>We implement leading ERP solutions including SAP, Oracle, Microsoft Dynamics, and custom ERP systems. Our services cover requirement analysis, system configuration, data migration, process optimization, and post-implementation support.</div>
          
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Integrates all business processes into one system</li>
            <li>• Improves operational efficiency and productivity</li>
            <li>• Provides real-time business insights</li>
            <li>• Reduces operational costs and redundancies</li>
            <li>• Supports business growth and scalability</li>
          </ul>
          <div className='center-row'>
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* HRMS Implementation */}
        <div id='hrms-implementation' className='akash scroll-anchor' data-heading='HRMS Implementation'>
          <div className='text-2xl'>HRMS Implementation</div>
          <div>Modernize your HR operations with comprehensive HRMS solutions. Our HRMS implementation services help you manage human resources more efficiently and improve employee experience.</div>
          
          <div>We implement leading HRMS platforms including Workday, BambooHR, Zoho People, and custom HR solutions. Our services cover payroll, benefits administration, performance management, recruitment, and employee self-service portals.</div>
          
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Automates HR processes and reduces administrative burden</li>
            <li>• Improves data accuracy and compliance</li>
            <li>• Enhances employee experience and engagement</li>
            <li>• Provides strategic HR insights and analytics</li>
            <li>• Scales with organizational growth</li>
          </ul>
          <div className='center-row'>
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* Network Designing */}
        <div id='network-designing' className='john scroll-anchor' data-heading='Network Designing'>
          <div className='text-2xl'>Network Designing</div>
          <div>Design robust, secure, and scalable network infrastructure that supports your business operations. Our network design services ensure optimal performance, reliability, and security for your IT environment.</div>
          
          <div>We design and implement network architectures including LAN/WAN, wireless networks, VPN solutions, and cloud connectivity. Our solutions follow industry best practices and are designed for high availability and future growth.</div>
          
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Ensures reliable and high-performance connectivity</li>
            <li>• Provides secure network infrastructure</li>
            <li>• Supports business growth and scalability</li>
            <li>• Reduces network downtime and maintenance costs</li>
            <li>• Enables seamless integration of new technologies</li>
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
              Everything you need to know about our IT consulting and deployment services, custom application development, network infrastructure design, and partnerships with leading technology providers
            </p>
          </div>

          <div className="space-y-6">
            {/* FAQ 1 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <button className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">What IT consulting and deployment services does Xorvo Technologies provide?</h3>
                <svg className="w-5 h-5 text-gray-500 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="px-8 pb-6">
                <div className="text-gray-600 space-y-4">
                  <p>Xorvo Technologies offers comprehensive IT consulting and deployment services including custom application development, network infrastructure design, IT strategy consulting, system integration, cloud migration planning, and digital transformation consulting. We partner with leading technology providers including Microsoft, Cisco, Aruba Networks, Dell, HP, and various software vendors to deliver end-to-end IT solutions.</p>
                  <p>Our consulting services encompass technology roadmaps, vendor selection, project management, implementation planning, and post-deployment support. We specialize in developing custom applications, designing scalable network architectures, implementing enterprise systems, and ensuring seamless integration between different technology platforms.</p>
                </div>
              </div>
            </div>

            {/* FAQ 2 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <button className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">How do you approach custom application development?</h3>
                <svg className="w-5 h-5 text-gray-500 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="px-8 pb-6">
                <div className="text-gray-600 space-y-4">
                  <p>Our custom application development follows agile methodologies with comprehensive requirements gathering, system design, development, testing, and deployment phases. We develop applications using modern frameworks including .NET, Java, Python, React, Angular, and mobile development platforms. Our team creates web applications, mobile apps, desktop software, and enterprise systems tailored to your specific business requirements.</p>
                  <p>We implement best practices in software architecture, database design, security, and performance optimization. Our development process includes continuous integration, automated testing, code reviews, and regular client feedback sessions. We ensure applications are scalable, maintainable, and integrate seamlessly with your existing IT infrastructure.</p>
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
                  <p>We maintain strategic partnerships with leading technology vendors to provide comprehensive IT solutions. Our networking partners include Cisco and Aruba Networks for enterprise networking equipment, while our hardware partnerships cover Dell, HP, and Lenovo for servers, workstations, and storage solutions. We work with Microsoft for development platforms, database systems, and cloud services.</p>
                  <p>Our software partnerships include various database providers, development tools, and specialized application vendors. We maintain certified partnerships ensuring access to enterprise support, training resources, and the latest technologies. These relationships enable us to recommend and implement the best-fit solutions for your specific requirements while ensuring reliable vendor backing.</p>
                </div>
              </div>
            </div>

            {/* FAQ 4 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <button className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">How do you design and deploy network infrastructure?</h3>
                <svg className="w-5 h-5 text-gray-500 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="px-8 pb-6">
                <div className="text-gray-600 space-y-4">
                  <p>Our network infrastructure design services include comprehensive network assessments, topology design, security architecture, capacity planning, and implementation. We design LAN, WAN, wireless networks, and data center infrastructure using enterprise-grade equipment from Cisco and Aruba Networks. Our solutions include network segmentation, VLAN configuration, QoS implementation, and redundancy planning.</p>
                  <p>We implement network security with next-generation firewalls, intrusion detection systems, VPN solutions, and secure wireless networks. Our deployment services include hardware installation, configuration, testing, and documentation. We ensure networks are designed for scalability, performance, and security while meeting your business requirements and budget constraints.</p>
                </div>
              </div>
            </div>

            {/* FAQ 5 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <button className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">What is your approach to IT strategy and digital transformation?</h3>
                <svg className="w-5 h-5 text-gray-500 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="px-8 pb-6">
                <div className="text-gray-600 space-y-4">
                  <p>Our IT strategy consulting begins with comprehensive business analysis, current state assessment, and future-state visioning. We develop multi-year technology roadmaps aligned with your business objectives, budget cycles, and industry trends. Our digital transformation services include cloud adoption strategies, process automation, modernization of legacy systems, and implementation of emerging technologies.</p>
                  <p>We provide strategic guidance on technology investments, vendor selection, risk management, and change management. Our consultants help you navigate digital transformation challenges while minimizing disruption to business operations. We ensure your IT strategy supports business growth, improves operational efficiency, and maintains competitive advantage.</p>
                </div>
              </div>
            </div>

            {/* FAQ 6 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <button className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">How do you handle system integration and data migration?</h3>
                <svg className="w-5 h-5 text-gray-500 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="px-8 pb-6">
                <div className="text-gray-600 space-y-4">
                  <p>Our system integration services connect disparate systems, applications, and data sources to create unified business processes. We implement API integrations, middleware solutions, data synchronization, and workflow automation. Our integration expertise covers ERP systems, CRM platforms, custom applications, and third-party services using modern integration platforms and custom development.</p>
                  <p>Our data migration services include comprehensive planning, data mapping, cleansing, validation, and secure transfer between systems. We utilize specialized migration tools and custom scripts to ensure data integrity and minimal downtime. We support migrations between databases, applications, cloud platforms, and on-premises systems with detailed testing and rollback procedures.</p>
                </div>
              </div>
            </div>

            {/* FAQ 7 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <button className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">What project management methodologies do you follow?</h3>
                <svg className="w-5 h-5 text-gray-500 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="px-8 pb-6">
                <div className="text-gray-600 space-y-4">
                  <p>We follow both agile and waterfall project management methodologies based on project requirements and client preferences. Our agile approach includes Scrum and Kanban frameworks with sprint planning, daily stand-ups, sprint reviews, and retrospectives. For larger enterprise projects, we implement hybrid methodologies combining agile development with traditional project governance.</p>
                  <p>Our project management includes comprehensive planning, risk management, resource allocation, timeline tracking, and stakeholder communication. We utilize project management tools like Jira, Microsoft Project, and Asana for transparent project tracking. Our certified project managers ensure projects are delivered on time, within budget, and to the specified quality standards.</p>
                </div>
              </div>
            </div>

            {/* FAQ 8 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <button className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">What kind of post-deployment support do you provide?</h3>
                <svg className="w-5 h-5 text-gray-500 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="px-8 pb-6">
                <div className="text-gray-600 space-y-4">
                  <p>Our post-deployment support includes comprehensive warranty periods, technical support, performance monitoring, bug fixes, and system optimization. We provide different support tiers ranging from basic business hours support to 24/7 enterprise support with guaranteed response times. Our team conducts post-implementation reviews, user training, and knowledge transfer sessions.</p>
                  <p>We offer ongoing maintenance services including system updates, security patches, performance tuning, and capacity planning. Our support includes help desk services, remote monitoring, proactive system health checks, and regular reporting. We maintain detailed documentation and provide escalation procedures for critical issues to ensure continuous system availability and performance.</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link to="/?contact=true&consulting=true" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
              <span>Get a Free IT Consulting Assessment</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 lg:px-12 bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Digital Infrastructure?
          </h2>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Accelerate your digital transformation with expert IT consulting and deployment services. Our experts are ready to deliver custom applications, network design, and strategic IT solutions that drive your business forward.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] text-white hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 font-semibold rounded-lg text-lg px-8 py-4 text-center transition-all duration-300 hover:shadow-xl hover:scale-105">
                Get IT Consulting Assessment
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

export default ITConsultingDeploymentServices;
