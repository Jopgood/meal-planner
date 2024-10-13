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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LoadingScreen } from "./loading-screen";

const queryClient = new QueryClient();

function AuthenticatedContent({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const setIsLoading = useAuthStore((state) => state.setIsLoading);
  const { hydrate, isHydrating, hasHydrated, hydrationError } =
    useHydrationStore();

  useEffect(() => {
    const handleAuth = async () => {
      if (status === "loading") {
        setIsLoading(true);
      } else {
        setIsLoading(false);

        if (status === "authenticated" && session) {
          if (!hasHydrated && !isHydrating) {
            await hydrate(session);
          }
        } else if (status === "unauthenticated") {
          await hydrate(null);
          router.push("/");
        }
      }
    };

    handleAuth();
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
    return <LoadingScreen message="Authenticating..." />;
  }

  if (hydrationError) {
    return <div>Error: {hydrationError.message}</div>;
  }

  if (status === "authenticated") {
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

  // If not authenticated and not already redirecting, show loading
  return <LoadingScreen message="Redirecting..." />;
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
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthenticatedContent>{children}</AuthenticatedContent>
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
