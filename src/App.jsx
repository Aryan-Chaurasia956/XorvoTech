import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

// Lazy load all route components for better performance
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Solution = lazy(() => import("@/components/Solution"));
const ServicesOverview = lazy(() => import("@/components/ServicesOverview"));
const CybersecurityServices = lazy(() => import("@/components/CybersecurityServices"));
const CloudInfrastructureServices = lazy(() => import("@/components/CloudInfrastructureServices"));
const ManagedITServices = lazy(() => import("@/components/ManagedITServices"));
const WorkspaceCollaborationServices = lazy(() => import("@/components/WorkspaceCollaborationServices"));
const DataProtectionComplianceServices = lazy(() => import("@/components/DataProtectionComplianceServices"));
const ITConsultingDeploymentServices = lazy(() => import("@/components/ITConsultingDeploymentServices"));
const Resource = lazy(() => import("@/components/Resource"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Navbar = lazy(() => import("./components/Navbar"));
const Footer = lazy(() => import("@/components/Footer"));
const Privacy = lazy(() => import("@/components/Privacy"));

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-black">
    <div className="text-white text-xl">Loading...</div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <Navbar />
        </Suspense>
        <Suspense fallback={<div className="pt-28 text-center text-white">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/solutions" element={<Solution />} />
            <Route path="/services-overview" element={<ServicesOverview />} />
            <Route path="/cybersecurity-services" element={<CybersecurityServices />} />
            <Route path="/cloud-infrastructure-services" element={<CloudInfrastructureServices />} />
            <Route path="/managed-it-services" element={<ManagedITServices />} />
            <Route path="/workspace-collaboration-services" element={<WorkspaceCollaborationServices />} />
            <Route path="/data-protection-compliance-services" element={<DataProtectionComplianceServices />} />
            <Route path="/it-consulting-deployment-services" element={<ITConsultingDeploymentServices />} />
            <Route path="/privacy-policy" element={<Privacy />} />
            <Route path="/terms" element={<Privacy />} />
            <Route path="/disclaimer" element={<Privacy />} />
            <Route path="/cookies" element={<Privacy />} />
            <Route path="/resources" element={<Resource />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
