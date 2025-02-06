import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus } from "lucide-react";
import { chestAndTricepsWorkout, MuscleGroup, WorkoutSet } from "../utils/data";
import { SimpleTooltip } from "@/components/simple-tooltip";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

export function WorkoutDay() {
  return (
    <div className="">
      <ScrollArea className="h-[80svh]">
        <div className="flex flex-col gap-2">
          {chestAndTricepsWorkout.exercises.map((exercise) => {
            return (
              <Card key={exercise.id}>
                <CardHeader>
                  <CardTitle className="flex gap-2">
                    {exercise.name}
                    <div className="flex gap-1">
                      {exercise.muscleGroups.map((muscleGroup) => (
                        <MuscleGroupIndicator
                          key={muscleGroup.id}
                          muscleGroup={muscleGroup}
                        />
                      ))}
                    </div>
                  </CardTitle>
                  <CardDescription className="flex gap-2"></CardDescription>
                </CardHeader>
                <CardContent>
                  {exercise.sets.map((set, index, { length }) => {
                    return (
                      <>
                        <SetControl key={set.id} set={set} />
                        {index < length - 1 && <Separator className="my-2" />}
                      </>
                    );
                  })}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </ScrollArea>
    </div>
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
  set: WorkoutSet;
}

function SetControl({ set }: SetControlProps) {
  return (
    <div className="flex items-center">
      <Button onClick={() => {}} variant="outline" size="icon">
        <Minus />
      </Button>
      <p className="flex-1 text-center">{set.reps}</p>
      <Button variant="outline" size="icon">
        <Plus />
      </Button>
    </div>
  );
}
