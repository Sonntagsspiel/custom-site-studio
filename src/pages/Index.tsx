import { useEffect } from "react";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Sections } from "@/components/Sections";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";
import { ResponsiveShowcase } from "@/components/ResponsiveShowcase";
import { MotivationSection } from "@/components/MotivationSection";

const Index = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      document.documentElement.style.setProperty('--scroll', 
        Math.min(scrolled / window.innerHeight * 100, 100).toString()
      );
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="scroll-section">
        <Hero />
      </div>

      <ResponsiveShowcase />

      <div className="scroll-section">
        <Features />
      </div>

      <div className="scroll-section">
        <Sections />
      </div>

      <MotivationSection />

      <div className="scroll-section">
        <Testimonials />
      </div>

      <Footer />
    </div>
  );
};

export default Index;