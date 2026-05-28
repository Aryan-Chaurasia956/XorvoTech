import { useEffect, useState, useRef } from "react";
import AnimatedCounter from "./AnimatedCounter";
import LazyImage from "./LazyImage";
import techPattern from "@/assets/tech-pattern.jpg";

const TeamSportSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* Background with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(220,45%,12%)] to-[hsl(220,50%,15%)] z-0"></div>
      
      {/* Animated Pattern Overlay */}
      <div className="absolute inset-0 z-0 opacity-10">
        <LazyImage
          src={techPattern}
          alt="Technology Pattern"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text and CTA */}
            <div 
              className={`space-y-6 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ fontFamily: "'Rostex', 'Arial Black', sans-serif" }}>
                Cybersecurity is a{" "}
                <span className="text-accent">Team Sport</span>
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                With 250 integrations, more than 1,500 MSP and channel partners,
                20 alliance partners, and a community of insurance brokers,
                carriers and law firms, Arctic Wolf is committed to helping you bring your
                risk down to zero.
              </p>

              <div className="pt-4">
                <button className="px-8 py-3 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-md transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/50">
                  LEARN HOW HERE
                </button>
              </div>
            </div>

            {/* Right Side - Stats Card with Gradient */}
            <div 
              className={`transition-all duration-1000 delay-300 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
              <div className="relative rounded-2xl overflow-hidden backdrop-blur-sm border border-accent/20 p-12">
                {/* Gradient Background - Blue to Orange */}
                <div className="absolute inset-0 bg-gradient-to-br from-[hsl(217,91%,40%)] via-[hsl(220,80%,25%)] to-[hsl(25,95%,45%)] opacity-90"></div>
                
                {/* Content */}
                <div className="relative space-y-10">
                  <div className="space-y-2">
                    <AnimatedCounter 
                      value={250} 
                      suffix="+" 
                      isVisible={isVisible}
                      className="text-5xl md:text-6xl font-bold text-white"
                    />
                    <p className="text-sm uppercase tracking-wider text-white/90 font-semibold">
                      INTEGRATIONS
                    </p>
                  </div>

                  <div className="space-y-2">
                    <AnimatedCounter 
                      value={1500} 
                      suffix="+" 
                      isVisible={isVisible}
                      duration={2200}
                      className="text-5xl md:text-6xl font-bold text-white"
                    />
                    <p className="text-sm uppercase tracking-wider text-white/90 font-semibold">
                      MSP & CHANNEL PARTNERS
                    </p>
                  </div>

                  <div className="space-y-2">
                    <AnimatedCounter 
                      value={20} 
                      suffix="+" 
                      isVisible={isVisible}
                      duration={1800}
                      className="text-5xl md:text-6xl font-bold text-white"
                    />
                    <p className="text-sm uppercase tracking-wider text-white/90 font-semibold">
                      ALLIANCE PARTNERS
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSportSection;
