import { createClient } from "@supabase/supabase-js";
// import { Database } from './database.types'; // TODO
import { observable } from "@legendapp/state";
import {
  configureSyncedSupabase,
  syncedSupabase,
} from "@legendapp/state/sync-plugins/supabase";
import { v4 as uuidv4 } from "uuid";
import { configureObservableSync } from "@legendapp/state/sync";
import { ObservablePersistMMKV } from "@legendapp/state/persist-plugins/mmkv";

// Global configuration
configureObservableSync({
  // Use react-native-mmkv in React Native
  persist: {
    plugin: ObservablePersistMMKV,
  },
});

const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
);

// provide a function to generate ids locally
const generateId = () => uuidv4();
// Set global configuration
configureSyncedSupabase({
  generateId,
  changesSince: "last-sync",
  fieldCreatedAt: "created_at",
  fieldUpdatedAt: "updated_at",
  // Optionally enable soft deletes
  fieldDeleted: "deleted",
});
const uid = "";

export const todos$ = observable(
  syncedSupabase({
    supabase,
    collection: "todos",
    // Optional:
    // Select only id and text fields
    select: (from) =>
      from.select("id,counter,text,done,created_at,updated_at,deleted"),
    // Filter by the current user
    // filter: (select) => select.eq('user_id', uid),
    // Don't allow delete
    actions: ["read", "create", "update", "delete"],
    // Realtime filter by user_id
    realtime: true,
    // Persist data and pending changes locally
    persist: { name: "todos", retrySync: true },
  }),
);

export function addTodo(text: string) {
  const id = generateId();
  // Add keyed by id to the messages$ observable to trigger a create in Supabase
  todos$[id].set({
    id,
    text,
  });
}

export function toggleDone(id: string) {
  todos$[id].done.set((prev) => !prev);
}
