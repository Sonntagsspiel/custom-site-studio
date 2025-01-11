import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-neutral mb-2">
            Willkommen zurück
          </h1>
          <p className="text-gray-600">
            Melden Sie sich an, um Ihre Website zu bearbeiten
          </p>
        </div>

        {/* Placeholder for sign in form */}
        <div className="space-y-4 mb-8">
          <div className="border rounded-lg p-4">
            Anmeldeformular kommt hier
          </div>
        </div>

        <div className="text-center">
          <Button asChild variant="ghost" className="mx-auto">
            <Link to="/get-started">Noch kein Konto? Jetzt registrieren</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;