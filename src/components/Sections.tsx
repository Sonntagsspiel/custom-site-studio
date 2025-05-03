import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Palette, Users, Server, ArrowRight, CheckCircle2, Shield } from "lucide-react";
import { useEffect, useRef } from "react";

const sections = [
  {
    title: "Risikofrei starten",
    description: "Sie zahlen erst, wenn Sie mit dem Ergebnis zufrieden sind. Keine versteckten Kosten, keine verpflichtenden Verträge. Wir sind so überzeugt von unserer Arbeit, dass wir Ihnen diese Garantie geben können.",
    icon: Shield,
    link: "/customize",
    imagePosition: "right",
    image: "wmremove-transformed (4).jpeg",
    features: [
      "Keine Vorabzahlung erforderlich",
      "100% Zufriedenheitsgarantie",
      "Transparente Preisgestaltung",
      "Keine versteckten Kosten"
    ]
  },
  {
    title: "Customize Your Website",
    description: "Passen Sie Design, Farben und Layout ganz nach Ihren Wünschen an.",
    icon: Palette,
    link: "/customize",
    imagePosition: "left",
    image: "wmremove-transformed (2).jpeg"
  },
  {
    title: "About Us",
    description: "Erfahren Sie mehr über unsere Mission, Websites einfach und zugänglich zu machen.",
    icon: Users,
    link: "/about",
    imagePosition: "right",
    image: "/about-us-home.jpg"
  },
  {
    title: "Extra Services",
    description: "Entdecken Sie unsere zusätzlichen Services für Setup und Hosting Ihrer Website.",
    icon: Server,
    link: "/extra-services",
    imagePosition: "left",
    image: "/server-room.jpg"
  },
  {
    title: "Preise & Pakete",
    description: "Transparente Preisgestaltung für jede Unternehmensgröße. Finden Sie das passende Paket für Ihr Budget und Ihre Anforderungen.",
    icon: Server,
    link: "/pricing",
    imagePosition: "right",
    image: "wmremove-transformed (1).jpeg"
  },
  {
    title: "Support & Hilfe",
    description: "Unser Team unterstützt Sie bei allen Fragen rund um Ihre Website – von der Einrichtung bis zur Optimierung.",
    icon: Shield,
    link: "/contact",
    imagePosition: "left",
    image: "pexels-fauxels-3184339.jpg"
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
    <div className="relative overflow-hidden bg-primary/10 py-24 sm:py-32">
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
                {section.features && (
                  <div className="mt-6 space-y-4">
                    {section.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}
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
              className={`relative overflow-hidden rounded-2xl p-8 ${
                section.imagePosition === "right" ? "lg:order-first" : ""
              }`}
            >
              <div className="absolute inset-0 bg-primary/10 backdrop-blur-xl rounded-3xl" />
              
              {section.image ? (
                <img
                  src={section.image}
                  alt={section.title}
                  className="relative z-10 w-full h-auto rounded-xl shadow-xl transition-all hover:scale-105 duration-300"
                />
              ) : (
                <div className="relative z-10 aspect-[4/3] overflow-hidden rounded-xl bg-white shadow-lg">
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
      </div>
    </div>
  );
};