"use client";

// Utils
import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

// Components
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "@/components/layout/sidebar";
import { ThemeCustomizer } from "./theme-customizer";

// Icons
import { PanelLeft, Search } from "lucide-react";

export function ResponsiveHeaderSidebar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobile, setIsMobile] = useState(false);

  // Use the App Router's useRouter
  const router = useRouter();
  const { setTheme } = useTheme();

  const handleSignOut = async () => {
    try {
      // Call a custom API route to handle server-side logout
      await fetch("/api/auth/logout", { method: "POST" });

      // Clear client-side NextAuth session
      await signOut({ redirect: false });

      // Clear any client-side storage
      localStorage.clear();
      sessionStorage.clear();

      // Reset theme to default (usually 'light' or 'system')
      setTheme("light"); // or 'system', depending on your default

      // Force a hard reload to clear any lingering state
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="flex min-h-screen">
      {!isMobile && (
        <aside className="fixed inset-y-0 left-0 z-10 w-14 flex-col border-r bg-background">
          <Sidebar isMobile={false} />
        </aside>
      )}
      <div className="flex-1 ml-0 sm:ml-14">
        <header
          className={cn(
            "sticky top-0 z-20 flex h-14 items-center gap-4 px-4 sm:px-6",
            isMobile ? "bg-muted/40 border-b" : "bg-muted/40"
          )}
        >
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                  <PanelLeft className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] sm:max-w-none">
                <Sidebar isMobile={true} />
              </SheetContent>
            </Sheet>
          )}
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Meals</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>All Meals</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Image
                  src="https://avatar.iran.liara.run/public"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ThemeCustomizer />
        </header>
        {children}
      </div>
    </div>
  );
}

export default ResponsiveHeaderSidebar;
