import { Button } from "@/components/ui/button";
import { Laptop, Server } from "lucide-react";
import { Link } from "react-router-dom";

const ExtraServices = () => {
  return (
    <div className="min-h-screen bg-white py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 scroll-section">
          <h1 className="text-4xl font-bold tracking-tight text-neutral mb-4">
            Unsere Extra-Services
          </h1>
          <p className="text-xl text-gray-600">
            Zusätzliche Unterstützung für Ihre perfekte Website.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Website Setup Service */}
          <div className="scroll-section animate-on-scroll-right">
            <div className="p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Laptop className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold text-neutral">Website Setup</h2>
              </div>
              <p className="text-gray-600 mb-8">
                Lassen Sie uns Ihre Website schnell und professionell einrichten. Wir kümmern uns um alles – von der Domain bis zur vollständigen Konfiguration.
              </p>
              <Button className="w-full" asChild>
                <Link to="/services/website-setup">Mehr erfahren</Link>
              </Button>
            </div>
          </div>

          {/* Website Hosting Service */}
          <div className="scroll-section animate-on-scroll-left">
            <div className="p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Server className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold text-neutral">Website Hosten</h2>
              </div>
              <p className="text-gray-600 mb-8">
                Sicheres und schnelles Hosting für Ihre Website mit 99,9 % Verfügbarkeit und modernster Technologie.
              </p>
              <Button className="w-full" asChild>
                <Link to="/services/website-hosting">Jetzt starten</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-24 text-center p-8 bg-neutral-light/50 rounded-2xl max-w-3xl mx-auto scroll-section">
          <h3 className="text-2xl font-semibold text-neutral mb-4">
            Haben Sie Fragen?
          </h3>
          <p className="text-gray-600 mb-6">
            Kontaktieren Sie uns für weitere Details.
          </p>
          <Button variant="secondary" asChild>
            <Link to="/contact">Kontakt aufnehmen</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExtraServices;