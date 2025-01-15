import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Palette, Users, Server, ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { ReviewsCarousel } from "./ReviewsCarousel";

const sections = [
  {
    title: "Customize Your Website",
    description: "Passen Sie Design, Farben und Layout ganz nach Ihren Wünschen an.",
    icon: Palette,
    link: "/customize",
    imagePosition: "left",
    image: "/lovable-uploads/415cbbf1-ec65-4367-9731-c74ecf89a3a8.png"
  },
  {
    title: "About Us",
    description: "Erfahren Sie mehr über unsere Mission, Websites einfach und zugänglich zu machen.",
    icon: Users,
    link: "/about",
    imagePosition: "right",
    image: null
  },
  {
    title: "Extra Services",
    description: "Entdecken Sie unsere zusätzlichen Services für Setup und Hosting Ihrer Website.",
    icon: Server,
    link: "/extra-services",
    imagePosition: "left",
    image: "/lovable-uploads/8f0a0533-ad5a-4c6c-8c3c-56848a6c5128.png"
  },
];

export const Sections = () => {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          const position = element.dataset.position;
          element.classList.add(
            position === "left" ? "animate-on-scroll-right" : "animate-on-scroll-left"
          );
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: "50px",
    });

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {sections.map((section, index) => (
          <div
            key={section.title}
            ref={(el) => (sectionRefs.current[index] = el)}
            data-position={section.imagePosition}
            className={`mb-20 flex flex-col items-center gap-x-8 gap-y-16 lg:grid lg:grid-cols-2 ${
              section.imagePosition === "left" ? "lg:items-center" : "lg:items-center lg:flex-row-reverse"
            } opacity-0`}
          >
            <div className="lg:pl-8 lg:pt-4">
              <div className="lg:max-w-lg">
                <div className="flex items-center gap-x-4">
                  <section.icon className="h-8 w-8 text-primary" />
                  <h2 className="text-3xl font-bold tracking-tight text-neutral">{section.title}</h2>
                </div>
                <p className="mt-6 text-lg leading-8 text-gray-600">{section.description}</p>
                <div className="mt-8">
                  <Button asChild>
                    <Link to={section.link}>
                      Mehr erfahren
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            <div 
              className={`relative overflow-hidden rounded-2xl bg-neutral-light/50 p-8 transition-transform hover:scale-105 duration-300 ${
                section.imagePosition === "right" ? "lg:order-first" : ""
              }`}
            >
              {section.image ? (
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full h-auto rounded-xl shadow-lg"
                />
              ) : (
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-white shadow-lg">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="space-y-4 p-6 w-full">
                      <div className="h-4 w-3/4 rounded bg-neutral/10" />
                      <div className="h-32 rounded bg-neutral/5" />
                      <div className="space-y-2">
                        <div className="h-4 w-full rounded bg-neutral/10" />
                        <div className="h-4 w-2/3 rounded bg-neutral/10" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        
        <div className="mt-32">
          <ReviewsCarousel />
        </div>
      </div>
    </div>
  );
};