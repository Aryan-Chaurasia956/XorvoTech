import { lazy, Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import PartnerSlider from "@/components/PartnerSlider";
import AboutSection from "@/components/AboutSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import ErrorBoundary from "@/components/ErrorBoundary";
import JsonLdSchema from "@/components/JsonLdSchema";
import StickyFeatureSection from "@/components/ui/sticky-scroll-cards-section";
import RotatingGradientRight from "@/components/ui/rotating-gradient-right";
import ClientReviewsMarquee from "@/components/ui/marquee-card";

// Lazy load below-the-fold components for better performance 
const SolutionsSection = lazy(() => import("@/components/SolutionsSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));

// Loading fallback component
const SectionLoader = () => (
  <div className="flex items-center justify-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
  </div>
);

const Index = () => {
  const location = useLocation();

  // Scroll to contact section when navigated with ?contact=...
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const contactRequested = params.get("contact");
    if (contactRequested) {
      const tryScroll = () => {
        const el = document.getElementById("contact-section");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          setTimeout(tryScroll, 250);
        }
      };
      // Delay slightly to allow lazy-loaded component to mount
      setTimeout(tryScroll, 250);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen bg-background">
      <JsonLdSchema />
      <HeroSection />
      <PartnerSlider />
      <AboutSection />
      
      <ErrorBoundary fallback={<SectionLoader />}>
        <Suspense fallback={<SectionLoader />}>
          <SolutionsSection />
        </Suspense>
      </ErrorBoundary>
      
      <WhyChooseSection />
      
      {/* Services Sticky Stack Section */}
      <ErrorBoundary fallback={<SectionLoader />}>
        <StickyFeatureSection />
      </ErrorBoundary>

      {/* Rotating Gradient Callout to Avinyax */}
      <ErrorBoundary fallback={<SectionLoader />}>
        <RotatingGradientRight />
      </ErrorBoundary>

      {/* Standalone Client Reviews Section */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#727CAB] mb-12 text-center" style={{ fontFamily: "'Rostex', sans-serif" }}>
            CLIENT <span className="text-[#727CAB]/85">REVIEWS</span>
          </h2>
          <ErrorBoundary fallback={<SectionLoader />}>
            <ClientReviewsMarquee />
          </ErrorBoundary>
        </div>
      </section>
      
      <ErrorBoundary fallback={<SectionLoader />}>
        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>
      </ErrorBoundary>
      
    </div>
  );
};

export default Index;
