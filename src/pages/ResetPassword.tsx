import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Lock } from "lucide-react";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (newPassword !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwörter stimmen nicht überein",
        description: "Bitte überprüfen Sie Ihre Eingabe",
      });
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      toast({
        title: "Passwort erfolgreich geändert",
        description: "Sie können sich jetzt mit Ihrem neuen Passwort anmelden.",
      });
      
      navigate("/signin");
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
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Neues Passwort festlegen</h1>
            <p className="text-gray-600">
              Bitte geben Sie Ihr neues Passwort ein
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-100">
            <form onSubmit={handlePasswordReset} className="space-y-6">
              {/* New Password Field */}
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-gray-700 flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Neues Passwort
                </Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="pl-4 pr-4 py-2 h-12 bg-white"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700 flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Passwort bestätigen
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-4 pr-4 py-2 h-12 bg-white"
                    placeholder="••••••••"
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
                    Wird gespeichert...
                  </div>
                ) : (
                  "Passwort ändern"
                )}
              </Button>
            </form>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              Das Passwort muss mindestens 6 Zeichen lang sein und sollte Zahlen und Sonderzeichen enthalten.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword; 