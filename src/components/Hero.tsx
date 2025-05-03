import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { FloatingImages } from './FloatingImages';
import { useEffect, useState } from "react";

// Array of images for the slideshow
const heroImages = [
  "/lovable-uploads/Ai powered Website.jpeg",
  "/lovable-uploads/Architecture Website.jpeg",
  "/lovable-uploads/Baker Website.jpeg",
  "/lovable-uploads/Blockchain Website.jpeg",
  "/lovable-uploads/Burger Website.jpeg",
  "/lovable-uploads/Coffee Website.jpeg",
  "/lovable-uploads/Construction Website.jpeg",
  "/lovable-uploads/Financial Website.jpeg",
  "/lovable-uploads/Flower shop.png",
  "/lovable-uploads/Lock Website.jpeg",
  "/lovable-uploads/Payment Website.jpeg",
  "/lovable-uploads/Phone Create Website.png",
  "/lovable-uploads/Renewable Energie Website.jpeg",
  "/lovable-uploads/Restaurant Website.jpeg",
  "/lovable-uploads/Roof Website.jpeg",
  "/lovable-uploads/Spa Website.jpeg"

];

export const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fadeOut = setTimeout(() => setVisible(false), 4500); // 0.5s vor Wechsel ausblenden
    const next = setTimeout(() => {
      setCurrentImageIndex((prev) =>
        prev === heroImages.length - 1 ? 0 : prev + 1
      );
      setVisible(true); // wieder einblenden
    }, 5000);

    return () => {
      clearTimeout(fadeOut);
      clearTimeout(next);
    };
  }, [currentImageIndex]);

  return (
    <div className="relative overflow-hidden">
    <div className="relative overflow-hidden bg-neutral-light pt-8 sm:pt-12">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 min-h-[calc(100vh-120px)] items-center">
            <div className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none xl:col-span-6 flex flex-col justify-center lg:translate-y-3/4">
            <h1 className="text-4xl font-bold tracking-tight text-neutral sm:text-5xl md:text-6xl animate-fade-up">
                Erstellen Sie Ihre perfekte Website –
                <div className="text-primary">ganz einfach und individuell!</div>
            </h1>
            <p className="mt-6 text-lg text-gray-600 animate-fade-up [animation-delay:200ms]">
              Unsere Plattform macht es einfach, Ihre eigene Website zu gestalten – ohne
              Programmierkenntnisse. Starten Sie jetzt und bringen Sie Ihr Unternehmen online.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
              <Button
                asChild
                className="animate-fade-up [animation-delay:400ms]"
                size="lg"
              >
                  <Link to="/customize">
                    Website gestalten
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
            <div className="relative lg:col-span-5 lg:row-span-2 xl:col-span-6">
              <div
                className="relative flex items-center justify-center mx-auto"
                style={{ minHeight: "60vh", height: "70vh" }}
              >
                <div className="relative">
                  {/* Blur background container, fade synchron zum Bild */}
                  <div
                    className={`absolute inset-0 bg-primary/10 backdrop-blur-xl rounded-3xl z-0 transition-opacity duration-500`}
                    style={{
                      transform: "scaleX(1.25) scaleY(1.10)",
                      opacity: visible ? 1 : 0,
                    }}
                  />
                  <img
                    src={heroImages[currentImageIndex]}
                    alt="Website Preview"
                    className={`relative z-10 rounded-3xl shadow-xl transition-opacity duration-500 object-contain max-h-[60vh] max-w-full`}
                    style={{
                      display: "block",
                      opacity: visible ? 1 : 0,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};