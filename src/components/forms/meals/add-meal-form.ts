import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useMealStore } from "@/stores/meal/meal";

export const useAddMealForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { addMeal } = useMealStore();

  const form = useForm<MealFormValues>({
    resolver: zodResolver(mealFormSchema),
    defaultValues: {
      name: "Tacos 🌮",
      type: "breakfast",
    },
  });

  const onSubmit = async (values: MealFormValues): Promise<void> => {
    setIsLoading(true);
    const res = await addMeal(values);

    setIsLoading(false);
    console.log("here");
  };

  return { form, onSubmit, isLoading, error };
};

const mealFormSchema = z.object({
  name: z.string().min(1, "Meal must have a name!"),
  type: z.enum(["breakfast", "lunch", "dinner"]),
});

export type MealFormValues = z.infer<typeof mealFormSchema>;
