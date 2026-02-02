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
                Comprehensive IT Solutions
              </span>
              <span className="block text-white">
                Powering Digital Transformation
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
      <section id="services-overview" className="py-20 px-4 md:px-8 lg:px-12 relative">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4" style={{ color: '#727CAB' }}>Our Services</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Explore our comprehensive range of services designed to transform your business operations</p>
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

      {/* Our Partners Section */}
      <section className="relative py-20 px-4 md:px-8 lg:px-12 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Floating gradient orbs */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-tr from-cyan-400/10 to-indigo-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-purple-400/8 to-pink-400/8 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
          
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-grid-slate-900/[0.02] bg-[size:60px_60px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ color: '#727CAB' }}>
              Our Partners
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We collaborate with world-class technology leaders to deliver cutting-edge solutions that drive innovation and excellence for our clients
            </p>
          </div>

          {/* Partners Grid with Motion Graphics */}
          <div className="relative">
            {/* Glow effect behind grid */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 rounded-3xl blur-2xl"></div>
            
            <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 p-8 bg-white/40 backdrop-blur-sm rounded-3xl border border-white/50 shadow-2xl">
              {[
                { src: "/microsoft-365.png", alt: "Microsoft 365", height: 60, delay: 0 },
                { src: "/checkpoint.png", alt: "Check Point", height: 50, delay: 100 },
                { src: "/zoho.png", alt: "Zoho", height: 60, delay: 200 },
                { src: "/aws.png", alt: "AWS", height: 50, delay: 300 },
                { src: "/kaspersky.png", alt: "Kaspersky", height: 50, delay: 400 },
                { src: "/fortinet.png", alt: "Fortinet", height: 45, delay: 500 },
                { src: "/rapid7.png", alt: "Rapid7", height: 45, delay: 600 },
                { src: "/emsisoft.png", alt: "EMSISOFT", height: 40, delay: 700 },
                { src: "/partner logo/acer-5.svg", alt: "Acer", height: 35, delay: 800 },
                { src: "/partner logo/adobe-2.svg", alt: "Adobe", height: 50, delay: 900 },
                { src: "/partner logo/apple-13.svg", alt: "Apple", height: 50, delay: 1000 },
                { src: "/partner logo/aruba-networks.svg", alt: "Aruba Networks", height: 50, delay: 1100 },
                { src: "/partner logo/crowdstrike-1.svg", alt: "CrowdStrike", height: 50, delay: 1200 },
                { src: "/partner logo/d-link.svg", alt: "D-Link", height: 50, delay: 1300 },
                { src: "/partner logo/dell-2.svg", alt: "Dell", height: 50, delay: 1400 },
                { src: "/partner logo/eset-logo.svg", alt: "ESET", height: 50, delay: 1500 },
                { src: "/partner logo/hp-5.svg", alt: "HP", height: 50, delay: 1600 },
                { src: "/partner logo/lenovo-2.svg", alt: "Lenovo", height: 50, delay: 1700 },
                { src: "/partner logo/palo-alto-networks-1.svg", alt: "Palo Alto", height: 50, delay: 1800 },
                { src: "/partner logo/sophos-logo.svg", alt: "Sophos", height: 50, delay: 1900 },
                { src: "/partner logo/trellix.svg", alt: "Trellix", height: 50, delay: 2000 },
                { src: "/partner logo/veeam-3.svg", alt: "Veeam", height: 50, delay: 2100 },
              ].map((partner, index) => (
                <div
                  key={index}
                  className="group relative flex items-center justify-center p-6 bg-white rounded-2xl shadow-lg cursor-pointer border border-gray-100"
                >
                  {/* Logo */}
                  <div className="relative z-10 flex items-center justify-center h-20">
                    <img
                      src={partner.src}
                      alt={partner.alt}
                      className="max-h-full w-auto object-contain"
                      style={{ height: `${partner.height}px` }}
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Partnership Stats */}
          <div className="mt-20">
            <div className="relative">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-blue-50/30 to-slate-50 rounded-3xl"></div>
              
              <div className="relative grid grid-cols-1 md:grid-cols-3 gap-0 rounded-3xl overflow-hidden shadow-2xl border border-white/50">
                {/* Partners Count */}
                <div className="relative bg-white/80 backdrop-blur-sm p-8 text-center border-r border-gray-200/50 first:rounded-l-3xl last:rounded-r-3xl md:last:rounded-r-none">
                  <div className="relative">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl mb-6 shadow-lg">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                      </svg>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                        21+
                      </h3>
                      <p className="text-sm font-medium text-gray-600 uppercase tracking-wider">Strategic Partners</p>
                      <p className="text-xs text-gray-500 mt-2 max-w-[180px] mx-auto">Leading technology providers worldwide</p>
                    </div>
                  </div>
                </div>
                
                {/* Support */}
                <div className="relative bg-white/80 backdrop-blur-sm p-8 text-center border-r border-gray-200/50 last:rounded-r-3xl md:last:rounded-r-none">
                  <div className="relative">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-700 rounded-2xl mb-6 shadow-lg">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-700 bg-clip-text text-transparent">
                        24/7
                      </h3>
                      <p className="text-sm font-medium text-gray-600 uppercase tracking-wider">Partner Support</p>
                      <p className="text-xs text-gray-500 mt-2 max-w-[180px] mx-auto">Round-the-clock assistance and expertise</p>
                    </div>
                  </div>
                </div>
                
                {/* Certified Solutions */}
                <div className="relative bg-white/80 backdrop-blur-sm p-8 text-center last:rounded-r-3xl">
                  <div className="relative">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-600 to-blue-700 rounded-2xl mb-6 shadow-lg">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                      </svg>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-5xl font-bold bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent">
                        100%
                      </h3>
                      <p className="text-sm font-medium text-gray-600 uppercase tracking-wider">Certified Solutions</p>
                      <p className="text-xs text-gray-500 mt-2 max-w-[180px] mx-auto">Industry-recognized standards and compliance</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link to="/?contact=true&partner=true" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:from-blue-700 hover:to-purple-700 group">
              <span>Become a Partner</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </Link>
          </div>
        </div>

        {/* Custom Animation Styles */}
        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
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
