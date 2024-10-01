import { readItems } from "@directus/sdk";
import { directus } from "./directus";
import { Meal, MealResponse } from "../types/meal";

export const fetchMeals = async (): Promise<MealResponse> => {
  const api = directus("ddpBUrdsayc5vnJG-Hz4n-F2AgXcHSfW");

  const response = await api.request(readItems("meals"));

  return {
    data: response as Meal[],
  };
};
