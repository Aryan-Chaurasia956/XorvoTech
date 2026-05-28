import { 
  TowerControl, 
  ShieldCheck, 
  Cloud, 
  BarChart3, 
  ArrowRight 
} from "lucide-react";
import { Link } from "react-router-dom";
import ClientReviewsMarquee from '@/components/ui/marquee-card';
import { ExpandingCards } from '@/components/ui/expanding-cards';

const WhyChooseSection = () => {
  const xorvoReasons = [
    {
      id: "it-integration",
      title: "IT Integration",
      description: "Complete IT infrastructure management with enterprise-grade security. We handle everything from network setup to 24/7 monitoring and maintenance.",
      highlights: ["24/7 System Monitoring", "Enterprise Security", "Seamless Integration"],
      imgSrc: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
      icon: <TowerControl size={28} />,
      linkHref: "#",
    },
    {
      id: "secure-solutions",
      title: "Secure Solutions",
      description: "Scalable cloud solutions that grow with your business. Future-ready architecture ensuring seamless expansion and technological advancement.",
      highlights: ["Auto-Scaling Infrastructure", "Cloud Migration Support", "Zero Downtime Deployment"],
      imgSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      icon: <Cloud size={28} />,
      linkHref: "#",
    },
    {
      id: "expert-services",
      title: "Expert Services",
      description: "Expert cybersecurity protection and advanced networking solutions. Certified professionals safeguard your digital assets with cutting-edge technology.",
      highlights: ["Advanced Threat Protection", "Compliance Management", "Real-time Analytics"],
      imgSrc: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
      icon: <ShieldCheck size={28} />,
      linkHref: "#",
    },
    {
      id: "proven-results",
      title: "Proven Results",
      description: "Proven delivery excellence with maximum ROI guarantee. Minimal downtime, optimized performance, and measurable business results.",
      highlights: ["Performance Optimization", "Cost Efficiency", "Guaranteed Uptime"],
      imgSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      icon: <BarChart3 size={28} />,
      linkHref: "#",
    },
  ];

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-white">
      {/* Subtle decorative background shapes using matching Contact Us purple (#727CAB) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#727CAB]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#727CAB]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#727CAB]" style={{ fontFamily: "'Rostex', sans-serif" }}>
            WHY CHOOSE <span className="text-[#727CAB]/85">XORVO</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-[#727CAB]/70 leading-relaxed font-medium">
            Explore our architectural framework of smarter IT. Hover or click a card to unveil details.
          </p>
        </div>

        {/* Expanding Cards Block */}
        <div className="flex justify-center w-full mb-16">
          <ExpandingCards items={xorvoReasons} defaultActiveIndex={0} />
        </div>

        {/* Call to Action Button */}
        <div className="text-center">
          <Link 
            to="/?contact=true&partner=true" 
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#727CAB] text-white font-semibold shadow-xl shadow-[#727CAB]/20 hover:shadow-2xl hover:shadow-[#727CAB]/30 transition-all duration-500 hover:scale-105 cursor-pointer"
          >
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
              <ArrowRight className="h-3 w-3 text-white" />
            </div>
            <span>Partner with Xorvo Technologies. Power your business with smarter IT.</span>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseSection;
