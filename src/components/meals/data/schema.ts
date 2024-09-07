import { z } from "zod";

export const mealSchema = z.object({
  id: z.number(),
  title: z.string(),
  label: z.string(),
});

export type Meal = z.infer<typeof mealSchema>;
