"use client";

import { cn } from "@/lib/utils";
import { useConfigStore } from "@/stores/config";

export function ThemeWrapper({
  children,
  className,
}: Readonly<React.ComponentProps<"div">>) {
  const config = useConfigStore((state) => state.config);

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
