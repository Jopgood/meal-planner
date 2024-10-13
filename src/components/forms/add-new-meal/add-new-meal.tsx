"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { labels } from "@/components/meals/data/data";
import { FormSchema } from "./config";
import { createItem } from "@/lib/api";
import { ToastAction } from "@/components/ui/toast";
import { useDialogStore } from "@/stores/dialog";
import { formatResponseForToast } from "@/utils/format-response-from-toast";
import { useQueryClient } from "@tanstack/react-query";

export function AddNewMealForm() {
  const closeDialog = useDialogStore((state) => state.closeDialog);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "Tacos 🌮",
      type: {
        value: "breakfast",
        label: "Breakfast",
      },
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const res = await createItem(
      "meals",
      {
        name: data.name,
        type: data.type.value,
      },
      queryClient
    );

    if (!res) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } else {
      closeDialog("addNewMeal");
      toast({
        title: "You created a new meal! Here it is:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{formatResponseForToast(res)}</code>
          </pre>
        ),
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input autoFocus={false} {...field} />
              </FormControl>
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {labels?.map((label) => (
                    <SelectItem key={label.label} value={label.value}>
                      {label.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage meal types in your{" "}
                <Link className="hover:underline" href="#">
                  profile settings
                </Link>
                .
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
