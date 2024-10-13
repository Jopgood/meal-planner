"use client";
// Data
import { columns } from "@/components/meals/data-table/columns";
import { useDirectusQuery } from "@/hooks/useDirectus";
import { Meal } from "@/types/meal";

// Components
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { DataTable } from "@/components/meals/data-table/data-table";

import { LoadingScreen } from "@/components/loading-screen";

export default function MealsPage() {
  const { data, isLoading, error } = useDirectusQuery<Meal[]>("meals");

  if (isLoading) {
    return <LoadingScreen fullScreen={false} message="Fetching data..." />;
  }
  if (error) return <div>Error: {error.message ?? "An error occurred."}</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Meals</CardTitle>
        <CardDescription>Manage your meals here.</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable data={data ?? []} columns={columns} />
      </CardContent>
    </Card>
  );
}
