import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

const reviews = [
  {
    text: "Unsere neue Website war in wenigen Minuten fertig – unglaublich einfach!",
    author: "Max Mustermann",
    role: "CEO, Musterfirma GmbH"
  },
  {
    text: "Die Anpassungsmöglichkeiten sind genau das, was wir gesucht haben.",
    author: "Anna Schmidt",
    role: "Marketing Director, Schmidt & Co"
  },
  {
    text: "Hervorragender Support und intuitive Bedienung!",
    author: "Thomas Weber",
    role: "Inhaber, Weber Design"
  }
];

export const ReviewsCarousel = () => {
  const [autoplayPlugin] = useState(() => 
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [autoplayPlugin]
  );

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('pointerDown', () => {
        autoplayPlugin.stop();
      });

      emblaApi.on('pointerUp', () => {
        autoplayPlugin.reset();
      });
    }
  }, [emblaApi, autoplayPlugin]);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <h2 className="text-lg font-semibold leading-8 tracking-tight text-primary text-center mb-4">
        Testimonials
      </h2>
      <p className="mt-2 text-3xl font-bold tracking-tight text-neutral sm:text-4xl text-center mb-12">
        Von unseren Kunden empfohlen
      </p>
      
      <Carousel
        ref={emblaRef}
        className="w-full"
        opts={{
          align: "center",
          loop: true,
        }}
      >
        <CarouselContent>
          {reviews.map((review, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-900/5 h-full">
                <div className="gap-x-4">
                  <div className="text-sm leading-6">
                    <p className="text-gray-600">{review.text}</p>
                    <p className="mt-4 font-semibold text-neutral">{review.author}</p>
                    <p className="text-gray-600">{review.role}</p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
};