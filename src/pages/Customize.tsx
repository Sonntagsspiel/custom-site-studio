import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Customize = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-neutral mb-4">
            Website anpassen
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Gestalten Sie Ihre Website genau nach Ihren Vorstellungen
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Design-Optionen</h3>
              {/* Placeholder for customization options */}
              <p className="text-gray-600">Anpassungsoptionen kommen hier</p>
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Vorschau</h3>
            {/* Placeholder for preview */}
            <div className="aspect-video bg-neutral-light rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customize;