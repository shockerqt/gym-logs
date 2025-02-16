import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { type PropsWithChildren, useEffect, useState } from "react";

export function WorkoutsCarousel({ children }: PropsWithChildren) {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      // Do something on select.
    });
  }, [api]);

  return (
    <Carousel setApi={setApi}>
      <CarouselContent>
        <CarouselItem>...</CarouselItem>
        <CarouselItem>...</CarouselItem>
        <CarouselItem>...</CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}
