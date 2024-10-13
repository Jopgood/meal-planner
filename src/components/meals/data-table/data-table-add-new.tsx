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

import { PlusCircleIcon } from "lucide-react";
import { AddNewMealForm } from "@/components/forms/add-new-meal/add-new-meal";
import { useDialogStore } from "@/stores/dialog";

interface DataTableAddNewProps<TData> {
  table: Table<TData>;
}

export function DataTableAddNew<TData>({
  table,
}: Readonly<DataTableAddNewProps<TData>>) {
  const { openDialog, closeDialog, isOpen } = useDialogStore();
  const dialogName = "addNewMeal";

  return (
    <Dialog
      open={isOpen(dialogName)}
      onOpenChange={(open) =>
        open ? openDialog(dialogName) : closeDialog(dialogName)
      }
    >
      <DialogTrigger asChild>
        <Button size="sm" className="ml-auto hidden h-8 lg:flex">
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
          <AddNewMealForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
