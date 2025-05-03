import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";

export const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <OptimizedImage
            src="photo-1522071820081-009f0129c71c.jpg"
            alt="Team Collaboration"
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/40 backdrop-blur-sm" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 text-white">Über WebBuilder</h1>
            <p className="text-2xl text-white/90 font-medium">Modern. Einfach. Individuell.</p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Unsere Mission</h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Willkommen bei WebBuilder – der Plattform, die kleinen und mittelständischen 
                  Unternehmen den Schritt in die digitale Zukunft erleichtert.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Wir glauben daran, dass jedes Unternehmen – egal wie groß oder klein – eine 
                  professionelle Online-Präsenz verdient. Mit unserem benutzerfreundlichen Tool 
                  ermöglichen wir es dir, eine individuelle Website zu erstellen, die dein 
                  Unternehmen perfekt repräsentiert – ganz ohne Programmierkenntnisse.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="aspect-[4/3] w-full max-w-lg rounded-2xl overflow-hidden shadow-xl">
                  <OptimizedImage
                    src="wmremove-transformed (5).jpeg"
                    alt="Modern Development"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-white to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center">
                <div className="aspect-[4/3] w-full max-w-lg rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="photo-1460925895917-afdab827c52f.jpeg"
                    alt="Web Development"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6">Was wir bieten</h2>
                <ul className="space-y-4 text-lg text-gray-600">
                  <li className="flex items-start">
                    <span className="text-primary mr-3">▹</span>
                    <span><strong>Einfache Anpassung:</strong> Erstelle deine Website mit nur wenigen Klicks.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3">▹</span>
                    <span><strong>Optimiert für alle Geräte:</strong> Egal ob Smartphone, Tablet oder Desktop – deine Website sieht immer großartig aus.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3">▹</span>
                    <span><strong>Moderne Designs:</strong> Wähle aus professionellen Vorlagen oder gestalte deine Seite komplett nach deinen Wünschen.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3">▹</span>
                    <span><strong>Professionelle Unterstützung:</strong> Unser Support-Team steht dir bei Fragen zur Seite.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3">▹</span>
                    <span><strong>Hosting inklusive:</strong> Wir kümmern uns um die technischen Details.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Values Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Unsere Werte</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Qualität</h3>
                    <p className="text-gray-600">
                      Wir setzen auf modernste Technologien und beste Praktiken, um Ihnen eine hochwertige Website zu liefern.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Kundenzufriedenheit</h3>
                    <p className="text-gray-600">
                      Ihr Erfolg ist unser Erfolg. Wir arbeiten eng mit Ihnen zusammen, um Ihre Vision zu verwirklichen.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Innovation</h3>
                    <p className="text-gray-600">
                      Wir entwickeln unsere Plattform ständig weiter, um Ihnen die besten Lösungen zu bieten.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="aspect-[4/3] w-full max-w-lg rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="photo-1552664730-d307ca884978.jpeg"
                    alt="Team Values"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-white to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Starte jetzt</h2>
            <p className="text-lg text-gray-600 mb-8">
              Gestalte deine eigene Website in wenigen Minuten.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/customize" className="flex items-center">
                Website gestalten
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;