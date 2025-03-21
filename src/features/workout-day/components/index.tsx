"use client";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { use, useEffect, useState } from "react";
import { AddExerciseButton } from "./add-exercise-button";
import { AddExerciseDialog } from "./add-exercise-dialog";
import { Exercises } from "./exercises";
import { getWorkoutDay } from "@/controllers/add-exercise";
import {
  formatYearMonth,
  FormatYearMonth,
  GetWorkoutDayOutput,
} from "@/controllers/workoutDayTypes";

interface Props {
  getWorkoutDayPromise: Promise<GetWorkoutDayOutput>;
}

const initialDays = [
  formatYearMonth(new Date(Date.now() - 24 * 60 * 60 * 1000)),
  formatYearMonth(new Date()),
  formatYearMonth(new Date(Date.now() + 24 * 60 * 60 * 1000)),
];

const getDay = (date: Date) => {};

export function WorkoutDay(props: Props) {
  const [api, setApi] = useState<CarouselApi>();
  const [scrolledDown, setScrolledDown] = useState(false);
  const [days, setDays] = useState<Array<FormatYearMonth>>(initialDays);

  const getWorkout = async () => {
    console.log(await props.getWorkoutDayPromise);
  };
  // const workoutDay = use(props.getWorkoutDayPromise);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      if (!api.canScrollPrev()) {
        console.log("select");
        console.log(api);
        setDays((days) => {
          const firstDay = days[0];
          const beforeFirstDay = formatYearMonth(
            new Date(new Date(firstDay).getTime() - 24 * 60 * 60 * 1000),
          );
          const newDays = [...days, beforeFirstDay];
          return newDays;
        });
      }
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
            {days
              .sort((b, a) => new Date(b).getTime() - new Date(a).getTime())
              .map((day) => (
                <CarouselItem key={day}>
                  <Exercises
                    currentDate={new Date(day).getTime()}
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
