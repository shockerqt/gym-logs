import { SimpleTooltip } from "@/components/simple-tooltip";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { Exercise, ExerciseSet, MuscleGroup } from "../utils/data";
import { MessageSquareText } from "lucide-react";
import { Link } from "react-router";

interface Props {
  exercise: Exercise;
}

export function ExerciseListItemView({ exercise }: Props) {
  return (
    <Link to={`/exercise/${exercise.id}`}>
      <Card>
        <CardHeader>
          <CardTitle className="flex gap-2 items-center">
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
                <ExerciseSetView key={set.id} exerciseSet={set} index={index} />
                {index < length - 1 && <Separator className="my-2" />}
              </>
            );
          })}
        </CardContent>
      </Card>
    </Link>
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

interface ExerciseSetProps {
  index: number;
  exerciseSet: ExerciseSet;
}

function ExerciseSetView({ index, exerciseSet }: ExerciseSetProps) {
  return (
    <div className="flex items-center">
      <p>{index + 1}.</p>
      <p className="flex-1 text-center">{exerciseSet.reps}</p>
      <MessageSquareText />
    </div>
  );
}
