import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const GetStarted = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-neutral mb-4">
            Erstellen Sie Ihre Website
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            In wenigen Schritten zu Ihrer professionellen Website
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="space-y-8 mb-16">
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">1. Template wählen</h3>
              <p className="text-gray-600 mb-4">
                Wählen Sie aus unseren professionellen Templates
              </p>
              <Button variant="secondary" asChild>
                <Link to="/templates">Templates ansehen</Link>
              </Button>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">2. Anpassen</h3>
              <p className="text-gray-600 mb-4">
                Gestalten Sie Ihre Website nach Ihren Wünschen
              </p>
              <Button variant="secondary" asChild>
                <Link to="/customize">Website anpassen</Link>
              </Button>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">3. Veröffentlichen</h3>
              <p className="text-gray-600 mb-4">
                Machen Sie Ihre Website online verfügbar
              </p>
              <Button variant="secondary" disabled>
                Bald verfügbar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;