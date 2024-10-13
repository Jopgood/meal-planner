import { create } from "zustand";
import { ErrorState } from "./types";

export const useErrorStore = create<ErrorState>((set) => ({
  errors: [],
  addError: (message, action) =>
    set((state) => ({
      errors: [...state.errors, { id: Date.now().toString(), message, action }],
    })),
  removeError: (id) =>
    set((state) => ({
      errors: state.errors.filter((error) => error.id !== id),
    })),
  clearErrors: () => set({ errors: [] }),
}));
