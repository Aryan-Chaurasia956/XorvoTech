import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Array of images for the carousel
  const carouselImages = [
    { src: "/paul-frenzel-MnHQMzC6n-o-unsplash.jpg", alt: "Background 1" },
    { src: "/hack-capital-uv5_bsypFUM-unsplash.jpg", alt: "Background 2" },
    { src: "/sergey-zolkin-_UeY8aTI6d0-unsplash.jpg", alt: "Background 3" },
    { src: "/steve-johnson-_0iV9LmPDn0-unsplash.jpg", alt: "Background 4" },
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    // Progress bar animation - smoother with requestAnimationFrame
    let animationFrameId;
    let startTime = Date.now();
    const duration = 4000; // 4 seconds

    const animateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress < 100) {
        animationFrameId = requestAnimationFrame(animateProgress);
      }
    };

    // Start animation
    setProgress(0);
    animationFrameId = requestAnimationFrame(animateProgress);

    // Auto-advance carousel every 4 seconds
    const carouselInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % carouselImages.length
      );
    }, 4000);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(carouselInterval);
    };
  }, [currentImageIndex, carouselImages.length]);

  return (
    <section className="relative min-h-screen sm:min-h-[110vh] lg:min-h-[120vh] flex flex-col items-center justify-center overflow-hidden bg-black text-white">
      {/* Image Carousel Background */}
      <div className="absolute inset-0 z-0">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover md:scale-110"
              fetchpriority={index === 0 ? "high" : "low"}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
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
            onClick={() => {
              setCurrentImageIndex(index);
              setProgress(0); // Reset progress when manually changing slides
            }}
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
          {/* Headline with staggered word animations */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight" style={{ fontFamily: "'Rostex', 'Arial Black', sans-serif" }}>
            {/* <span
              className={`block text-white mb-4 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            >
              Smarter Technology
            </span> */}
            <BoldText text='Smarter Technology' isVisible={isVisible}/>
            {/* <span
              className={`block text-white mb-4 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            >
              Stronger Security
            </span> */}
            <BoldText text='Stronger Security' isVisible={isVisible}/>
            <span
              className={`block text-white transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            >
              {/* TODO: remove extra span */}
              <span className="relative inline-block">
                <span className="text">Better Business</span>
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-2xl transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
          >
            Complete IT and security solutions designed for your success
          </p>

          {/* Progress Bar */}
          <div
            className={`w-full max-w-2xl transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            aria-label="Carousel progress"
          >
            <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full"
                style={{ 
                  width: `${progress}%`,
                  transition: 'width 0.05s linear'
                }}
              />
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-start justify-start gap-4 pt-8 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
          >
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

const BoldText = ({text, isVisible}) => {
  return <span
    className={`block text-white mb-4 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
  >
    {text}
  </span>
}

export default HeroSection;
