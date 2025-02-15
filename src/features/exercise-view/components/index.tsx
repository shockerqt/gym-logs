import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { TypographyH1 } from "@/components/ui/typography";
import {
  chestAndTricepsWorkout,
  ExerciseSet,
} from "@/features/workout-day/utils/data";
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
      <div className="flex items-center my-8">
        <Button
          onClick={onChangeButtonClick("weight", -1)}
          variant="outline"
          size="icon"
        >
          <Minus />
        </Button>
        <p className="flex-1 text-center">{weight}</p>
        <Button
          onClick={onChangeButtonClick("weight", 1)}
          variant="outline"
          size="icon"
        >
          <Plus />
        </Button>
      </div>
      <div className="flex items-center my-8">
        <Button
          onClick={onChangeButtonClick("reps", -1)}
          variant="outline"
          size="icon"
        >
          <Minus />
        </Button>
        <p className="flex-1 text-center">{reps}</p>
        <Button
          onClick={onChangeButtonClick("reps", 1)}
          variant="outline"
          size="icon"
        >
          <Plus />
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

interface SetControlProps {
  set: ExerciseSet;
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
