// pages/signup.tsx
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignUpForm } from "@/components/forms/sign-up/sign-up";
import ErrorMenu from "@/components/forms/sign-up/error-menu";
import { ErrorState } from "@/components/forms/sign-up/types";

export const description =
  "A sign up form with first name, last name, email and password inside a card. There's an option to sign up with GitHub and a link to login if you already have an account";

export default function SignUpPage() {
  const [errors, setErrors] = useState<ErrorState | null>(null);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex items-center space-x-4">
        <Card className="w-96">
          <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignUpForm setErrors={setErrors} />
          </CardContent>
        </Card>
        <ErrorMenu errors={errors} />
      </div>
    </div>
  );
}
