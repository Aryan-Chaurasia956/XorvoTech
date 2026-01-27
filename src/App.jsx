import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Index from "./pages/Index";
const About = lazy(() => import("./pages/About"));
import Solution from "@/components/Solution";
import ServicesOverview from "@/components/ServicesOverview";
import CybersecurityServices from "@/components/CybersecurityServices";
import CloudInfrastructureServices from "@/components/CloudInfrastructureServices";
import ManagedITServices from "@/components/ManagedITServices";
import WorkspaceCollaborationServices from "@/components/WorkspaceCollaborationServices";
import DataProtectionComplianceServices from "@/components/DataProtectionComplianceServices";
import ITConsultingDeploymentServices from "@/components/ITConsultingDeploymentServices";
import Resource from "@/components/Resource";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "@/components/Footer";
import Privacy from "@/components/Privacy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route
            path="/about"
            element={
              <Suspense fallback={<div className="pt-28 text-center">Loading About...</div>}>
                <About />
              </Suspense>
            }
          />
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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
