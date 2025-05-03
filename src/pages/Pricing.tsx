import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Calculator } from "lucide-react";

export const Pricing = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="photo-1454165804606-c3d57bc86b40.jpeg"
            alt="Business Planning"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/40 backdrop-blur-sm" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 text-white">Individuelle Preisgestaltung</h1>
            <p className="text-2xl text-white/90 font-medium">
              Maßgeschneiderte Lösungen für Ihre Bedürfnisse
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Info Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Transparente Preisgestaltung</h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Der endgültige Preis Ihrer Website hängt von verschiedenen Faktoren ab, 
                  die Sie selbst während des Gestaltungsprozesses bestimmen können:
                </p>
                <ul className="space-y-4 text-lg text-gray-600">
                  <li className="flex items-start">
                    <span className="text-primary mr-3">▹</span>
                    <span><strong>Anzahl der Sektionen:</strong> Je nach gewünschtem Umfang Ihrer Website</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3">▹</span>
                    <span><strong>Zusätzliche Funktionen:</strong> Spezielle Features und Integrationen</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3">▹</span>
                    <span><strong>Support-Umfang:</strong> Gewünschte Betreuung und Wartung</span>
                  </li>
                </ul>
              </div>
              <div className="flex justify-center">
                <div className="aspect-[4/3] w-full max-w-lg rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="photo-1454165804606-c3d57bc86b40.jpeg"
                    alt="Business Planning"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gradient-to-b from-white to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center">
                <div className="aspect-[4/3] w-full max-w-lg rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="photo-1554224155-8d04cb21cd6c.jpeg"
                    alt="Business Analytics"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6">So funktioniert's</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">1. Website gestalten</h3>
                    <p className="text-gray-600">
                      Nutzen Sie unseren Website-Builder, um Ihre Wunschwebsite zu gestalten.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">2. Sofortige Preisberechnung</h3>
                    <p className="text-gray-600">
                      Sehen Sie direkt, wie sich Ihre Entscheidungen auf den Preis auswirken.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">3. Individuelles Angebot</h3>
                    <p className="text-gray-600">
                      Erhalten Sie ein maßgeschneidertes Angebot für Ihre perfekte Website.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Starten Sie Ihre Preisberechnung</h2>
            <p className="text-lg text-gray-600 mb-8">
              Gestalten Sie Ihre Website und erhalten Sie eine sofortige Preiseinschätzung.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/customize" className="flex items-center">
                Website gestalten
                <Calculator className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;