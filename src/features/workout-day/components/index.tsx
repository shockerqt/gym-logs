import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TypographyH2 } from "@/components/ui/typography";
import { ChevronLeft, ChevronRight, PlusIcon } from "lucide-react";
import { useState } from "react";
import { chestAndTricepsWorkout } from "../utils/data";
import { ExerciseListItemView } from "./exercise-item-view";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const buttonClasses = cva(
  "size-12 rounded-full bg-gray-900 text-gray-50 shadow-lg transition-all hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300",
  {
    variants: {
      expanded: {
        true: "w-32",
        false: "w-12",
      },
    },
  },
);

const iconClasses = cva("size-6", {
  variants: {
    expanded: {
      true: "mr-2",
      false: "",
    },
  },
});

const spanClasses = cva("", {
  variants: {
    expanded: {
      true: "",
      false: "sr-only",
    },
  },
});

export function WorkoutDay() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleScroll: React.UIEventHandler<HTMLDivElement> = (e) => {
    const bottom =
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop <=
      e.currentTarget.clientHeight + 4;
    setIsExpanded(bottom);
  };

  return (
    <>
      <div className="grid grid-cols-3 px-2 mb-4 items-center">
        <Button className="justify-self-start" size="icon" variant="ghost">
          <ChevronLeft className="size-5 stroke-2" />
        </Button>
        <Button variant="ghost">Hoy</Button>
        {/* <TypographyH2 className="justify-self-center">Hoy</TypographyH2> */}
        <Button className="justify-self-end" size="icon" variant="ghost">
          <ChevronRight className="size-5 stroke-2" />
        </Button>
      </div>
      <ScrollArea
        onScroll={handleScroll}
        className="flex-1 overflow-hidden px-1"
      >
        <div className="relative flex flex-col gap-2">
          {chestAndTricepsWorkout.exercises.map((exercise) => {
            return (
              <ExerciseListItemView key={exercise.id} exercise={exercise} />
            );
          })}
          <div className="sticky bottom-0 z-50 size-fit self-end py-2 px-1">
            <Button className={cn(buttonClasses({ expanded: isExpanded }))}>
              <PlusIcon className={cn(iconClasses({ expanded: isExpanded }))} />
              <span className={cn(spanClasses({ expanded: isExpanded }))}>
                Add
              </span>
            </Button>
          </div>
        </div>
      </ScrollArea>
    </>
  );
}
