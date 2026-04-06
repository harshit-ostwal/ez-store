import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";
import { ImageComp } from "@/components/ui/image";
import React, { useState, useMemo } from "react";
import { Banners } from "@/constants/banner";

function Slider() {
  const [current, setCurrent] = useState(0);

  const autoplayPlugin = useMemo(
    () =>
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnFocusIn: false,
        stopOnMouseEnter: false,
      }),
    [],
  );

  const handleSelect = (api) => {
    const index = api.selectedScrollSnap();
    setCurrent(index);
  };

  return (
    <div className="flex flex-col gap-10">
      <Carousel
        plugins={[autoplayPlugin]}
        opts={{
          loop: true,
          align: "center",
        }}
        setApi={(api) => {
          if (api) {
            api.on("select", () => handleSelect(api));
          }
        }}
      >
        <CarouselContent>
          {Banners.map((event, idx) => (
            <CarouselItem key={idx}>
              <ImageComp
                src={event}
                alt={`Slide ${idx + 1}`}
                className="aspect-5/3 md:aspect-5/2 lg:aspect-6/2 object-cover w-full"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex items-center justify-center gap-2">
        {Banners.map((_, idx) => (
          <span
            key={idx}
            aria-label={`Go to slide ${idx + 1}`}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              current === idx ? "w-8 bg-black" : "bg-muted-foreground w-2",
            )}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;
