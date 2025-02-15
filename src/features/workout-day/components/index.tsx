import { SimpleTooltip } from "@/components/simple-tooltip";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { Minus, Plus } from "lucide-react";
import {
  chestAndTricepsWorkout,
  ExerciseSet,
  MuscleGroup,
} from "../utils/data";
import { ExerciseListItemView } from "./exercise-item-view";
import { TypographyH2 } from "@/components/ui/typography";

export function WorkoutDay() {
  return (
    <>
      <TypographyH2>Lunes</TypographyH2>
      <ScrollArea className="flex-1 overflow-hidden">
        <div className="flex flex-col gap-2">
          {chestAndTricepsWorkout.exercises.map((exercise) => {
            return (
              <ExerciseListItemView key={exercise.id} exercise={exercise} />
            );
          })}
        </div>
      </ScrollArea>
    </>
  );
}

interface MuscleGroupIndicatorProps {
  muscleGroup: MuscleGroup;
}

function MuscleGroupIndicator({ muscleGroup }: MuscleGroupIndicatorProps) {
  const muscleIndicatorVariants = cva("h-4 w-4 bg-amber-50 rounded-full", {
    variants: {
      variant: {
        indigo: "bg-indigo-400",
        yellow: "bg-yellow-400",
        red: "bg-red-400",
      },
    },
  });

  return (
    <SimpleTooltip key={muscleGroup.id} title={muscleGroup.name}>
      <div
        className={cn(
          "h-4 w-4 rounded-full",
          muscleIndicatorVariants({
            variant: muscleGroup.color,
          }),
        )}
      />
    </SimpleTooltip>
  );
}

interface SetControlProps {
  workoutSet: ExerciseSet;
}

function SetControl({ workoutSet }: SetControlProps) {
  return (
    <div className="flex items-center">
      <Button onClick={() => {}} variant="outline" size="icon">
        <Minus />
      </Button>
      <p className="flex-1 text-center">{workoutSet.reps}</p>
      <Button variant="outline" size="icon">
        <Plus />
      </Button>
    </div>
  );
}
