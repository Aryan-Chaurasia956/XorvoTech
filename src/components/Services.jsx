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

      {/* Service Categories - Enhanced Horizontal Cards */}
      <section className="py-20 px-4 md:px-8 lg:px-12 relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{backgroundImage: "url('/growtika-3C0SWyusdS8-unsplash.jpg')"}}></div>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90"></div>
        
        {/* Decorative Background Shapes */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-20 right-20 w-48 h-48 bg-purple-500/15 rounded-full blur-3xl animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-1/3 w-36 h-36 bg-indigo-500/15 rounded-full blur-3xl animate-bounce"></div>
        
        {/* Additional Moving Shapes */}
        <div className="absolute top-1/6 left-1/8 w-24 h-24 bg-pink-500/10 rounded-full blur-2xl animate-ping"></div>
        <div className="absolute top-1/5 right-1/6 w-28 h-28 bg-green-500/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-1/6 left-1/5 w-20 h-20 bg-yellow-500/10 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute bottom-1/5 right-1/4 w-32 h-32 bg-red-500/10 rounded-full blur-2xl animate-pulse"></div>
        
        {/* Floating Triangles */}
        <div className="absolute top-1/4 left-1/3 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[35px] border-b-white/10 animate-spin" style={{animationDuration: '20s'}}></div>
        <div className="absolute top-1/3 right-1/3 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[25px] border-b-blue-400/20 animate-spin" style={{animationDuration: '15s'}}></div>
        <div className="absolute bottom-1/4 left-1/2 w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-b-[40px] border-b-purple-400/15 animate-spin" style={{animationDuration: '25s'}}></div>
        
        {/* Moving Circles */}
        <div className="absolute top-1/6 left-1/4 w-8 h-8 bg-white/20 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/3 left-3/4 w-6 h-6 bg-blue-400/30 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/6 w-10 h-10 bg-purple-400/25 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-1/3 left-2/3 w-7 h-7 bg-cyan-400/30 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute bottom-1/4 right-1/5 w-9 h-9 bg-indigo-400/25 rounded-full animate-bounce" style={{animationDelay: '2.5s'}}></div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-1/4 left-1/6 w-20 h-20 border-2 border-white/10 rotate-45 transform animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 border-2 border-white/10 rotate-12 transform animate-spin" style={{animationDuration: '10s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-24 h-24 border-2 border-white/10 rotate-45 transform animate-pulse"></div>
        
        {/* Additional Rotating Squares */}
        <div className="absolute top-1/6 right-1/6 w-12 h-12 border-2 border-blue-400/20 rotate-45 transform animate-spin" style={{animationDuration: '8s'}}></div>
        <div className="absolute bottom-1/5 left-1/6 w-14 h-14 border-2 border-purple-400/20 rotate-12 transform animate-spin" style={{animationDuration: '12s'}}></div>
        <div className="absolute top-1/2 right-1/5 w-10 h-10 border-2 border-cyan-400/20 rotate-45 transform animate-spin" style={{animationDuration: '6s'}}></div>
        
        {/* Floating Dots Pattern */}
        <div className="absolute top-1/6 left-1/2 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
        <div className="absolute top-1/4 left-2/3 w-3 h-3 bg-blue-400/40 rounded-full animate-bounce"></div>
        <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-white/25 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-3/4 w-4 h-4 bg-purple-400/30 rounded-full animate-bounce"></div>
        <div className="absolute bottom-1/3 left-1/5 w-2 h-2 bg-white/35 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 left-4/5 w-3 h-3 bg-cyan-400/35 rounded-full animate-bounce"></div>
        <div className="absolute bottom-1/2 left-2/5 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
        
        {/* Additional Animated Dots */}
        <div className="absolute top-1/8 left-1/3 w-3 h-3 bg-pink-400/25 rounded-full animate-ping" style={{animationDuration: '3s'}}></div>
        <div className="absolute top-2/3 left-1/8 w-2 h-2 bg-green-400/30 rounded-full animate-ping" style={{animationDuration: '2s'}}></div>
        <div className="absolute bottom-1/8 right-1/3 w-4 h-4 bg-yellow-400/20 rounded-full animate-ping" style={{animationDuration: '4s'}}></div>
        <div className="absolute middle left-1/2 w-2 h-2 bg-red-400/25 rounded-full animate-ping" style={{animationDuration: '2.5s'}}></div>
        
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
            <div className="service-category-card group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2">
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
            </div>

            {/* Cloud & Infrastructure */}
            <div className="service-category-card group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2">
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
            </div>

            {/* Managed IT Services */}
            <div className="service-category-card group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2">
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
            </div>

            {/* Workspace & Collaboration */}
            <div className="service-category-card group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2">
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
            </div>

            {/* Data Protection & Compliance */}
            <div className="service-category-card group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2">
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
            </div>

            {/* IT Consulting & Deployment */}
            <div className="service-category-card group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2">
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
            </div>

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

            {/* CTA Button */}
            <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 transition-all duration-700 delay-500 ${isCybersecurityVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <Link to="/?contact=true">
                <button type="button" className="bg-white text-blue-900 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-lg px-8 py-4 text-center transition-all duration-300 hover:shadow-xl hover:scale-105">
                  Talk to a Security Expert
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
        <div className='john' data-heading='Network Security'>
          <div className='text-2xl'>Network Security</div>
          <div>A secure network is the foundation of every digital business. Xorvo Technology Pvt. Ltd. delivers robust network security solutions that protect your infrastructure from unauthorized access, cyber intrusions, and advanced persistent threats.</div>
          
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
              <button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* Endpoint Protection */}
        <div className='felix' data-heading='Endpoint Protection'>
          <div className='text-2xl'>Endpoint Protection</div>
          <div>Endpoints are often the primary entry point for cyberattacks. Xorvo Technology Pvt. Ltd. provides advanced endpoint protection to secure laptops, desktops, servers, and mobile devices across your organization.</div>
          
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
              <button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* Threat Detection & SOC */}
        <div className='akash' data-heading='Threat Detection & SOC'>
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
              <button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* Vulnerability Management */}
        <div className='john' data-heading='Vulnerability Management'>
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
              <button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* Incident Response & Forensics */}
        <div className='felix' data-heading='Incident Response & Forensics'>
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
              <button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* Email & Web Security */}
        <div className='akash' data-heading='Email & Web Security'>
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
              <button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* Security Awareness & Training */}
        <div className='john' data-heading='Security Awareness & Training'>
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
              <button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
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
              <button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
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
              <button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
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
              <button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
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
              <button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
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
              <button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
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
              <button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
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
              <button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* Containers & Kubernetes */}
        <div id='containers-kubernetes' className='felix scroll-anchor' data-heading='Containers & Kubernetes'>
          <div className='text-2xl'>Containers & Kubernetes</div>
          <div>Modernize your applications with containerization and Kubernetes orchestration. Our container services enable faster deployment, better resource utilization, and improved application portability across environments.</div>
          <div>We provide end-to-end container solutions including Docker containerization, Kubernetes cluster setup and management, CI/CD pipeline integration, and microservices architecture design. Our experts ensure secure and scalable container deployments.</div>
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Accelerates application development and deployment cycles</li>
            <li>• Improves resource utilization and reduces infrastructure costs</li>
            <li>• Enables consistent environments across development and production</li>
            <li>• Supports microservices architecture and cloud-native applications</li>
            <li>• Provides better scalability and fault tolerance for applications</li>
          </ul>
          <div className='center-row'>
            <Link to="/?contact=true">
              <button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>

        {/* Load Balancing & High Availability */}
        <div id='load-balancing-ha' className='akash scroll-anchor' data-heading='Load Balancing & High Availability'>
          <div className='text-2xl'>Load Balancing & High Availability</div>
          <div>Ensure maximum uptime and performance with advanced load balancing and high availability solutions. Our services distribute traffic efficiently and provide redundancy to keep your applications always available.</div>
          <div>We implement comprehensive load balancing solutions including application load balancers, global server load balancing, and failover configurations. Our HA architectures ensure zero downtime maintenance and automatic failover during outages.</div>
          <div className='text-lg font-semibold mt-4 mb-2'>Why It Matters</div>
          <ul>
            <li>• Prevents single points of failure and ensures continuous availability</li>
            <li>• Optimizes application performance through intelligent traffic distribution</li>
            <li>• Supports seamless scaling during traffic spikes</li>
            <li>• Enables zero-downtime maintenance and updates</li>
            <li>• Protects against DDoS attacks and traffic surges</li>
          </ul>
          <div className='center-row'>
            <Link to="/?contact=true">
              <button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Learn More</button>
            </Link>
          </div>
        </div>
      </div>
      )}

      {/* Additional Services Sections - REMOVED */}

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
