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
import Register from "./pages/Register";
import Customize from "./pages/Customize";
import ExtraServices from "./pages/ExtraServices";
import Contact from "./pages/Contact";
import StarterPricing from "./pages/StarterPricing";
import ProfessionalPricing from "./pages/ProfessionalPricing";
import EnterprisePricing from "./pages/EnterprisePricing";
import WebsiteSetup from "./pages/WebsiteSetup";
import WebsiteHosting from "./pages/WebsiteHosting";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Settings from "./pages/Settings";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderSaved from "@/pages/OrderSaved";
import { AuthGuard } from "./components/AuthGuard";
import './i18n/config';
import NotFound from "./pages/404";

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
          <Route path="/register" element={<Register />} />
          <Route path="/customize" element={
            <AuthGuard>
              <Customize />
            </AuthGuard>
          } />
          <Route path="/extra-services" element={<ExtraServices />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing/starter" element={<StarterPricing />} />
          <Route path="/pricing/professional" element={<ProfessionalPricing />} />
          <Route path="/pricing/enterprise" element={<EnterprisePricing />} />
          <Route path="/services/website-setup" element={<WebsiteSetup />} />
          <Route path="/services/website-hosting" element={<WebsiteHosting />} />
          <Route path="/profile" element={
            <AuthGuard>
              <Profile />
            </AuthGuard>
          } />
          <Route path="/admin" element={<Admin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/order/saved" element={<OrderSaved />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;