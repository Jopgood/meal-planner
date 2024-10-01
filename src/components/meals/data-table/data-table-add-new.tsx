"use client";

import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { PlusCircleIcon } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";

interface DataTableAddNewProps<TData> {
  table: Table<TData>;
}

export function DataTableAddNew<TData>({
  table,
}: Readonly<DataTableAddNewProps<TData>>) {
  return (
    <Dialog>
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Tacos 🌮" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Type
            </Label>
            <Input id="username" value="Breakfast" className="col-span-3" />
          </div>
        </div>
        <div className="flex mt-[25px] justify-end">
          <DialogClose>
            <Button type="submit">Add meal</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
