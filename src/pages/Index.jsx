import { lazy, Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import PartnerSlider from "@/components/PartnerSlider";
import AboutSection from "@/components/AboutSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import ErrorBoundary from "@/components/ErrorBoundary";

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
      <HeroSection />
      <PartnerSlider />
      <AboutSection />
      
      <ErrorBoundary fallback={<SectionLoader />}>
        <Suspense fallback={<SectionLoader />}>
          <SolutionsSection />
        </Suspense>
      </ErrorBoundary>
      
      <WhyChooseSection />
      
      <ErrorBoundary fallback={<SectionLoader />}>
        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>
      </ErrorBoundary>
      
    </div>
  );
};

export default Index;
