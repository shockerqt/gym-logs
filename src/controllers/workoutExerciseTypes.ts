export type WorkoutExercise = {
  id: number;
  workoutId: number;
  exerciseId: number;
};

export type GetWorkoutExerciseInput = {
  id: WorkoutExercise["id"];
};
export type GetWorkoutExerciseOutput = WorkoutExercise;

export type AddWorkoutExerciseInput = {
  workoutId: WorkoutExercise["workoutId"];
  exerciseId: WorkoutExercise["exerciseId"];
};
export type AddWorkoutExerciseOutput = {
  id: WorkoutExercise["id"];
};

export type RemoveWorkoutExerciseInput = {
  id: WorkoutExercise["id"];
};
export type RemoveWorkoutExerciseOutput = {
  id: WorkoutExercise["id"];
};
