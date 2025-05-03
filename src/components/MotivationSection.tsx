import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const MotivationSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-neutral-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ihre Erfolgsgeschichte beginnt hier
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Tausende Unternehmer haben bereits den Schritt in die digitale Zukunft gewagt. 
            Seien Sie der Nächste, der seine Visionen online zum Leben erweckt.
          </p>

          {/* Erfolgsmetriken */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">5000+</div>
              <p className="text-gray-600">Erfolgreiche Websites</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <p className="text-gray-600">Zufriedene Kunden</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <p className="text-gray-600">Support & Beratung</p>
            </div>
          </div>

          {/* Vorteile mit Bildern */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="relative w-16 h-16 mx-auto mb-6">
                <img
                  src="/rocket_icon.png"
                  alt="Schnell starten"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2">Schnell & Einfach</h3>
              <p className="text-gray-600">
                In nur 5 Minuten zu Ihrer eigenen Website. Keine technischen Vorkenntnisse erforderlich.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="relative w-16 h-16 mx-auto mb-6">
                <img
                  src="/paint_tool_icon.png"
                  alt="Individuell gestalten"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2">Individuell anpassbar</h3>
              <p className="text-gray-600">
                Hunderte von Designs und unbegrenzte Anpassungsmöglichkeiten für Ihren einzigartigen Look.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="relative w-16 h-16 mx-auto mb-6">
                <img
                  src="/trophy_icon.png"
                  alt="Professionell"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2">Professionelles Ergebnis</h3>
              <p className="text-gray-600">
                Hochwertige Designs und modernste Technologie für Ihren überzeugenden Webauftritt.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">
              Starten Sie jetzt Ihre digitale Erfolgsgeschichte
            </h3>
            <p className="text-gray-600">
              
            </p>
            <Link to="/customize">
  <Button size="lg" className="bg-primary hover:bg-primary/90">
    Website erstellen
  </Button>
</Link>

          </div>
        </div>
      </div>
    </section>
  );
}; 