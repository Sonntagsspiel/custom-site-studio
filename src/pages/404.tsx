import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-white flex flex-col justify-center items-center">
      {/* Hero Section */}
      <section className="relative w-full flex flex-col items-center justify-center py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-4 top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-8 gap-4">
            <span className="text-[7rem] md:text-[9rem] select-none">🚫</span>
            
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold text-primary mb-6">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Seite nicht gefunden</h2>
          <p className="text-lg text-gray-600 mb-8">
            Die von Ihnen gesuchte Seite existiert nicht oder wurde verschoben.<br />
            Bitte überprüfen Sie die URL oder kehren Sie zur Startseite zurück.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link to="/">
              Zur Startseite
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default NotFound; 