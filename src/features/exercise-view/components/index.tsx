import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0);

  useEffect(() => {
    setWeight(0);
    setReps(0);
  }, [selectedExerciseId]);

  const onChangeButtonClick =
    (selector: "weight" | "reps", delta: number) => () => {
      const set = selector === "weight" ? setWeight : setReps;
      set((count) => Math.min(count + delta));
    };

  return (
    <div className="my-8">
      <div className="flex items-center justify-center space-x-2 mb-6">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 shrink-0 rounded-full"
          // onClick={() => onClick(-10)}
          // disabled={goal <= 200}
        >
          <Minus />
          <span className="sr-only">Decrease</span>
        </Button>
        <div className="flex-1 text-center">
          <div className="text-7xl font-bold tracking-tighter">{reps}</div>
          <div className="text-[0.70rem] uppercase text-muted-foreground">
            Reps
          </div>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 shrink-0 rounded-full"
          // onClick={() => onClick(10)}
          // disabled={goal >= 400}
        >
          <Plus />
          <span className="sr-only">Increase</span>
        </Button>
      </div>
      <div className="flex items-center justify-center space-x-2 mb-6 px-16">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 shrink-0 rounded-full"
          onClick={() => onChangeButtonClick("weight", -10)}
          // disabled={goal <= 200}
        >
          <Minus />
          <span className="sr-only">Decrease</span>
        </Button>
        <div className="flex-1 text-center">
          <div className="text-5xl font-bold tracking-tighter">{weight}</div>
          <div className="text-[0.70rem] uppercase text-muted-foreground">
            Kgs
          </div>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 shrink-0 rounded-full"
          onClick={() => onChangeButtonClick("weight", +10)}
          // disabled={goal >= 400}
        >
          <Plus />
          <span className="sr-only">Increase</span>
        </Button>
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
