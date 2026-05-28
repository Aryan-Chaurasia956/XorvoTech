import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Memoize carousel images to prevent recreation on every render
  const carouselImages = useMemo(() => [
    { src: "/paul-frenzel-MnHQMzC6n-o-unsplash.jpg", alt: "Background 1" },
    { src: "/hack-capital-uv5_bsypFUM-unsplash.jpg", alt: "Background 2" },
    { src: "/sergey-zolkin-_UeY8aTI6d0-unsplash.jpg", alt: "Background 3" },
    { src: "/steve-johnson-_0iV9LmPDn0-unsplash.jpg", alt: "Background 4" },
  ], []);

  useEffect(() => {
    // Auto-advance carousel every 4 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % carouselImages.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  return (
    <section className="relative min-h-screen sm:min-h-[110vh] lg:min-h-[120vh] flex flex-col items-center justify-center overflow-hidden bg-black text-white">
      {/* Image Carousel Background */}
      <div className="absolute inset-0 z-0">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover md:scale-110"
              fetchpriority={index === 0 ? "high" : "low"}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              sizes="100vw"
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/70"></div>
          </div>
        ))}
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentImageIndex
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/75'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-12">
        <div className="max-w-4xl text-left space-y-8">
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight" style={{ fontFamily: " 'Arial Black', sans-serif", WebkitTextStroke: "0px", textShadow: "none" }}>
            <BoldText text='Managed IT Services'/>
            <BoldText text='& Cybersecurity for'/>
            <span className="block text-white mb-4">
              <span className="relative inline-block">
                <span className="text">Business Infrastructure</span>
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-2xl">
            System Integrator delivering Cloud, Endpoint Security (EPS), Workspace Solutions, VPS and Enterprise IT Services
          </p>


          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-start justify-start gap-4 pt-8">
            <Link to="/services">
              <Button variant="hero" size="lg" className="group font-semibold">
                <span className="flex items-center">
                  Explore Services
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </Link>

            <Link to="/?contact=true">
              <Button variant="hero" size="lg" className="group font-semibold">
                <span className="flex items-center">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

const BoldText = ({text}) => {
  return <span className="block text-white mb-4">
    {text}
  </span>
}

export default HeroSection;
