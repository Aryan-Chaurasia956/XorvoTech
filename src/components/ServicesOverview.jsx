import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import "./Services.css"

const ServicesOverview = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Always scroll to top when page loads
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    // Handle hash scrolling if there's a hash in the URL
    const id = location.hash ? decodeURIComponent(location.hash.slice(1)) : null;
    if (id) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location]);

  return (
    <div className="bg-gradient-to-br from-cyan-50 via-blue-50 to-white">
      {/* Integration & Engineering Solutions - Full Screen Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-white services-hero">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{backgroundImage: "url('pexels-divinetechygirl-1181354.jpg')"}}></div>
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-blue-900/60 to-gray-900/80"></div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-12">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            {/* Headline with animation */}
            <h1 className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ fontFamily: "'Roboto', 'Arial', sans-serif" }}>
              <span className="block text-white mb-4">
                End-to-End IT Services
              </span>
              <span className="block text-white">
                for Modern Businesses
              </span>
            </h1>

            {/* Subtitle */}
            <p className={`text-xl md:text-2xl lg:text-3xl text-gray-200 max-w-4xl mx-auto transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Modern enterprises demand more than individual tools — they require complete ecosystems that integrate seamlessly across security, cloud, and application layers. Xorvo Technologies delivers unified engineering and integration frameworks that help organizations build cohesive, automated, and scalable IT environments.
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <Link to="/?contact=true">
                <button type="button" className="bg-[#727CAB] text-white hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 font-semibold rounded-lg text-lg px-8 py-4 text-center transition-all duration-300 hover:shadow-xl hover:scale-105">
                  Talk to an Expert
                </button>
              </Link>
              <Link to="#services-overview">
                <button type="button" className="border-2 border-white text-white hover:bg-white hover:text-[#727CAB] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 font-semibold rounded-lg text-lg px-8 py-4 text-center transition-all duration-300 hover:shadow-xl hover:scale-105">
                  View All Services
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

      {/* Services Overview Section */}
      <section id="services-overview" className="py-20 px-4 md:px-8 lg:px-12 relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{backgroundImage: "url('/growtika-3C0SWyusdS8-unsplash.jpg')"}}></div>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90"></div>
        
        {/* Gradient Mesh Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-transparent to-purple-900/20"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-cyan-900/15 via-transparent to-indigo-900/15"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4">Our Services</h2>
            <p className="text-lg text-gray-200 max-w-3xl mx-auto">Explore our comprehensive range of services designed to transform your business operations</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            
            {/* Cybersecurity Services */}
            <Link to="/cybersecurity-services" className="service-category-card group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2">
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
            <Link to="/cloud-infrastructure-services" className="service-category-card group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2">
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
            <Link to="/managed-it-services" className="service-category-card group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2">
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
                  <p className="text-sm text-white/90">Comprehensive IT management & support</p>
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
            <Link to="/workspace-collaboration-services" className="service-category-card group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2">
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
                  <p className="text-sm text-white/90">Productivity tools & team collaboration</p>
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
            <Link to="/data-protection-compliance-services" className="service-category-card group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2">
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
                  <p className="text-sm text-white/90">Data security & regulatory compliance</p>
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
            <Link to="/it-consulting-deployment-services" className="service-category-card group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2">
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
                  <p className="text-sm text-white/90">Strategic IT consulting & implementation</p>
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

      {/* Final CTA Section */}
      <section className="py-20 px-4 md:px-8 lg:px-12 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Partner with Xorvo Technologies to accelerate your digital transformation journey. Our expert team is ready to deliver tailored solutions that drive your business forward.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/?contact=true">
              <button type="button" className="bg-[#727CAB] text-white hover:bg-[#5a6695] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 font-semibold rounded-lg text-lg px-8 py-4 text-center transition-all duration-300 hover:shadow-xl hover:scale-105">
                Get Started Today
              </button>
            </Link>
            <Link to="/about">
              <button type="button" className="border-2 border-white text-white hover:bg-white hover:text-[#727CAB] focus:ring-4 focus:outline-none focus:ring-[#727CAB]/50 font-semibold rounded-lg text-lg px-8 py-4 text-center transition-all duration-300 hover:shadow-xl hover:scale-105">
                Learn More About Us
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesOverview;
