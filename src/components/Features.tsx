import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const features = [
  {
    name: "Design-Anpassung",
    description: "Gestalten Sie Ihre Website individuell – von Farben und Schriften bis hin zu Layout und eigenen Bildern oder Videos.",
    image: "/design-customization.jpg",
    link: "/customize"
  },
  {
    name: "Abschnittsverwaltung",
    description: "Fügen Sie verschiedene Abschnitte hinzu, wie \"Über uns\", \"Produkte\" oder \"Kontakt\" hinzu.",
    image: "/section-management.jpg",
    link: "/customize"
  },
  {
    name: "Hosting & Domain",
    description: "Wählen Sie Ihr Hosting-Paket und registrieren Sie Ihre eigene Domain. Schalten Sie Ihre Website mit wenigen Klicks live.",
    image: "/server-room.jpg",
    link: "/customize"
  }
];

export const Features = () => {
  return (
    <section id="features" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Schneller erstellen</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-neutral sm:text-4xl">
            Alles was Sie für Ihre Website brauchen
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Unsere Plattform bietet Ihnen alle Werkzeuge, die Sie benötigen, um Ihre professionelle Website zu erstellen.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="group bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-sm 
                hover:shadow-xl transition-all duration-300 ease-in-out 
                hover:-translate-y-1 hover:scale-[1.02]"
            >
              {/* Image */}
              <div className="aspect-[4/3] mb-8 overflow-hidden rounded-xl">
                <div className="relative h-full rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-primary/10 backdrop-blur-xl 
                    group-hover:bg-primary/5 transition-colors duration-300" 
                  />
                  <img
                    src={feature.image}
                    alt={feature.name}
                    className="relative z-10 w-full h-full object-cover rounded-xl shadow-lg 
                      transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Content */}
              <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4
                    group-hover:text-primary transition-colors duration-300">
                    {feature.name}
                  </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                <div className="mt-6">
                    <Button asChild variant="link" className="text-primary p-0 
                      group-hover:translate-x-1 transition-transform duration-300">
                      <Link to={feature.link} className="flex items-center">
                    Probieren Sie es aus
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            </div>
        </div>
      </div>
    </section>
  );
};