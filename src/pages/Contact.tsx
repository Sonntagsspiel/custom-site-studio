import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useState } from "react";
import { sendEmail } from "../api/send-email";
import { useToast } from "@/components/ui/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { getOptimizedImageUrl } from "@/lib/image-utils";

// FAQ-Daten
const faqItems = [
  {
    question: "Wie lange dauert die Erstellung einer Website?",
    answer: "Die Dauer variiert je nach Umfang und Komplexität Ihres Projekts. Eine einfache Website kann innerhalb weniger Tage fertig sein, während komplexere Projekte 2-4 Wochen in Anspruch nehmen können."
  },
  {
    question: "Was kostet eine Website?",
    answer: "Die Kosten hängen von Ihren spezifischen Anforderungen ab. Wir bieten verschiedene Pakete an, beginnend bei 499€ für eine Basic-Website. Kontaktieren Sie uns für ein individuelles Angebot."
  },
  {
    question: "Kann ich meine Website später selbst bearbeiten?",
    answer: "Ja, Sie erhalten Zugang zu unserem benutzerfreundlichen Content-Management-System, mit dem Sie Texte, Bilder und andere Inhalte selbstständig aktualisieren können."
  },
  {
    question: "Sind die Websites für mobile Geräte optimiert?",
    answer: "Ja, alle unsere Websites sind vollständig responsive und funktionieren optimal auf allen Geräten - von Smartphones über Tablets bis hin zu Desktop-Computern."
  },
  {
    question: "Bieten Sie auch Hosting und Domain-Services an?",
    answer: "Ja, wir bieten komplette Hosting-Lösungen inklusive Domain-Registrierung an. Unser Hosting ist speziell für optimale Performance und Sicherheit ausgelegt."
  }
];

export const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const emailText = `
Neue Kontaktanfrage über das Kontaktformular

Name: ${form.name}
E-Mail: ${form.email}

Nachricht:
${form.message}
      `;
      await sendEmail(
        "webbuilder.allgemein@gmail.com",
        "Neue Kontaktanfrage",
        emailText
      );
      toast({
        title: "Nachricht gesendet",
        description: "Ihre Nachricht wurde erfolgreich übermittelt.",
      });
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Fehler beim Senden",
        description: "Ihre Nachricht konnte nicht gesendet werden.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section mit großem Hintergrundbild */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="photo-1423666639041-f56000c27a9a.jpeg"
            alt="Contact Us"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/40 backdrop-blur-sm" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 text-white">Kontaktieren Sie uns</h1>
            <p className="text-2xl text-white/90 font-medium">
              Haben Sie Fragen oder möchten Sie mehr über unsere Services erfahren? 
              Wir sind für Sie da.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section mit Bild */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* FAQ Content */}
              <div>
                <h2 className="text-3xl font-bold mb-12">Häufig gestellte Fragen</h2>
                <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
                  <Accordion type="single" collapsible className="space-y-6">
                    {faqItems.map((item, index) => (
                      <AccordionItem 
                        key={index} 
                        value={`item-${index}`} 
                        className="border-b border-gray-200 last:border-0"
                      >
                        <AccordionTrigger className="text-left hover:no-underline">
                          <span className="text-lg font-medium">{item.question}</span>
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
              {/* FAQ Image */}
              <div className="flex justify-center">
                <div className="aspect-[4/3] w-full max-w-lg rounded-2xl overflow-hidden shadow-xl">
                  <OptimizedImage
                    src={getOptimizedImageUrl("photo-1516387938699-a93567ec168e.jpeg", 1000)}
                    alt="Office Environment"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section mit Bild */}
      <section className="py-24 bg-gradient-to-b from-white to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Contact Image */}
              <div className="flex justify-center">
                <div className="aspect-[4/3] w-full max-w-lg rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="wmremove-transformed (5).jpeg"
                    alt="Team Meeting"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Contact Form */}
              <div>
                <div className="mb-12">
                  <h2 className="text-3xl font-bold mb-6">Kontakt aufnehmen</h2>
                  <p className="text-xl text-gray-600">
                    Schreiben Sie uns eine Nachricht - wir melden uns zeitnah bei Ihnen.
                  </p>
                </div>

                {/* Email Contact */}
                <div className="mb-12">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">E-Mail</h3>
                      <p className="text-gray-600">info@webbuilder.com</p>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="space-y-6">
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 md:grid-cols-2 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
                          placeholder="Ihr Name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">E-Mail</label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
                          placeholder="ihre@email.com"
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nachricht</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
                        rows={6}
                        placeholder="Ihre Nachricht"
                        required
                      />
                    </div>
                    <Button
                      className="w-full bg-primary hover:bg-primary/90"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Senden..." : "Nachricht senden"}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;