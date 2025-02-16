import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Exercises } from "./exercises";
import { AddExerciseButton } from "./add-exercise-button";
import { AddExerciseDialog } from "./add-exercise-dialog";

export function WorkoutDay() {
  const [api, setApi] = useState<CarouselApi>();
  const [scrolledDown, setScrolledDown] = useState(false);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      console.log("select");
      console.log(api);
    });
  }, [api]);

  return (
    <>
      <div className="h-10 pb-1 grid grid-cols-3 px-2 items-center">
        <Button className="justify-self-start" size="icon" variant="ghost">
          <ChevronLeft className="size-5 stroke-2" />
        </Button>
        <Button variant="ghost">Hoy</Button>
        <Button className="justify-self-end" size="icon" variant="ghost">
          <ChevronRight className="size-5 stroke-2" />
        </Button>
      </div>
      <div className="h-[calc(100%-36px)] relative flex flex-col">
        <Carousel setApi={setApi} className="h-full">
          <CarouselContent className="h-full">
            {[0, 1, 2].map((_, index) => (
              <CarouselItem key={index}>
                <Exercises
                  currentDate={index}
                  setScrolledDown={setScrolledDown}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <AddExerciseDialog>
          <AddExerciseButton scrolledDown={scrolledDown} />
        </AddExerciseDialog>
      </div>
    </>
  );
}
