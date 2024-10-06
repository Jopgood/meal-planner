import type { Meal } from "@/types/meal";

export interface MealState {
  loading: boolean;
  error: string | null;
  addMeal: (newMeal: Partial<Meal>) => Promise<void | ErrorResponse>;
}
