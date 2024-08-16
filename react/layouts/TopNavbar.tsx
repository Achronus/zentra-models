"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import ProfileMenu from "@/components/ProfileMenu";
import SearchBox from "@/components/SearchBox";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { cn } from "@/lib/utils";
import { NavLink, ProfileMenuItem } from "@/types/core";

type TopNavbarProps = {
  logo: React.ReactNode;
  links: NavLink[];
  centerLinks?: boolean;
  hasSearch?: boolean;
  searchPlaceholder?: string;
  hideThemeToggle?: boolean;
  profileMenuItems?: ProfileMenuItem[][];
};

type MobileNavProps = {
  logo: React.ReactNode;
  links: NavLink[];
};

type LogoProps = {
  children: React.ReactNode;
  isMobile?: boolean;
};

const Logo = ({ isMobile, children }: LogoProps) => {
  return (
    <section
      id="logo"
      className={cn(isMobile ? "flex mb-6" : "hidden md:flex md:min-w-max")}
    >
      <Link
        href="/"
        className="flex items-center gap-2 text-lg font-semibold md:text-base"
      >
        {children}
      </Link>
    </section>
  );
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

const TopNavbar = ({
  logo,
  links,
  centerLinks,
  hasSearch,
  searchPlaceholder,
  hideThemeToggle,
  profileMenuItems,
}: TopNavbarProps) => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Logo>{logo}</Logo>
      <nav
        id="nav-links"
        className={cn(
          "hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6",
          centerLinks && "md:w-full md:justify-center"
        )}
      >
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
      <MobileNav links={links} logo={<Logo isMobile>{logo}</Logo>} />
      <section
        className={cn(
          "flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4",
          centerLinks && "md:w-auto"
        )}
      >
        {hasSearch && (
          <SearchBox
            placeholder={searchPlaceholder ? searchPlaceholder : "Search..."}
            formStyles="ml-auto flex-1 sm:flex-initial"
          />
        )}
        {!hideThemeToggle && <ThemeToggle />}
        {profileMenuItems && <ProfileMenu items={profileMenuItems} />}
      </section>
    </header>
  );
};

export default TopNavbar;
