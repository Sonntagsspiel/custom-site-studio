import { Paintbrush, Layout, Eye } from "lucide-react";

const features = [
  {
    name: "Design-Anpassung",
    description: "Wählen Sie Farben, Schriftarten und Layouts nach Ihren Wünschen.",
    icon: Paintbrush,
  },
  {
    name: "Abschnittsverwaltung",
    description: "Fügen Sie Inhalte wie \"Über uns\", \"Produkte\" oder \"Kontakt\" hinzu.",
    icon: Layout,
  },
  {
    name: "Vorschau in Echtzeit",
    description: "Sehen Sie Änderungen sofort und in Echtzeit.",
    icon: Eye,
  },
];

export const Features = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Schneller erstellen
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-neutral sm:text-4xl">
            Alles was Sie für Ihre Website brauchen
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Unsere Plattform bietet Ihnen alle Werkzeuge, die Sie benötigen, um Ihre
            professionelle Website zu erstellen.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-neutral">
                  <feature.icon
                    className="h-5 w-5 flex-none text-primary"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};