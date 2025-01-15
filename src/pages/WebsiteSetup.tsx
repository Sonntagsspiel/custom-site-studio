const WebsiteSetup = () => {
  return (
    <div className="min-h-screen bg-white py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-neutral mb-4">
            Website Setup Service
          </h1>
          <p className="text-xl text-gray-600">
            Professionelle Einrichtung Ihrer Website
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl border">
              <h2 className="text-2xl font-semibold mb-4">Was wir anbieten</h2>
              <ul className="space-y-4 list-disc pl-6">
                <li>Domain-Registrierung und Konfiguration</li>
                <li>Installation und Einrichtung der Website</li>
                <li>Grundlegende SEO-Optimierung</li>
                <li>Sicherheitskonfiguration</li>
                <li>Performance-Optimierung</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl border">
              <h2 className="text-2xl font-semibold mb-4">Vorteile</h2>
              <ul className="space-y-4 list-disc pl-6">
                <li>Schnelle und professionelle Einrichtung</li>
                <li>Technische Expertise</li>
                <li>Zeit- und Kostenersparnis</li>
                <li>Optimale Performance von Anfang an</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteSetup;