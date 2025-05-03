import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Mail, ArrowLeft } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setSubmitted(true);
      toast({
        title: "E-Mail wurde versendet",
        description: "Bitte überprüfen Sie Ihren Posteingang für weitere Anweisungen.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Fehler beim Zurücksetzen",
        description: error instanceof Error ? error.message : "Ein Fehler ist aufgetreten",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-light to-white">
      <div className="container mx-auto px-4 h-screen flex flex-col items-center justify-center">
        <div className="w-full max-w-md">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Passwort zurücksetzen</h1>
            <p className="text-gray-600">
              {submitted 
                ? "Überprüfen Sie Ihre E-Mails für weitere Anweisungen" 
                : "Geben Sie Ihre E-Mail-Adresse ein"}
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-100">
            {!submitted ? (
              <form onSubmit={handleResetPassword} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-4 pr-4 py-2 h-12 bg-white"
                      placeholder="ihre@email.com"
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg transition-all transform hover:scale-[1.02]"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
                      Wird gesendet...
                    </div>
                  ) : (
                    "Link zum Zurücksetzen senden"
                  )}
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-6">
                <div className="bg-green-50 text-green-800 p-4 rounded-lg">
                  <p>Eine E-Mail mit weiteren Anweisungen wurde an {email} gesendet.</p>
                </div>
                <Button 
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                  className="w-full"
                >
                  Erneut senden
                </Button>
              </div>
            )}

            {/* Back to Sign In */}
            <div className="mt-6 text-center">
              <Link 
                to="/signin" 
                className="text-primary hover:text-primary/80 inline-flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Zurück zur Anmeldung
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              Benötigen Sie Hilfe?{" "}
              <Link to="/contact" className="text-primary hover:underline">
                Kontaktieren Sie uns
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 