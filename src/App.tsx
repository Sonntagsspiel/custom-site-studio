import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import Index from "./pages/Index";
import Requirements from "./pages/Requirements";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import SignIn from "./pages/SignIn";
import GetStarted from "./pages/GetStarted";
import Customize from "./pages/Customize";
import ExtraServices from "./pages/ExtraServices";
import Contact from "./pages/Contact";
import StarterPricing from "./pages/StarterPricing";
import ProfessionalPricing from "./pages/ProfessionalPricing";
import EnterprisePricing from "./pages/EnterprisePricing";
import WebsiteSetup from "./pages/WebsiteSetup";
import WebsiteHosting from "./pages/WebsiteHosting";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/requirements" element={<Requirements />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/customize" element={<Customize />} />
          <Route path="/extra-services" element={<ExtraServices />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing/starter" element={<StarterPricing />} />
          <Route path="/pricing/professional" element={<ProfessionalPricing />} />
          <Route path="/pricing/enterprise" element={<EnterprisePricing />} />
          <Route path="/services/website-setup" element={<WebsiteSetup />} />
          <Route path="/services/website-hosting" element={<WebsiteHosting />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;