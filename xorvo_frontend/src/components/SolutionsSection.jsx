import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Cloud, Server, Settings, Database, ArrowRight, Users } from "lucide-react";
import { SiCyberdefenders } from "react-icons/si";

// Lazy load ServiceGrid for better performance
const ServiceGrid = lazy(() => import('./ServiceGrid'));

// Loading component for ServiceGrid
const ServiceGridLoader = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 w-full max-w-7xl mx-auto px-4">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="bg-gray-200 animate-pulse rounded-2xl h-80"></div>
    ))}
  </div>
);

const SolutionsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  const solutions = [
    {
      icon: SiCyberdefenders,
      title: "Cybersecurity & VPS Security Solutions",
      subtitle: "Protect. Detect. Respond.",
      description: "Stay ahead of evolving cyber threats with enterprise-grade protection. We secure your network, systems, and data with advanced threat detection, incident response, and continuous monitoring.",
      additionalInfo: "We also deploy open-source and licensed security tools on dedicated VPS environments, ensuring performance, reliability, and cost efficiency.",
      offerings: [
        "Advanced network & endpoint protection",
        "24/7 threat monitoring & incident response",
        "Secure VPS setup, management & hardening",
        "Deployment of open-source or paid security tools"
      ],
      cta: "Keep your business safe, resilient, and compliant.",
      color: "#727CAB",
    },
    {
      icon: Server,
      title: "Hardware & Networking Solutions",
      subtitle: "Build the Backbone of Your IT.",
      description: "We design, deploy, and manage secure, high-performance networks that keep your operations always connected. From desktops and servers to structured cabling, routers, and firewalls — we make your infrastructure fast, scalable, and reliable.",
      additionalInfo: "",
      offerings: [
        "Complete network design & implementation",
        "Hardware setup and lifecycle management",
        "Structured cabling & connectivity solutions",
        "Uptime-driven performance optimization"
      ],
      cta: "Strengthen your IT foundation for seamless operations.",
      color: "#727CAB",
    },
    {
      icon: Cloud,
      title: "Workspace & Cloud Migration",
      subtitle: "Transform the Way You Work.",
      description: "Move to the cloud with confidence. We provide smooth, secure migrations for Microsoft 365, Google Workspace, and Zoho Workplace — ensuring zero downtime and total data integrity.",
      additionalInfo: "Empower your teams to work smarter, collaborate better, and stay connected from anywhere.",
      offerings: [
        "End-to-end cloud migration & configuration",
        "Zero data loss, zero disruption",
        "Optimization for hybrid & remote teams",
        "Expert management for Zoho, Google, & M365"
      ],
      cta: "Simplify your digital transformation journey",
      color: "#727CAB",
    },
    {
      icon: Settings,
      title: "Managed IT Services (MSP)",
      subtitle: "We Manage. You Grow.",
      description: "Focus on your business while we take care of your IT. Our Managed Services deliver 24/7 monitoring, proactive maintenance, and rapid issue resolution to keep your systems running at peak performance.",
      additionalInfo: "",
      offerings: [
        "Continuous infrastructure monitoring",
        "Proactive maintenance & updates",
        "IT deployment & configuration support",
        "Predictable, cost-efficient IT operations"
      ],
      cta: "Achieve maximum uptime and worry-free performance",
      color: "#727CAB",
    },
    {
      icon: Database,
      title: "VPS Setup & Application Deployment",
      subtitle: "Your Cloud. Your Way.",
      description: "We deliver custom VPS environments designed for speed, scalability, and security. From setup to deployment, we handle everything — including the installation of open-source or licensed applications, tools, and business software.",
      additionalInfo: "",
      offerings: [
        "VPS setup, configuration & optimization",
        "Secure hosting for business applications",
        "Deployment of open-source or licensed software",
        "Performance tuning & ongoing monitoring"
      ],
      cta: "Get a VPS solution that grows with your business.",
      color: "#727CAB",
    },
    {
      icon: Users,
      title: "Collaborative Engineering (Cross-Platform Alignment)",
      subtitle: "Integrated. Future-Proof. Optimized.",
      description: "Our team works closely with technology leaders — Fortinet, Cisco, Check Point, Microsoft, AWS, and ServiceNow — to ensure your stack remains integrated and future-proof.",
      additionalInfo: "We align engineering practices across platforms, ensuring compatibility, scalability, and ongoing optimization.",
      offerings: [
        "Cross-platform integration & alignment",
        "Partnership with leading tech vendors",
        "Future-proof architecture design",
        "Continuous optimization & support"
      ],
      cta: "Build a unified, scalable technology ecosystem.",
      color: "#727CAB",
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-8 md:py-12 overflow-hidden">
      {/* Simple Background */}
      <div className="absolute inset-0">
        {/* Background Image Layer */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/arlington-research-kN_kViDchA0-unsplash.jpg)' }}
        ></div>
        {/* Soft Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/70 via-white/70 to-cyan-50/70"></div>
      </div>
      
      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: "'Rostex', 'Arial Black', sans-serif" }}>
              <span className="text-black">WHAT</span> <span className="text-accent">WE DO</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
             Smart Secure Scalable IT Solutions for the Modern Business
            </p>
          </div>

          {/* Solutions Grid */}
          <Suspense fallback={<ServiceGridLoader />}>
            <ServiceGrid services={solutions} />
          </Suspense>

          {/* Explore More Button */}
          <div className="mt-12 text-center">
            <Link to="/services">
              <button className="group inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-accent/30 hover:scale-105">
                <span>Explore More Services</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
