// Definición de tipos
export type Exercise = {
  id: number;
  name: string;
  muscleGroups: MuscleGroup[];
  sets: ExerciseSet[];
};

export type MuscleGroup = {
  id: number;
  name: string;
  color: "indigo" | "red" | "yellow";
};

export type ExerciseSet = {
  id: number;
  reps: number;
  weight: number; // en kg o lbs
  notes?: string; // para técnicas avanzadas (e.g., forced reps, negatives, etc.)
};

type Workout = {
  id: number;
  date: string; // fecha del entrenamiento
  muscleGroup: string; // grupo muscular (e.g., "Chest and Triceps")
  exercises: Exercise[];
};

// Ejemplo de un workout
export const chestAndTricepsWorkout: Workout = {
  id: 1,
  date: "2023-10-25",
  muscleGroup: "Chest and Triceps",
  exercises: [
    {
      id: 1,
      name: "Bench Press",
      muscleGroups: [
        { id: 1, name: "chest", color: "indigo" },
        { id: 2, name: "triceps", color: "red" },
      ],
      sets: [
        { id: 1, reps: 10, weight: 100, notes: "Warm-up set" },
        { id: 2, reps: 8, weight: 120 },
        { id: 3, reps: 6, weight: 140, notes: "2 forced reps" }, // Repeticiones forzadas
      ],
    },
    {
      id: 2,
      name: "Incline Dumbbell Press",
      muscleGroups: [
        { id: 1, name: "chest", color: "indigo" },
        { id: 3, name: "shoulders", color: "yellow" },
      ],
      sets: [
        { id: 1, reps: 12, weight: 40 },
        { id: 2, reps: 10, weight: 45 },
        {
          id: 3,
          reps: 8,
          weight: 50,
          notes: "Drop set: 8 reps at 50 lbs → 6 reps at 40 lbs",
        }, // Drop set
      ],
    },
    {
      id: 3,
      name: "Tricep Dips",
      muscleGroups: [{ id: 2, name: "triceps", color: "red" }],
      sets: [
        { id: 1, reps: 15, weight: 0, notes: "Bodyweight" },
        {
          id: 2,
          reps: 12,
          weight: 0,
          notes: "Bodyweight + 4-second negatives",
        }, // Repeticiones negativas
      ],
    },
    {
      id: 4,
      name: "Cable Flyes",
      muscleGroups: [{ id: 1, name: "chest", color: "indigo" }],
      sets: [
        { id: 1, reps: 12, weight: 30 },
        { id: 2, reps: 10, weight: 35, notes: "Partial reps (top half)" }, // Repeticiones parciales
      ],
    },
    {
      id: 5,
      name: "Bench Press",
      muscleGroups: [
        { id: 1, name: "chest", color: "indigo" },
        { id: 2, name: "triceps", color: "red" },
      ],
      sets: [
        { id: 1, reps: 10, weight: 100, notes: "Warm-up set" },
        { id: 2, reps: 8, weight: 120 },
        { id: 3, reps: 6, weight: 140, notes: "2 forced reps" }, // Repeticiones forzadas
      ],
    },
    {
      id: 7,
      name: "Incline Dumbbell Press",
      muscleGroups: [
        { id: 1, name: "chest", color: "indigo" },
        { id: 3, name: "shoulders", color: "yellow" },
      ],
      sets: [
        { id: 1, reps: 12, weight: 40 },
        { id: 2, reps: 10, weight: 45 },
        {
          id: 3,
          reps: 8,
          weight: 50,
          notes: "Drop set: 8 reps at 50 lbs → 6 reps at 40 lbs",
        }, // Drop set
      ],
    },
    {
      id: 8,
      name: "Tricep Dips",
      muscleGroups: [{ id: 2, name: "triceps", color: "red" }],
      sets: [
        { id: 1, reps: 15, weight: 0, notes: "Bodyweight" },
        {
          id: 2,
          reps: 12,
          weight: 0,
          notes: "Bodyweight + 4-second negatives",
        }, // Repeticiones negativas
      ],
    },
    {
      id: 9,
      name: "Cable Flyes",
      muscleGroups: [{ id: 1, name: "chest", color: "indigo" }],
      sets: [
        { id: 1, reps: 12, weight: 30 },
        { id: 2, reps: 10, weight: 35, notes: "Partial reps (top half)" }, // Repeticiones parciales
      ],
    },
  ],
};
