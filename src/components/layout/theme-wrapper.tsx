"use client";

import { useConfig } from "@/hooks/useConfig";
import { cn } from "@/lib/utils";

export function ThemeWrapper({
  children,
  className,
}: Readonly<React.ComponentProps<"div">>) {
  const { config } = useConfig();

  return (
    <div
      className={cn(`theme-${config.theme}`, "w-full", className)}
      style={
        {
          "--radius": `${config.radius}rem`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
