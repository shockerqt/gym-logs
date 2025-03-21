import {
  AddWorkoutDayInput,
  AddWorkoutDayOutput,
  GetWorkoutDayInput,
  GetWorkoutDayOutput,
  WorkoutDay,
} from "./workoutDayTypes";
import {
  AddWorkoutExerciseInput,
  AddWorkoutExerciseOutput,
} from "./workoutExerciseTypes";
import {
  AddWorkoutSetInput,
  AddWorkoutSetOutput,
  RemoveWorkoutSetInput,
  UpdateWorkoutSetInput,
} from "./workoutSetTypes";

const DB_NAME = "WorkoutDB";
const DB_VERSION = 1;

let db: IDBDatabase;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      db.createObjectStore("workoutDays", {
        keyPath: "date",
      });
      db.createObjectStore("workoutExercises", {
        keyPath: "id",
        autoIncrement: true,
      });
      db.createObjectStore("workoutSets", {
        keyPath: "id",
        autoIncrement: true,
      });
      db.createObjectStore("exercises", { keyPath: "id", autoIncrement: true });
    };

    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

async function performTransaction<T>(
  storeName: string,
  mode: IDBTransactionMode,
  operation: (store: IDBObjectStore) => IDBRequest,
): Promise<T> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, mode);
    const store = transaction.objectStore(storeName);
    const request = operation(store);

    request.onsuccess = () => {
      resolve(request.result as T);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

async function addWorkoutDay(
  input: AddWorkoutDayInput,
): Promise<AddWorkoutDayOutput> {
  const result = await performTransaction<number>(
    "workoutDays",
    "readwrite",
    (store) => store.add(input),
  );
  return {
    id: result,
  };
}

async function getWorkoutDay(
  input: GetWorkoutDayInput,
): Promise<GetWorkoutDayOutput> {
  try {
    await addWorkoutDay({ date: input.date });
  } catch {
    // do nothing
  }
  const result = await performTransaction<WorkoutDay>(
    "workoutDays",
    "readonly",
    (store) => {
      const index = store.index("date");
      return index.get(input.date);
    },
  );
  return result;
}

export async function addWorkoutExercise(
  input: AddWorkoutExerciseInput,
): Promise<AddWorkoutExerciseOutput> {
  const result = await performTransaction<AddWorkoutSetOutput>(
    "workoutExercises",
    "readonly",
    (store) => store.add(input),
  );
  return result;
}

async function addWorkoutSet(
  input: AddWorkoutSetInput,
): Promise<AddWorkoutSetPayload> {
  const result = await performTransaction<number>(
    "workoutSets",
    "readwrite",
    (store) => store.add(input),
  );
  return { addedSetId: result };
}

async function updateWorkoutSet(
  input: UpdateWorkoutSetInput,
): Promise<UpdateWorkoutSetPayload> {
  await performTransaction<void>("workoutSets", "readwrite", (store) =>
    store.put(input),
  );
  return { updatedSetId: input.id };
}

async function removeWorkoutSet(
  input: RemoveWorkoutSetInput,
): Promise<RemoveWorkoutSetPayload> {
  await performTransaction<void>("workoutSets", "readwrite", (store) =>
    store.delete(input.id),
  );
  return { removedSetId: input.id };
}

export {
  addWorkoutDay,
  addWorkoutSet,
  getWorkoutDay,
  removeWorkoutSet,
  updateWorkoutSet,
};
