import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "@/styles/globals.css";

import { cn } from "@/lib/utils";
import { LoadingScreen } from "@/components/loading-screen";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import ErrorHandler from "@/components/error-handler";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Meal Planner",
  description: "A web app for planning meals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Suspense fallback={<LoadingScreen message="Loading..." />}>
          {children}
        </Suspense>
        <Toaster />
        <ErrorHandler />
      </body>
    </html>
  );
}
