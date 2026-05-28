import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import GradientBlinds from './GradientBlinds'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import FlowArt, { FlowSection } from '@/components/ui/story-scroll'
import SolutionsCTA from '@/components/ui/cta-with-marquee'
 
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
              <span className="block text-white">
                Business IT Solutions
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

      {/* Story Scroll Panels for Business Solutions */}
      <FlowArt aria-label="Solutions Panels Story Scroll">
        
        {/* Panel 1: Business Automation Solutions (Brand Purple Background) */}
        <FlowSection aria-label="Business Automation Solutions" style={{ backgroundColor: '#727CAB', color: '#ffffff' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full w-full">
            <div className="space-y-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">01 — Operations & Workflow</p>
              <hr className="border-white/20" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
                BUSINESS
                <br />
                AUTOMATION
              </h2>
              <p className="text-lg text-gray-100 leading-relaxed max-w-xl">
                Our business automation suite helps organizations digitize processes and create smarter workflows with CRM, ERP, and custom applications.
              </p>
              <ul className="space-y-3 pl-4 border-l-2 border-white/30 text-gray-200 font-medium">
                <li>• CRM Solutions & Sales Pipelines</li>
                <li>• ERP Systems & Operations</li>
                <li>• HRMS Platforms & Compliance</li>
                <li>• Custom Application Development</li>
                <li>• UI/UX Application Design</li>
              </ul>
              <div className="pt-4">
                <Link to="/?contact=true">
                  <Button variant="outline" className="rounded-full bg-white text-[#727CAB] hover:bg-gray-100 hover:text-[#727CAB] border-none font-semibold px-6 py-5">
                    Explore Business Automation
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block relative h-[80%] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
                alt="Business Automation"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </FlowSection>

        {/* Panel 2: Web & Application Solutions (White Background) */}
        <FlowSection aria-label="Web & Application Solutions" style={{ backgroundColor: '#ffffff', color: '#727CAB' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full w-full">
            <div className="hidden lg:block relative h-[80%] rounded-3xl overflow-hidden shadow-2xl order-last lg:order-first">
              <img
                src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80"
                alt="Web Development"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="space-y-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#727CAB]/70">02 — Digital Presence</p>
              <hr className="border-[#727CAB]/20" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#727CAB]">
                WEB & APP
                <br />
                DEVELOPMENT
              </h2>
              <p className="text-lg text-[#727CAB]/90 leading-relaxed max-w-xl">
                Your digital presence is first impression. We design, develop, and deploy web and mobile applications optimized for performance and scalability.
              </p>
              <ul className="space-y-3 pl-4 border-l-2 border-[#727CAB]/30 text-[#727CAB]/85 font-medium">
                <li>• Website Development & SEO</li>
                <li>• Mobile App Development</li>
                <li>• VPS Hosting & Servers</li>
                <li>• Cloud Migration Services</li>
                <li>• CI/CD Deployment Automation</li>
              </ul>
              <div className="pt-4">
                <Link to="/?contact=true">
                  <Button className="rounded-full bg-[#727CAB] text-white hover:bg-[#727CAB]/90 border-none font-semibold px-6 py-5">
                    View Application Services
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </FlowSection>

        {/* Panel 3: Infrastructure & Cloud Solutions (Brand Purple Background) */}
        <FlowSection aria-label="Infrastructure & Cloud Solutions" style={{ backgroundColor: '#727CAB', color: '#ffffff' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full w-full">
            <div className="space-y-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">03 — Cloud Integration</p>
              <hr className="border-white/20" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
                CLOUD &
                <br />
                INFRASTRUCTURE
              </h2>
              <p className="text-lg text-gray-100 leading-relaxed max-w-xl">
                Digital visibility and operational intelligence are essential. Our optimization services help you stay competitive in search and data-driven decisions.
              </p>
              <ul className="space-y-3 pl-4 border-l-2 border-white/30 text-gray-200 font-medium">
                <li>• SEO Optimization & Content</li>
                <li>• AEO (Answer Engine Optimization)</li>
                <li>• GEO Optimization & Local Search</li>
                <li>• 24×7 NOC Integration</li>
                <li>• Enterprise Network Design</li>
              </ul>
              <div className="pt-4">
                <Link to="/?contact=true">
                  <Button variant="outline" className="rounded-full bg-white text-[#727CAB] hover:bg-gray-100 hover:text-[#727CAB] border-none font-semibold px-6 py-5">
                    Improve Online Visibility
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block relative h-[80%] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80"
                alt="Cloud Infrastructure"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </FlowSection>

        {/* Panel 4: Infrastructure Architecture (White Background) */}
        <FlowSection aria-label="Infrastructure Architecture" style={{ backgroundColor: '#ffffff', color: '#727CAB' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full w-full">
            <div className="hidden lg:block relative h-[80%] rounded-3xl overflow-hidden shadow-2xl order-last lg:order-first">
              <img
                src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80"
                alt="Infrastructure Architecture"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="space-y-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#727CAB]/70">04 — Enterprise Hardware</p>
              <hr className="border-[#727CAB]/20" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#727CAB]">
                ENTERPRISE
                <br />
                ARCHITECTURE
              </h2>
              <p className="text-lg text-[#727CAB]/90 leading-relaxed max-w-xl">
                We design, build, and implement enterprise-ready infrastructure that delivers stability, scalability, and security.
              </p>
              <ul className="space-y-3 pl-4 border-l-2 border-[#727CAB]/30 text-[#727CAB]/85 font-medium">
                <li>• Network Designing & Topologies</li>
                <li>• Infrastructure Deployment</li>
                <li>• Server Virtualization</li>
                <li>• Data Center Planning</li>
                <li>• Hardware Provisioning</li>
              </ul>
              <div className="pt-4">
                <Link to="/?contact=true">
                  <Button className="rounded-full bg-[#727CAB] text-white hover:bg-[#727CAB]/90 border-none font-semibold px-6 py-5">
                    Explore Infrastructure Services
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </FlowSection>

        {/* Panel 5: Monitoring & Automation (Brand Purple Background) */}
        <FlowSection aria-label="Monitoring & Automation" style={{ backgroundColor: '#727CAB', color: '#ffffff' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full w-full">
            <div className="space-y-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">05 — Real-time Analytics</p>
              <hr className="border-white/20" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
                MONITORING &
                <br />
                AUTOMATION
              </h2>
              <p className="text-lg text-gray-100 leading-relaxed max-w-xl">
                Visibility and control are at core of every efficient IT ecosystem. Our real-time monitoring and automation solutions ensure optimal performance.
              </p>
              <ul className="space-y-3 pl-4 border-l-2 border-white/30 text-gray-200 font-medium">
                <li>• 24×7 NOC Setup & Monitoring</li>
                <li>• Automation Frameworks</li>
                <li>• CI/CD Pipelines</li>
                <li>• Performance Analytics</li>
                <li>• Real-time Rollback & Testing</li>
              </ul>
              <div className="pt-4">
                <Link to="/?contact=true">
                  <Button variant="outline" className="rounded-full bg-white text-[#727CAB] hover:bg-gray-100 hover:text-[#727CAB] border-none font-semibold px-6 py-5">
                    Learn About Monitoring
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block relative h-[80%] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
                alt="Monitoring & Automation"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </FlowSection>

        {/* Panel 6: Cloud Enablement (Premium Slate-900 Background) */}
        <FlowSection aria-label="Cloud Enablement" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full w-full">
            <div className="hidden lg:block relative h-[80%] rounded-3xl overflow-hidden shadow-2xl order-last lg:order-first">
              <img
                src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80"
                alt="Cloud Enablement"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="space-y-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">06 — Multi-Region Delivery</p>
              <hr className="border-white/10" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
                CLOUD
                <br />
                ENABLEMENT
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed max-w-xl">
                We help enterprises modernize with scalable, hybrid cloud architectures — seamlessly connecting private and public environments.
              </p>
              <ul className="space-y-3 pl-4 border-l-2 border-white/20 text-gray-300 font-medium">
                <li>• Cloud Migration Services</li>
                <li>• Hybrid Cloud Management</li>
                <li>• Multi-cloud Setups</li>
                <li>• Backup & Disaster Recovery</li>
                <li>• Multi-region Data Resilience</li>
              </ul>
              <div className="pt-4">
                <Link to="/?contact=true">
                  <Button className="rounded-full bg-[#727CAB] text-white hover:bg-[#727CAB]/90 border-none font-semibold px-6 py-5">
                    Optimize My Cloud
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </FlowSection>

      </FlowArt>

      {/* Closing Section */}
      <SolutionsCTA />
    </div>
  )
}

export default Solution
