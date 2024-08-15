"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { cn } from "@/lib/utils";
import { NavLink } from "@/types/core";

type MobileNavProps = {
  logo: React.ReactNode;
  links: NavLink[];
};

const MobileNav = ({ logo, links }: MobileNavProps) => {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        {logo}
        <nav className="grid gap-6 text-lg font-medium">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.url}
              className={cn(
                "transition-colors hover:text-foreground",
                pathname === link.url
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
