import { Heading } from "../ui/Headings";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import React, { useMemo } from "react";
import Autoplay from "embla-carousel-autoplay";
import ProductCard from "../common/ProductCard";

function ProductSection({
  products = [],
  title,
  carouselBtns = false,
  autoplay = true,
}) {
  const autoplayPlugin = useMemo(
    () =>
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnFocusIn: true,
        stopOnMouseEnter: true,
      }),
    [],
  );

  return (
    <div className="flex flex-col gap-6">
      <Heading size="h4" className={"font-semibold"}>
        {title}
      </Heading>

      <Carousel
        plugins={autoplay ? [autoplayPlugin] : []}
        opts={{
          loop: true,
          align: "start",
        }}
      >
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="basis-1/1 pt-4 md:basis-1/2 xl:basis-1/3 2xl:basis-1/4"
            >
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {carouselBtns && (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        )}
      </Carousel>
    </div>
  );
}

export default ProductSection;
