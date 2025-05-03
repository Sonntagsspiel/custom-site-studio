import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Home } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { sendEmail } from "../api/send-email";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData;
  const { toast } = useToast();

  useEffect(() => {
    const sendConfirmationEmail = async () => {
      try {
        if (!formData) {
          console.log('No form data available');
          return;
        }

        console.log('Starting email process with form data:', formData);

        // Formatiere die ausgewählten Seiten
        const selectedPages = formData.websiteContent.pages
          .filter(page => page.isSelected)
          .map(page => {
            const selectedSubsections = page.subsections
              .filter(sub => sub.isSelected)
              .map(sub => `    - ${sub.title}`)
              .join('\n');
            return `  ${page.title}:\n${selectedSubsections}`;
          })
          .join('\n');

        // Formatiere die Wartungsoptionen
        const selectedMaintenance = Object.entries(formData.hostingSettings.maintenance)
          .filter(([_, value]) => value)
          .map(([key]) => `    - ${key}`)
          .join('\n');

        const emailContent = `
WEBBUILDER ACCOUNT
------------------
Account E-Mail: ${formData.userEmail || 'Nicht angegeben'}

Neue Website-Anfrage von ${formData.generalInfo.companyName}

Zeitpunkt der Anfrage: ${new Date().toLocaleString('de-DE')}

ALLGEMEINE INFORMATIONEN
-----------------------
Unternehmen: ${formData.generalInfo.companyName}
Branche: ${formData.generalInfo.industry}
Standort: ${formData.generalInfo.location}
Zielgruppe: ${formData.generalInfo.targetAudience}
Website-Ziele: ${formData.generalInfo.websiteGoals}

AUSGEWÄHLTE SEITEN & FUNKTIONEN
------------------------------
${selectedPages}

DESIGN & BRANDING
---------------
Primärfarbe: ${formData.designSettings.primaryColor}
Sekundärfarbe: ${formData.designSettings.secondaryColor}
Hauptschriftart: ${formData.designSettings.primaryFont}
Textschriftart: ${formData.designSettings.secondaryFont}
Design-Modus: ${formData.designSettings.theme}
Animationen: ${formData.designSettings.enableAnimations ? 'Aktiviert' : 'Deaktiviert'}
Anzahl Medien: ${formData.designSettings.media?.length || 0}

HOSTING & ZEITPLAN
----------------
Domain: ${formData.hostingSettings.domain.type === 'existing' 
  ? formData.hostingSettings.domain.existingDomain 
  : formData.hostingSettings.domain.type === 'new'
  ? 'Neue Domain gewünscht'
  : 'Noch unentschieden'}
Hosting-Paket: ${formData.hostingSettings.hosting.package}
Fertigstellung bis: ${formData.hostingSettings.timeline.deadline || 'Nicht angegeben'}
Budget: ${formData.hostingSettings.timeline.maxBudget === 'small' ? 'Bis 2.000€' :
        formData.hostingSettings.timeline.maxBudget === 'medium' ? '2.000€ - 5.000€' :
        formData.hostingSettings.timeline.maxBudget === 'large' ? 'Über 5.000€' :
        'Noch unentschieden'}

Wartung & Support:
${selectedMaintenance || '    Keine Wartung ausgewählt'}
`;

        console.log('Attempting to send email with content:', emailContent);

        const result = await sendEmail(
          'webbuilder.allgemein@gmail.com',
          `Neue Website-Anfrage: ${formData.generalInfo.companyName}`,
          emailContent
        );

        console.log('Send email result:', result);

        toast({
          title: "E-Mail versendet",
          description: "Die Bestätigungs-E-Mail wurde erfolgreich versendet.",
        });
        
      } catch (error) {
        console.error("Detailed error:", error);
        toast({
          variant: "destructive",
          title: "Fehler beim E-Mail-Versand",
          description: error instanceof Error ? error.message : "Die Bestätigungs-E-Mail konnte nicht versendet werden.",
        });
      }
    };

    if (formData) {
      console.log('UseEffect triggered with formData');
      sendConfirmationEmail();
    }
  }, [formData, toast]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardContent className="pt-6 text-center space-y-6">
          <div className="flex justify-center">
            <CheckCircle2 className="h-20 w-20 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Vielen Dank für Ihre Anfrage!</h1>
          <p className="text-gray-600">
            Wir haben Ihre Website-Konfiguration erfolgreich erhalten und werden uns zeitnah mit Ihnen in Verbindung setzen.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
            <p>
              Sie erhalten in Kürze eine Bestätigungs-E-Mail mit einer Zusammenfassung Ihrer Anfrage.
            </p>
          </div>
          <Button 
            className="gap-2" 
            onClick={() => navigate("/")}
          >
            <Home className="h-4 w-4" />
            Zurück zur Startseite
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderConfirmation; 