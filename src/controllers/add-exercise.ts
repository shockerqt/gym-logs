const DB_NAME = "WorkoutDB";
const DB_VERSION = 1;

export const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      if (!event.target || !("result" in event.target)) {
        console.error("Result doesnt exist");
        return;
      }
      const db = event.target.result as IDBDatabase;
      if (!db.objectStoreNames.contains("workouts")) {
        const workoutStore = db.createObjectStore("workouts", {
          keyPath: "id",
          autoIncrement: true,
        });
        workoutStore.createIndex("date", "date", { unique: false });
      }
      if (!db.objectStoreNames.contains("exercises")) {
        const exerciseStore = db.createObjectStore("exercises", {
          keyPath: "id",
          autoIncrement: true,
        });
        exerciseStore.createIndex("workoutId", "workoutId", { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export async function addWorkout(date: Date) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("workouts", "readwrite");
    const store = tx.objectStore("workouts");

    const request = store.add({ date, exercises: [] });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

type Weight = {
  value: number;
  unit: string;
};

type WorkoutSet = {
  id: number;
  reps: number;
  weight: Weight;
  notes?: string;
};

export type Exercise = {
  id: number;
  name: string;
  muscleGroups: MuscleGroup[];
  sets: WorkoutSet[];
};

export type MuscleGroup = {
  id: number;
  name: string;
  color: "indigo" | "red" | "yellow";
};

export async function addExercise(
  workoutId: number,
  name: string,
  reps: number,
  sets: WorkoutSet[] = [],
) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("exercises", "readwrite");
    const store = tx.objectStore("exercises");

    const request = store.add({ workoutId, name, sets, reps });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function getExercises(workoutId?: number): Promise<Exercise[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("exercises", "readonly");
    const store = tx.objectStore("exercises");

    let request: IDBRequest;
    if (workoutId !== undefined) {
      const index = store.index("workoutId");
      request = index.getAll(workoutId);
    } else {
      request = store.getAll();
    }

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
