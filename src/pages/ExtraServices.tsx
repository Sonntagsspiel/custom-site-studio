import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Server, Globe, Headphones } from "lucide-react";

export const ExtraServices = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="photo-1451187580459-43490279c0fa.jpeg"
            alt="Server Technology"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/40 backdrop-blur-sm" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 text-white">Zusätzliche Services</h1>
            <p className="text-2xl text-white/90 font-medium">
              Professionelle Unterstützung für Ihren Online-Erfolg
            </p>
          </div>
        </div>
      </section>

      {/* Hosting Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Server className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold">Hosting & Wartung</h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Zuverlässiges Hosting Ihrer Website mit regelmäßigen Updates und Sicherung:
                </p>
                <ul className="space-y-4 text-lg text-gray-600">
                  <li className="flex items-start">
                    <span className="text-primary mr-3">▹</span>
                    <span>Schnelle und sichere Server</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3">▹</span>
                    <span>Tägliche Backups</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3">▹</span>
                    <span>SSL-Verschlüsselung inklusive</span>
                  </li>
                </ul>
              </div>
              <div className="flex justify-center">
                <div className="aspect-[4/3] w-full max-w-lg rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="photo-1563986768609-322da13575f3 (1).jpeg"
                    alt="Customer Support"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Domain Section */}
      <section className="py-24 bg-gradient-to-b from-white to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center">
                <div className="aspect-[4/3] w-full max-w-lg rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="photo-1600880292203-757bb62b4baf.jpeg"
                    alt="Technical Support"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold">Domain-Service</h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Wir kümmern uns um Ihre Domain-Registrierung und -Verwaltung:
                </p>
                <ul className="space-y-4 text-lg text-gray-600">
                  <li className="flex items-start">
                    <span className="text-primary mr-3">▹</span>
                    <span>Domain-Registrierung und Transfer</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3">▹</span>
                    <span>DNS-Management</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3">▹</span>
                    <span>E-Mail-Einrichtung</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Headphones className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold">Support & Beratung</h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Persönliche Unterstützung bei allen Fragen rund um Ihre Website:
                </p>
                <ul className="space-y-4 text-lg text-gray-600">
                  <li className="flex items-start">
                    <span className="text-primary mr-3">▹</span>
                    <span>Technischer Support</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3">▹</span>
                    <span>Content-Beratung</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3">▹</span>
                    <span>SEO-Optimierung</span>
                  </li>
                </ul>
              </div>
              <div className="flex justify-center">
                <div className="aspect-[4/3] w-full max-w-lg rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="photo-1451187580459-43490279c0fa (1).jpeg"
                    alt="Server Technology"
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
            <h2 className="text-3xl font-bold mb-6">Lassen Sie sich beraten</h2>
            <p className="text-lg text-gray-600 mb-8">
              Erfahren Sie mehr über unsere zusätzlichen Services und wie sie Ihr Projekt unterstützen können.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/customize" className="flex items-center">
                Jetzt starten
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExtraServices;