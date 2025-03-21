import { getWorkoutDay } from "@/controllers/add-exercise";
import { formatYearMonth } from "@/controllers/workoutDayTypes";
import { Layout } from "@/features/layout";
import { WorkoutDay } from "@/features/workout-day";
import { Suspense } from "react";

const date = formatYearMonth(new Date());

export default function Page() {
  const workoutDayPromise = getWorkoutDay({ date });
  return (
    <Layout>
      <Suspense>
        <WorkoutDay getWorkoutDayPromise={workoutDayPromise} />
      </Suspense>
    </Layout>
  );
}
