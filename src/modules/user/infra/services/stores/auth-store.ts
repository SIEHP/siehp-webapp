import { Auth } from "@/modules/user/domain/models";
import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

interface AuthStore {
  auth: Auth | null;
  setAuth: (auth: Auth | null) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist((set) => ({
    auth: null,
    setAuth: (auth) => set({ auth }),
  }), {
    name: 'auth',
    storage: createJSONStorage(() => localStorage),
  }),
);
