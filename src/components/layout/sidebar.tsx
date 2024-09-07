// Utils
import { usePathname } from "next/navigation";
import Link from "next/link";

// Icons
import { Package2, Soup, FlaskConical } from "lucide-react";

// Components
import { NavItem } from "@/components/layout/nav-item";

// Props
interface SidebarProps {
  isMobile: boolean;
}

export const Sidebar = ({ isMobile }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <nav
      className={`flex flex-col ${
        isMobile ? "gap-6" : "items-center gap-4 px-2 py-4"
      }`}
    >
      <Link
        href="#"
        className={`group flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground ${
          isMobile ? "h-10 w-10" : "h-9 w-9 md:h-8 md:w-8 md:text-base"
        }`}
      >
        <Package2
          className={`transition-all group-hover:scale-110 ${
            isMobile ? "h-5 w-5" : "h-4 w-4"
          }`}
        />
        <span className="sr-only">Meal Planner</span>
      </Link>
      <NavItem
        href="/meals"
        icon={Soup}
        label="Meals"
        isMobile={isMobile}
        isActive={pathname === "/meals"}
      />
      <NavItem
        href="/test"
        icon={FlaskConical}
        label="Testing"
        isMobile={isMobile}
        isActive={pathname === "/test"}
      />
    </nav>
  );
};
