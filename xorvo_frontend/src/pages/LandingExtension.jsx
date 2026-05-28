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

function LandingExtension() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [nocPlanSlide, setNocPlanSlide] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(null);
  const dropdownTimeoutRef = useRef(null);
  const autoPlayRef = useRef(null);

  // Calculator State
  const [nocPlan, setNocPlan] = useState('');
  const [nocDevices, setNocDevices] = useState(0);
  const [nocShift, setNocShift] = useState('');
  const [nocTier, setNocTier] = useState(''); // New state for L1/L2 tier
  const [nocTickets, setNocTickets] = useState(0);
  const [nocSla, setNocSla] = useState('');
  const [helpdeskPlan, setHelpdeskPlan] = useState('');
  const [helpdeskQuantity, setHelpdeskQuantity] = useState(0);
  const [rmmPlan, setRmmPlan] = useState('');
  const [rmmEndpoints, setRmmEndpoints] = useState(0);
  const [currentSpend, setCurrentSpend] = useState('');
  const [selectedCalculator, setSelectedCalculator] = useState('');

  // Pricing Configuration - New Enhanced NOC Logic
  const CONFIG = {
    coverageHours: {
      "24x7": 720,
      "8x5": 176,
      "8x5_weekend": 245
    },
    
    engineerProductiveHours: 123,
    
    ticketCapacity: {
      L1: 600,
      L2: 300
    },
    
    slaMultiplier: {
      "2hr": 1,
      "15min": 0.7
    },
    
    baseTierCost: {
      basic: {
        L1: 600,
        L2: 1100
      },
      standard: {
        L1: 1200,
        L2: 2400
      }
    },
    
    devicePricing: {
      basic: {
        perDevice: 4,
        baseBlockCost: 100,   // 4 × 25
        breakpoint: 25
      },
      standard: {
        perDevice: 20,
        baseBlockCost: 500,   // 20 × 25
        breakpoint: 25
      }
    }
  };

  // Calculate NOC cost with new enhanced logic
  const calculateNocCost = () => {
    if (nocPlan === 'advanced') {
      return 0; // Custom pricing - will show "Custom Quote Required"
    }

    if (!nocPlan || !nocTier || !nocShift) {
      return 0;
    }

    // Create input object
    const input = {
      category: nocPlan,
      tier: nocTier,
      coverage: nocShift,
      devices: nocDevices || 0,
      ticketVolume: nocTickets || 0,
      sla: nocSla || "2hr"
    };

    // 1️⃣ Coverage Staff Calculation
    const coverageHours = CONFIG.coverageHours[input.coverage];
    const productiveHours = CONFIG.engineerProductiveHours;
    const coverageStaff = Math.ceil(coverageHours / productiveHours);

    // 2️⃣ Ticket Capacity Adjustment
    const baseCapacity = CONFIG.ticketCapacity[input.tier];
    const slaFactor = CONFIG.slaMultiplier[input.sla];
    const effectiveCapacity = baseCapacity * slaFactor;
    const ticketStaff = input.ticketVolume > 0 ? Math.ceil(input.ticketVolume / effectiveCapacity) : 1;

    // 3️⃣ Final Staff Required
    const finalStaff = Math.max(coverageStaff, ticketStaff);

    // 4️⃣ Tier Cost
    const baseTierCost = CONFIG.baseTierCost[input.category][input.tier];
    const tierCost = baseTierCost * finalStaff;

    // 5️⃣ Device Cost
    const deviceConfig = CONFIG.devicePricing[input.category];
    let deviceCost;

    if (input.devices <= deviceConfig.breakpoint) {
      deviceCost = deviceConfig.baseBlockCost;
    } else {
      const extraDevices = input.devices - deviceConfig.breakpoint;
      deviceCost = deviceConfig.baseBlockCost + (extraDevices * deviceConfig.perDevice);
    }

    // 6️⃣ Final Price
    const totalCost = tierCost + deviceCost;

    // Store breakdown for display
    window.nocCalculationBreakdown = {
      finalStaff,
      coverageStaff,
      ticketStaff,
      tierCost,
      deviceCost,
      totalCost
    };

    return totalCost;
  };

  // Calculate costs
  const nocCost = calculateNocCost();
  const helpdeskCost = helpdeskPlan && helpdeskPlan !== 'custom' ? 
    (helpdeskPlan === 'basic' ? helpdeskQuantity * 5 : helpdeskQuantity * 20) : 0;
  const rmmCost = rmmPlan && rmmPlan !== 'custom' ? rmmEndpoints * (rmmPlan === 'basic' ? 20 : 40) : 0;
  
  const requiresSalesContact = nocPlan === 'advanced' || helpdeskPlan === 'custom' || rmmPlan === 'custom';
  const totalMonthlyCost = requiresSalesContact ? null : (nocCost + helpdeskCost + rmmCost);
  
  const monthlySavings = currentSpend && totalMonthlyCost !== null ? 
    (parseFloat(currentSpend) - totalMonthlyCost) : null;
  const savingsPercentage = monthlySavings !== null && monthlySavings >= 0 ? 
    ((monthlySavings / parseFloat(currentSpend)) * 100).toFixed(1) : null;

  // Handler functions
  const handleNocPlanChange = (e) => setNocPlan(e.target.value);
  const handleNocDevicesChange = (e) => setNocDevices(e.target.value === '' ? '' : Math.max(0, parseInt(e.target.value) || 0));
  const handleNocShiftChange = (e) => setNocShift(e.target.value);
  const handleNocTierChange = (e) => setNocTier(e.target.value);
  const handleHelpdeskPlanChange = (e) => setHelpdeskPlan(e.target.value);
  const handleHelpdeskQuantityChange = (e) => setHelpdeskQuantity(e.target.value === '' ? '' : Math.max(0, parseInt(e.target.value) || 0));
  const handleRmmPlanChange = (e) => setRmmPlan(e.target.value);
  const handleRmmEndpointsChange = (e) => setRmmEndpoints(e.target.value === '' ? '' : Math.max(0, parseInt(e.target.value) || 0));
  const handleCurrentSpendChange = (e) => setCurrentSpend(e.target.value);
  const handleNocTicketsChange = (e) => setNocTickets(e.target.value === '' ? '' : Math.max(0, parseInt(e.target.value) || 0));
  const handleNocSlaChange = (e) => setNocSla(e.target.value);

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
        "On premise deployment option",
        "White label capabilities"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Three Island Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="relative transition-colors duration-300 bg-gradient-to-r from-white to-[#727CAB] shadow-sm">
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
                  <a href="#our-services" className="text-black font-bold text-lg hover:text-blue-600 transition-colors">Services</a>
                  
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
                <a href="#calculator" className="text-black font-bold text-lg hover:text-blue-600 transition-colors">Pricing</a>
                <a href="#about" className="text-black font-bold text-lg hover:text-blue-600 transition-colors">About</a>
              </div>
              
              {/* Right Island - Contact */}
              <div className="hidden md:block">
                <a href="#contact-section">
                  <Button 
                    variant="nav"
                    className="text-white font-bold text-lg hover:text-blue-400"
                  >
                    Contact Us
                  </Button>
                </a>
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
            <a href="#calculator" className="text-gray-700 hover:text-gray-900 transition-colors">Pricing</a>
            <a href="#contact-section" className="text-gray-700 hover:text-gray-900 transition-colors">Contact Us</a>
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
              <p className="text-lg text-gray-600 mb-8 max-w-xl leading-relaxed font-medium">
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
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center">
              We collaborate with industry leaders to deliver cutting-edge solutions and exceptional service quality.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4 items-center justify-items-center">
            <div className="flex items-center justify-center p-4 hover:scale-110 transition-transform duration-300">
              <img src="/src/assets/landingpartners/Freshservice_Logo.png" alt="Freshservice" className="max-h-12 sm:max-h-16 md:max-h-20 w-auto object-contain" />
            </div>
            <div className="flex items-center justify-center p-4 hover:scale-110 transition-transform duration-300">
              <img src="/src/assets/landingpartners/alopsa.png" alt="Alopsa" className="max-h-10 sm:max-h-14 md:max-h-16 w-auto object-contain" />
            </div>
            <div className="flex items-center justify-center p-4 hover:scale-110 transition-transform duration-300">
              <img src="/src/assets/landingpartners/atera.png" alt="Atera" className="max-h-10 sm:max-h-14 md:max-h-16 w-auto object-contain" />
            </div>
            <div className="flex items-center justify-center p-4 hover:scale-110 transition-transform duration-300">
              <img src="/src/assets/landingpartners/autotask.jpg" alt="Autotask" className="max-h-10 sm:max-h-14 md:max-h-16 w-auto object-contain" />
            </div>
            <div className="flex items-center justify-center p-4 hover:scale-110 transition-transform duration-300">
              <img src="/src/assets/landingpartners/connectwise.png" alt="ConnectWise" className="max-h-10 sm:max-h-14 md:max-h-16 w-auto object-contain" />
            </div>
            <div className="flex items-center justify-center p-4 hover:scale-110 transition-transform duration-300">
              <img src="/src/assets/landingpartners/connectwisemanage.png" alt="ConnectWise Manage" className="max-h-10 sm:max-h-14 md:max-h-16 w-auto object-contain" />
            </div>
            <div className="flex items-center justify-center p-4 hover:scale-110 transition-transform duration-300">
              <img src="/src/assets/landingpartners/kaseya.svg" alt="Kaseya" className="max-h-10 sm:max-h-14 md:max-h-16 w-auto object-contain" />
            </div>
            <div className="flex items-center justify-center p-4 hover:scale-110 transition-transform duration-300">
              <img src="/src/assets/landingpartners/nable.webp" alt="N-able" className="max-h-10 sm:max-h-14 md:max-h-16 w-auto object-contain" />
            </div>
            <div className="flex items-center justify-center p-4 hover:scale-110 transition-transform duration-300">
              <img src="/src/assets/landingpartners/nagios.webp" alt="Nagios" className="max-h-10 sm:max-h-14 md:max-h-16 w-auto object-contain" />
            </div>
            <div className="flex items-center justify-center p-4 hover:scale-110 transition-transform duration-300">
              <img src="/src/assets/landingpartners/ninja.png" alt="NinjaOne" className="max-h-10 sm:max-h-14 md:max-h-16 w-auto object-contain" />
            </div>
            <div className="flex items-center justify-center p-4 hover:scale-110 transition-transform duration-300">
              <img src="/src/assets/landingpartners/opmanager.png" alt="OpManager" className="max-h-10 sm:max-h-14 md:max-h-16 w-auto object-contain" />
            </div>
            <div className="flex items-center justify-center p-4 hover:scale-110 transition-transform duration-300">
              <img src="/src/assets/landingpartners/prtg.png" alt="PRTG" className="max-h-10 sm:max-h-14 md:max-h-16 w-auto object-contain" />
            </div>
            <div className="flex items-center justify-center p-4 hover:scale-110 transition-transform duration-300">
              <img src="/src/assets/landingpartners/site24:7.avif" alt="Site24x7" className="max-h-10 sm:max-h-14 md:max-h-16 w-auto object-contain" />
            </div>
            <div className="flex items-center justify-center p-4 hover:scale-110 transition-transform duration-300">
              <img src="/src/assets/landingpartners/Official_SolarWinds_Logo.svg.png" alt="SolarWinds" className="max-h-10 sm:max-h-14 md:max-h-16 w-auto object-contain" />
            </div>
            <div className="flex items-center justify-center p-4 hover:scale-110 transition-transform duration-300">
              <img src="/src/assets/landingpartners/zabbbix.svg" alt="Zabbix" className="max-h-10 sm:max-h-14 md:max-h-16 w-auto object-contain" />
            </div>
            <div className="flex items-center justify-center p-4 hover:scale-110 transition-transform duration-300">
              <img src="/src/assets/landingpartners/Zendesk-Logo.png" alt="Zendesk" className="max-h-10 sm:max-h-14 md:max-h-16 w-auto object-contain" />
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section id="our-services" className="pt-32 pb-24 bg-white">
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
      <section className="py-16 lg:py-32 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
            {/* Left Side - Timeline Cards */}
            <div className="relative order-2 lg:order-1 w-full">
              {/* Carousel Container */}
              <div className="relative overflow-hidden rounded-2xl lg:rounded-3xl">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  {timelineSteps.map((step, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-2 sm:px-4">
                      <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl lg:rounded-2xl border border-gray-100 transition-all duration-700 ease-in-out min-h-[250px] sm:min-h-[300px] lg:min-h-[350px] flex flex-col justify-center relative overflow-hidden group hover:border-[#727CAB]/30">
                        {/* Solid color slide animation - bottom to top */}
                        <div className="absolute inset-0 bg-[#727CAB] transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out"></div>
                        
                        {/* Content with higher z-index */}
                        <div className="relative z-10 text-center group-hover:text-white transition-colors duration-300">
                          <div className="text-3xl sm:text-5xl lg:text-7xl font-black text-[#727CAB] mb-3 sm:mb-6 leading-none group-hover:text-white transition-colors duration-300">{step.number}</div>
                          <h3 className="text-lg sm:text-xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-6 group-hover:text-white transition-colors duration-300">{step.title}</h3>
                          <p className="text-gray-600 leading-relaxed text-sm sm:text-base lg:text-lg group-hover:text-white transition-colors duration-300">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center space-x-2 sm:space-x-3 mt-4 sm:mt-6 lg:mt-8">
                {timelineSteps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'bg-[#727CAB] scale-110 lg:scale-125 shadow-lg'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="space-y-6 lg:space-y-8 order-1 lg:order-2 w-full max-w-full">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 leading-tight">
                  Get Enterprise Grade Monitoring in{" "}
                  <span style={{ color: '#727CAB' }}>Days, Not Months</span>
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
                  Our streamlined process gets your infrastructure monitored professionally in record time.
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-3 md:space-x-4 space-y-3 sm:space-y-0">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-[#727CAB] rounded-full flex items-center justify-center mx-auto sm:mx-0">
                    <span className="text-white font-bold text-base sm:text-lg md:text-xl">01</span>
                  </div>
                  <div className="text-center sm:text-left max-w-full">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2">Assess & Onboard</h3>
                    <p className="text-gray-600 text-sm sm:text-base">Quick infrastructure analysis and seamless integration.</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-3 md:space-x-4 space-y-3 sm:space-y-0">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-[#727CAB] rounded-full flex items-center justify-center mx-auto sm:mx-0">
                    <span className="text-white font-bold text-base sm:text-lg md:text-xl">02</span>
                  </div>
                  <div className="text-center sm:text-left max-w-full">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2">Monitor & Detect</h3>
                    <p className="text-gray-600 text-sm sm:text-base">24/7 surveillance with intelligent alert systems.</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-3 md:space-x-4 space-y-3 sm:space-y-0">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-[#727CAB] rounded-full flex items-center justify-center mx-auto sm:mx-0">
                    <span className="text-white font-bold text-base sm:text-lg md:text-xl">03</span>
                  </div>
                  <div className="text-center sm:text-left max-w-full">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2">Resolve & Optimize</h3>
                    <p className="text-gray-600 text-sm sm:text-base">Swift incident response and continuous improvement.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 sm:pt-6 flex justify-center sm:justify-start">
                <Button 
                  size="lg" 
                  className="bg-[#727CAB] hover:bg-[#5a6b99] text-white px-3 sm:px-4 md:px-8 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-semibold rounded-full w-full sm:w-auto max-w-[280px] md:max-w-xs"
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
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-black">MSP</span>{" "}
              <span style={{ color: '#727CAB' }}>Partnership</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
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
            <a href="#contact-section">
              <Button 
                size="lg" 
                className="bg-[#727CAB] hover:bg-[#5a6b99] text-white px-10 py-5 text-lg font-semibold rounded-full"
              >
                Become a Partner
              </Button>
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* 24/7 NOC Monitoring Introduction */}
      <section id="noc-monitoring" className="pt-32 pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-10">
              <span className="text-black">24/7</span>{" "}
              <span style={{ color: '#727CAB' }}>NOC Monitoring Services</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
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

      {/* NOC Services Pricing Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-black">NOC Services</span>{" "}
              <span style={{ color: '#727CAB' }}>Pricing</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive Network Operations Center services with flexible plans designed to meet your infrastructure needs. Scale from basic monitoring to advanced enterprise support.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Basic Plan */}
              <div className="bg-white rounded-2xl shadow-lg border-2 border-[#727CAB] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                <div className="p-8 flex-1 flex flex-col">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Basic Plan</h3>
                    <div className="text-4xl font-bold text-[#727CAB] mb-2">
                      $4<span className="text-lg font-normal text-gray-600">/month per device</span>
                    </div>
                    <p className="text-gray-600 text-sm">Essential monitoring and alerting</p>
                  </div>
                  
                  <div className="space-y-4 flex-1">
                    <h4 className="font-semibold text-gray-900 mb-3">Core Features</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#727CAB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-[#727CAB] rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">Alerting</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#727CAB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-[#727CAB] rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">Reporting</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#727CAB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-[#727CAB] rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">Monitoring</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="mt-auto pt-8">
                    <Button className="w-full bg-[#727CAB] hover:bg-[#5a6b99] text-white px-6 py-3 font-semibold rounded-xl transition-colors">
                      Start Free Trial
                    </Button>
                  </div>
                </div>
              </div>

              {/* Standard Plan */}
              <div className="bg-white rounded-2xl shadow-lg border-2 border-[#727CAB] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden flex flex-col h-full">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#727CAB]/10 rounded-full -translate-y-12 translate-x-12"></div>
                <div className="relative z-10 p-8 flex-1 flex flex-col">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Standard Plan</h3>
                    <div className="text-4xl font-bold text-[#727CAB] mb-2">
                      $20<span className="text-lg font-normal text-gray-600">/month per device</span>
                    </div>
                    <p className="text-gray-600 text-sm">Comprehensive support and management</p>
                  </div>
                  
                  <div className="space-y-4 flex-1">
                    <h4 className="font-semibold text-gray-900 mb-3">All Basic Features Plus:</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#727CAB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-[#727CAB] rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">L1 Support</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#727CAB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-[#727CAB] rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">L2 Support</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#727CAB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-[#727CAB] rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">Root Cause Analysis (RCA)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#727CAB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-[#727CAB] rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">Remote Support</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#727CAB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-[#727CAB] rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">Patch Management</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#727CAB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-[#727CAB] rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">Mobile Device Management (MDM)</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="mt-auto pt-8">
                    <Button className="w-full bg-[#727CAB] hover:bg-[#5a6b99] text-white px-6 py-3 font-semibold rounded-xl transition-colors">
                      Start Free Trial
                    </Button>
                  </div>
                </div>
              </div>

              {/* Advanced Plan */}
              <div className="bg-white rounded-2xl shadow-lg border-2 border-[#727CAB] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                <div className="p-8 flex-1 flex flex-col">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Advanced Plan</h3>
                    <div className="text-4xl font-bold text-[#727CAB] mb-2">
                      Custom<span className="text-lg font-normal text-gray-600"></span>
                    </div>
                    <p className="text-gray-600 text-sm">Enterprise-grade comprehensive support</p>
                  </div>
                  
                  <div className="space-y-4 flex-1">
                    <h4 className="font-semibold text-gray-900 mb-3">All Standard Features Plus:</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#727CAB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-[#727CAB] rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">L3 Support</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#727CAB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-[#727CAB] rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">Detailed Root Cause Analysis</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#727CAB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-[#727CAB] rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">Security Information and Event Management (SIEM)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#727CAB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-[#727CAB] rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">Tier 3 Support</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#727CAB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-[#727CAB] rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">24/7 IT Support</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#727CAB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-[#727CAB] rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">Event Log Management</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="mt-auto pt-8">
                    <a href="#contact-section">
                      <Button className="w-full bg-[#727CAB] hover:bg-[#5a6b99] text-white px-6 py-3 font-semibold rounded-xl transition-colors">
                        Contact Sales
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-12">
              <p className="text-gray-600 mb-6">
                Need help choosing the right plan? 
                <span className="text-[#727CAB] font-semibold"> Get a free consultation</span>
              </p>
              <a href="#contact-section">
                <Button 
                  size="lg" 
                  className="bg-[#727CAB] hover:bg-[#5a6b99] text-white px-12 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Schedule Free Consultation
                </Button>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* IT Helpdesk Services Hero Section */}
      <section id="helpdesk" className="relative pt-32 min-h-screen flex items-center bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent"></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}></div>
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900">
                Elevate your
                <br />
                IT operations with
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">avinyaX's premier</span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">IT Helpdesk Services</span>
              </h1>

              {/* Description */}
              <p className="text-lg text-gray-600 mb-8 max-w-xl lg:max-w-none leading-relaxed">
                Our expert team delivers rapid, reliable support to minimize downtime and boost productivity for businesses worldwide.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Get Started for $5/Ticket
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-gray-300 text-gray-700 px-8 py-4 text-lg font-semibold rounded-full bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
                >
                  View Pricing
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center justify-center lg:justify-start gap-8 text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm">24/7 Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">99.9% Uptime</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm">15-min Response</span>
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
                  src="/src/assets/5138237.jpg" 
                  alt="IT Helpdesk Services"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose avinyaX */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-black">Why Choose </span>
              <span style={{ color: '#727CAB' }}>avinyaX?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              avinyaX stands out with 24/7 multilingual support, AI-driven triage, and a proven 95% first-contact resolution rate, inspired by leaders like Freshworks and Zoho.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Lightning-Fast Resolutions */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#727CAB]/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#727CAB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Lightning-Fast Resolutions</h3>
              <p className="text-gray-600 mb-4">Average response under 15 minutes, resolving 80% of tickets on first contact via remote access and automation.</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-700">15-minute response guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-700">80% first-contact resolution</span>
                </div>
              </div>
            </div>

            {/* Scalable & Flexible */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#727CAB]/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#727CAB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Scalable & Flexible</h3>
              <p className="text-gray-600 mb-4">Pay only per ticket—no user fees—perfect for startups to enterprises, with seamless scaling.</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-700">Per-ticket pricing model</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-700">Scale from startup to enterprise</span>
                </div>
              </div>
            </div>

            {/* Proactive Monitoring */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#727CAB]/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#727CAB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Proactive Monitoring</h3>
              <p className="text-gray-600 mb-4">Prevent issues with real-time alerts, knowledge base self-service, and custom SLAs.</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-700">Real-time issue prevention</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-700">Custom SLA configurations</span>
                </div>
              </div>
            </div>

            {/* Secure & Compliant */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#727CAB]/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#727CAB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Secure & Compliant</h3>
              <p className="text-gray-600 mb-4">GDPR, HIPAA-ready with encrypted sessions and detailed audit logs.</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-700">GDPR & HIPAA compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-700">End-to-end encryption</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="pt-32 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-black">Our </span>
              <span style={{ color: '#727CAB' }}>Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              avinyaX delivers comprehensive IT helpdesk outsourcing solutions, from basic user support to advanced enterprise infrastructure management. Our multi-tiered approach ensures rapid resolution and maximum uptime for your business.
            </p>
          </AnimatedSection>

          {/* Core Support Tiers */}
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Multi-Tiered Support Levels</h3>
            <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
              Our structured support tiers ensure that every issue is routed to the right expertise level, optimizing resolution times and costs while maintaining quality standards.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Level 1 */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#727CAB]/10 rounded-full flex items-center justify-center">
                    <span className="text-[#727CAB] font-bold">L1</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">Basic Support</h4>
                </div>
                <p className="text-gray-600 mb-4 text-sm">First-line resolution for common user issues and requests</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-[#00BFFF] mt-1">•</span>
                    <span className="text-gray-700">Password resets and account unlock requests</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00BFFF] mt-1">•</span>
                    <span className="text-gray-700">Software installation, configuration, and updates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00BFFF] mt-1">•</span>
                    <span className="text-gray-700">Email client setup and troubleshooting (Outlook, Gmail, etc.)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00BFFF] mt-1">•</span>
                    <span className="text-gray-700">Basic hardware diagnostics and peripheral connectivity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00BFFF] mt-1">•</span>
                    <span className="text-gray-700">Network connectivity issues and Wi-Fi troubleshooting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00BFFF] mt-1">•</span>
                    <span className="text-gray-700">Printer setup and basic printing issues</span>
                  </li>
                </ul>
              </div>

              {/* Level 2 */}
              <div className="bg-gradient-to-br from-[#727CAB]/5 to-white rounded-2xl p-8 border-2 border-[#727CAB]/20 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#727CAB] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">L2</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">Standard Support</h4>
                </div>
                <p className="text-gray-600 mb-4 text-sm">Advanced troubleshooting and system administration tasks</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-[#00BFFF] mt-1">•</span>
                    <span className="text-gray-700">Network infrastructure troubleshooting and configuration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00BFFF] mt-1">•</span>
                    <span className="text-gray-700">Operating system issues, reinstalls, and system recovery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00BFFF] mt-1">•</span>
                    <span className="text-gray-700">Advanced application configuration and compatibility issues</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00BFFF] mt-1">•</span>
                    <span className="text-gray-700">Mobile device management and BYOD policy enforcement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00BFFF] mt-1">•</span>
                    <span className="text-gray-700">VPN configuration and remote access troubleshooting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00BFFF] mt-1">•</span>
                    <span className="text-gray-700">Active Directory user management and group policies</span>
                  </li>
                </ul>
              </div>

              {/* Level 3 */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#727CAB]/10 rounded-full flex items-center justify-center">
                    <span className="text-[#727CAB] font-bold">L3</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">Advanced Support</h4>
                </div>
                <p className="text-gray-600 mb-4 text-sm">Expert-level resolution for complex infrastructure and security issues</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-[#00BFFF] mt-1">•</span>
                    <span className="text-gray-700">Server administration, troubleshooting, and performance optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00BFFF] mt-1">•</span>
                    <span className="text-gray-700">Cloud services migration, configuration, and management (AWS, Azure, GCP)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00BFFF] mt-1">•</span>
                    <span className="text-gray-700">Cybersecurity incident response and threat mitigation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00BFFF] mt-1">•</span>
                    <span className="text-gray-700">Database administration and performance tuning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00BFFF] mt-1">•</span>
                    <span className="text-gray-700">Virtualization and hyper-converged infrastructure management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00BFFF] mt-1">•</span>
                    <span className="text-gray-700">Vendor escalation management and advanced problem resolution</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Channels */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Multi-Channel Support</h3>
              <p className="text-gray-600 mb-6">Reach us through your preferred communication channel for seamless support experience</p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#727CAB]/10 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#727CAB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email Support</h4>
                    <p className="text-gray-600 text-sm">24/7 email support with automated ticket tracking, SLA monitoring, and detailed resolution documentation</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#727CAB]/10 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#727CAB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Live Chat</h4>
                    <p className="text-gray-600 text-sm">Real-time chat with instant responses, file sharing capabilities, and chat transcript archiving</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#727CAB]/10 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#727CAB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone Support</h4>
                    <p className="text-gray-600 text-sm">Dedicated toll-free support line with call routing, queue management, and callback options</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#727CAB]/10 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#727CAB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Portal Ticketing</h4>
                    <p className="text-gray-600 text-sm">Web-based ticket submission with priority levels, attachments, and real-time status tracking</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#727CAB]/10 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#727CAB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Remote Desktop</h4>
                    <p className="text-gray-600 text-sm">Secure remote access with screen sharing, session recording, and multi-platform support</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#727CAB]/5 to-white rounded-2xl p-8 border-2 border-[#727CAB]/20">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Self-Service Knowledge Base</h4>
              <p className="text-gray-600 mb-6">Comprehensive documentation and AI-powered search for instant answers</p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#00BFFF]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                  <span className="text-gray-700">500+ detailed troubleshooting guides</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#00BFFF]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                  <span className="text-gray-700">Video tutorials and step-by-step guides</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#00BFFF]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                  <span className="text-gray-700">FAQ database with smart search functionality</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#00BFFF]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                  <span className="text-gray-700">Community forums and peer support</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>AI-Powered Search:</strong> Our intelligent search system understands natural language queries and provides instant, relevant solutions from our comprehensive knowledge base.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Table */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-black">Key </span>
              <span style={{ color: '#727CAB' }}>Features</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Powered by cutting-edge tools for efficiency, mirroring top providers like Zendesk and HappyFox.
            </p>
          </AnimatedSection>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#727CAB] text-white">
                  <tr>
                    <th className="text-left p-4 font-semibold">Feature</th>
                    <th className="text-left p-4 font-semibold">Description</th>
                    <th className="text-left p-4 font-semibold">Benefit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#727CAB]/10 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-[#727CAB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                        <span className="font-semibold text-gray-900">AI Ticket Triage</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-700">Auto-categorize, prioritize, suggest fixes</td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                        40% faster handling
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#727CAB]/10 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-[#727CAB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                          </svg>
                        </div>
                        <span className="font-semibold text-gray-900">Omnichannel Inbox</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-700">Unified email/chat/phone/social</td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                        No missed queries
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#727CAB]/10 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-[#727CAB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <span className="font-semibold text-gray-900">Custom SLAs & Reporting</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-700">Real-time dashboards, CSAT surveys</td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                        Data-driven improvements
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#727CAB]/10 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-[#727CAB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <span className="font-semibold text-gray-900">Knowledge Base</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-700">Searchable FAQs, videos</td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                        30% ticket deflection
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#727CAB]/10 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-[#727CAB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <span className="font-semibold text-gray-900">Remote Access</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-700">Secure screen sharing</td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                        Instant resolutions
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans for IT Helpdesk Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-black">IT Helpdesk Services</span>{" "}
              <span style={{ color: '#727CAB' }}>Pricing</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              At Xorvo, our IT Helpdesk services are tailored to keep your IT operations running smoothly, no matter the scale of your operations. We offer flexible per-ticket pricing with a free trial available to get started.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Basic Support Plan */}
              <div className="bg-white rounded-2xl shadow-lg border-2 border-[#727CAB] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                <div className="p-8 flex-1 flex flex-col">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Basic Support</h3>
                    <div className="text-4xl font-bold text-[#727CAB] mb-2">
                      $5<span className="text-lg font-normal text-gray-600">/ticket per month</span>
                    </div>
                    <p className="text-gray-600 text-sm">Small teams with simple support needs</p>
                  </div>
                  
                  <div className="space-y-4 flex-1">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#727CAB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-[#727CAB] rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">Level 1 support for basic issues</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#727CAB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-[#727CAB] rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">Email and chat support</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#727CAB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-[#727CAB] rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">24/7 response under 30 minutes</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#727CAB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-[#727CAB] rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">Basic reporting and analytics</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="mt-auto pt-8">
                    <Button className="w-full bg-[#727CAB] hover:bg-[#5a6b99] text-white px-6 py-3 font-semibold rounded-xl transition-colors">
                      Start Free Trial
                    </Button>
                  </div>
                </div>
              </div>

              {/* Standard Support Plan */}
              <div className="bg-white rounded-2xl shadow-lg border-2 border-[#727CAB] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden flex flex-col h-full">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#727CAB]/10 rounded-full -translate-y-12 translate-x-12"></div>
                <div className="relative z-10 p-8 flex-1 flex flex-col">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Standard Support</h3>
                    <div className="text-4xl font-bold text-[#727CAB] mb-2">
                      $20<span className="text-lg font-normal text-gray-600">/ticket per month</span>
                    </div>
                    <p className="text-gray-600 text-sm">Growing businesses with advanced needs</p>
                  </div>
                  
                  <div className="space-y-4 flex-1">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#727CAB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-[#727CAB] rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">All Basic features plus Level 2/3 support</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#727CAB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-[#727CAB] rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">Remote desktop assistance</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#727CAB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-[#727CAB] rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">AI-powered ticket triage</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#727CAB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-[#727CAB] rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">Custom SLAs and reporting</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#727CAB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-[#727CAB] rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">Full analytics dashboard</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="mt-auto pt-8">
                    <Button className="w-full bg-[#727CAB] hover:bg-[#5a6b99] text-white px-6 py-3 font-semibold rounded-xl transition-colors">
                      Start Free Trial
                    </Button>
                  </div>
                </div>
              </div>

              {/* Enterprise Support Plan */}
              <div className="bg-white rounded-2xl shadow-lg border-2 border-[#727CAB] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                <div className="p-8 flex-1 flex flex-col">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise Support</h3>
                    <div className="text-4xl font-bold text-[#727CAB] mb-2">
                      Custom<span className="text-lg font-normal text-gray-600"></span>
                    </div>
                    <p className="text-gray-600 text-sm">High-volume/complex support requirements</p>
                  </div>
                  
                  <div className="space-y-4 flex-1">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#727CAB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-[#727CAB] rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">24/7 dedicated support agents</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#727CAB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-[#727CAB] rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">Proactive monitoring and prevention</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#727CAB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-[#727CAB] rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">Custom integrations and workflows</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#727CAB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-[#727CAB] rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">White-label options available</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#727CAB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-[#727CAB] rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">Advanced analytics and compliance</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#727CAB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-[#727CAB] rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">Scalable for large teams</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#727CAB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-[#727CAB] rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">Bespoke solutions</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="mt-auto pt-8">
                    <a href="#contact-section">
                      <Button className="w-full bg-[#727CAB] hover:bg-[#5a6b99] text-white px-6 py-3 font-semibold rounded-xl transition-colors">
                        Contact Sales
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-12">
              <p className="text-gray-600 mb-6">
                Not sure which plan is right for you? 
                <span className="text-[#727CAB] font-semibold"> Get a free consultation</span>
              </p>
              <a href="#contact-section">
                <Button 
                  size="lg" 
                  className="bg-[#727CAB] hover:bg-[#5a6b99] text-white px-12 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Schedule Free Consultation
                </Button>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Introduction to RMM Services */}
      <section id="rmm" className="pt-32 pb-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-black">Introduction to </span>
              <span style={{ color: '#727CAB' }}>RMM Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              XORVO Technologies delivers comprehensive Remote Monitoring and Management (RMM) services through avinyaX.com, empowering businesses with proactive IT oversight and automation. These services enable remote access, real-time monitoring, and efficient issue resolution to minimize downtime and optimize performance.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-black">Key </span>
              <span style={{ color: '#727CAB' }}>Features</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Advanced capabilities that ensure your IT infrastructure runs smoothly and securely.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Real-Time Monitoring */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-[#727CAB]/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#727CAB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Real-Time Monitoring and Alerts</h3>
              <p className="text-gray-600 leading-relaxed">
                Continuous surveillance of endpoints, servers, and networks with instant notifications for anomalies, preventing issues before they escalate.
              </p>
            </div>

            {/* Automated Patch Management */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-[#727CAB]/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#727CAB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Automated Patch Management</h3>
              <p className="text-gray-600 leading-relaxed">
                Seamless deployment of software updates and security patches across devices, reducing vulnerabilities without manual intervention.
              </p>
            </div>

            {/* Remote Access */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-[#727CAB]/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#727CAB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Remote Access and Control</h3>
              <p className="text-gray-600 leading-relaxed">
                Secure, instant access to client systems for troubleshooting, remediation, and maintenance, eliminating need for on-site visits.
              </p>
            </div>

            {/* Scripting and Automation */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-[#727CAB]/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#727CAB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Scripting and Automation</h3>
              <p className="text-gray-600 leading-relaxed">
                Custom scripts for routine tasks like backups, configurations, and policy enforcement, boosting operational efficiency.
              </p>
            </div>

            {/* Reporting and Analytics */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-[#727CAB]/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#727CAB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Reporting and Analytics</h3>
              <p className="text-gray-600 leading-relaxed">
                Detailed dashboards and customizable reports on system health, compliance, and performance metrics for informed decision-making.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-black">Business </span>
              <span style={{ color: '#727CAB' }}>Benefits</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Transform your IT operations with measurable improvements in efficiency and cost savings.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#727CAB] mb-2">40%</div>
              <p className="text-gray-600 font-medium mb-2">Reduction in Manual Workloads</p>
              <p className="text-gray-500 text-sm">IT teams focus on strategic growth initiatives</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#00BFFF] mb-2">99.9%</div>
              <p className="text-gray-600 font-medium mb-2">Enhanced Uptime</p>
              <p className="text-gray-500 text-sm">Proactive monitoring prevents downtime</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#727CAB] mb-2">100%</div>
              <p className="text-gray-600 font-medium mb-2">Compliance Assurance</p>
              <p className="text-gray-500 text-sm">Automated policy enforcement</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#00BFFF] mb-2">60%</div>
              <p className="text-gray-600 font-medium mb-2">Cost Savings</p>
              <p className="text-gray-500 text-sm">Fewer truck rolls and optimized resources</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-black">How It </span>
              <span style={{ color: '#727CAB' }}>Works</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Simple deployment with powerful automation and expert support.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#727CAB]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-[#727CAB]">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Agent Deployment</h3>
              <p className="text-gray-600 leading-relaxed">
                Our RMM deploys lightweight agents on your devices for seamless integration with minimal system impact.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#727CAB]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-[#727CAB]">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">24/7 Monitoring</h3>
              <p className="text-gray-600 leading-relaxed">
                The platform monitors continuously, triggers automated responses, and escalates complex issues to our expert technicians.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#727CAB]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-[#727CAB]">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Self-Service Portal</h3>
              <p className="text-gray-600 leading-relaxed">
                Clients access real-time insights with customizable alerts tailored to your infrastructure needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose XORVO */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-black">Why Choose </span>
              <span style={{ color: '#727CAB' }}>XORVO</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Expertise, innovation, and proven results make us the ideal RMM partner.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200">
              <div className="w-12 h-12 bg-[#727CAB]/10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#727CAB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">AI-Powered Analytics</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Advanced AI integration for predictive maintenance and intelligent automation.
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200">
              <div className="w-12 h-12 bg-[#727CAB]/10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#727CAB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Scalable Solutions</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                From startups to enterprises, our RMM scales with your business growth.
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200">
              <div className="w-12 h-12 bg-[#727CAB]/10 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#727CAB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">24/7 NOC Support</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Round-the-clock Network Operations Center support for critical issues.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RMM Pricing Plans */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-black">RMM </span>
              <span style={{ color: '#727CAB' }}>Pricing Plans</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              XORVO Technologies offers flexible RMM pricing tailored to businesses of all sizes, starting at $20 per endpoint. Choose from three tiers—Basic, Pro, and Custom—for proactive IT management that fits your needs and budget.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Basic Plan */}
              <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                <div className="p-8 flex-1 flex flex-col">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Basic Plan</h3>
                    <div className="text-4xl font-bold text-[#727CAB] mb-2">
                      $20<span className="text-lg font-normal text-gray-600">/endpoint/month</span>
                    </div>
                    <p className="text-gray-600 text-sm">Ideal for small teams needing essential monitoring without complexity</p>
                  </div>
                  
                  <div className="space-y-4 flex-1">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#727CAB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-[#727CAB] rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">Real-time system monitoring and alerts for uptime assurance</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#727CAB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-[#727CAB] rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">Basic patch management for critical security updates</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#727CAB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-[#727CAB] rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">Remote access for quick troubleshooting</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#727CAB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-[#727CAB] rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">Standard reporting dashboards</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#727CAB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-[#727CAB] rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">Email support during business hours</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="mt-auto pt-8">
                    <Button className="w-full bg-[#727CAB] hover:bg-[#5a6b99] text-white px-6 py-3 font-semibold rounded-xl transition-colors">
                      Get Started
                    </Button>
                  </div>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="bg-gradient-to-br from-[#727CAB]/5 to-white rounded-2xl shadow-lg border-2 border-[#727CAB] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                <div className="relative z-10 p-8 flex-1 flex flex-col">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro Plan</h3>
                    <div className="text-4xl font-bold text-[#727CAB] mb-2">
                      $40<span className="text-lg font-normal text-gray-600">/endpoint/month</span>
                    </div>
                    <p className="text-gray-600 text-sm">Designed for growing businesses requiring advanced automation and support</p>
                  </div>
                  
                  <div className="space-y-4 flex-1">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#727CAB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-[#727CAB] rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">Everything in Basic, plus automated scripting and backups</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#727CAB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-[#727CAB] rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">Advanced analytics and custom reports</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#727CAB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-[#727CAB] rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">24/7 monitoring with priority alerts</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#727CAB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-[#727CAB] rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">Antivirus integration and compliance checks</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#727CAB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-[#727CAB] rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">Phone and chat support with 2-hour response time</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="mt-auto pt-8">
                    <Button className="w-full bg-[#727CAB] hover:bg-[#5a6b99] text-white px-6 py-3 font-semibold rounded-xl transition-colors">
                      Get Started
                    </Button>
                  </div>
                </div>
              </div>

              {/* Custom Plan */}
              <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                <div className="p-8 flex-1 flex flex-col">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Custom Plan</h3>
                    <div className="text-4xl font-bold text-[#727CAB] mb-2">
                      <span className="text-lg font-normal text-gray-600">Enterprise Pricing</span>
                    </div>
                    <p className="text-gray-600 text-sm">Fully customizable for large-scale or specialized deployments</p>
                  </div>
                  
                  <div className="space-y-4 flex-1">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#727CAB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-[#727CAB] rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">All Pro features, scaled to your infrastructure</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#727CAB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-[#727CAB] rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">AI-driven predictive maintenance and custom integrations</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#727CAB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-[#727CAB] rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">Dedicated account manager and NOC support</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#727CAB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-[#727CAB] rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">Multi-tenant management for MSPs</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#727CAB]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-[#727CAB] rounded-full"></div>
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">On-site audits and bespoke SLAs—contact us for a quote</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="mt-auto pt-8">
                    <a href="#contact-section">
                      <Button className="w-full bg-[#727CAB] hover:bg-[#5a6b99] text-white px-6 py-3 font-semibold rounded-xl transition-colors">
                        Contact Sales
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Comparison Table */}
            <div className="mt-12 bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#727CAB] text-white">
                    <tr>
                      <th className="text-left p-4 font-semibold">Feature</th>
                      <th className="text-center p-4 font-semibold">Basic ($20)</th>
                      <th className="text-center p-4 font-semibold">Pro ($40)</th>
                      <th className="text-center p-4 font-semibold">Custom</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-medium text-gray-900">Real-Time Monitoring</td>
                      <td className="p-4 text-center text-green-600 font-bold">✓</td>
                      <td className="p-4 text-center text-green-600 font-bold">✓</td>
                      <td className="p-4 text-center text-green-600 font-bold">✓</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-medium text-gray-900">Patch Management</td>
                      <td className="p-4 text-center text-gray-600">Basic</td>
                      <td className="p-4 text-center text-gray-600">Advanced</td>
                      <td className="p-4 text-center text-green-600 font-bold">Full</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-medium text-gray-900">Remote Access</td>
                      <td className="p-4 text-center text-green-600 font-bold">✓</td>
                      <td className="p-4 text-center text-green-600 font-bold">✓</td>
                      <td className="p-4 text-center text-green-600 font-bold">✓</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-medium text-gray-900">Automation/Scripts</td>
                      <td className="p-4 text-center text-red-500 font-bold">✗</td>
                      <td className="p-4 text-center text-green-600 font-bold">✓</td>
                      <td className="p-4 text-center text-green-600 font-bold">✓</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-medium text-gray-900">24/7 Support</td>
                      <td className="p-4 text-center text-red-500 font-bold">✗</td>
                      <td className="p-4 text-center text-green-600 font-bold">✓</td>
                      <td className="p-4 text-center text-green-600 font-bold">✓</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-medium text-gray-900">AI Analytics</td>
                      <td className="p-4 text-center text-red-500 font-bold">✗</td>
                      <td className="p-4 text-center text-red-500 font-bold">✗</td>
                      <td className="p-4 text-center text-green-600 font-bold">✓</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-medium text-gray-900">Dedicated Manager</td>
                      <td className="p-4 text-center text-red-500 font-bold">✗</td>
                      <td className="p-4 text-center text-red-500 font-bold">✗</td>
                      <td className="p-4 text-center text-green-600 font-bold">✓</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-12">
              <p className="text-gray-600 mb-6">
                Ready to transform your IT management? 
                <span className="text-[#727CAB] font-semibold"> Get a free assessment</span>
              </p>
              <Button 
                size="lg" 
                className="bg-[#727CAB] hover:bg-[#5a6b99] text-white px-12 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Contact XORVO Technologies
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Cost & Savings Calculator */}
      <section id="calculator" className="pt-32 pb-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-black">Cost & </span>
              <span style={{ color: '#727CAB' }}>Savings Calculator</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Select a service below to calculate costs and potential savings with our integrated IT solutions.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="grid lg:grid-cols-3 min-h-[600px]">
                {/* Left Sidebar - Service Selection */}
                <div className="bg-[#727CAB] p-6 lg:p-8 border-r border-gray-200">
                  <h3 className="text-xl font-bold text-white mb-6">Select Service</h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => setSelectedCalculator('noc')}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-300 ${
                        selectedCalculator === 'noc'
                          ? 'border-white bg-white shadow-md'
                          : 'border-white/30 bg-white/10 hover:border-white/60 hover:bg-white/20'
                      }`}
                    >
                      <div className="flex items-center mb-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                          selectedCalculator === 'noc' ? 'bg-[#727CAB] text-white' : 'bg-white/20 text-white'
                        }`}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <h4 className={`font-semibold ${selectedCalculator === 'noc' ? 'text-[#727CAB]' : 'text-white'}`}>NOC Services</h4>
                      </div>
                      <p className={`text-sm ${selectedCalculator === 'noc' ? 'text-gray-700' : 'text-white/80'}`}>24/7 Network Operations Center</p>
                    </button>

                    <button
                      onClick={() => setSelectedCalculator('helpdesk')}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-300 ${
                        selectedCalculator === 'helpdesk'
                          ? 'border-white bg-white shadow-md'
                          : 'border-white/30 bg-white/10 hover:border-white/60 hover:bg-white/20'
                      }`}
                    >
                      <div className="flex items-center mb-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                          selectedCalculator === 'helpdesk' ? 'bg-[#727CAB] text-white' : 'bg-white/20 text-white'
                        }`}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </div>
                        <h4 className={`font-semibold ${selectedCalculator === 'helpdesk' ? 'text-[#727CAB]' : 'text-white'}`}>IT Help Desk</h4>
                      </div>
                      <p className={`text-sm ${selectedCalculator === 'helpdesk' ? 'text-gray-700' : 'text-white/80'}`}>Per-ticket & user-based support</p>
                    </button>

                    <button
                      onClick={() => setSelectedCalculator('rmm')}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-300 ${
                        selectedCalculator === 'rmm'
                          ? 'border-white bg-white shadow-md'
                          : 'border-white/30 bg-white/10 hover:border-white/60 hover:bg-white/20'
                      }`}
                    >
                      <div className="flex items-center mb-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                          selectedCalculator === 'rmm' ? 'bg-[#727CAB] text-white' : 'bg-white/20 text-white'
                        }`}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                        <h4 className={`font-semibold ${selectedCalculator === 'rmm' ? 'text-[#727CAB]' : 'text-white'}`}>RMM Services</h4>
                      </div>
                      <p className={`text-sm ${selectedCalculator === 'rmm' ? 'text-gray-700' : 'text-white/80'}`}>Remote monitoring & management</p>
                    </button>
                  </div>
                </div>

                {/* Right Side - Calculator Drawer */}
                <div className="lg:col-span-2 p-6 lg:p-8">
                  {selectedCalculator === 'noc' && (
                    <div className="animate-in slide-in-from-right duration-300">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-[#727CAB] rounded-full flex items-center justify-center mr-4">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">NOC Services Calculator</h3>
                          <p className="text-gray-600">Calculate costs for 24/7 Network Operations Center monitoring</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                            <span className="w-2 h-2 bg-[#727CAB] rounded-full mr-2"></span>
                            Select Plan
                          </label>
                          <select
                            value={nocPlan}
                            onChange={handleNocPlanChange}
                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#727CAB] focus:border-[#727CAB] bg-white shadow-sm hover:border-[#727CAB]/50 transition-colors text-black"
                          >
                            <option value="">Choose Plan</option>
                            <option value="basic">Basic - $4/device/month (24/7)</option>
                            <option value="standard">Standard - From $20/device/month</option>
                            <option value="advanced">Advanced - Custom Pricing</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                            <span className="w-2 h-2 bg-[#727CAB] rounded-full mr-2"></span>
                            Number of Devices
                          </label>
                          <input
                            type="number"
                            min="0"
                            value={nocDevices || ''}
                            onChange={handleNocDevicesChange}
                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#727CAB] focus:border-[#727CAB] bg-white shadow-sm hover:border-[#727CAB]/50 transition-colors text-black"
                            placeholder="0"
                          />
                        </div>
                      </div>

                      {nocPlan === 'standard' && (
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                              <span className="w-2 h-2 bg-[#727CAB] rounded-full mr-2"></span>
                              Coverage Hours
                            </label>
                            <select
                              value={nocShift || ''}
                              onChange={handleNocShiftChange}
                              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#727CAB] focus:border-[#727CAB] bg-white shadow-sm hover:border-[#727CAB]/50 transition-colors text-black"
                            >
                              <option value="">Choose Coverage</option>
                              <option value="24x7">24/7 Coverage (720 hrs)</option>
                              <option value="8x5">Business Hours (176 hrs)</option>
                              <option value="8x5_weekend">Business + Weekend (245 hrs)</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                              <span className="w-2 h-2 bg-[#727CAB] rounded-full mr-2"></span>
                              Support Tier
                            </label>
                            <select
                              value={nocTier || ''}
                              onChange={handleNocTierChange}
                              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#727CAB] focus:border-[#727CAB] bg-white shadow-sm hover:border-[#727CAB]/50 transition-colors text-black"
                            >
                              <option value="">Choose Tier</option>
                              <option value="L1">L1 Support (600 tickets/mo)</option>
                              <option value="L2">L2 Support (300 tickets/mo)</option>
                            </select>
                          </div>
                        </div>
                      )}

                      {nocPlan === 'basic' && (
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                              <span className="w-2 h-2 bg-[#727CAB] rounded-full mr-2"></span>
                              Coverage Hours
                            </label>
                            <select
                              value={nocShift || ''}
                              onChange={handleNocShiftChange}
                              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#727CAB] focus:border-[#727CAB] bg-white shadow-sm hover:border-[#727CAB]/50 transition-colors text-black"
                            >
                              <option value="">Choose Coverage</option>
                              <option value="24x7">24/7 Coverage (720 hrs)</option>
                              <option value="8x5">Business Hours (176 hrs)</option>
                              <option value="8x5_weekend">Business + Weekend (245 hrs)</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                              <span className="w-2 h-2 bg-[#727CAB] rounded-full mr-2"></span>
                              Support Tier
                            </label>
                            <select
                              value={nocTier || ''}
                              onChange={handleNocTierChange}
                              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#727CAB] focus:border-[#727CAB] bg-white shadow-sm hover:border-[#727CAB]/50 transition-colors text-black"
                            >
                              <option value="">Choose Tier</option>
                              <option value="L1">L1 Support (600 tickets/mo)</option>
                              <option value="L2">L2 Support (300 tickets/mo)</option>
                            </select>
                          </div>
                        </div>
                      )}

                      <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                          <span className="w-2 h-2 bg-[#727CAB] rounded-full mr-2"></span>
                          SLA Level
                        </label>
                        <select
                          value={nocSla || ''}
                          onChange={handleNocSlaChange}
                          className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#727CAB] focus:border-[#727CAB] bg-white shadow-sm hover:border-[#727CAB]/50 transition-colors text-black"
                        >
                          <option value="">Choose SLA</option>
                          <option value="2hr">2 Hours Response</option>
                          <option value="15min">15 Minutes Response</option>
                        </select>
                        <p className="text-xs text-gray-500 mt-1">
                          15min SLA reduces ticket capacity by 30%
                        </p>
                      </div>

                      <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                          <span className="w-2 h-2 bg-[#727CAB] rounded-full mr-2"></span>
                          Expected Monthly Tickets
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={nocTickets || ''}
                          onChange={handleNocTicketsChange}
                          className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#727CAB] focus:border-[#727CAB] bg-white shadow-sm hover:border-[#727CAB]/50 transition-colors text-black"
                          placeholder="0"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Base capacity: L1 (600 tickets/mo) | L2 (300 tickets/mo)
                        </p>
                      </div>

                      <div className="bg-[#727CAB]/5 rounded-lg p-6 border border-[#727CAB]/20">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-lg font-medium text-gray-700">Monthly Cost:</span>
                          <span className="text-2xl font-bold text-[#727CAB]">
                            {nocPlan === 'advanced' ? (
                              <span className="text-sm text-yellow-600">Custom Quote Required</span>
                            ) : (
                              `$${nocCost.toLocaleString()}`
                            )}
                          </span>
                        </div>
                        {window.nocCalculationBreakdown && nocPlan !== 'advanced' && (
                          <div className="text-sm text-gray-600 space-y-1">
                            <div>Coverage Staff: {window.nocCalculationBreakdown.coverageStaff} engineers</div>
                            <div>Ticket Staff: {window.nocCalculationBreakdown.ticketStaff} engineers</div>
                            <div>Final Staff: {window.nocCalculationBreakdown.finalStaff} engineers</div>
                            <div>Device Cost: ${window.nocCalculationBreakdown.deviceCost.toLocaleString()}</div>
                            <div>Staff Cost: ${window.nocCalculationBreakdown.tierCost.toLocaleString()}</div>
                          </div>
                        )}
                      </div>

                      {nocPlan === 'advanced' && (
                        <div className="mt-4 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
                          <p className="text-sm font-semibold text-yellow-800">Custom Quote Required</p>
                          <p className="text-sm text-yellow-700">Advanced plan includes L3 support, SIEM, custom integrations. Contact sales for pricing.</p>
                        </div>
                      )}
                    </div>
                  )}

                  {selectedCalculator === 'helpdesk' && (
                    <div className="animate-in slide-in-from-right duration-300">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-[#727CAB] rounded-full flex items-center justify-center mr-4">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">IT Help Desk Calculator</h3>
                          <p className="text-gray-600">Calculate costs for per-ticket or user-based IT support</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                            <span className="w-2 h-2 bg-[#727CAB] rounded-full mr-2"></span>
                            Select Plan
                          </label>
                          <select
                            value={helpdeskPlan}
                            onChange={handleHelpdeskPlanChange}
                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#727CAB] focus:border-[#727CAB] bg-white shadow-sm hover:border-[#727CAB]/50 transition-colors text-black"
                          >
                            <option value="">Choose Plan</option>
                            <option value="basic">Basic - $5/ticket</option>
                            <option value="standard">Standard - $20/user/month</option>
                            <option value="custom">Custom - Custom Pricing</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                            <span className="w-2 h-2 bg-[#727CAB] rounded-full mr-2"></span>
                            {helpdeskPlan === 'basic' ? 'Tickets per Month' : 'Number of Users'}
                          </label>
                          <input
                            type="number"
                            min="0"
                            value={helpdeskQuantity || ''}
                            onChange={handleHelpdeskQuantityChange}
                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#727CAB] focus:border-[#727CAB] bg-white shadow-sm hover:border-[#727CAB]/50 transition-colors text-black"
                            placeholder="0"
                          />
                        </div>
                      </div>

                      <div className="bg-[#727CAB]/5 rounded-lg p-6 border border-[#727CAB]/20">
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-medium text-gray-700">Monthly Cost:</span>
                          <span className="text-2xl font-bold text-[#727CAB]">
                            {helpdeskPlan === 'custom' ? (
                              <span className="text-sm text-yellow-600">Custom Quote</span>
                            ) : (
                              `$${helpdeskCost.toLocaleString()}`
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedCalculator === 'rmm' && (
                    <div className="animate-in slide-in-from-right duration-300">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-[#727CAB] rounded-full flex items-center justify-center mr-4">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">RMM Services Calculator</h3>
                          <p className="text-gray-600">Calculate costs for remote monitoring and management</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                            <span className="w-2 h-2 bg-[#727CAB] rounded-full mr-2"></span>
                            Select Plan
                          </label>
                          <select
                            value={rmmPlan}
                            onChange={handleRmmPlanChange}
                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#727CAB] focus:border-[#727CAB] bg-white shadow-sm hover:border-[#727CAB]/50 transition-colors text-black"
                          >
                            <option value="">Choose Plan</option>
                            <option value="basic">Basic - $20/endpoint/month</option>
                            <option value="standard">Standard - $40/endpoint/month</option>
                            <option value="custom">Custom - Custom Pricing</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                            <span className="w-2 h-2 bg-[#727CAB] rounded-full mr-2"></span>
                            Number of Endpoints
                          </label>
                          <input
                            type="number"
                            min="0"
                            value={rmmEndpoints || ''}
                            onChange={handleRmmEndpointsChange}
                            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#727CAB] focus:border-[#727CAB] bg-white shadow-sm hover:border-[#727CAB]/50 transition-colors text-black"
                            placeholder="0"
                          />
                        </div>
                      </div>

                      <div className="bg-[#727CAB]/5 rounded-lg p-6 border border-[#727CAB]/20">
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-medium text-gray-700">Monthly Cost:</span>
                          <span className="text-2xl font-bold text-[#727CAB]">
                            {rmmPlan === 'custom' ? (
                              <span className="text-sm text-yellow-600">Custom Quote</span>
                            ) : (
                              `$${rmmCost.toLocaleString()}`
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {!selectedCalculator && (
                    <div className="flex items-center justify-center h-full text-center">
                      <div>
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Service</h3>
                        <p className="text-gray-600">Choose a service from the left panel to start calculating costs</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Open Source Tool Deployment Service Section */}
      <section id="opensource" className="pt-32 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-black">Open Source Tool</span>{" "}
              <span style={{ color: '#727CAB' }}>Deployment Service</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Deploy enterprise-grade RMM, monitoring, and automation tools at zero licensing cost. We handle everything from selection to optimization, delivering production-ready setups without the hassle.
            </p>
          </AnimatedSection>

          {/* Key Features */}
          <AnimatedSection className="mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What We Offer</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-[#727CAB] rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Expert Tool Selection</h4>
                    <p className="text-gray-700">TacticalRMM, Zabbix, Nagios, MeshCentral - matched to your exact needs</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-[#727CAB] rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Lightning-Fast Deployment</h4>
                    <p className="text-gray-700">One-click Docker/Kubernetes installs on AWS, Azure, or on-premise</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-[#727CAB] rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Custom Configuration</h4>
                    <p className="text-gray-700">Tailored dashboards, alerts, and integrations with your existing systems</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-[#727CAB] rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Enterprise Security</h4>
                    <p className="text-gray-700">Hardened setups with encryption, RBAC, and GDPR/HIPAA compliance</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-[#727CAB] rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Performance Optimization</h4>
                    <p className="text-gray-700">Auto-scaling and continuous tuning for maximum efficiency</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-[#727CAB] rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Team Training</h4>
                    <p className="text-gray-700">Comprehensive docs, video guides, and 30-day support</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Business Benefits */}
          <AnimatedSection className="mb-16">
            <div className="bg-[#727CAB] rounded-2xl shadow-lg p-8 border border-[#727CAB]">
              <h3 className="text-2xl font-bold text-white mb-4">Why Choose Open Source?</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-white/10 rounded-lg border border-white/20">
                  <div className="text-3xl font-bold text-white mb-2">70-90%</div>
                  <p className="text-white/90 font-medium">Cost Savings vs Commercial Tools</p>
                </div>
                <div className="text-center p-6 bg-white/10 rounded-lg border border-white/20">
                  <div className="text-3xl font-bold text-white mb-2">Months → Days</div>
                  <p className="text-white/90 font-medium">Reduced Setup Time</p>
                </div>
                <div className="text-center p-6 bg-white/10 rounded-lg border border-white/20">
                  <div className="text-3xl font-bold text-white mb-2">Zero</div>
                  <p className="text-white/90 font-medium">Vendor Lock-in</p>
                </div>
              </div>
              <p className="text-white/90 leading-relaxed mt-6 text-center">
                Perfect for Delhi firms and global businesses embracing open source innovation
              </p>
            </div>
          </AnimatedSection>

          {/* Process */}
          <AnimatedSection className="mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Process</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#727CAB] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                    1
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Consultation</h4>
                  <p className="text-gray-700 text-sm">Free audit to match solutions to your stack</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#727CAB] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                    2
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Deployment</h4>
                  <p className="text-gray-700 text-sm">Secure setup with staging environment testing</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#727CAB] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                    3
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Integration</h4>
                  <p className="text-gray-700 text-sm">Customization and go-live with minimal disruption</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#727CAB] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                    4
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Support</h4>
                  <p className="text-gray-700 text-sm">Community forums to 24/7 NOC support</p>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-[#727CAB]/10 rounded-lg border border-[#727CAB]/20 text-center">
                <p className="text-gray-700 font-medium text-lg mb-2">Starting at $15/endpoint/month</p>
                <p className="text-gray-600">Project-based pricing also available</p>
              </div>
            </div>
          </AnimatedSection>

          {/* CTA */}
          <AnimatedSection className="text-center">
            <div className="bg-[#727CAB] rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-4">Transform Your IT Operations</h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Visit avinyaX.com for your free assessment and deploy open source excellence today
              </p>
              <button className="bg-white text-[#727CAB] px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors shadow-lg">
                Get Free Assessment
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white" itemScope itemType="https://schema.org/FAQPage">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6" itemProp="name">
              <span className="text-black">Frequently Asked </span>
              <span style={{ color: '#727CAB' }}>Questions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" itemProp="description">
              Find answers to common questions about our IT helpdesk services and how we can help streamline your operations.
            </p>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto space-y-4" itemScope itemType="https://schema.org/FAQ">
            {/* FAQ 1 */}
            <article className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300" itemScope itemType="https://schema.org/Question">
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-[#727CAB]/5 transition-colors group"
                onClick={() => setOpenDrawer(openDrawer === 'faq1' ? null : 'faq1')}
                aria-expanded={openDrawer === 'faq1'}
                aria-controls="faq1-answer"
                itemProp="name"
              >
                <span className="font-semibold text-gray-900 group-hover:text-[#727CAB] transition-colors">What's your response time for IT helpdesk support?</span>
                <svg className={`w-5 h-5 text-gray-500 transition-transform ${openDrawer === 'faq1' ? 'rotate-180' : ''} group-hover:text-[#727CAB]`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openDrawer === 'faq1' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`} id="faq1-answer">
                <div className="px-6 pb-4" itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
                  <p className="text-gray-700 leading-relaxed">We guarantee under 15-minute response times for critical issues and under 1 hour for standard requests. Our 24/7 multilingual support team ensures rapid assistance whenever you need it, with 95% first-contact resolution rate.</p>
                </div>
              </div>
            </article>

            {/* FAQ 2 */}
            <article className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300" itemScope itemType="https://schema.org/Question">
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-[#727CAB]/5 transition-colors group"
                onClick={() => setOpenDrawer(openDrawer === 'faq2' ? null : 'faq2')}
                aria-expanded={openDrawer === 'faq2'}
                aria-controls="faq2-answer"
                itemProp="name"
              >
                <span className="font-semibold text-gray-900 group-hover:text-[#727CAB] transition-colors">How does your per-ticket pricing work?</span>
                <svg className={`w-5 h-5 text-gray-500 transition-transform ${openDrawer === 'faq2' ? 'rotate-180' : ''} group-hover:text-[#727CAB]`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openDrawer === 'faq2' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`} id="faq2-answer">
                <div className="px-6 pb-4" itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
                  <p className="text-gray-700 leading-relaxed">Our transparent pricing model charges only for successfully resolved tickets at $5 each. There are no monthly subscription fees, setup costs, or hidden charges. You only pay when we deliver results.</p>
                </div>
              </div>
            </article>

            {/* FAQ 3 */}
            <article className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300" itemScope itemType="https://schema.org/Question">
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-[#727CAB]/5 transition-colors group"
                onClick={() => setOpenDrawer(openDrawer === 'faq3' ? null : 'faq3')}
                aria-expanded={openDrawer === 'faq3'}
                aria-controls="faq3-answer"
                itemProp="name"
              >
                <span className="font-semibold text-gray-900 group-hover:text-[#727CAB] transition-colors">What integrations do you support?</span>
                <svg className={`w-5 h-5 text-gray-500 transition-transform ${openDrawer === 'faq3' ? 'rotate-180' : ''} group-hover:text-[#727CAB]`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openDrawer === 'faq3' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`} id="faq3-answer">
                <div className="px-6 pb-4" itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
                  <p className="text-gray-700 leading-relaxed">We support seamless integrations with Slack, Microsoft Teams, Jira, Active Directory, and 50+ other enterprise tools. Our team ensures smooth data flow between systems for unified IT management.</p>
                </div>
              </div>
            </article>

            {/* FAQ 4 */}
            <article className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300" itemScope itemType="https://schema.org/Question">
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-[#727CAB]/5 transition-colors group"
                onClick={() => setOpenDrawer(openDrawer === 'faq4' ? null : 'faq4')}
                aria-expanded={openDrawer === 'faq4'}
                aria-controls="faq4-answer"
                itemProp="name"
              >
                <span className="font-semibold text-gray-900 group-hover:text-[#727CAB] transition-colors">Do you offer a free trial?</span>
                <svg className={`w-5 h-5 text-gray-500 transition-transform ${openDrawer === 'faq4' ? 'rotate-180' : ''} group-hover:text-[#727CAB]`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openDrawer === 'faq4' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`} id="faq4-answer">
                <div className="px-6 pb-4" itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
                  <p className="text-gray-700 leading-relaxed">Yes! We offer 10 free support tickets to help you experience our service quality. No credit card required, and you can upgrade to paid plans anytime based on your needs.</p>
                </div>
              </div>
            </article>

            {/* FAQ 5 - New */}
            <article className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300" itemScope itemType="https://schema.org/Question">
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-[#727CAB]/5 transition-colors group"
                onClick={() => setOpenDrawer(openDrawer === 'faq5' ? null : 'faq5')}
                aria-expanded={openDrawer === 'faq5'}
                aria-controls="faq5-answer"
                itemProp="name"
              >
                <span className="font-semibold text-gray-900 group-hover:text-[#727CAB] transition-colors">What industries do you serve?</span>
                <svg className={`w-5 h-5 text-gray-500 transition-transform ${openDrawer === 'faq5' ? 'rotate-180' : ''} group-hover:text-[#727CAB]`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openDrawer === 'faq5' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`} id="faq5-answer">
                <div className="px-6 pb-4" itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
                  <p className="text-gray-700 leading-relaxed">We serve diverse industries including healthcare, finance, education, manufacturing, and retail. Our scalable solutions adapt to your specific compliance requirements and business workflows.</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-bold text-[#727CAB] mb-6">
              Ready to streamline your IT?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Start with Basic at $5/ticket.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a href="#contact-section">
                <Button className="bg-[#727CAB] hover:bg-[#5a6b99] text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                  Contact Sales
                </Button>
              </a>
              <Button className="bg-transparent border-2 border-[#727CAB] text-[#727CAB] hover:bg-[#727CAB] hover:text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300">
                Live Demo
              </Button>
            </div>
            <p className="text-gray-600 text-sm">
              <strong>Limited spots this month.</strong> Get started before our capacity fills up.
            </p>
          </AnimatedSection>
        </div>
      </section>
      
      <ContactSection />
      
      <LandingFooter />
    </div>
  );
}

export default LandingExtension;
