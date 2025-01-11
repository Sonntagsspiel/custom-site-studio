import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-neutral mb-4">
            Preise
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transparente Preise für jede Unternehmensgröße
          </p>
        </div>

        {/* Placeholder for pricing cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Starter</h3>
            <p className="text-gray-600">Für kleine Unternehmen</p>
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Professional</h3>
            <p className="text-gray-600">Für wachsende Unternehmen</p>
          </div>
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
            <p className="text-gray-600">Für große Unternehmen</p>
          </div>
        </div>

        <div className="text-center">
          <Button asChild className="mx-auto">
            <Link to="/get-started">Jetzt starten</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;