import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const OrderSaved = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="max-w-xl w-full bg-gray-50 p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4 text-yellow-600">Achtung!</h1>
        <p className="text-xl mb-6">
          Sie haben Ihre Angaben <b>nur gespeichert</b>.<br />
          <span className="text-red-500 font-semibold">Ihre Bestellung wurde noch <u>nicht</u> abgeschickt!</span>
        </p>
        <p className="mb-8 text-gray-600">
          Sie können Ihre Angaben später weiterbearbeiten oder jetzt die Bestellung abschließen.
        </p>
        <div className="flex flex-col gap-4">
          <Link to="/order/checkout">
            <Button className="w-full bg-primary hover:bg-primary/90">
              Jetzt Bestellung abschließen
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline" className="w-full">
              Zur Startseite
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSaved; 