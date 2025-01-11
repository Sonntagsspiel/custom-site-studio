import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-neutral-light py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
          <div className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
            <h1 className="text-4xl font-bold tracking-tight text-neutral sm:text-5xl md:text-6xl">
              Erstellen Sie Ihre perfekte Website
              <span className="text-primary"> – ganz einfach und individuell!</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Unsere Plattform macht es einfach, Ihre eigene Website zu gestalten – ohne
              Programmierkenntnisse. Starten Sie jetzt und bringen Sie Ihr Unternehmen online.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
              <Button
                className="animate-fade-up"
                size="lg"
              >
                Jetzt starten
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6">
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="relative w-full">
                <div className="aspect-[366/729] relative mx-auto max-w-[366px]">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary to-accent opacity-20 blur-lg" />
                  <div className="absolute inset-0 rounded-2xl bg-neutral-light/80 backdrop-blur-sm" />
                  <div className="absolute inset-0 rounded-2xl border border-neutral-light/20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};