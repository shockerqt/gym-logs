import { ScrollArea } from "@/components/ui/scroll-area";
import { TypographyH2 } from "@/components/ui/typography";
import { chestAndTricepsWorkout } from "../utils/data";
import { ExerciseListItemView } from "./exercise-item-view";

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
