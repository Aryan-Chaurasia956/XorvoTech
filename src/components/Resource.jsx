import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import "./Services.css"

const Resource = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsVisible(true);
  }, []);

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

  return (
    <div className="bg-gradient-to-br from-cyan-50 via-blue-50 to-white">
      {/* Resources - Full Screen Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-white">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/digital-marketing-1433427.jpg"
            alt="Resources hero background"
            className="absolute inset-0 w-full h-full object-cover"
            fetchpriority="high"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-12">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            {/* Headline with animation */}
            <h1 className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <span className="block text-white mb-4">
                INSIGHTS, RESEARCH &
              </span>
              <span className="block text-white">
                INDUSTRY EXPERTISE
              </span>
            </h1>

            {/* Subtitle */}
            <p className={`text-xl md:text-2xl lg:text-3xl text-gray-200 max-w-4xl mx-auto transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Knowledge drives better technology decisions. At Xorvo Technologies, we share industry insights, technical expertise, and security intelligence that help enterprises strengthen their digital strategies. From in-depth analyses to real-world success stories, our resources are designed for decision-makers who value clarity, precision, and results.
            </p>

            {/* CTA Button */}
            <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <Link to="/?contact=true">
                <button type="button" className="bg-white text-blue-900 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-lg px-8 py-4 text-center transition-all duration-300 hover:shadow-xl hover:scale-105">
                  Subscribe for Updates
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

      {/* Resources Cards Grid */}
      <div className='noah resource-cards'>
        {/* Insights & Industry Updates */}
        <div id='insights-industry-updates' className='john scroll-anchor insights-card'>
          <div className='text-2xl'>Insights & Industry Updates</div>
          <div className='insights-text-panel'>
            <div>Stay informed with practical perspectives on evolving technologies — from cybersecurity to hybrid cloud transformation.</div>
            <div>Featured Topics:</div>
            <ul>
              <li>• Cloud Architecture & Migration Best Practices</li>
              <li>• Threat Intelligence and Cyber Risk Trends</li>
              <li>• Modern IT Operations and Automation Frameworks</li>
              <li>• Voice Search (AEO) & Local Visibility (GEO) in Enterprise SEO</li>
            </ul>
            <div>Each article provides clear context and actionable guidance — written for CIOs, CISOs, and IT strategists.</div>
          </div>
          <div className='center-row'>
            <Link to="/resources/insights">
              <button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Read Insights</button>
            </Link>
          </div>
        </div>

        {/* Case Studies & Success Stories */}
        <div id='case-studies' className='felix scroll-anchor case-studies-card'>
          <div className='text-2xl'>Case Studies & Success Stories</div>
          <div className='case-text-panel'>
            <div>Explore how Xorvo Technologies has helped enterprises enhance security, performance, and efficiency through integrated IT solutions.</div>
            <div>Case Study Highlights:</div>
            <ul>
              <li>• Global Manufacturing Client: Hybrid-cloud deployment with zero downtime.</li>
              <li>• Financial Sector: SOC implementation with 24/7 monitoring and compliance automation.</li>
              <li>• Healthcare Organization: Secure data migration under HIPAA & ISO 27001 frameworks.</li>
            </ul>
            <div>Each story demonstrates measurable business outcomes achieved through technology excellence.</div>
          </div>
          <div className='center-row'>
            <Link to="/resources/case-studies">
              <button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">View Case Studies</button>
            </Link>
          </div>
        </div>

        {/* Technical Papers & Strategy Briefs */}
        <div id='technical-papers' className='john scroll-anchor technical-papers-card'>
          <div className='text-2xl'>Technical Papers & Strategy Briefs</div>
          <div className='technical-text-panel'>
            <div>Get access to technical whitepapers, architecture blueprints, and IT transformation frameworks developed by Xorvo's engineering teams.</div>
            <div>Popular Downloads:</div>
            <ul>
              <li>• Building Resilient Multi-Cloud Environments</li>
              <li>• Network Security Hardening & Zero Trust Deployment</li>
              <li>• CI/CD Frameworks for Secure App Development</li>
              <li>• Data Protection & Compliance Automation Models</li>
            </ul>
          </div>
          <div className='center-row'>
            <Link to="/resources/whitepapers">
              <button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Download Technical Briefs</button>
            </Link>
          </div>
        </div>

        {/* Security Updates & Alerts */}
        <div id='security-updates' className='felix scroll-anchor security-updates-card'>
          <div className='text-2xl'>Security Updates & Alerts</div>
          <div className='security-text-panel'>
            <div>Our teams continuously track and publish the latest global vulnerabilities, patch advisories, and exploit trends.</div>
            <div>This section is curated to support enterprise security teams in maintaining proactive defenses.</div>
            <div>Examples:</div>
            <ul>
              <li>• Critical CVE Alerts for Network Devices</li>
              <li>• Cloud Provider Patch Schedules</li>
              <li>• Endpoint and Application Security Updates</li>
            </ul>
          </div>
          <div className='center-row'>
            <Link to="/resources/security-alerts">
              <button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">View Security Alerts</button>
            </Link>
          </div>
        </div>

        {/* Why Our Resources Matter */}
        <div id='why-resources-matter' className='akash scroll-anchor resources-matter-card'>
          <div className='text-2xl'>Why Our Resources Matter</div>
          <div className='resources-text-panel'>
            <div>Our goal isn't volume — it's value.</div>
            <div>Every insight, paper, and case study we share reflects hands-on experience from live enterprise environments.</div>
            <div>This ensures every reader — from CIO to network architect — gains credible and immediately applicable information.</div>
          </div>
          <div className='center-row'>
            <Link to="/contact">
              <button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Contact Editorial Team</button>
            </Link>
          </div>
        </div>
      </div>

      {/* Closing Section (Final CTA) */}
      <div className='intro-card intro-stack p-30 relative overflow-hidden'>
        {/* Background Image */}
        <img
          src="/geometric-1732847.jpg"
          alt="Geometric background"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/40" />
        
        <div className='krishna relative z-10 text-white'>
          Stay informed, stay prepared, and stay ahead with Xorvo Technologies.
          <br />
          Explore our insights, access research, and see how real solutions deliver real results.
        </div>
        <div className='center-row gap-4 relative z-10'>
          <Link to="/solutions">
            <button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Explore Solutions</button>
          </Link>
          <Link to="/?contact=true">
            <button type="button" className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Contact Us</button>
          </Link>
        </div>
      </div>

 
    </div>
  )
}

export default Resource
