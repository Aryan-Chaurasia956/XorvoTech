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

      {/* FAQ Section */}
      <section className="py-20 px-4 md:px-8 lg:px-12 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#727CAB' }}>Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about our cloud infrastructure services, partnerships with AWS and other providers, and how we modernize your IT infrastructure
            </p>
          </div>

          <div className="space-y-6">
            {/* FAQ 1 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <button className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">What cloud infrastructure services does Xorvo Technologies provide?</h3>
                <svg className="w-5 h-5 text-gray-500 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="px-8 pb-6">
                <div className="text-gray-600 space-y-4">
                  <p>Xorvo Technologies offers comprehensive cloud infrastructure services including cloud migration, hybrid cloud setup, multi-cloud management, infrastructure as code (IaC), container orchestration, serverless computing, and cloud-native application development. We partner with leading cloud providers including AWS, Microsoft Azure, and Google Cloud Platform to deliver scalable, secure, and cost-effective cloud solutions.</p>
                  <p>Our services encompass cloud architecture design, implementation, optimization, and ongoing management. We specialize in DevOps automation, CI/CD pipeline setup, cloud security, compliance management, and cost optimization strategies to ensure your cloud infrastructure delivers maximum business value while maintaining security and performance standards.</p>
                </div>
              </div>
            </div>

            {/* FAQ 2 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <button className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">How do you ensure seamless cloud migration with zero downtime?</h3>
                <svg className="w-5 h-5 text-gray-500 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="px-8 pb-6">
                <div className="text-gray-600 space-y-4">
                  <p>Our cloud migration methodology ensures zero downtime through careful planning, phased migrations, and comprehensive testing. We begin with thorough assessment of your current infrastructure, application dependencies, and business requirements. Our team creates detailed migration roadmaps with rollback strategies, data synchronization plans, and performance benchmarks.</p>
                  <p>We utilize advanced migration tools from AWS and Microsoft to ensure data integrity and application continuity. Our approach includes pilot migrations, parallel running environments, and cutover strategies that minimize risk. We provide 24/7 monitoring during migration phases and have experienced engineers on standby to address any issues immediately.</p>
                </div>
              </div>
            </div>

            {/* FAQ 3 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <button className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">Which cloud platforms and partners do you work with?</h3>
                <svg className="w-5 h-5 text-gray-500 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="px-8 pb-6">
                <div className="text-gray-600 space-y-4">
                  <p>We are certified partners with major cloud platforms including AWS (Amazon Web Services), Microsoft Azure, and Google Cloud Platform. Our AWS partnership includes certifications in Solutions Architecture, DevOps Engineering, and Cloud Security. We maintain strong relationships with hardware partners like Dell, HP, and Lenovo for hybrid infrastructure deployments.</p>
                  <p>Our technology ecosystem includes partnerships with VMware for virtualization, Cisco and Aruba Networks for networking, Fortinet and Palo Alto Networks for cloud security, and Veeam for cloud backup and disaster recovery. These partnerships ensure we have access to the latest cloud technologies, expert support, and competitive pricing for our clients.</p>
                </div>
              </div>
            </div>

            {/* FAQ 4 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <button className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">How do you optimize cloud costs and prevent overspending?</h3>
                <svg className="w-5 h-5 text-gray-500 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="px-8 pb-6">
                <div className="text-gray-600 space-y-4">
                  <p>Our cloud cost optimization strategy combines automated monitoring, right-sizing recommendations, reserved instance planning, and usage pattern analysis. We implement cost governance frameworks with AWS Cost Explorer and Azure Cost Management to provide real-time visibility into cloud spending. Our team identifies underutilized resources, recommends instance optimizations, and implements auto-scaling policies to match demand.</p>
                  <p>We establish tagging strategies, budget alerts, and regular cost reviews to prevent overspending. Our optimization includes storage tier management, data transfer cost reduction, and scheduling non-critical workloads during off-peak hours. We typically achieve 20-40% cost savings for our clients through systematic optimization.</p>
                </div>
              </div>
            </div>

            {/* FAQ 5 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <button className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">What security measures do you implement for cloud infrastructure?</h3>
                <svg className="w-5 h-5 text-gray-500 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="px-8 pb-6">
                <div className="text-gray-600 space-y-4">
                  <p>Our cloud security framework implements defense-in-depth strategies with network security, identity and access management, data encryption, threat detection, and compliance monitoring. We utilize AWS Security Hub, Azure Security Center, and advanced security tools from partners like Palo Alto Networks and Fortinet for comprehensive cloud protection.</p>
                  <p>We implement security best practices including VPC isolation, security groups, NACLs, WAF configurations, DDoS protection, and regular security assessments. Our team ensures compliance with SOC 2, ISO 27001, PCI DSS, HIPAA, and GDPR requirements through automated compliance checks and continuous monitoring.</p>
                </div>
              </div>
            </div>

            {/* FAQ 6 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <button className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">Do you provide hybrid cloud and multi-cloud solutions?</h3>
                <svg className="w-5 h-5 text-gray-500 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="px-8 pb-6">
                <div className="text-gray-600 space-y-4">
                  <p>Yes, we specialize in hybrid cloud and multi-cloud architectures that combine the best of on-premises and cloud environments. Our hybrid solutions enable seamless integration between your existing datacenter infrastructure and public cloud services, providing flexibility, scalability, and optimal resource placement based on performance, security, and compliance requirements.</p>
                  <p>For multi-cloud environments, we implement unified management platforms using tools like Kubernetes, Terraform, and Ansible to ensure consistent operations across AWS, Azure, and Google Cloud. Our approach avoids vendor lock-in while leveraging each platform's strengths for specific workloads and applications.</p>
                </div>
              </div>
            </div>

            {/* FAQ 7 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <button className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">How do you handle disaster recovery and business continuity?</h3>
                <svg className="w-5 h-5 text-gray-500 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="px-8 pb-6">
                <div className="text-gray-600 space-y-4">
                  <p>Our disaster recovery solutions leverage cloud infrastructure for reliable, cost-effective business continuity. We implement multi-region deployments, automated backup strategies, and failover mechanisms using AWS Route 53, Azure Traffic Manager, and Veeam backup solutions. Our DR plans include RTO/RPO definitions, regular testing, and comprehensive recovery procedures.</p>
                  <p>We provide both pilot light and warm standby configurations based on your business requirements and budget. Our team conducts quarterly disaster recovery tests, maintains updated documentation, and ensures 24/7 monitoring of backup integrity and replication status to guarantee rapid recovery when needed.</p>
                </div>
              </div>
            </div>

            {/* FAQ 8 */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <button className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                <h3 className="text-xl font-semibold text-gray-900">What kind of support and monitoring do you provide for cloud infrastructure?</h3>
                <svg className="w-5 h-5 text-gray-500 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="px-8 pb-6">
                <div className="text-gray-600 space-y-4">
                  <p>We provide comprehensive 24/7 cloud infrastructure monitoring and support using advanced tools like AWS CloudWatch, Azure Monitor, and third-party solutions. Our monitoring covers performance metrics, security events, cost tracking, and application health. We implement automated alerting, incident response procedures, and proactive capacity planning.</p>
                  <p>Our support team includes certified cloud architects and engineers who provide strategic guidance, performance optimization, security updates, and troubleshooting. We offer different support tiers from basic monitoring to fully managed services, ensuring you have the right level of expertise and response times for your business needs.</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link to="/?contact=true&cloud=true" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-700 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
              <span>Get a Free Cloud Assessment</span>
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
