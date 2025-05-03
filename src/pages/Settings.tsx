import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Settings as SettingsIcon, Mail, Bell, Shield } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    marketingEmails: false,
    securityAlerts: true
  });

  const handleSettingChange = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      // Speichern der Einstellungen in der Datenbank
      toast({
        title: "Einstellungen gespeichert",
        description: "Ihre Einstellungen wurden erfolgreich aktualisiert.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Fehler beim Speichern",
        description: error instanceof Error ? error.message : "Ein Fehler ist aufgetreten",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-light to-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <SettingsIcon className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-gray-900">Einstellungen</h1>
          </div>

          {/* Settings Card */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-100">
            {/* Benachrichtigungen */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Benachrichtigungen
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Email-Benachrichtigungen</Label>
                    <p className="text-sm text-gray-500">
                      Erhalten Sie wichtige Updates zu Ihrem Konto
                    </p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={() => handleSettingChange('emailNotifications')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Marketing-Emails</Label>
                    <p className="text-sm text-gray-500">
                      Erhalten Sie Newsletter und Angebote
                    </p>
                  </div>
                  <Switch
                    checked={settings.marketingEmails}
                    onCheckedChange={() => handleSettingChange('marketingEmails')}
                  />
                </div>
              </div>

              {/* Sicherheit */}
              <div className="pt-6 space-y-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Sicherheit
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Sicherheitsbenachrichtigungen</Label>
                      <p className="text-sm text-gray-500">
                        Erhalten Sie Benachrichtigungen über Sicherheitsvorfälle
                      </p>
                    </div>
                    <Switch
                      checked={settings.securityAlerts}
                      onCheckedChange={() => handleSettingChange('securityAlerts')}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="mt-8 pt-6 border-t">
              <Button 
                onClick={handleSaveSettings}
                className="w-full md:w-auto"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-t-2 border-white rounded-full animate-spin" />
                    Wird gespeichert...
                  </div>
                ) : (
                  "Einstellungen speichern"
                )}
              </Button>
            </div>
          </div>

          {/* Info Card */}
          <div className="mt-6 bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              Tipp: Überprüfen Sie regelmäßig Ihre Sicherheitseinstellungen, um Ihr Konto optimal zu schützen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 