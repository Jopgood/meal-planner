// Utils
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

// Components
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Props
interface NavItemProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  isMobile: boolean;
  isActive?: boolean;
}

export const NavItem = ({
  href,
  icon: Icon,
  label,
  isMobile,
  isActive,
}: NavItemProps) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={href}
          className={cn(
            "flex items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground",
            isMobile
              ? "flex-row justify-start gap-4 px-2.5 w-full h-10"
              : "h-9 w-9 md:h-8 md:w-8",
            isActive && "text-foreground"
          )}
        >
          <Icon className="h-5 w-5" />
          {isMobile && <span>{label}</span>}
          {!isMobile && <span className="sr-only">{label}</span>}
        </Link>
      </TooltipTrigger>
      {!isMobile && <TooltipContent side="right">{label}</TooltipContent>}
    </Tooltip>
  </TooltipProvider>
);
