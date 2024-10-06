import { create } from "zustand";
import { MealState } from "./types";
import { directus } from "@/services/directus";
import { createItem } from "@directus/sdk";

import { useUserStore } from "../user/user";
import { Meal } from "@/types/meal";

export const useMealStore = create<MealState>((set, get) => ({
  loading: false,
  error: null,
  // Actions
  addMeal: async (newMeal) => {
    set({ loading: true });

    try {
      const currentUser = useUserStore.getState().currentUser;
      const token = currentUser?.token;

      console.log(currentUser);

      if (!token) {
        throw new Error("No user token available");
      }

      const api = directus(token);
      await api.request(createItem("meals", newMeal));
    } catch (error: any) {
      console.error(error);

      set({ error: error });
    } finally {
      set({ loading: false });
    }
  },
}));
