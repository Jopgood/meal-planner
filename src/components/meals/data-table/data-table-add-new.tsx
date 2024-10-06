"use client";

import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { PlusCircleIcon } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import AddMealForm from "@/components/forms/meals/add-meal";

interface DataTableAddNewProps<TData> {
  table: Table<TData>;
}

export function DataTableAddNew<TData>({
  table,
}: Readonly<DataTableAddNewProps<TData>>) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="ml-auto h-8 lg:flex">
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          Add
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Meal</DialogTitle>
          <DialogDescription>Create a new meal!</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <AddMealForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
