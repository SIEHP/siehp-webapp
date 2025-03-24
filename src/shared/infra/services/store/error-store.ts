import { create } from "zustand";

interface ErrorStore {
  error: Error | null;
  setError: (error: Error | null) => void;
}

export const useErrorStore = create<ErrorStore>()((set) => ({
  error: null,
  setError: (error) => set({ error }),
}));
