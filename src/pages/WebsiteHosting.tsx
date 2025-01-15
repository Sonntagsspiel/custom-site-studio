const WebsiteHosting = () => {
  return (
    <div className="min-h-screen bg-white py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-neutral mb-4">
            Website Hosting Service
          </h1>
          <p className="text-xl text-gray-600">
            Zuverlässiges und sicheres Hosting für Ihre Website
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl border">
              <h2 className="text-2xl font-semibold mb-4">Hosting Features</h2>
              <ul className="space-y-4 list-disc pl-6">
                <li>99.9% Uptime-Garantie</li>
                <li>SSL-Zertifikate inklusive</li>
                <li>Tägliche Backups</li>
                <li>DDoS-Schutz</li>
                <li>24/7 Monitoring</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl border">
              <h2 className="text-2xl font-semibold mb-4">Technische Details</h2>
              <ul className="space-y-4 list-disc pl-6">
                <li>SSD-Speicher</li>
                <li>Unbegrenzter Traffic</li>
                <li>Automatische Skalierung</li>
                <li>CDN-Integration</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteHosting;