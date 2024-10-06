"use client";
import { useEffect } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ThemeProvider } from "./layout/theme-provider";
import { ThemeWrapper } from "@/components/layout/theme-wrapper";
import ResponsiveSidebar from "./layout/responsive-sidebar";
import { useAuthStore } from "@/stores/auth";
import { useHydrationStore } from "@/stores/hydration";

import "@/styles/themes.css";

function AuthenticatedContent({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const setIsLoading = useAuthStore((state) => state.setIsLoading);
  const { hydrate, isHydrating, hasHydrated, hydrationError } =
    useHydrationStore();

  useEffect(() => {
    setIsLoading(status === "loading");
    if (status === "authenticated" && session) {
      if (!hasHydrated && !isHydrating) {
        hydrate(session);
      }
    } else if (status === "unauthenticated") {
      hydrate(null);
      router.push("/login");
    }
  }, [
    status,
    session,
    setIsLoading,
    hasHydrated,
    isHydrating,
    hydrate,
    router,
  ]);

  if (status === "loading" || isHydrating) {
    return <div>Loading...</div>;
  }

  if (hydrationError) {
    return <div>Error: {hydrationError.message}</div>;
  }

  return (
    <ThemeWrapper className="relative flex w-full flex-col">
      <ResponsiveSidebar>
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
          <main className="p-4 sm:p-6">{children}</main>
        </div>
      </ResponsiveSidebar>
    </ThemeWrapper>
  );
}

export default function AuthProvider({
  session,
  children,
}: Readonly<{
  session: any;
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <AuthenticatedContent>{children}</AuthenticatedContent>
      </ThemeProvider>
    </SessionProvider>
  );
}
