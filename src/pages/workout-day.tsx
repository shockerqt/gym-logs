import { getExercises } from "@/controllers/add-exercise";
import { Layout } from "@/features/layout";
import { WorkoutDay } from "@/features/workout-day";
import { Suspense } from "react";

export default function Page() {
  const exercisesPromise = getExercises();
  return (
    <Layout>
      <Suspense>
        <WorkoutDay exercisesPromise={exercisesPromise} />
      </Suspense>
    </Layout>
  );
}
