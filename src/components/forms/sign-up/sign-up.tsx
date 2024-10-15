"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { SignUpFormData, ErrorState } from "./types";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/icons";

const REG =
  /(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{';'?>.<,])(?!.*\s).*$/; //NOSONAR

const formSchema = z.object({
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
  email: z.string().min(1).email({
    message: "Email is required.",
  }),
  password: z.string().regex(REG, {
    message:
      "Password must meet requirements.\n" +
      "- Minimum 8 letters\n" +
      "- Minimum 1 uppercase letter\n" +
      "- Minimum 1 lowercase letter\n" +
      "- Minimum 1 number\n" +
      "- Minimum 1 special character",
  }),
});

interface SignUpFormProps {
  setErrors: React.Dispatch<React.SetStateAction<ErrorState | null>>;
}

export function SignUpForm({ setErrors }: Readonly<SignUpFormProps>) {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    setApiError(null);
    setIsLoading(true);
    try {
      const response = await fetch(`/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 201) {
        router.push("/");
        router.refresh();
      } else if (response.status === 400) {
        const errorData = await response.json();
        setErrors(errorData.errors as ErrorState);
      } else {
        console.error(response);
        setErrors({ general: "Something went wrong" });
      }
    } catch (error) {
      console.error(error);
      setErrors({ general: "An unexpected error occurred" });
    } finally {
      setIsLoading(false);
    }
  };

  // This effect will update the errors in the parent component
  useEffect(() => {
    const formErrors = form.formState.errors;

    if (Object.keys(formErrors).length > 0 || apiError) {
      const errorState: ErrorState = {};
      Object.entries(formErrors).forEach(([key, value]) => {
        errorState[key] = value.message ?? "Invalid field";
      });
      if (apiError) {
        errorState.api = apiError;
      }
      setErrors(errorState);
    } else {
      setErrors(null);
    }
  }, [form.formState.errors, apiError, setErrors]);
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Albert" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Einstein" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="alby-einy@funkyphysicists.com"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="*******" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={isLoading} type="submit">
              {isLoading && <Spinner />} Create an account
            </Button>
          </div>
        </form>
      </Form>
      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link href="/" className="underline">
          Sign in
        </Link>
      </div>
    </>
  );
}
