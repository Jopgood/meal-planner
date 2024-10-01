"use client";

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
import { useMeals } from "@/hooks/useMeals";

export default function MealsPage() {
  const { data, isLoading, isError } = useMeals();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading meals</div>;

  if (data?.data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Meals</CardTitle>
          <CardDescription>Manage your meals here.</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable data={data?.data} columns={columns} />
        </CardContent>
      </Card>
    );
  }
}
