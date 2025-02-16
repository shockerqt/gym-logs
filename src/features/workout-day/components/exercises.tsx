import { ScrollArea } from "@/components/ui/scroll-area";
import { chestAndTricepsWorkout } from "../utils/data";
import { ExerciseListItemView } from "./exercise-item-view";

interface Props {
  currentDate: number;
  setScrolledDown: (scrolledDown: boolean) => void;
}

export function Exercises({ setScrolledDown }: Props) {
  const handleScroll: React.UIEventHandler<HTMLDivElement> = (e) => {
    const bottom =
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop <=
      e.currentTarget.clientHeight + 4;
    setScrolledDown(bottom);
  };

  return (
    <ScrollArea onScroll={handleScroll} className="h-full overflow-hidden px-1">
      <div className="relative flex flex-col gap-3 pb-[72px]">
        {chestAndTricepsWorkout.exercises.map((exercise) => {
          return <ExerciseListItemView key={exercise.id} exercise={exercise} />;
        })}
      </div>
    </ScrollArea>
  );
}
