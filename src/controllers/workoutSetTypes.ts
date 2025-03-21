export type WorkoutSet = {
  id: number;
  workoutExerciseId: number;
  notes: string | null;
  warmup: boolean;
  // computed
  personalRecord: boolean;
  reps: number;
  weight: number;
};

export type GetWorkoutSetInput = {
  id: WorkoutSet["id"];
};
export type GetWorkoutSetOutput = WorkoutSet;

export type AddWorkoutSetInput = {
  notes?: WorkoutSet["notes"];
  warmup?: WorkoutSet["warmup"];
  reps?: WorkoutSet["reps"];
  weight?: WorkoutSet["weight"];
};
export type AddWorkoutSetOutput = {
  id: WorkoutSet["id"];
};

export type UpdateWorkoutSetInput = {
  notes?: WorkoutSet["notes"];
  warmup?: WorkoutSet["warmup"];
  reps?: WorkoutSet["reps"];
  weight?: WorkoutSet["weight"];
};
export type UpdateWorkoutSetOutput = {
  id: WorkoutSet["id"];
};

export type RemoveWorkoutSetInput = {
  id: WorkoutSet["id"];
};
export type RemoveWorkoutSetOutput = {
  id: WorkoutSet["id"];
};
