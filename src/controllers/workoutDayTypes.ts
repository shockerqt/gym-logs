export type FormatYearMonth = ReturnType<typeof formatYearMonth>;
export const formatYearMonth = (date: Date) => {
  const year = date.getFullYear().toString();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}` as const;
};

export type WorkoutDay = {
  id: number;
  date: string;
  notes: string | null;
};

export type GetWorkoutDayInput = {
  date: WorkoutDay["date"];
};
export type GetWorkoutDayOutput = WorkoutDay;

export type AddWorkoutDayInput = {
  date: WorkoutDay["date"];
  notes?: WorkoutDay["notes"];
};
export type AddWorkoutDayOutput = {
  id: WorkoutDay["id"];
};

export type UpdateWorkoutDayInput = {
  id: WorkoutDay["id"];
  notes?: WorkoutDay["notes"];
};
export type UpdateWorkoutDayOutput = {
  id: WorkoutDay["id"];
};

export type RemoveWorkoutDayInput = {
  id: WorkoutDay["id"];
};
export type RemoveWorkoutDayOutput = {
  id: WorkoutDay["id"];
};
