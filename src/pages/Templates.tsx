import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const templates = [
  {
    id: 1,
    name: "Portfolio",
    category: "portfolio",
    description: "Perfekt für Kreative und Freelancer",
  },
  {
    id: 2,
    name: "E-Commerce",
    category: "ecommerce",
    description: "Ideal für Online-Shops",
  },
  {
    id: 3,
    name: "Corporate",
    category: "corporate",
    description: "Professionell für Unternehmen",
  },
];

const Templates = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-neutral mb-4">
            Website Templates
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Wählen Sie aus unserer Sammlung professioneller Templates und passen Sie sie an Ihre Bedürfnisse an.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {templates.map((template) => (
            <div key={template.id} className="border rounded-lg p-6">
              <div className="aspect-video bg-neutral-light rounded-lg mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
              <p className="text-gray-600 mb-4">{template.description}</p>
              <Button variant="secondary" asChild className="w-full">
                <Link to={`/customize?template=${template.id}`}>
                  Template anpassen
                </Link>
              </Button>
            </div>
          ))}
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

export default Templates;