import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Shield, 
  BarChart3, 
  ChevronLeft,
  ChevronRight,
  Users, 
  Globe,
  Clock,
  Award,
  Sparkles,
  Star,
  Menu,
  X,
  Eye,
  Settings,
  TrendingUp
} from "lucide-react";
import { Link } from "react-router-dom";
import LandingFooter from "@/components/LandingFooter";
import ContactSection from "@/components/ContactSection";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

function AnimatedSection({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("animate");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={controls}
      variants={fadeInUp}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function LandingExtension() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [nocPlanSlide, setNocPlanSlide] = useState(0);
  const dropdownTimeoutRef = useRef(null);
  const autoPlayRef = useRef(null);

  // Timeline data
  const timelineSteps = [
    {
      number: "01",
      title: "Assess & Onboard",
      description: "We analyze your infrastructure, identify critical assets, and integrate servers, firewalls, cloud, and network devices into our NOC platform."
    },
    {
      number: "02", 
      title: "Monitor & Detect",
      description: "Our 24/7 Network Operations Center continuously monitors performance, uptime, and security events with real-time alerts and proactive issue detection."
    },
    {
      number: "03",
      title: "Resolve & Optimize", 
      description: "Incidents are escalated instantly, resolved efficiently, and continuously optimized to ensure maximum uptime and operational stability."
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isHovered) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % timelineSteps.length);
      }, 3000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isHovered, timelineSteps.length]);

  // Navigation functions
  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % timelineSteps.length);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + timelineSteps.length) % timelineSteps.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // NOC Plans navigation functions
  const goToNocPlanSlide = (index) => {
    setNocPlanSlide(index);
  };

  const goToNextNocPlan = () => {
    setNocPlanSlide((prev) => (prev + 1) % 3);
  };

  const goToPrevNocPlan = () => {
    setNocPlanSlide((prev) => (prev - 1 + 3) % 3);
  };
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast Performance",
      description: "Optimized infrastructure delivering 99.99% uptime with sub-second response times globally."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Enterprise-Grade Security",
      description: "SOC 2 Type II certified with end-to-end encryption and comprehensive threat monitoring."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Advanced Analytics",
      description: "Real-time dashboards and predictive insights powered by machine learning algorithms."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Seamless Collaboration",
      description: "Built-in team workflows with role-based access and automated approval chains."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Infrastructure",
      description: "Multi-region deployment with automatic failover and data sovereignty compliance."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "24/7 Expert Support",
      description: "Dedicated success teams with average response times under 5 minutes."
    }
  ];

  const stats = [
    { value: "500+", label: "Enterprise Clients" },
    { value: "99.99%", label: "Uptime SLA" },
    { value: "50M+", label: "Daily Transactions" },
    { value: "140+", label: "Countries Served" }
  ];

  const testimonials = [
    {
      quote: "Transformed our operations completely. The ROI was visible within the first quarter.",
      author: "Sarah Chen",
      role: "CTO, TechVision Inc",
      rating: 5
    },
    {
      quote: "Best-in-class security with an intuitive interface. Exactly what we needed.",
      author: "Michael Torres",
      role: "CISO, Global Finance Corp",
      rating: 5
    },
    {
      quote: "The automation capabilities saved us 200+ hours per month immediately.",
      author: "Emily Rodriguez",
      role: "VP Operations, ScaleUp Co",
      rating: 5
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$99",
      period: "/month",
      description: "Perfect for small teams getting started",
      features: [
        "Up to 10 team members",
        "100GB storage",
        "Basic analytics",
        "Email support",
        "API access"
      ],
      cta: "Start Free Trial",
      popular: false
    },
    {
      name: "Professional",
      price: "$299",
      period: "/month",
      description: "For growing businesses with advanced needs",
      features: [
        "Up to 50 team members",
        "1TB storage",
        "Advanced analytics & reporting",
        "Priority support",
        "Custom integrations",
        "SSO authentication",
        "Audit logs"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "Tailored solutions for large organizations",
      features: [
        "Unlimited team members",
        "Unlimited storage",
        "Custom analytics dashboards",
        "Dedicated account manager",
        "SLA guarantees",
        "On-premise deployment option",
        "White-label capabilities"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Three Island Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="relative transition-colors duration-300 bg-gradient-to-r from-white to-[#727CAB] border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 sm:h-20">
              {/* Left Island - Logo */}
              <div className="flex items-center">
                <img src="/logo_xorvo1.png" alt="Xorvo" className="h-12 sm:h-14 md:h-16 w-auto" />
              </div>
              
              {/* Middle Island - Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <div 
                  className="relative"
                  onMouseEnter={() => {
                    if (dropdownTimeoutRef.current) {
                      clearTimeout(dropdownTimeoutRef.current);
                      dropdownTimeoutRef.current = null;
                    }
                    setServicesDropdown(true);
                  }}
                  onMouseLeave={() => {
                    dropdownTimeoutRef.current = setTimeout(() => {
                      setServicesDropdown(false);
                      dropdownTimeoutRef.current = null;
                    }, 150);
                  }}
                >
                  <a href="#services" className="text-black font-bold text-lg hover:text-blue-600 transition-colors">Services</a>
                  
                  {/* Dropdown Menu */}
                  {servicesDropdown && (
                    <div 
                      className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                      onMouseEnter={() => {
                        if (dropdownTimeoutRef.current) {
                          clearTimeout(dropdownTimeoutRef.current);
                          dropdownTimeoutRef.current = null;
                        }
                        setServicesDropdown(true);
                      }}
                      onMouseLeave={() => {
                        dropdownTimeoutRef.current = setTimeout(() => {
                          setServicesDropdown(false);
                          dropdownTimeoutRef.current = null;
                        }, 150);
                      }}
                    >
                      <a href="#noc-monitoring" className="block px-4 py-3 text-gray-500 font-bold hover:bg-[#727CAB] hover:text-white transition-colors">
                        24/7 NOC Monitoring
                      </a>
                      <a href="#helpdesk" className="block px-4 py-3 text-gray-500 font-bold hover:bg-[#727CAB] hover:text-white transition-colors">
                        IT Helpdesk Support
                      </a>
                      <a href="#rmm" className="block px-4 py-3 text-gray-500 font-bold hover:bg-[#727CAB] hover:text-white transition-colors">
                        Remote Monitoring & Management (RMM)
                      </a>
                      <a href="#opensource" className="block px-4 py-3 text-gray-500 font-bold hover:bg-[#727CAB] hover:text-white transition-colors">
                        Open-Source Tools Deployment
                      </a>
                    </div>
                  )}
                </div>
                <a href="#insights" className="text-black font-bold text-lg hover:text-blue-600 transition-colors">Insights</a>
                <a href="#pricing" className="text-black font-bold text-lg hover:text-blue-600 transition-colors">Pricing</a>
                <a href="#about" className="text-black font-bold text-lg hover:text-blue-600 transition-colors">About</a>
              </div>
              
              {/* Right Island - Contact */}
              <div className="hidden md:block">
                <Button 
                  variant="nav"
                  className="text-white font-bold text-lg hover:text-blue-400"
                >
                  Contact Us
                </Button>
              </div>
              
              {/* Mobile Menu Button */}
              <button 
                className="md:hidden text-gray-800 hover:text-[#001f3f]"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed top-20 left-4 right-4 z-40 bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:hidden">
          <div className="flex flex-col space-y-4">
            <a href="#services" className="text-gray-700 hover:text-gray-900 transition-colors">Services</a>
            <a href="#insights" className="text-gray-700 hover:text-gray-900 transition-colors">Insights</a>
            <a href="#pricing" className="text-gray-700 hover:text-gray-900 transition-colors">Pricing</a>
            <a href="#about" className="text-gray-700 hover:text-gray-900 transition-colors">About</a>
            <Button 
              size="sm" 
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-full"
            >
              Contact Us
            </Button>
          </div>
        </div>
      )}
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-white overflow-hidden">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-gray-900">
                Scale Your
                <br />
                Infrastructure
                <br />
                with <span style={{ color: '#727CAB' }}>24/7 Expert</span>
                <br />
                <span style={{ color: '#727CAB' }}>Oversight.</span>
              </h1>

              {/* Description */}
              <p className="text-lg text-gray-600 mb-8 max-w-xl leading-relaxed">
                Eliminate downtime and empower your internal teams. We provide enterprise-grade NOC, Helpdesk, and RMM services that adapt to your growth.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4 mb-12">
                <Button 
                  size="lg" 
                  className="text-white px-8 py-6 text-base font-semibold rounded-full"
                  style={{ backgroundColor: '#727CAB' }}
                >
                  Request a Free Demo
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-gray-300 text-gray-700 px-8 py-6 text-base font-semibold rounded-full bg-white hover:border-[#727CAB] hover:bg-[#727CAB] hover:text-white transition-colors duration-200"
                >
                  Explore Solutions
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center gap-6">
                <span className="text-sm text-gray-500 font-semibold">Trusted by partners:</span>
                <div className="flex gap-6 items-center">
                  <img src="/src/assets/landingpartners/nagios.webp" alt="Nagios" className="h-8 w-auto" />
                  <img src="/src/assets/landingpartners/ninja.png" alt="NinjaOne" className="h-8 w-auto" />
                  <img src="/src/assets/landingpartners/kaseya.svg" alt="Kaseya" className="h-8 w-auto" />
                </div>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/src/assets/2103.i203.013.S.m004.c13.datacenter cartoon.jpg" 
                  alt="Datacenter Cartoon"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />
              </div>
              {/* Floating Elements */}
              <motion.div
                className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-xl border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">99.99% Uptime</div>
                    <div className="text-xs text-gray-500">Guaranteed SLA</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Partners Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-12">
              Our <span style={{ color: '#727CAB' }}>Partners</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We collaborate with industry leaders to deliver cutting-edge solutions and exceptional service quality.
            </p>
          </div>
          
          <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 items-center justify-items-center">
            <div className="flex items-center justify-center p-6 hover:scale-110 transition-transform duration-300">
              <img src="/src/assets/landingpartners/Freshservice_Logo.png" alt="Freshservice" className="max-h-16 w-auto object-contain" />
            </div>
            <div className="flex items-center justify-center p-6 hover:scale-110 transition-transform duration-300">
              <img src="/src/assets/landingpartners/alopsa.png" alt="Alopsa" className="max-h-16 w-auto object-contain" />
            </div>
            <div className="flex items-center justify-center p-6 hover:scale-110 transition-transform duration-300">
              <img src="/src/assets/landingpartners/atera.png" alt="Atera" className="max-h-16 w-auto object-contain" />
            </div>
            <div className="flex items-center justify-center p-6 hover:scale-110 transition-transform duration-300">
              <img src="/src/assets/landingpartners/autotask.jpg" alt="Autotask" className="max-h-16 w-auto object-contain" />
            </div>
            <div className="flex items-center justify-center p-6 hover:scale-110 transition-transform duration-300">
              <img src="/src/assets/landingpartners/connectwise.png" alt="ConnectWise" className="max-h-16 w-auto object-contain" />
            </div>
            <div className="flex items-center justify-center p-6 hover:scale-110 transition-transform duration-300">
              <img src="/src/assets/landingpartners/connectwisemanage.png" alt="ConnectWise Manage" className="max-h-16 w-auto object-contain" />
            </div>
            <div className="flex items-center justify-center p-6 hover:scale-110 transition-transform duration-300">
              <img src="/src/assets/landingpartners/kaseya.svg" alt="Kaseya" className="max-h-16 w-auto object-contain" />
            </div>
            <div className="flex items-center justify-center p-6 hover:scale-110 transition-transform duration-300">
              <img src="/src/assets/landingpartners/nable.webp" alt="N-able" className="max-h-16 w-auto object-contain" />
            </div>
            <div className="flex items-center justify-center p-6 hover:scale-110 transition-transform duration-300">
              <img src="/src/assets/landingpartners/nagios.webp" alt="Nagios" className="max-h-16 w-auto object-contain" />
            </div>
            <div className="flex items-center justify-center p-6 hover:scale-110 transition-transform duration-300">
              <img src="/src/assets/landingpartners/ninja.png" alt="NinjaOne" className="max-h-16 w-auto object-contain" />
            </div>
            <div className="flex items-center justify-center p-6 hover:scale-110 transition-transform duration-300">
              <img src="/src/assets/landingpartners/opmanager.png" alt="OpManager" className="max-h-16 w-auto object-contain" />
            </div>
            <div className="flex items-center justify-center p-6 hover:scale-110 transition-transform duration-300">
              <img src="/src/assets/landingpartners/prtg.png" alt="PRTG" className="max-h-16 w-auto object-contain" />
            </div>
            <div className="flex items-center justify-center p-6 hover:scale-110 transition-transform duration-300">
              <img src="/src/assets/landingpartners/site24:7.avif" alt="Site24x7" className="max-h-16 w-auto object-contain" />
            </div>
            <div className="flex items-center justify-center p-6 hover:scale-110 transition-transform duration-300">
              <img src="/src/assets/landingpartners/Official_SolarWinds_Logo.svg.png" alt="SolarWinds" className="max-h-16 w-auto object-contain" />
            </div>
            <div className="flex items-center justify-center p-6 hover:scale-110 transition-transform duration-300">
              <img src="/src/assets/landingpartners/zabbbix.svg" alt="Zabbix" className="max-h-16 w-auto object-contain" />
            </div>
            <div className="flex items-center justify-center p-6 hover:scale-110 transition-transform duration-300">
              <img src="/src/assets/landingpartners/Zendesk-Logo.png" alt="Zendesk" className="max-h-16 w-auto object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="pt-12 pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-12 text-black">
              Our <span style={{ color: '#727CAB' }}>Services</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto leading-relaxed">
              Comprehensive IT solutions designed to elevate your business operations and ensure seamless digital transformation.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Service 1: 24/7 NOC Monitoring */}
            <AnimatedSection>
              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#727CAB] transition-all duration-300 h-full flex flex-col">
                {/* Icon */}
                <div className="w-12 h-12 bg-[#727CAB]/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-[#727CAB]" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  24/7 NOC Monitoring
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  Round-the-clock infrastructure monitoring and proactive incident management to ensure maximum uptime and performance.
                </p>

                {/* Features */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#727CAB] rounded-full"></div>
                    <span className="text-xs text-gray-700">Real-time alerts & notifications</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#727CAB] rounded-full"></div>
                    <span className="text-xs text-gray-700">24/7 expert support team</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#727CAB] rounded-full"></div>
                    <span className="text-xs text-gray-700">99.9% uptime guarantee</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-auto">
                  <Button
                    variant="outline"
                    className="w-full border-[#727CAB] text-[#727CAB] hover:bg-[#727CAB] hover:text-white transition-all duration-300 rounded-lg text-sm font-semibold py-2"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </AnimatedSection>

            {/* Service 2: IT Helpdesk Support */}
            <AnimatedSection>
              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#727CAB] transition-all duration-300 h-full flex flex-col">
                {/* Icon */}
                <div className="w-12 h-12 bg-[#727CAB]/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-[#727CAB]" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  IT Helpdesk Support
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  Comprehensive helpdesk services providing quick resolution for all your IT support needs and user assistance.
                </p>

                {/* Features */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#727CAB] rounded-full"></div>
                    <span className="text-xs text-gray-700">Multi-channel support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#727CAB] rounded-full"></div>
                    <span className="text-xs text-gray-700">Knowledge base access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#727CAB] rounded-full"></div>
                    <span className="text-xs text-gray-700">Priority ticket management</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-auto">
                  <Button
                    variant="outline"
                    className="w-full border-[#727CAB] text-[#727CAB] hover:bg-[#727CAB] hover:text-white transition-all duration-300 rounded-lg text-sm font-semibold py-2"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </AnimatedSection>

            {/* Service 3: Remote Monitoring & Management */}
            <AnimatedSection>
              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#727CAB] transition-all duration-300 h-full flex flex-col">
                {/* Icon */}
                <div className="w-12 h-12 bg-[#727CAB]/10 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-[#727CAB]" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Remote Monitoring & Management
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  Advanced remote monitoring solutions to proactively manage and optimize your IT infrastructure performance.
                </p>

                {/* Features */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#727CAB] rounded-full"></div>
                    <span className="text-xs text-gray-700">Automated patch management</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#727CAB] rounded-full"></div>
                    <span className="text-xs text-gray-700">Performance optimization</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#727CAB] rounded-full"></div>
                    <span className="text-xs text-gray-700">Proactive maintenance</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-auto">
                  <Button
                    variant="outline"
                    className="w-full border-[#727CAB] text-[#727CAB] hover:bg-[#727CAB] hover:text-white transition-all duration-300 rounded-lg text-sm font-semibold py-2"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </AnimatedSection>

            {/* Service 4: Open-Source Tools Deployment */}
            <AnimatedSection>
              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#727CAB] transition-all duration-300 h-full flex flex-col">
                {/* Icon */}
                <div className="w-12 h-12 bg-[#727CAB]/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-[#727CAB]" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Open-Source Tools Deployment
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  Expert deployment and management of cost-effective open-source solutions tailored to your business requirements.
                </p>

                {/* Features */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#727CAB] rounded-full"></div>
                    <span className="text-xs text-gray-700">Custom solution design</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#727CAB] rounded-full"></div>
                    <span className="text-xs text-gray-700">Security hardening</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#727CAB] rounded-full"></div>
                    <span className="text-xs text-gray-700">Ongoing maintenance</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-auto">
                  <Button
                    variant="outline"
                    className="w-full border-[#727CAB] text-[#727CAB] hover:bg-[#727CAB] hover:text-white transition-all duration-300 rounded-lg text-sm font-semibold py-2"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Timeline Cards */}
            <div className="relative">
              {/* Carousel Container */}
              <div className="relative overflow-hidden rounded-3xl">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  {timelineSteps.map((step, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-4">
                      <div className="bg-white p-8 rounded-2xl border border-gray-100 transition-all duration-700 ease-in-out min-h-[350px] flex flex-col justify-center relative overflow-hidden group hover:border-[#727CAB]/30">
                        {/* Solid color slide animation - bottom to top */}
                        <div className="absolute inset-0 bg-[#727CAB] transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out"></div>
                        
                        {/* Content with higher z-index */}
                        <div className="relative z-10 text-center group-hover:text-white transition-colors duration-300">
                          <div className="text-7xl font-black text-[#727CAB] mb-6 leading-none group-hover:text-white transition-colors duration-300">{step.number}</div>
                          <h3 className="text-3xl font-bold text-gray-900 mb-6 group-hover:text-white transition-colors duration-300">{step.title}</h3>
                          <p className="text-gray-600 leading-relaxed text-lg group-hover:text-white transition-colors duration-300">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center space-x-3 mt-8">
                {timelineSteps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'bg-[#727CAB] scale-125 shadow-lg'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Get Enterprise Grade Monitoring in{" "}
                  <span style={{ color: '#727CAB' }}>Days, Not Months</span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Our streamlined process gets your infrastructure monitored professionally in record time.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#727CAB] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">01</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Assess & Onboard</h3>
                    <p className="text-gray-600">Quick infrastructure analysis and seamless integration.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#727CAB] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">02</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Monitor & Detect</h3>
                    <p className="text-gray-600">24/7 surveillance with intelligent alert systems.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#727CAB] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">03</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Resolve & Optimize</h3>
                    <p className="text-gray-600">Swift incident response and continuous improvement.</p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Button 
                  size="lg" 
                  className="bg-[#727CAB] hover:bg-[#5a6b99] text-white px-8 py-4 text-lg font-semibold rounded-full"
                >
                  Start Your Journey
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MSP Partnership Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-black">MSP</span>{" "}
              <span style={{ color: '#727CAB' }}>Partnership</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Partner with us to deliver world-class NOC services to your clients. We become your 24/7 monitoring backbone, so you can focus on growth.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedSection>
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-[#727CAB]/10 rounded-2xl flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-[#727CAB]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">White-Label Solutions</h3>
                <p className="text-gray-600 leading-relaxed">
                  Offer our NOC services under your brand. Your clients get enterprise-grade monitoring, you get the credit.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-[#727CAB]/10 rounded-2xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-[#727CAB]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Revenue Sharing</h3>
                <p className="text-gray-600 leading-relaxed">
                  Generate recurring revenue from monitoring services. We handle the operations, you share in the success.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-[#727CAB]/10 rounded-2xl flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-[#727CAB]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Technical Support</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get access to our engineering team and training resources. We're here to help you succeed.
                </p>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection className="text-center mt-12">
            <Button 
              size="lg" 
              className="bg-[#727CAB] hover:bg-[#5a6b99] text-white px-10 py-5 text-lg font-semibold rounded-full"
            >
              Become a Partner
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* 24/7 NOC Monitoring Introduction */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-10">
              <span className="text-black">24/7</span>{" "}
              <span style={{ color: '#727CAB' }}>NOC Monitoring Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Sleep better knowing your infrastructure never sleeps. Our dedicated team monitors your systems around the clock, catching issues before they impact your business.
            </p>
          </AnimatedSection>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Side - Image */}
            <AnimatedSection>
              <div className="space-y-8">
                {/* Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src="/partner logo/20943705.jpg" 
                    alt="Professional NOC operations center monitoring enterprise infrastructure 24/7"
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  
                  {/* Live Stats Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-xl">
                      <h4 className="font-bold text-gray-900 text-lg mb-4">Live Operations Center</h4>
                      <div className="grid grid-cols-3 gap-6">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-[#727CAB]">99.9%</div>
                          <div className="text-sm text-gray-600 mt-1">Uptime Guaranteed</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-[#727CAB]">&lt;3 min</div>
                          <div className="text-sm text-gray-600 mt-1">Avg Response</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-[#727CAB]">24/7</div>
                          <div className="text-sm text-gray-600 mt-1">Human Support</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Why You Need NOC Monitoring */}
                <div className="bg-white rounded-2xl p-8 border-2 border-[#727CAB] shadow-sm">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Your Business Needs NOC Monitoring</h3>
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-[#727CAB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-[#727CAB]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Downtime is expensive</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">Every minute your systems are down costs money, customers, and reputation. Most businesses can't afford to wait until morning to fix critical issues.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-[#727CAB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-[#727CAB]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Problems don't follow business hours</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">Servers crash at 2 AM. Security threats happen on weekends. Without 24/7 coverage, you're vulnerable when your team is offline.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-[#727CAB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-[#727CAB]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Your team needs to focus</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">Hiring, training, and managing an internal night shift is expensive and distracting. Let your engineers build products, not watch dashboards.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-[#727CAB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-[#727CAB]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Scale without the headache</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">As your infrastructure grows, monitoring complexity increases exponentially. Our team scales with you, handling thousands of devices without missing a beat.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Right Side - Features */}
            <AnimatedSection>
              <div className="space-y-6">
                <div className="mb-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    Real people watching your systems, not just bots
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    When something breaks at 3 AM, you want a real engineer answering the phone—not an automated message. Our NOC team combines smart monitoring tools with experienced technicians who actually understand your infrastructure.
                  </p>
                </div>

                {/* Feature Cards */}
                <div className="space-y-4">
                  <div className="group bg-[#727CAB] rounded-2xl p-6 border border-[#727CAB]/30 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Shield className="w-7 h-7 text-[#727CAB]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-lg mb-2">We spot problems before you do</h4>
                        <p className="text-white/90 leading-relaxed">
                          Our monitoring catches performance issues, security threats, and potential failures—often before they affect your users. No more learning about outages from angry customer emails.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="group bg-white rounded-2xl p-6 border-2 border-[#727CAB] hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-[#727CAB] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Zap className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg mb-2">Fast fixes, not finger-pointing</h4>
                        <p className="text-gray-600 leading-relaxed">
                          When issues arise, we handle the troubleshooting, coordinate with vendors if needed, and get things running again—fast. Your team stays focused on building, not firefighting.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="group bg-[#727CAB] rounded-2xl p-6 border border-[#727CAB]/30 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <TrendingUp className="w-7 h-7 text-[#727CAB]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-lg mb-2">Reports that actually make sense</h4>
                        <p className="text-white/90 leading-relaxed">
                          Get clear, actionable insights about your infrastructure health—no technical jargon or meaningless metrics. Know exactly where you stand and what to plan for.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="group bg-white rounded-2xl p-6 border-2 border-[#727CAB] hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-[#727CAB] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Users className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg mb-2">A team that knows your setup</h4>
                        <p className="text-gray-600 leading-relaxed">
                          We learn your environment inside and out. The same engineers work with you consistently, so they understand your architecture, your priorities, and your business goals.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Full-Width CTA Section */}
          <AnimatedSection className="mt-16">
            <div className="bg-[#727CAB] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16"></div>
              
              <div className="relative z-10 text-center">
                <h4 className="text-2xl md:text-3xl font-bold mb-3">Ready to stop worrying about your infrastructure?</h4>
                <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
                  Talk to our NOC team and see how 24/7 monitoring can give you peace of mind.
                </p>
                
                <Button className="bg-white text-[#727CAB] px-10 py-5 text-xl font-bold rounded-2xl shadow-xl w-full sm:w-auto">
                  Talk to Our NOC Team
                </Button>
                
                <div className="mt-6 flex items-center justify-center gap-6 text-white/80 text-sm">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>30-minute call</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>No credit card required</span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* NOC Support Plans */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              NOC Support{" "}
              <span className="bg-gradient-to-r from-[#727CAB] to-blue-400 bg-clip-text text-transparent">
                Plans
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive NOC transformation services tailored to your organization's specific needs and maturity level.
            </p>
          </AnimatedSection>

          {/* Plan Selector Buttons */}
          <div className="flex justify-center gap-4 mb-12">
            {[
              { name: "NOC Foundations", index: 0, color: "from-[#727CAB] to-[#727CAB]" },
              { name: "NOC Optimization", index: 1, color: "from-[#727CAB] to-blue-600" },
              { name: "NOC Transformation", index: 2, color: "from-[#727CAB] to-purple-600" }
            ].map((plan) => (
              <button
                key={plan.index}
                onClick={() => goToNocPlanSlide(plan.index)}
                className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
                  nocPlanSlide === plan.index
                    ? `bg-gradient-to-r ${plan.color} text-white shadow-lg`
                    : 'bg-white border-2 border-[#727CAB] text-[#727CAB] hover:bg-[#727CAB]/10'
                }`}
              >
                {plan.name}
              </button>
            ))}
          </div>

          {/* Sliding Carousel Container */}
          <div className="relative max-w-6xl mx-auto">
            {/* Carousel Content - Single slide visible */}
            <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${nocPlanSlide * 100}%)` }}
              >
                {/* NOC Foundations Slide */}
                <div className="w-full flex-shrink-0 min-h-[700px]">
                  <div className="relative h-full flex flex-col">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#727CAB]/5 via-white to-blue-50/30 opacity-50"></div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#727CAB]/10 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl translate-y-24 -translate-x-24"></div>
                    
                    <div className="relative z-10 p-8 md:p-12 h-full flex flex-col">
                      <div className="max-w-5xl mx-auto flex-1 flex flex-col">
                        {/* Header Card */}
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-6 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#727CAB]/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                          <div className="relative z-10">
                            <div className="flex items-center justify-center gap-3 mb-6">
                              <div className="w-16 h-16 bg-gradient-to-br from-[#727CAB] to-[#727CAB]/80 rounded-2xl flex items-center justify-center shadow-lg">
                                <Sparkles className="w-8 h-8 text-white" />
                              </div>
                              <div className="text-left">
                                <div className="text-sm font-semibold text-gray-500 mb-1">FOUNDATION PLAN</div>
                                <div className="text-2xl font-bold text-gray-900">NOC Foundations</div>
                              </div>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">Greenfield NOC Setup</h3>
                            <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-6">Perfect for organizations building their first NOC from the ground up with proven methodologies and best practices</p>
                            
                            {/* Timeline Badge */}
                            <div className="flex items-center justify-center gap-4">
                              <div className="bg-gradient-to-r from-[#727CAB] to-[#727CAB]/80 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-lg flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                4-8 weeks timeline
                              </div>
                              <div className="text-gray-500 text-sm font-medium">• Typical delivery</div>
                            </div>
                          </div>
                        </div>

                        {/* Main Content Grid */}
                        <div className="grid lg:grid-cols-3 gap-6 mb-6 flex-1">
                          {/* Overview Card */}
                          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-start gap-4 mb-4">
                              <div className="w-12 h-12 bg-gradient-to-br from-[#727CAB] to-[#727CAB]/80 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                                <Eye className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <h4 className="text-xl font-bold text-gray-900 mb-2">Complete Blueprint</h4>
                                <p className="text-gray-600 leading-relaxed text-sm">Proven operational foundation with 20+ years of NOC expertise</p>
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              <div className="bg-gradient-to-r from-[#727CAB]/5 to-transparent rounded-xl p-4 border border-[#727CAB]/10">
                                <h5 className="font-semibold text-gray-900 mb-2 text-sm">Quick Assessment</h5>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-[#727CAB] rounded-full"></div>
                                  <span className="text-xs text-gray-700">Critical gaps identification</span>
                                </div>
                              </div>
                              <div className="bg-gradient-to-r from-blue-50/50 to-transparent rounded-xl p-4 border border-blue-100">
                                <h5 className="font-semibold text-gray-900 mb-2 text-sm">Rapid Implementation</h5>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                  <span className="text-xs text-gray-700">Fast-track proven processes</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Timeline Card */}
                          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
                            <h4 className="text-xl font-bold text-gray-900 mb-4 text-center">Implementation Timeline</h4>
                            <div className="space-y-4">
                              {[
                                { phase: "Assessment", week: "Week 1", desc: "Targeted interviews and analysis", icon: "1" },
                                { phase: "Solutioning", week: "Week 2-3", desc: "Custom processes and CMDB setup", icon: "2" },
                                { phase: "Execution", week: "Week 4-8", desc: "Hands-on implementation", icon: "3" }
                              ].map((item, index) => (
                                <div key={index} className="relative">
                                  <div className="flex items-start gap-3">
                                    <div className="relative">
                                      <div className="w-10 h-10 bg-gradient-to-br from-[#727CAB] to-[#727CAB]/80 rounded-full flex items-center justify-center shadow-md">
                                        <span className="text-white font-bold text-sm">{item.icon}</span>
                                      </div>
                                      {index < 2 && (
                                        <div className="absolute top-10 left-5 w-0.5 h-8 bg-gradient-to-b from-[#727CAB] to-transparent"></div>
                                      )}
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center justify-between mb-1">
                                        <h5 className="font-semibold text-gray-900 text-sm">{item.phase}</h5>
                                        <span className="text-xs font-medium text-[#727CAB] bg-[#727CAB]/10 px-2 py-1 rounded-full">{item.week}</span>
                                      </div>
                                      <p className="text-xs text-gray-600">{item.desc}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Deliverables Card */}
                          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
                            <h4 className="text-xl font-bold text-gray-900 mb-4 text-center">Key Deliverables</h4>
                            <div className="space-y-2">
                              {[
                                "Event Management Process",
                                "Incident Management Process",
                                "Scheduled Maintenance Process",
                                "Basic CMDB Setup",
                                "Custom Runbooks",
                                "Implementation Support"
                              ].map((item, index) => (
                                <div key={index} className="flex items-center gap-3 bg-gradient-to-r from-gray-50 to-white rounded-xl p-3 border border-gray-200 hover:border-[#727CAB]/30 transition-colors">
                                  <div className="w-6 h-6 bg-gradient-to-br from-[#727CAB] to-[#727CAB]/80 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                                    <CheckCircle2 className="w-3 h-3 text-white" />
                                  </div>
                                  <span className="text-gray-800 font-medium text-xs">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* CTA Card */}
                        <div className="bg-gradient-to-r from-[#727CAB] to-[#727CAB]/80 rounded-2xl shadow-xl p-8 text-center relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                          <div className="relative z-10">
                            <Button className="bg-white text-[#727CAB] hover:bg-gray-50 px-8 py-4 text-base font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                              Start Your NOC Journey
                            </Button>
                            <p className="text-white/90 text-sm mt-3 font-medium">Free initial consultation • No commitment required</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* NOC Optimization Slide */}
                <div className="w-full flex-shrink-0 min-h-[700px]">
                  <div className="relative h-full flex flex-col">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-purple-50/20 opacity-50"></div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#727CAB]/10 to-blue-500/10 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl translate-y-24 -translate-x-24"></div>
                    
                    <div className="relative z-10 p-8 md:p-12 h-full flex flex-col">
                      <div className="max-w-5xl mx-auto flex-1 flex flex-col">
                        {/* Header Card */}
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-6 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                          <div className="relative z-10">
                            <div className="flex items-center justify-center gap-3 mb-6">
                              <div className="w-16 h-16 bg-gradient-to-br from-[#727CAB] to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <TrendingUp className="w-8 h-8 text-white" />
                              </div>
                              <div className="text-left">
                                <div className="text-sm font-semibold text-gray-500 mb-1">OPTIMIZATION PLAN</div>
                                <div className="text-2xl font-bold text-gray-900">NOC Optimization</div>
                              </div>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">Enhance Existing NOC Performance</h3>
                            <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-6">Transform your operational efficiency and eliminate performance bottlenecks with advanced optimization strategies</p>
                            
                            {/* Performance Metrics */}
                            <div className="flex items-center justify-center gap-6">
                              <div className="bg-gradient-to-r from-[#727CAB]/10 to-blue-500/10 px-4 py-2 rounded-xl border border-[#727CAB]/20">
                                <div className="text-lg font-bold text-[#727CAB]">60-80%</div>
                                <div className="text-xs text-gray-600">Faster Resolution</div>
                              </div>
                              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-4 py-2 rounded-xl border border-blue-200">
                                <div className="text-lg font-bold text-blue-600">50%</div>
                                <div className="text-xs text-gray-600">Reduced Downtime</div>
                              </div>
                              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-4 py-2 rounded-xl border border-purple-200">
                                <div className="text-lg font-bold text-purple-600">4-8 weeks</div>
                                <div className="text-xs text-gray-600">Timeline</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Main Content Grid */}
                        <div className="grid lg:grid-cols-3 gap-6 mb-6 flex-1">
                          {/* Performance Card */}
                          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-start gap-4 mb-4">
                              <div className="w-12 h-12 bg-gradient-to-br from-[#727CAB] to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                                <Settings className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <h4 className="text-xl font-bold text-gray-900 mb-2">Performance Enhancement</h4>
                                <p className="text-gray-600 leading-relaxed text-sm">Deep-dive assessment and optimization for existing NOCs</p>
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              <div className="bg-gradient-to-r from-[#727CAB]/5 to-blue-500/5 rounded-xl p-4 border border-[#727CAB]/10">
                                <h5 className="font-semibold text-gray-900 mb-2 text-sm">Efficiency Analysis</h5>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-[#727CAB] rounded-full"></div>
                                  <span className="text-xs text-gray-700">Identify operational bottlenecks</span>
                                </div>
                              </div>
                              <div className="bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl p-4 border border-blue-100">
                                <h5 className="font-semibold text-gray-900 mb-2 text-sm">Proactive Processes</h5>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                  <span className="text-xs text-gray-700">Sustained excellence implementation</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Target Organizations Card */}
                          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
                            <h4 className="text-xl font-bold text-gray-900 mb-4 text-center">Perfect For Organizations</h4>
                            <div className="space-y-3">
                              {[
                                { issue: "Operational inefficiencies", icon: "⚡", color: "from-[#727CAB] to-blue-600" },
                                { issue: "Slow incident management", icon: "🚀", color: "from-blue-600 to-purple-600" },
                                { issue: "Lack proactive management", icon: "📊", color: "from-purple-600 to-pink-600" },
                                { issue: "Need optimization solutions", icon: "🎯", color: "from-pink-600 to-red-600" }
                              ].map((item, index) => (
                                <div key={index} className="flex items-center gap-3 bg-white rounded-xl p-3 border border-gray-200 hover:border-[#727CAB]/30 transition-colors">
                                  <div className={`w-8 h-8 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm`}>
                                    <span className="text-white text-xs font-bold">{item.icon}</span>
                                  </div>
                                  <span className="text-gray-800 font-medium text-xs">{item.issue}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Advanced Deliverables Card */}
                          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
                            <h4 className="text-xl font-bold text-gray-900 mb-4 text-center">Advanced Deliverables</h4>
                            <div className="space-y-2">
                              {[
                                "Advanced CMDB with ITSM",
                                "Custom Runbooks & Scenarios",
                                "Proactive Monitoring System",
                                "Analytics Dashboard",
                                "SLA-based Response Times",
                                "Weekly Performance Reviews",
                                "Custom Alerting Rules",
                                "Event Management Process"
                              ].map((item, index) => (
                                <div key={index} className="flex items-center gap-3 bg-gradient-to-r from-gray-50 to-white rounded-xl p-3 border border-gray-200 hover:border-[#727CAB]/30 transition-colors">
                                  <div className="w-6 h-6 bg-gradient-to-br from-[#727CAB] to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                                    <CheckCircle2 className="w-3 h-3 text-white" />
                                  </div>
                                  <span className="text-gray-800 font-medium text-xs">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* CTA Card */}
                        <div className="bg-gradient-to-r from-[#727CAB] to-blue-600 rounded-2xl shadow-xl p-8 text-center relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                          <div className="relative z-10">
                            <Button className="bg-white text-[#727CAB] hover:bg-gray-50 px-8 py-4 text-base font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                              Optimize Your NOC Now
                            </Button>
                            <p className="text-white/90 text-sm mt-3 font-medium">ROI visible within 30 days • Comprehensive assessment included</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* NOC Transformation Slide */}
                <div className="w-full flex-shrink-0 min-h-[700px]">
                  <div className="relative h-full flex flex-col">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-white to-pink-50/20 opacity-50"></div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#727CAB]/10 rounded-full blur-2xl translate-y-24 -translate-x-24"></div>
                    
                    <div className="relative z-10 p-8 md:p-12 h-full flex flex-col">
                      <div className="max-w-5xl mx-auto flex-1 flex flex-col">
                        {/* Header Card */}
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-6 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                          <div className="relative z-10">
                            <div className="flex items-center justify-center gap-3 mb-6">
                              <div className="w-16 h-16 bg-gradient-to-br from-[#727CAB] to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <Shield className="w-8 h-8 text-white" />
                              </div>
                              <div className="text-left">
                                <div className="text-sm font-semibold text-gray-500 mb-1">TRANSFORMATION PLAN</div>
                                <div className="text-2xl font-bold text-gray-900">NOC Transformation</div>
                              </div>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">Complete NOC Overhaul</h3>
                            <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-6">Enterprise-grade transformation for large organizations and service providers with comprehensive strategic solutions</p>
                            
                            {/* Enterprise Features */}
                            <div className="flex items-center justify-center gap-4">
                              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-4 py-2 rounded-xl border border-purple-200">
                                <div className="text-lg font-bold text-purple-600">8-10+ weeks</div>
                                <div className="text-xs text-gray-600">Extended timeline</div>
                              </div>
                              <div className="bg-gradient-to-r from-pink-500/10 to-red-500/10 px-4 py-2 rounded-xl border border-pink-200">
                                <div className="text-lg font-bold text-pink-600">Enterprise</div>
                                <div className="text-xs text-gray-600">Grade solution</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Main Content Grid */}
                        <div className="grid lg:grid-cols-3 gap-6 mb-6 flex-1">
                          {/* Enterprise Solutions Card */}
                          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-start gap-4 mb-4">
                              <div className="w-12 h-12 bg-gradient-to-br from-[#727CAB] to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                                <Zap className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <h4 className="text-xl font-bold text-gray-900 mb-2">Total Transformation</h4>
                                <p className="text-gray-600 leading-relaxed text-sm">Comprehensive overhaul for complex NOC environments</p>
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              <div className="bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-xl p-4 border border-purple-100">
                                <h5 className="font-semibold text-gray-900 mb-2 text-sm">ITSM Integration</h5>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                  <span className="text-xs text-gray-700">Centralized platform implementation</span>
                                </div>
                              </div>
                              <div className="bg-gradient-to-r from-pink-500/5 to-red-500/5 rounded-xl p-4 border border-pink-100">
                                <h5 className="font-semibold text-gray-900 mb-2 text-sm">SPOG Implementation</h5>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                                  <span className="text-xs text-gray-700">Single pane of glass solution</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Target Audience Card */}
                          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
                            <h4 className="text-xl font-bold text-gray-900 mb-4 text-center">Designed For</h4>
                            <div className="space-y-4">
                              <div className="bg-white rounded-xl p-4 border border-gray-200 hover:border-purple-300 transition-colors">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 bg-gradient-to-br from-[#727CAB] to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Users className="w-5 h-5 text-white" />
                                  </div>
                                  <div>
                                    <h5 className="font-semibold text-gray-900 text-sm">Large Enterprises</h5>
                                    <p className="text-xs text-gray-600">Complex operations</p>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                                    <span className="text-xs text-gray-700">Comprehensive transformation</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                                    <span className="text-xs text-gray-700">Strategic partnership</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="bg-white rounded-xl p-4 border border-gray-200 hover:border-pink-300 transition-colors">
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Globe className="w-5 h-5 text-white" />
                                  </div>
                                  <div>
                                    <h5 className="font-semibold text-gray-900 text-sm">Service Providers</h5>
                                    <p className="text-xs text-gray-600">OEMs & Telecom</p>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                                    <span className="text-xs text-gray-700">Advanced capabilities</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                                    <span className="text-xs text-gray-700">24/7 expert support</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Enterprise Features Card */}
                          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
                            <h4 className="text-xl font-bold text-gray-900 mb-4 text-center">Enterprise Solutions</h4>
                            <div className="space-y-2">
                              {[
                                "Centralized ITSM Platform",
                                "ITIL-Aligned Processes",
                                "Advanced CMDB Integration",
                                "Automated Event Correlation",
                                "Service Catalog & SLAs",
                                "Enhanced Knowledge Management"
                              ].map((item, index) => (
                                <div key={index} className="flex items-center gap-3 bg-gradient-to-r from-gray-50 to-white rounded-xl p-3 border border-gray-200 hover:border-purple-300 transition-colors">
                                  <div className="w-6 h-6 bg-gradient-to-br from-[#727CAB] to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                                    <CheckCircle2 className="w-3 h-3 text-white" />
                                  </div>
                                  <span className="text-gray-800 font-medium text-xs">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* CTA Card */}
                        <div className="bg-gradient-to-r from-[#727CAB] to-purple-600 rounded-2xl shadow-xl p-8 text-center relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                          <div className="relative z-10">
                            <Button className="bg-white text-[#727CAB] hover:bg-gray-50 px-8 py-4 text-base font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                              Transform Your Enterprise NOC
                            </Button>
                            <p className="text-white/90 text-sm mt-3 font-medium">Dedicated transformation team • Strategic partnership approach</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NOC Pricing Section */}
      <section className="py-32 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              NOC Monitoring{" "}
              <span className="bg-gradient-to-r from-[#727CAB] to-blue-400 bg-clip-text text-transparent">
                Pricing
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Transparent pricing designed to scale with your business. No hidden fees, no surprises.
              Choose the monitoring level that fits your infrastructure needs.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Notification Support",
                description: "Perfect for small businesses and basic monitoring needs",
                price: "$499",
                period: "/month",
                features: [
                  "Up to 50 monitored devices",
                  "24x7 monitoring & alerting",
                  "Basic dashboard access",
                  "Email & SMS notifications",
                  "Monthly performance reports",
                  "Phone support during business hours"
                ]
              },
              {
                name: "Tier 1 Support",
                description: "Comprehensive monitoring for growing businesses",
                price: "$1,299",
                period: "/month",
                popular: true,
                features: [
                  "Up to 200 monitored devices",
                  "All Notification features",
                  "Tier 1 incident response",
                  "60-80% issue auto-resolution",
                  "Advanced analytics dashboard",
                  "24x7 phone & chat support",
                  "Weekly performance reviews",
                  "Custom alerting rules"
                ]
              },
              {
                name: "Enterprise NOC",
                description: "Full-service NOC operations for large enterprises",
                price: "Custom",
                period: "pricing",
                features: [
                  "Unlimited monitored devices",
                  "All Tier 1 features",
                  "Advanced Tier 2/3 support",
                  "Dedicated account manager",
                  "Custom SLA agreements",
                  "On-site NOC consulting",
                  "24x7 senior engineer access",
                  "Infrastructure optimization",
                  "Custom reporting & analytics"
                ]
              }
            ].map((plan, index) => (
              <AnimatedSection key={plan.name} delay={index * 0.15}>
                <div className={`relative p-8 rounded-2xl border ${plan.popular ? 'border-[#727CAB] bg-[#727CAB]/5' : 'border-gray-800 bg-gray-900/50'} h-full flex flex-col`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="px-4 py-1 rounded-full bg-[#727CAB] text-white text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                    <p className="text-gray-400 text-sm">{plan.description}</p>
                  </div>

                  <div className="mb-6">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    <span className="text-gray-400">{plan.period}</span>
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${plan.popular ? 'bg-[#727CAB] hover:bg-[#727CAB]/90' : 'bg-gray-800 hover:bg-gray-700'} text-white rounded-xl py-6 transition-colors`}
                  >
                    {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                  </Button>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-16">
            <p className="text-gray-400 mb-6">
              Need a custom NOC solution? We offer tailored packages for unique infrastructure requirements.
            </p>
            <Button className="bg-transparent border border-[#727CAB] text-[#727CAB] hover:bg-[#727CAB] hover:text-white px-8 py-3 rounded-xl transition-colors">
              Request Custom Quote
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      {/* Stats Section */}
      <section className="py-20 border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <AnimatedSection key={stat.label} delay={index * 0.1}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Succeed
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Powerful features designed to streamline your workflow, protect your data, 
              and help your team achieve more.
            </p>
          </AnimatedSection>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                className="group p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Get Started in{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Minutes, Not Months
              </span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Connect Your Data",
                description: "Seamlessly integrate with your existing tools and data sources using our pre-built connectors."
              },
              {
                step: "02",
                title: "Configure Workflows",
                description: "Set up automated processes with our visual workflow builder—no coding required."
              },
              {
                step: "03",
                title: "Start Growing",
                description: "Launch your optimized operations and watch efficiency soar with real-time insights."
              }
            ].map((item, index) => (
              <AnimatedSection key={item.step} delay={index * 0.2}>
                <div className="relative">
                  <div className="text-6xl font-bold text-gray-800 mb-4">{item.step}</div>
                  <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.description}</p>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-12 right-0 transform translate-x-1/2">
                      <ChevronRight className="w-8 h-8 text-gray-700" />
                    </div>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Loved by{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Industry Leaders
              </span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection key={testimonial.author} delay={index * 0.15}>
                <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 h-full">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-lg text-gray-300 mb-6 leading-relaxed">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold">
                      {testimonial.author.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{testimonial.author}</div>
                      <div className="text-sm text-gray-400">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Simple, Transparent{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Pricing
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              No hidden fees. No surprises. Choose the plan that's right for your business.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <AnimatedSection key={plan.name} delay={index * 0.15}>
                <div className={`relative p-8 rounded-2xl border ${plan.popular ? 'border-purple-500 bg-purple-500/5' : 'border-gray-800 bg-gray-900/50'} h-full flex flex-col`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="px-4 py-1 rounded-full bg-purple-500 text-white text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                    <p className="text-gray-400 text-sm">{plan.description}</p>
                  </div>

                  <div className="mb-6">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    <span className="text-gray-400">{plan.period}</span>
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full ${plan.popular ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-800 hover:bg-gray-700'} text-white rounded-xl py-6`}
                  >
                    {plan.cta}
                  </Button>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-400 mb-10">
              Join 500+ companies already scaling with our platform. 
              Start your free trial today—no credit card required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 h-14 px-6 rounded-full"
              />
              <Button 
                className="bg-purple-600 hover:bg-purple-700 text-white h-14 px-8 rounded-full whitespace-nowrap"
              >
                Get Started
              </Button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>No credit card</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
}
