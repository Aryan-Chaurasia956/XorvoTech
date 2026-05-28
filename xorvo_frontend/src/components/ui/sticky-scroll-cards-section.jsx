import React, { useState, useEffect, useRef } from 'react';

// --- Core Xorvo Services ---
const features = [
  {
    title: "Cybersecurity Services",
    description: "Enterprise-grade digital asset protection. Our specialists provide proactive security awareness, continuous threat scanning, endpoint security, and strict regulatory compliance audits.",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80",
    bgColor: "bg-white",
    textColor: "text-gray-700"
  },
  {
    title: "Cloud & Infrastructure",
    description: "Scalable, future-proof cloud integrations. Migrate with confidence using our multi-cloud deployment setups, secure VPS hosting, and NOC real-time hardware tracking.",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
    bgColor: "bg-[#f4f5fa]",
    textColor: "text-gray-700"
  },
  {
    title: "Managed IT Services",
    description: "Proactive network maintenance and round-the-clock remote helpdesk support. We handle automated patch updates and SLA-guaranteed system optimization.",
    imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&auto=format&fit=crop&q=80",
    bgColor: "bg-white",
    textColor: "text-gray-700"
  },
  {
    title: "Workspace & Collaboration",
    description: "Empower remote workforces with Microsoft 365, Zoho Workspaces, and Google Workspaces. Keep cloud data secure with automated SSO, MFA, and automated backups.",
    imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80",
    bgColor: "bg-[#f4f5fa]",
    textColor: "text-gray-700"
  },
  {
    title: "Data Protection & Compliance",
    description: "Advanced Data Loss Prevention (DLP) protocols and ISO/GDPR compliance audits. Secure business continuity with custom disaster recovery planning and military-grade encryption.",
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80",
    bgColor: "bg-white",
    textColor: "text-gray-700"
  },
  {
    title: "IT Consulting & Deployment",
    description: "Strategic consulting, network topology mapping, CI/CD deployment automation, custom ERP/CRM setups, and GEO search optimization to drive business revenue.",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=80",
    bgColor: "bg-[#f4f5fa]",
    textColor: "text-gray-700"
  }
];

const useScrollAnimation = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
};

const AnimatedHeader = () => {
    const [headerRef, headerInView] = useScrollAnimation();
    const [pRef, pInView] = useScrollAnimation();

    return (
        <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 
                ref={headerRef}
                className={`text-4xl md:text-5xl font-extrabold transition-all duration-700 ease-out text-[#727CAB] ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transformStyle: 'preserve-3d' }}
            >
                OUR STRATEGIC IT SERVICES
            </h2>
            <p 
                ref={pRef}
                className={`text-lg text-gray-600 mt-4 transition-all duration-700 ease-out delay-200 ${pInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transformStyle: 'preserve-3d' }}
            >
                Accelerating business success with smart, automated, and secure enterprise technology layers
            </p>
        </div>
    );
};

export function StickyFeatureSection() {
  return (
    <div className="bg-white font-sans py-20">
      <div className="px-[5%]">
        <div className="max-w-7xl mx-auto">
          <section className="flex flex-col items-center">
            
            <AnimatedHeader />

            <div className="w-full relative">
              {features.map((feature, index) => (
                <div
                    key={index}
                    className={`${feature.bgColor} grid grid-cols-1 md:grid-cols-2 items-center gap-4 md:gap-8 p-8 md:p-12 rounded-3xl mb-16 sticky border border-gray-100/60 shadow-xl`}
                    style={{ top: `${120 + index * 20}px` }}
                >
                  {/* Card Content */}
                  <div className="flex flex-col justify-center">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#727CAB]">{feature.title}</h3>
                    <p className={`${feature.textColor} text-base md:text-lg leading-relaxed`}>{feature.description}</p>
                  </div>
                  
                  {/* Card Image */}
                  <div className="image-wrapper mt-8 md:mt-0 relative h-64 md:h-80 w-full rounded-2xl overflow-hidden shadow-lg border border-gray-200/20">
                    <img 
                        src={feature.imageUrl} 
                        alt={feature.title}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/cccccc/ffffff?text=Image+Not+Found"; }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default StickyFeatureSection;
