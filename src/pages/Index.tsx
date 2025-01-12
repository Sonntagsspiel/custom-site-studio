import { useEffect } from "react";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Sections } from "@/components/Sections";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-on-scroll");
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: "50px",
    });

    document.querySelectorAll(".scroll-section").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="scroll-section">
        <Hero />
      </div>

      <div className="section-divider" />
      <div className="container mx-auto px-4">
        <h2 className="section-title">1. Features</h2>
      </div>
      <div className="scroll-section">
        <Features />
      </div>

      <div className="section-divider" />
      <div className="container mx-auto px-4">
        <h2 className="section-title">2. Sections</h2>
      </div>
      <div className="scroll-section">
        <Sections />
      </div>

      <div className="section-divider" />
      <div className="container mx-auto px-4">
        <h2 className="section-title">3. Testimonials</h2>
      </div>
      <div className="scroll-section">
        <Testimonials />
      </div>

      <Footer />
    </div>
  );
};

export default Index;