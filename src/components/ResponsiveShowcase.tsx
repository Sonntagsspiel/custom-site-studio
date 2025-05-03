export const ResponsiveShowcase = () => {
  return (
    <section className="py-24 bg-neutral-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">
          Perfekt auf allen Geräten
        </h2>
        <p className="text-center text-gray-600 mb-16">
          Ihre Website passt sich automatisch an - vom Smartphone bis zum Desktop-Computer.
        </p>

        {/* Mobile Optimierung */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h3 className="text-2xl font-bold mb-4">Optimiert für mobile Geräte</h3>
            <p className="text-gray-600 mb-6">
              Ihre Website sieht auf jedem Smartphone großartig aus. Mit optimierter
              Navigation und Touch-Bedienung bieten Sie Ihren mobilen Besuchern
              das beste Erlebnis.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold">Touch-optimiert</h4>
                  <p className="text-sm text-gray-600">Große Buttons und intuitive Touch-Gesten für einfache Bedienung</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold">Schnell & Effizient</h4>
                  <p className="text-sm text-gray-600">Optimierte Ladezeiten und effiziente Darstellung aller Inhalte</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="/mobile-preview.jpg"
              alt="Mobile Vorschau"
              className="w-64 mx-auto"
            />
          </div>
        </div>

        {/* Desktop Optimierung */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <img
              src="/desktop-preview.jpg"
              alt="Desktop Vorschau"
              className="w-full object-contain"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h3 className="text-2xl font-bold mb-4">Beeindruckend auf dem Desktop</h3>
            <p className="text-gray-600 mb-6">
              Auf großen Bildschirmen entfaltet sich Ihre Website in voller Pracht. Mit
              großformatigen Bildern und übersichtlichem Layout schaffen Sie einen
              bleibenden Eindruck.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold">Großbildschirm-optimiert</h4>
                  <p className="text-sm text-gray-600">Perfekte Ausnutzung des verfügbaren Platzes mit eleganten Layouts</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold">Erweiterte Funktionen</h4>
                  <p className="text-sm text-gray-600">Zusätzliche Interaktionsmöglichkeiten und detailreiche Darstellung</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 