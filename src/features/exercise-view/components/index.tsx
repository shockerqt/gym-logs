import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { TypographyH1 } from "@/components/ui/typography";
import {
  chestAndTricepsWorkout,
  WorkoutSet,
} from "@/features/workout-day/utils/data";
import { Minus, Plus } from "lucide-react";

export function ExerciseView() {
  const exercise = chestAndTricepsWorkout.exercises[0];

  return (
    <div>
      <TypographyH1>{exercise.name}</TypographyH1>
      <ScrollArea className="h-[80svh]">
        <Card key={exercise.id}>
          <CardHeader>
            <CardTitle className="flex gap-2 items-center">
              {exercise.name}
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
      </ScrollArea>
    </div>
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
