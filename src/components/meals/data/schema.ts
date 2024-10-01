import { z } from "zod";

export const mealSchema = z.object({
  id: z.number(),
  name: z.string(),
  type: z.string(),
});

export type Meal = z.infer<typeof mealSchema>;
