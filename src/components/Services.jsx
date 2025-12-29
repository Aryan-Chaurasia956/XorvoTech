import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
 
import "./Services.css"

const Services = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [isEnterpriseVisible, setIsEnterpriseVisible] = useState(false);
  const [isCybersecurityVisible, setIsCybersecurityVisible] = useState(false);
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

  // Trigger animation when Cybersecurity section loads
  useEffect(() => {
    if (shouldLoadCybersecurity) {
      // Small delay to ensure DOM is rendered
      const timer = setTimeout(() => {
        setIsCybersecurityVisible(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [shouldLoadCybersecurity]);

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
          if (entry.isIntersecting && entry.target.id === 'cybersecurity-hero') {
            setIsCybersecurityVisible(true);
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
      const cybersecuritySection = document.getElementById('cybersecurity-hero');
      if (cybersecuritySection) {
        animationObserver.observe(cybersecuritySection);
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
      const cybersecuritySection = document.getElementById('cybersecurity-hero');
      if (cybersecuritySection) {
        animationObserver.unobserve(cybersecuritySection);
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

      {/* Service Categories - Enhanced Horizontal Cards */}
      <section id="service-categories" className="py-20 px-4 md:px-8 lg:px-12 relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{backgroundImage: "url('/growtika-3C0SWyusdS8-unsplash.jpg')"}}></div>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90"></div>
        
        {/* Gradient Mesh Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-transparent to-purple-900/20"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-cyan-900/15 via-transparent to-indigo-900/15"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4">Our Service Categories</h2>
            <p className="text-lg text-gray-200 max-w-3xl mx-auto">Explore our comprehensive range of services designed to transform your business operations</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            
            {/* Cybersecurity Services */}
            <Link to="#cybersecurity-hero" className="service-category-card group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 opacity-90"></div>
              <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{backgroundImage: "url('/solutions/dan-nelson-AvSFPw5Tp68-unsplash.jpg')"}}></div>
              <div className="relative z-10 p-6 h-full flex flex-col justify-between min-h-[200px]">
                <div>
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4 backdrop-blur-sm">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Cybersecurity Services</h3>
                  <p className="text-sm text-white/90">Advanced protection for your digital assets</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-white/70">Learn More</span>
                  <svg className="w-5 h-5 text-white group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </div>
              </div>
            </Link>

            {/* Cloud & Infrastructure */}
            <Link to="#enterprise-it-hero" className="service-category-card group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 to-blue-700 opacity-90"></div>
              <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{backgroundImage: "url('/solutions/sigmund-Fa9b57hffnM-unsplash.jpg')"}}></div>
              <div className="relative z-10 p-6 h-full flex flex-col justify-between min-h-[200px]">
                <div>
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4 backdrop-blur-sm">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Cloud & Infrastructure</h3>
                  <p className="text-sm text-white/90">Scalable cloud solutions & management</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-white/70">Learn More</span>
                  <svg className="w-5 h-5 text-white group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </div>
              </div>
            </Link>

            {/* Managed IT Services */}
            <Link to="#managed-it-hero" className="service-category-card group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-700 opacity-90"></div>
              <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{backgroundImage: "url('/solutions/sigmund-AxAPuIRWHGk-unsplash.jpg')"}}></div>
              <div className="relative z-10 p-6 h-full flex flex-col justify-between min-h-[200px]">
                <div>
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4 backdrop-blur-sm">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Managed IT Services</h3>
                  <p className="text-sm text-white/90">Complete IT management & support</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-white/70">Learn More</span>
                  <svg className="w-5 h-5 text-white group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </div>
              </div>
            </Link>

            {/* Workspace & Collaboration */}
            <Link to="#workspace-hero" className="service-category-card group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-700 opacity-90"></div>
              <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{backgroundImage: "url('/solutions/alesia-kazantceva-XLm6-fPwK5Q-unsplash.jpg')"}}></div>
              <div className="relative z-10 p-6 h-full flex flex-col justify-between min-h-[200px]">
                <div>
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4 backdrop-blur-sm">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Workspace & Collaboration</h3>
                  <p className="text-sm text-white/90">Modern tools for team productivity</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-white/70">Learn More</span>
                  <svg className="w-5 h-5 text-white group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </div>
              </div>
            </Link>

            {/* Data Protection & Compliance */}
            <Link to="#data-protection-hero" className="service-category-card group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-red-700 opacity-90"></div>
              <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{backgroundImage: "url('/solutions/claudio-schwarz-fyeOxvYvIyY-unsplash.jpg')"}}></div>
              <div className="relative z-10 p-6 h-full flex flex-col justify-between min-h-[200px]">
                <div>
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4 backdrop-blur-sm">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Data Protection & Compliance</h3>
                  <p className="text-sm text-white/90">Security & regulatory compliance</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-white/70">Learn More</span>
                  <svg className="w-5 h-5 text-white group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </div>
              </div>
            </Link>

            {/* IT Consulting & Deployment */}
            <Link to="#it-consulting-hero" className="service-category-card group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 opacity-90"></div>
              <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{backgroundImage: "url('/solutions/christina-wocintechchat-com-p0qKsW3uqA4-unsplash.jpg')"}}></div>
              <div className="relative z-10 p-6 h-full flex flex-col justify-between min-h-[200px]">
                <div>
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4 backdrop-blur-sm">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">IT Consulting & Deployment</h3>
                  <p className="text-sm text-white/90">Expert guidance & deployment</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-white/70">Learn More</span>
                  <svg className="w-5 h-5 text-white group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </div>
              </div>
            </Link>

          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* Cybersecurity Services - Full Screen Hero */}
      <section id="cybersecurity-hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-white services-hero">
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-12">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            {/* Headline with animation */}
            <h1 className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight transition-all duration-700 delay-100 ${isCybersecurityVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <span className="block text-white mb-4">
                CYBERSECURITY
              </span>
              <span className="block text-white">
                SERVICES
              </span>
            </h1>

            {/* Subtitle */}
            <p className={`text-xl md:text-2xl lg:text-3xl text-gray-200 max-w-4xl mx-auto transition-all duration-700 delay-300 ${isCybersecurityVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Protect your enterprise from modern threats with our end-to-end cybersecurity solutions. We combine real-time monitoring, advanced analytics, and proactive defense to safeguard every layer of your network and data infrastructure.
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 transition-all duration-700 delay-500 ${isCybersecurityVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
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
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-700 delay-700 ${isCybersecurityVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      <div className='noah services-cards'>
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
            <li>• Ensures adherence to ISO, GDPR, PCI DSS, HIPAA, and other standards</li>
            <li>• Reduces legal, regulatory, and financial risks</li>
            <li>• Improves governance, risk management, and accountability</li>
            <li>• Enhances customer and partner trust</li>
            <li>• Prepares organizations for audits with confidence</li>
          </ul>
          <div className='center-row'>
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>
      </div>

      {/* Closing CTA */}
      <div className='intro-card intro-stack p-30 relative' style={{
        backgroundImage: "url('/pexels-kaboompics-com-6317.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-blue-900/60 to-slate-900/80"></div>
        
        {/* Content */}
        <div className='krishna relative z-10 text-white'>Integration is where real digital transformation happens. Xorvo Technologies brings together systems, security, and intelligence into one unified ecosystem — delivering performance without compromise and protection without limits.</div>
        <div className='cta-row relative z-10'>
          <Link to="/?contact=true"><button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Request Integration Consultation</button></Link>
          <Link to="#service-categories"><button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Explore All Services</button></Link>
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
                CLOUD &
              </span>
              <span className="block text-white">
                INFRASTRUCTURE
              </span>
            </h1>

            {/* Subtitle */}
            <p className={`text-xl md:text-2xl lg:text-3xl text-gray-200 max-w-4xl mx-auto transition-all duration-700 delay-300 ${isEnterpriseVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              At Xorvo Technologies, our services are engineered to simplify IT management, strengthen security, and enhance operational efficiency. We help organizations design, deploy, and maintain secure digital ecosystems — aligning infrastructure, cloud, and applications into one cohesive system.
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 transition-all duration-700 delay-500 ${isEnterpriseVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <Link to="/?contact=true">
                <button type="button" className="bg-[#727CAB] text-white hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 font-semibold rounded-lg text-lg px-8 py-4 text-center transition-all duration-300 hover:shadow-xl hover:scale-105">
                  Talk to a Cloud Expert
                </button>
              </Link>
              <Link to="#enterprise-it-cards">
                <button type="button" className="border-2 border-white text-white hover:bg-white hover:text-[#727CAB] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 font-semibold rounded-lg text-lg px-8 py-4 text-center transition-all duration-300 hover:shadow-xl hover:scale-105">
                  View Cloud & Infrastructure Services
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
      )}

      {/* Managed IT Services CTA */}
      <div className='intro-card intro-stack p-30 relative' style={{
        backgroundImage: "url('/pexels-kaboompics-com-6317.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-emerald-900/60 to-slate-900/80"></div>
        
        {/* Content */}
        <div className='krishna relative z-10 text-white'>Focus on your business while we handle your IT infrastructure. Xorvo Technologies provides comprehensive managed services, 24/7 monitoring, and expert support to keep your systems running at peak performance.</div>
        <div className='cta-row relative z-10'>
          <Link to="/?contact=true"><button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-300">Request IT Support</button></Link>
          <Link to="#service-categories"><button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Explore All Services</button></Link>
        </div>
      </div>

      {/* Managed IT Services Section */}
      <section id="managed-it-hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-white services-hero-3">
        {/* Background Image Only */}
        <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{backgroundImage: "url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"}}></div>
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-gray-800/60 to-gray-900/80"></div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-12">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            {/* Headline with animation */}
            <h1 className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight transition-all duration-700 delay-100 ${true ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ fontFamily: "'Roboto', 'Arial', sans-serif" }}>
              <span className="block text-white mb-4">
                MANAGED IT
              </span>
              <span className="block text-white">
                SERVICES
              </span>
            </h1>

            {/* Subtitle */}
            <p className={`text-xl md:text-2xl lg:text-3xl text-gray-200 max-w-4xl mx-auto transition-all duration-700 delay-300 ${true ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Focus on your business while we handle your IT. Our comprehensive managed services provide 24/7 monitoring, proactive maintenance, and expert support to keep your systems running at peak performance and security.
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 transition-all duration-700 delay-500 ${true ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
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
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-700 delay-700 ${true ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </section>

      {/* Managed IT Services Cards */}
      <div className='noah services-cards'>
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

      {/* Workspace & Collaboration CTA */}
      <div className='intro-card intro-stack p-30 relative' style={{
        backgroundImage: "url('/pexels-kaboompics-com-6317.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-purple-900/60 to-slate-900/80"></div>
        
        {/* Content */}
        <div className='krishna relative z-10 text-white'>Empower your team with modern collaboration tools and seamless workspace solutions. Xorvo Technologies delivers comprehensive setup, migration, and management for Microsoft 365, Zoho, and Google Workspace.</div>
        <div className='cta-row relative z-10'>
          <Link to="/?contact=true"><button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Request Workspace Setup</button></Link>
          <Link to="#service-categories"><button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Explore All Services</button></Link>
        </div>
      </div>

      {/* Workspace & Collaboration Section */}
      <section id="workspace-hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-white services-hero-3">
        {/* Background Image Only */}
        <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"}}></div>
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-gray-800/60 to-gray-900/80"></div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-12">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            {/* Headline with animation */}
            <h1 className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight transition-all duration-700 delay-100 ${true ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ fontFamily: "'Roboto', 'Arial', sans-serif" }}>
              <span className="block text-white mb-4">
                WORKSPACE &
              </span>
              <span className="block text-white">
                COLLABORATION
              </span>
            </h1>

            {/* Subtitle */}
            <p className={`text-xl md:text-2xl lg:text-3xl text-gray-200 max-w-4xl mx-auto transition-all duration-700 delay-300 ${true ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Empower your team with modern collaboration tools and seamless workspace solutions. We provide comprehensive setup, migration, and management services for leading productivity platforms to enhance teamwork and streamline business operations.
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 transition-all duration-700 delay-500 ${true ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <Link to="/?contact=true">
                <button type="button" className="bg-[#727CAB] text-white hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 font-semibold rounded-lg text-lg px-8 py-4 text-center transition-all duration-300 hover:shadow-xl hover:scale-105">
                  Talk to a Workspace Expert
                </button>
              </Link>
              <Link to="#workspace-cards">
                <button type="button" className="border-2 border-white text-white hover:bg-white hover:text-[#727CAB] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 font-semibold rounded-lg text-lg px-8 py-4 text-center transition-all duration-300 hover:shadow-xl hover:scale-105">
                  View Workspace Services
                </button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-700 delay-700 ${true ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </section>

      {/* Workspace & Collaboration Cards */}
      <div className='noah services-cards'>
        {/* Microsoft 365 */}
        <div id="microsoft-365" className='john' data-heading='Microsoft 365'>
          <div className='text-2xl'>Microsoft 365</div>
          <div>Complete Microsoft 365 deployment, migration, and management services for businesses of all sizes. Our experts handle everything from initial setup to ongoing administration, ensuring your team gets the most value from Microsoft's powerful productivity suite.</div>
          
          <div>We provide comprehensive Microsoft 365 services including tenant configuration, user management, security setup, and integration with existing systems. Our team ensures seamless migration from legacy systems and provides ongoing support for optimal performance and user adoption.</div>
          
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Provides enterprise-grade productivity tools for modern businesses</li>
            <li>• Enables seamless collaboration across teams and locations</li>
            <li>• Offers robust security and compliance features</li>
            <li>• Reduces IT overhead with cloud-based infrastructure</li>
            <li>• Scales with your business growth and changing needs</li>
          </ul>
          <div className='center-row'>
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* Zoho Workspace */}
        <div id="zoho-workspace" className='felix' data-heading='Zoho Workspace'>
          <div className='text-2xl'>Zoho Workspace</div>
          <div>Comprehensive Zoho Workspace implementation and customization to streamline your business operations. We help you leverage Zoho's extensive suite of applications to create a unified ecosystem for CRM, project management, finance, and more.</div>
          
          <div>Our Zoho experts handle complete workspace setup, application configuration, custom workflows, and integration with third-party systems. We ensure your Zoho environment is optimized for your specific business processes and provides maximum ROI for your investment.</div>
          
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Offers cost-effective alternative to enterprise software suites</li>
            <li>• Provides unified platform for multiple business functions</li>
            <li>• Enables extensive customization to match business workflows</li>
            <li>• Reduces software licensing and maintenance costs</li>
            <li>• Scales from small businesses to enterprise operations</li>
          </ul>
          <div className='center-row'>
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* Google Workspace */}
        <div id="google-workspace" className='akash' data-heading='Google Workspace'>
          <div className='text-2xl'>Google Workspace</div>
          <div>Professional Google Workspace deployment and management for enhanced team collaboration and productivity. Our services ensure smooth migration, proper configuration, and optimal utilization of Google's cloud-based productivity tools.</div>
          
          <div>We handle complete Google Workspace setup including user provisioning, security configuration, Gmail migration, Drive organization, and integration with business applications. Our team provides training and ongoing support to maximize user adoption and productivity gains.</div>
          
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Delivers industry-leading collaboration and communication tools</li>
            <li>• Provides seamless access from any device or location</li>
            <li>• Offers enterprise-grade security and data protection</li>
            <li>• Reduces infrastructure costs with cloud-based solutions</li>
            <li>• Enables real-time collaboration and document sharing</li>
          </ul>
          <div className='center-row'>
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* Email Migration */}
        <div id="email-migration" className='john' data-heading='Email Migration'>
          <div className='text-2xl'>Email Migration</div>
          <div>Seamless email migration services to move your organization's email systems to modern platforms with zero downtime. Our proven methodology ensures complete data integrity, minimal disruption, and smooth transition to cloud-based email solutions.</div>
          
          <div>We specialize in migrating from legacy email systems to Microsoft 365, Google Workspace, and other modern platforms. Our migration experts handle everything from planning and preparation to execution and post-migration support, ensuring no data loss and business continuity.</div>
          
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Ensures business continuity with zero-downtime migration</li>
            <li>• Preserves all email data, contacts, and calendar information</li>
            <li>• Reduces maintenance costs and improves email reliability</li>
            <li>• Provides access to modern email features and security</li>
            <li>• Enables better mobile access and collaboration capabilities</li>
          </ul>
          <div className='center-row'>
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* Identity & Access Management */}
        <div id="identity-access" className='felix' data-heading='Identity & Access Management'>
          <div className='text-2xl'>Identity & Access (SSO, MFA)</div>
          <div>Comprehensive identity and access management solutions including Single Sign-On (SSO) and Multi-Factor Authentication (MFA) to secure your digital workspace. We implement robust security frameworks that protect user identities while providing seamless access to resources.</div>
          
          <div>Our IAM services include SSO implementation, MFA deployment, conditional access policies, and integration with directory services. We ensure secure authentication across all applications while maintaining user convenience and productivity through streamlined access management.</div>
          
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Strengthens security posture with multi-factor authentication</li>
            <li>• Reduces password-related security risks and helpdesk calls</li>
            <li>• Provides seamless user experience with single sign-on</li>
            <li>• Enables granular access control and monitoring</li>
            <li>• Ensures compliance with security regulations and standards</li>
          </ul>
          <div className='center-row'>
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* SaaS Backup */}
        <div id="saas-backup" className='akash' data-heading='SaaS Backup'>
          <div className='text-2xl'>SaaS Backup (M365/Google/Zoho)</div>
          <div>Enterprise-grade backup solutions for SaaS applications including Microsoft 365, Google Workspace, and Zoho. Our comprehensive backup services protect your critical business data from accidental deletion, ransomware attacks, and service outages.</div>
          
          <div>We implement automated backup solutions that provide point-in-time recovery for all your SaaS data including emails, documents, calendars, and application data. Our backup services ensure business continuity and data protection beyond the native retention policies of SaaS providers.</div>
          
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Protects against data loss beyond native retention limits</li>
            <li>• Provides rapid recovery from ransomware and cyber attacks</li>
            <li>• Ensures compliance with data retention requirements</li>
            <li>• Offers granular recovery options for specific items</li>
            <li>• Maintains business continuity during service outages</li>
          </ul>
          <div className='center-row'>
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>
      </div>

      {/* Data Protection & Compliance CTA */}
      <div className='intro-card intro-stack p-30 relative' style={{
        backgroundImage: "url('/pexels-kaboompics-com-6317.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-orange-900/60 to-slate-900/80"></div>
        
        {/* Content */}
        <div className='krishna relative z-10 text-white'>Safeguard your critical data and ensure regulatory compliance with comprehensive protection strategies. Xorvo Technologies delivers advanced backup solutions, DLP implementation, and compliance audits to protect your business.</div>
        <div className='cta-row relative z-10'>
          <Link to="/?contact=true"><button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Request Compliance Audit</button></Link>
          <Link to="#service-categories"><button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Explore All Services</button></Link>
        </div>
      </div>

      {/* Data Protection & Compliance Section */}
      <section id="data-protection-hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-white services-hero-3">
        {/* Background Image Only */}
        <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{backgroundImage: "url('https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"}}></div>
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-gray-800/60 to-gray-900/80"></div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-12">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            {/* Headline with animation */}
            <h1 className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight transition-all duration-700 delay-100 ${true ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ fontFamily: "'Roboto', 'Arial', sans-serif" }}>
              <span className="block text-white mb-4">
                DATA PROTECTION &
              </span>
              <span className="block text-white">
                COMPLIANCE
              </span>
            </h1>

            {/* Subtitle */}
            <p className={`text-xl md:text-2xl lg:text-3xl text-gray-200 max-w-4xl mx-auto transition-all duration-700 delay-300 ${true ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Safeguard your critical data and ensure regulatory compliance with comprehensive protection strategies. Our expert solutions protect your business from data breaches, ensure compliance with industry standards, and maintain business continuity through robust disaster recovery planning.
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 transition-all duration-700 delay-500 ${true ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
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
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-700 delay-700 ${true ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </section>

      {/* Data Protection & Compliance Cards */}
      <div className='noah services-cards'>
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

      {/* IT Consulting & Deployment CTA */}
      <div className='intro-card intro-stack p-30 relative' style={{
        backgroundImage: "url('/pexels-kaboompics-com-6317.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-indigo-900/60 to-slate-900/80"></div>
        
        {/* Content */}
        <div className='krishna relative z-10 text-white'>Accelerate your digital transformation with expert IT consulting and deployment services. Xorvo Technologies delivers custom application development, network design, and strategic IT solutions to drive your business forward.</div>
        <div className='cta-row relative z-10'>
          <Link to="/?contact=true"><button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Request IT Consultation</button></Link>
          <Link to="#service-categories"><button type="button" className="bg-[#727CAB] hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">Explore All Services</button></Link>
        </div>
      </div>

      {/* IT Consulting & Deployment Section */}
      <section id="it-consulting-hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-white services-hero-3">
        {/* Background Image Only */}
        <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{backgroundImage: "url('/modern-equipped-computer-lab.jpg')"}}></div>
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-gray-800/60 to-gray-900/80"></div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-12">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            {/* Headline with animation */}
            <h1 className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight transition-all duration-700 delay-100 ${true ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ fontFamily: "'Roboto', 'Arial', sans-serif" }}>
              <span className="block text-white mb-4">
                IT CONSULTING &
              </span>
              <span className="block text-white">
                DEPLOYMENT
              </span>
            </h1>

            {/* Subtitle */}
            <p className={`text-xl md:text-2xl lg:text-3xl text-gray-200 max-w-4xl mx-auto transition-all duration-700 delay-300 ${true ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Transform your business with expert IT consulting and seamless deployment solutions. Our comprehensive services cover application development, infrastructure design, and digital optimization to drive your organization's success.
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 transition-all duration-700 delay-500 ${true ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
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
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-700 delay-700 ${true ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </section>

      {/* IT Consulting & Deployment Cards */}
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

      {/* Final CTA */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"></div>
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main heading */}
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: "'Roboto', 'Arial', sans-serif" }}>
              Ready to Transform Your
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Digital Infrastructure?</span>
            </h2>
            
            {/* Subheading */}
            <p className="text-xl lg:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              Every service we deliver is backed by real-world expertise and enterprise-grade technology partnerships. 
              With Xorvo Technologies, you get more than IT support — you get a partner committed to securing and scaling your digital future.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
              <Link to="/?contact=true">
                <button className="group relative px-8 py-4 bg-[#727CAB] text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-lg hover:bg-[#5a6695]">
                  <span className="relative z-10">Schedule Consultation</span>
                  <div className="absolute inset-0 bg-[#5a6695] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </Link>
              
              <Link to="#service-categories">
                <button className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transform hover:-translate-y-1 transition-all duration-300 text-lg">
                  <span className="flex items-center gap-2">
                    Explore Services
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </span>
                </button>
              </Link>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>Enterprise-Grade Solutions</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>24/7 Expert Support</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>Proven Track Record</span>
              </div>
            </div>
          </div>
        </div>
      </section>
 
    </div>
  )
}

export default Services
