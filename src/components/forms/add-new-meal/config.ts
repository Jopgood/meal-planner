import { z } from "zod";

export const MealTypeSchema = z.object({
  value: z.string(),
  label: z.string(),
});

export const FormSchema = z.object({
  name: z
    .string({
      required_error: "Please enter a name for your meal.",
    })
    .min(1, "Name must not be empty."),
  type: MealTypeSchema,
});
