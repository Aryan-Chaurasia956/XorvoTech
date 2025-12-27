import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SplitText from "./SplitText";

const AboutSection = () => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover filter brightness-75 contrast-100 saturate-100"
        src="/about_us_homepage.webm"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/background1.jpg"
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60" />
      {/* Previous SVG and particle background removed */}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white drop-shadow-md">
            {/* Main Title */}
            <div className="mb-6">
              <SplitText 
                text="Who We Are"
                tag="h2"
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg"
                delay={60}
                duration={0.8}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 50, rotationX: -90 }}
                to={{ opacity: 1, y: 0, rotationX: 0 }}
                threshold={0.2}
                rootMargin="-50px"
                textAlign="left"
              />
            </div>

            {/* Subtitle */}
             <h3 className="text-xl md:text-2xl font-semibold text-white/90 mb-6 leading-relaxed">
               We help organizations build secure, connected, and high-performing digital environments.
             </h3>

             {/* Description */}
             <div className="text-white/80 text-base md:text-lg leading-relaxed mb-8 space-y-4">
               <p>
                 Our mission is to simplify technology so your business can focus on growth while we manage, protect, and optimize everything behind the scenes.
               </p>
               <p>
                 We deliver end-to-end IT, networking, cloud, and cybersecurity solutions that are reliable, scalable, and tailored to your business goals. From securing your infrastructure to managing your cloud systems, we combine trusted enterprise technologies with expert support to keep your operations running smoothly and securely — 24/7.
               </p>
               <p>
                 As a trusted partner, we work with global leaders such as Fortinet, Check Point, AWS, Sophos, Palo Alto Networks, and Microsoft Defender to offer premium solutions designed for enterprises that require high-end performance, compliance, and advanced threat protection.
               </p>
             </div>

             {/* Learn More Button */}
             <div>
               <Link to="/about">
                 <Button 
                   className="group bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
                 >
                   <span className="flex items-center">
                     Learn More
                     <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                   </span>
                 </Button>
               </Link>
             </div>
          </div>

          {/* Right side - Map area (empty for map background) */}
          <div className="hidden lg:block">
            {/* This space is intentionally left for the map background */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
