import { ContactForm } from "@/components/ContactForm";

const Contact = () => {
  return (
    <div className="min-h-screen bg-white py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-neutral mb-4">
            Kontakt aufnehmen
          </h1>
          <p className="text-xl text-gray-600">
            Haben Sie Fragen? Wir sind hier, um zu helfen.
          </p>
        </div>
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;