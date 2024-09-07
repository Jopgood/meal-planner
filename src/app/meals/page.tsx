// Utils
import { z } from "zod";

// Data
import { mealSchema } from "@/components/meals/data/schema";
import { columns } from "@/components/meals/data-table/columns";
import { fetchMeals } from "@/dummy/get-meals";

// Components
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { DataTable } from "@/components/meals/data-table/data-table";

// Simulate a database read for meals.
function getMeals() {
  const meals = fetchMeals();

  return z.array(mealSchema).parse(meals);
}

export default function MealsPage() {
  // Call on data
  const meals = getMeals();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Meals</CardTitle>
        <CardDescription>Manage your meals here.</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable data={meals} columns={columns} />
      </CardContent>
    </Card>
  );
}
