import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Sections } from "@/components/Sections";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Features />
      <Sections />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;