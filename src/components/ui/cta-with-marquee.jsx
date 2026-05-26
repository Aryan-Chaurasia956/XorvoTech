import React, { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

function Marquee({ children, pauseOnHover = false, reverse = false, className, speed = 40 }) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden [--gap:1rem] [gap:var(--gap)]",
        className
      )}
      style={{
        "--duration": `${speed}s`,
      }}
    >
      <div
        className={cn(
          "flex shrink-0 items-center justify-around gap-[var(--gap)] animate-marquee",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex shrink-0 items-center justify-around gap-[var(--gap)] animate-marquee",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}

function ScrambleButton({ text, onClick, className, variant = "primary" }) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

  const scramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);
    
    let iteration = 0;
    const maxIterations = text.length;

    const interval = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setIsScrambling(false);
      }

      iteration += 1 / 3;
    }, 30);
  };

  const baseClass = "px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl text-lg text-center cursor-pointer";
  const variants = {
    primary: "bg-[#727CAB] text-white hover:bg-[#727CAB]/90 shadow-md shadow-[#727CAB]/10",
    secondary: "border-2 border-[#727CAB] text-[#727CAB] hover:bg-[#727CAB] hover:text-white",
  };

  return (
    <button
      onMouseEnter={scramble}
      onClick={onClick}
      className={cn(baseClass, variants[variant], className)}
    >
      {displayText}
    </button>
  );
}

// Ultra-reliable technology and software code images
const marqueeImages1 = [
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=400&fit=crop&q=80",
];

const marqueeImages2 = [
  "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=400&fit=crop&q=80",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=400&fit=crop&q=80",
];

export function SolutionsCTA() {
  return (
    <div className="py-20 md:py-28 relative overflow-hidden bg-white border-t border-[#727CAB]/10">
      
      {/* Subtle decorative background shapes using Brand Purple */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#727CAB]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#727CAB]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#727CAB]">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg md:text-xl text-[#727CAB]/80 leading-relaxed max-w-2xl font-medium">
              Integration is where real digital transformation happens. Xorvo Technologies brings together systems, security, and intelligence into one unified ecosystem — delivering performance without compromise and protection without limits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/?contact=true">
                <ScrambleButton text="Request Consultation" variant="primary" />
              </Link>
              <Link to="/services-overview">
                <ScrambleButton text="Explore All Services" variant="secondary" />
              </Link>
            </div>
          </div>

          {/* Right Marquee Grid */}
          <div className="space-y-4 overflow-hidden relative rounded-3xl p-4 bg-[#727CAB]/5 border border-[#727CAB]/15 backdrop-blur-sm">
            <Marquee speed={35} reverse className="[--gap:1rem]">
              {marqueeImages1.map((src, idx) => (
                <div
                  key={idx}
                  className="relative w-36 h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden flex-shrink-0 border border-[#727CAB]/10"
                >
                  <img
                    src={src}
                    alt={`Prompt Image ${idx + 1}`}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
              ))}
            </Marquee>
            <Marquee speed={35} className="[--gap:1rem]">
              {marqueeImages2.map((src, idx) => (
                <div
                  key={idx}
                  className="relative w-36 h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden flex-shrink-0 border border-[#727CAB]/10"
                >
                  <img
                    src={src}
                    alt={`Prompt Image ${idx + 5}`}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
              ))}
            </Marquee>
          </div>

        </div>
      </div>
    </div>
  );
}

export default SolutionsCTA;
