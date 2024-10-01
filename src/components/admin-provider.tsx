"use client";
import Validate from "@/lib/auth/validate";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/theme-provider";
import ResponsiveSidebar from "./layout/responsive-sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function AdminProvider({
  session,
  children,
}: Readonly<{
  session: any;
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <Validate>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ResponsiveSidebar user={session?.user}>
              <div className="flex min-h-screen w-full flex-col bg-muted/40">
                <main className="p-4 sm:p-6">{children}</main>
              </div>
            </ResponsiveSidebar>
          </ThemeProvider>
        </Validate>
      </SessionProvider>
    </QueryClientProvider>
  );
}
