import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselApi,
} from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { TypographyH1 } from "@/components/ui/typography";
import { chestAndTricepsWorkout } from "@/features/workout-day/utils/data";
import { cn } from "@/lib/utils";
import { ArrowLeft, MessageSquareText, Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function ExerciseView() {
  const navigate = useNavigate();
  const [selectedExerciseId, setSelectedExerciseId] = useState<number | null>(
    null,
  );
  const exercise = chestAndTricepsWorkout.exercises[0];

  const onSetButtonClick = (exerciseId: number) => () => {
    setSelectedExerciseId((previousValue) =>
      exerciseId === previousValue ? null : exerciseId,
    );
  };

  return (
    <div>
      <div className="flex gap-2">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="size-8" />
        </button>

        <TypographyH1>{exercise.name}</TypographyH1>
      </div>
      <ExerciseControls selectedExerciseId={selectedExerciseId} />
      <ScrollArea className="h-[80svh]">
        <Card key={exercise.id} className="py-4 px-3">
          {exercise.sets.map((set, index, { length }) => {
            const selected = selectedExerciseId === set.id;
            return (
              <>
                <button
                  onClick={onSetButtonClick(set.id)}
                  className={cn(
                    "w-full flex p-2 ",
                    selected ? "bg-accent" : "",
                  )}
                >
                  <p>{index + 1}.</p>
                  <p className="flex-1 text-center">{set.reps}</p>
                  <MessageSquareText />
                </button>
                {index < length - 1 && <Separator className="my-1" />}
              </>
            );
          })}
        </Card>
      </ScrollArea>
    </div>
  );
}

interface ExerciseControls {
  selectedExerciseId: number | null;
}

function ExerciseControls({ selectedExerciseId }: ExerciseControls) {
  const [api, setApi] = useState<CarouselApi>();
  const [api2, setApi2] = useState<CarouselApi>();
  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      console.log("select");
      console.log(api);
      console.log(reps);
    });
  }, [api, reps]);

  useEffect(() => {
    if (!api2) return;

    api2.on("select", (a) => {
      console.log("select");
      console.log("A", a);
      console.log(api2.selectedScrollSnap());
      setWeight(api2.selectedScrollSnap());
      console.log(weight);
    });
  }, [api2, weight]);

  useEffect(() => {
    setWeight(0);
    setReps(0);
  }, [selectedExerciseId]);

  // const onChangeButtonClick =
  //   (selector: "weight" | "reps", delta: number) => () => {
  //     const set = selector === "weight" ? setWeight : setReps;
  //     set((count) => Math.min(count + delta));
  //   };

  return (
    <div className="my-8">
      <div className="px-24 mb-4">
        <Carousel
          setApi={setApi}
          opts={{
            watchFocus(emblaApi, evt) {
              console.log("APIEBMLA", emblaApi);
              console.log("AVE", evt);
            },

            align: "center",
            startIndex: 0,
            active: true,
            skipSnaps: true,
            // dragFree: true,
            // containScroll: false,
            // watchSlides: false,
          }}
        >
          <CarouselContent>
            {Array.from({ length: 100 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="flex-1 text-center select-none">
                  <div className="text-7xl font-bold tracking-tighter">
                    {index}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="text-[0.70rem] uppercase text-muted-foreground text-center select-none">
            Reps
          </div>
          <CarouselPrevious className="size-10" variant="secondary">
            <Minus />
            <span className="sr-only">Previous slide</span>
          </CarouselPrevious>
          <CarouselNext className="size-10" variant="secondary">
            <Plus />
            <span className="sr-only">Previous slide</span>
          </CarouselNext>
        </Carousel>
      </div>
      <div className="px-32 mb-8">
        <Carousel
          setApi={setApi2}
          opts={{
            align: "center",
            startIndex: 0,
            active: true,
            skipSnaps: true,
            // dragFree: true,
            // containScroll: false,
            // watchSlides: false,
          }}
        >
          <CarouselContent>
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="flex-1 text-center select-none">
                  <div className="text-5xl font-bold tracking-tighter">
                    {index}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="text-[0.70rem] uppercase text-muted-foreground text-center select-none">
            Kgs
          </div>
          <CarouselPrevious className="size-8" variant="secondary">
            <Minus />
            <span className="sr-only">Previous slide</span>
          </CarouselPrevious>
          <CarouselNext className="size-8" variant="secondary">
            <Plus />
            <span className="sr-only">Previous slide</span>
          </CarouselNext>
        </Carousel>
      </div>
      <div className="grid grid-flow-col gap-2">
        <Button>Save</Button>
        {selectedExerciseId && (
          <>
            <Button>Update</Button>
            <Button variant="destructive">Delete</Button>
          </>
        )}
      </div>
    </div>
  );
}
