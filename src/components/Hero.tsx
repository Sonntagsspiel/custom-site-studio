import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-neutral-light py-20 sm:py-32">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
          <div className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
            <h1 className="text-4xl font-bold tracking-tight text-neutral sm:text-5xl md:text-6xl animate-fade-up">
              Erstellen Sie Ihre perfekte Website
              <span className="text-primary"> – ganz einfach und individuell!</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 animate-fade-up [animation-delay:200ms]">
              Unsere Plattform macht es einfach, Ihre eigene Website zu gestalten – ohne
              Programmierkenntnisse. Starten Sie jetzt und bringen Sie Ihr Unternehmen online.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
              <Button
                asChild
                className="animate-fade-up [animation-delay:400ms]"
                size="lg"
              >
                <Link to="/get-started">
                  Jetzt starten
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6">
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="relative w-full transition-all hover:scale-105 duration-300">
                <div className="aspect-[366/729] relative mx-auto max-w-[366px] overflow-hidden rounded-2xl border border-neutral/10 bg-white shadow-2xl">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary to-accent opacity-20 blur-lg" />
                  <div className="absolute inset-0 rounded-2xl bg-neutral-light/80 backdrop-blur-sm" />
                  <div className="absolute inset-0 rounded-2xl border border-neutral-light/20" />
                  {/* Add placeholder content */}
                  <div className="relative h-full p-4">
                    <div className="h-4 w-24 rounded bg-neutral/10 mb-2" />
                    <div className="h-32 rounded-lg bg-neutral/5 mb-4" />
                    <div className="space-y-2">
                      <div className="h-4 w-full rounded bg-neutral/10" />
                      <div className="h-4 w-3/4 rounded bg-neutral/10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};