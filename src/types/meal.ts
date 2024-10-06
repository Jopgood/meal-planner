export interface Meal {
  id: string;
  name: string;
  type: MealType;
  description: string;
  created_at: string;
  updated_at: string;
}

export type MealType = "breakfast" | "lunch" | "dinner";

export type MealResponse = {
  data: Meal[];
};
