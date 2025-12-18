import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { FaShieldAlt, FaServer, FaCloud, FaCogs, FaRocket } from 'react-icons/fa';

const ServiceGrid = ({ services = [], solutions = [] }) => {
  // Use services prop if provided, otherwise use solutions
  const inputData = services.length > 0 ? services : solutions;
  
  // Transform solutions data to match ServiceGrid format
  const transformedServices = inputData.map((solution, index) => ({
    id: index + 1,
    title: solution.title,
    subtitle: solution.subtitle,
    description: solution.description,
    image: generateBackgroundImage(solution.title, solution.color),
    link: "#",
    offerings: solution.offerings || [],
    cta: solution.cta || "Learn More",
    color: solution.color || "#3B82F6",
    icon: solution.icon
  }));

  // Generate background image based on service title and color
  function generateBackgroundImage(title, color = "#3B82F6") {
    const gradients = [
      `linear-gradient(135deg, ${color}20 0%, ${color}40 50%, ${color}60 100%)`,
      `radial-gradient(circle at 30% 70%, ${color}30 0%, transparent 50%), linear-gradient(45deg, ${color}20 0%, ${color}50 100%)`,
      `conic-gradient(from 45deg at 50% 50%, ${color}20 0deg, ${color}40 120deg, ${color}60 240deg, ${color}20 360deg)`,
      `linear-gradient(45deg, ${color}25 25%, transparent 25%), linear-gradient(-45deg, ${color}25 25%, transparent 25%), linear-gradient(45deg, transparent 75%, ${color}25 75%), linear-gradient(-45deg, transparent 75%, ${color}25 75%)`
    ];
    
    return gradients[Math.abs(title.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % gradients.length];
  }

  // Animation variants for better performance
  const cardVariants = {
    hidden: { 
      opacity: 0
    },
    visible: (i) => ({
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: i * 0.1,
        ease: "easeIn"
      }
    })
  };

  // Default services if no solutions provided
  const defaultServices = [
    {
      id: 1,
      title: "Cybersecurity &\nVPS Security Solutions",
      subtitle: "Protect. Detect. Respond.",
      description: "Stay ahead of evolving cyber threats with enterprise-grade protection. We secure your network, systems, and data with advanced threat detection, incident response, and continuous monitoring.",
      image: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 25%, #8b5cf6 50%, #ec4899 75%, #f59e0b 100%)",
      link: "#",
      icon: FaShieldAlt,
      offerings: [
        "Advanced network & endpoint protection",
        "24/7 threat monitoring & incident response", 
        "Secure VPS setup, management & hardening",
        "Deployment of open-source or paid security tools"
      ],
      cta: "Keep your business safe, resilient, and compliant",
      color: "#dc2626"
    },
    {
      id: 2,
      title: "Hardware &\nNetworking Solutions",
      subtitle: "Build the Backbone of Your IT.",
      description: "We design, deploy, and manage secure, high-performance networks that keep your operations always connected. From desktops and servers to structured cabling, routers, and firewalls.",
      image: "radial-gradient(circle at 30% 70%, #1e3a8a30 0%, transparent 50%), linear-gradient(45deg, #1e3a8a20 0%, #1e3a8a50 100%)",
      link: "#",
      icon: FaServer,
      offerings: [
        "Complete network design & implementation",
        "Hardware setup and lifecycle management",
        "Structured cabling & connectivity solutions", 
        "Uptime-driven performance optimization"
      ],
      cta: "Strengthen your IT foundation for seamless operations",
      color: "#1e3a8a"
    },
    {
      id: 3,
      title: "Workspace &\nCloud Migration",
      subtitle: "Transform the Way You Work.",
      description: "Move to the cloud with confidence. We provide smooth, secure migrations for Microsoft 365, Google Workspace, and Zoho Workplace — ensuring zero downtime and total data integrity.",
      image: "conic-gradient(from 45deg at 50% 50%, #0891b220 0deg, #0891b240 120deg, #0891b260 240deg, #0891b220 360deg)",
      link: "#",
      icon: FaCloud,
      offerings: [
        "End-to-end cloud migration & configuration",
        "Zero data loss, zero disruption",
        "Optimization for hybrid & remote teams",
        "Expert management for Zoho, Google, & M365"
      ],
      cta: "Simplify your digital transformation journey",
      color: "#0891b2"
    },
    {
      id: 4,
      title: "Managed IT\nServices (MSP)",
      subtitle: "We Manage. You Grow.",
      description: "Focus on your business while we take care of your IT. Our Managed Services deliver 24/7 monitoring, proactive maintenance, and rapid issue resolution to keep your systems running at peak performance.",
      image: "linear-gradient(45deg, #059669 25 25%, transparent 25%), linear-gradient(-45deg, #059669 25 25%, transparent 25%)",
      link: "#",
      icon: FaCogs,
      offerings: [
        "Continuous infrastructure monitoring",
        "Proactive maintenance & updates",
        "IT deployment & configuration support",
        "Predictable, cost-efficient IT operations"
      ],
      cta: "Achieve maximum uptime and worry-free performance",
      color: "#53629E"
    },
    {
      id: 5,
      title: "VPS Setup &\nApplication Deployment",
      subtitle: "Your Cloud. Your Way.",
      description: "We deliver custom VPS environments designed for speed, scalability, and security. From setup to deployment, we handle everything — including the installation of open-source or licensed applications.",
      image: "radial-gradient(circle at 70% 30%, #7c3aed30 0%, transparent 50%), linear-gradient(135deg, #7c3aed20 0%, #7c3aed50 100%)",
      link: "#",
      icon: FaRocket,
      offerings: [
        "VPS setup, configuration & optimization",
        "Secure hosting for business applications",
        "Deployment of open-source or licensed software",
        "Performance tuning & ongoing monitoring"
      ],
      cta: "Get a VPS solution that grows with your business",
      color: "#7c3aed"
    }
  ];

  const finalServices = transformedServices.length > 0 ? transformedServices : defaultServices;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 lg:gap-32 w-full max-w-7xl mx-auto px-4">
      {finalServices.map((s, i) => (
        <motion.div
          key={s.id}
          custom={i}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={cardVariants}
          className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 transition-all duration-400 hover:shadow-xl hover:-translate-y-1"
          style={{
            boxShadow: `0 8px 24px ${s.color}22`
          }}
        >
          {/* Accent overlays (Talent Hire style) */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(800px 320px at 85% 0%, ${s.color}14 8%, transparent 55%), linear-gradient(135deg, ${s.color}10 6%, transparent 45%)`
            }}
          />
          {/* Top accent stripe covering header area */}
          <div 
            className="absolute top-0 left-0 right-0 h-[96px] md:h-[112px] pointer-events-none"
            style={{
              background: `linear-gradient(180deg, ${s.color} 0%, ${s.color} 70%, transparent 100%)`,
              opacity: 0.16,
              boxShadow: `inset 0 -16px 24px ${s.color}22`
            }}
          />

          {/* Content */}
          <div className="relative z-10 p-6 md:p-7 h-full flex flex-col justify-between min-h-[320px]">
            {/* Header row */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm"
                  style={{ 
                    background: `linear-gradient(135deg, ${s.color}12 0%, transparent 100%)`, 
                    border: `1px solid ${s.color}33`,
                    boxShadow: `0 6px 18px ${s.color}12`
                  }}
                >
                  {s.icon ? (
                    <s.icon className="w-6 h-6" style={{ color: s.color }} />
                  ) : (
                    <div className="w-6 h-6 rounded" style={{ backgroundColor: s.color }} />
                  )}
                </div>
                <div>
                  <h3 className="whitespace-pre-line text-2xl font-bold text-gray-900 leading-tight tracking-tight">
                    {s.title}
                  </h3>
                </div>
              </div>
              {s.subtitle && (
                <span 
                  className="px-3 py-1 rounded-full text-xs font-semibold border inline-flex items-center gap-1.5"
                  style={{
                    background: `linear-gradient(90deg, ${s.color}18, transparent)`,
                    borderColor: `${s.color}33`,
                    color: '#374151'
                  }}
                >
                  <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.color }} />
                  {s.subtitle}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 max-w-[92%]">
              {s.description}
            </p>

            {/* Offerings chips */}
            {s.offerings && s.offerings.length > 0 && (
              <ul className="flex flex-wrap gap-2 mb-5">
                {s.offerings.slice(0, 4).map((offering, idx) => (
                  <li
                    key={idx}
                    className="text-xs px-3 py-1 rounded-full border flex items-center gap-1.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
                    style={{
                      background: `linear-gradient(90deg, ${s.color}14, transparent)`,
                      borderColor: `${s.color}33`,
                      color: '#374151',
                      boxShadow: `0 1px 8px ${s.color}22`
                    }}
                  >
                    <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.color }} />
                    {offering}
                  </li>
                ))}
              </ul>
            )}

            {/* CTA */}
            <div className="mt-auto pt-2">
              <button 
                className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold border transition-all duration-200 hover:-translate-y-0.5"
                style={{ 
                  background: `linear-gradient(90deg, ${s.color}, ${s.color}cc)`, 
                  color: '#ffffff', 
                  borderColor: `${s.color}`,
                  boxShadow: `0 8px 20px ${s.color}33`
                }}
              >
                {s.cta}
                <ArrowRight className="ml-2 w-4 h-4" style={{ color: '#fff' }} />
              </button>
            </div>
          </div>
          {/* Subtle shimmer on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ServiceGrid;