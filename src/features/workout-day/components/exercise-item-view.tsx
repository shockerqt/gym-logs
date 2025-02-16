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
import { Flame, MessageCircleMore, TrophyIcon } from "lucide-react";
import { Fragment } from "react";
import { Link } from "react-router";
import { Exercise, ExerciseSet, MuscleGroup } from "../utils/data";

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
              <Fragment key={set.id}>
                <ExerciseSetView exerciseSet={set} />
                {index < length - 1 && <Separator className="my-2" />}
              </Fragment>
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
  exerciseSet: ExerciseSet;
}

function ExerciseSetView({ exerciseSet }: ExerciseSetProps) {
  return (
    <div className="grid grid-cols-[1fr_1fr_100px] items-center justify-items-start">
      <p>
        <b>60</b> kg
      </p>
      <p className="flex-1 text-center">
        <b>{exerciseSet.reps}</b> reps
      </p>
      <div className="justify-self-end flex items-center gap-4">
        <Flame className="size-5 stroke-orange-600" />
        <TrophyIcon className="size-5 stroke-amber-400" />
        <MessageCircleMore className="size-5" />
      </div>
    </div>
  );
}
