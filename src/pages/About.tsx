import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-neutral mb-4">
            Über uns
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Wir machen die Erstellung professioneller Websites einfach und zugänglich für jedes Unternehmen.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Unsere Mission
            </h2>
            <p className="text-gray-600 mb-6">
              Wir glauben daran, dass jedes Unternehmen eine großartige Online-Präsenz verdient. 
              Mit unserer Plattform machen wir professionelles Webdesign zugänglich für alle.
            </p>
            <Button asChild>
              <Link to="/get-started">Jetzt starten</Link>
            </Button>
          </div>
          <div className="bg-neutral-light rounded-lg p-8">
            {/* Placeholder for image */}
            <div className="aspect-video bg-neutral-dark/10 rounded-lg"></div>
          </div>
        </div>

        <div className="text-center">
          <Button variant="secondary" asChild className="mx-auto">
            <Link to="/customize">Website anpassen</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;