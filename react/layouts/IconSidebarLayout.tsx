"use client";

import { PanelLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import ProfileMenu from "@/components/ProfileMenu";
import SearchBox from "@/components/SearchBox";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import BreadcrumbNav from "@/components/BreadcrumbNav";
import { cn } from "@/lib/utils";
import { IconNavLink, ProfileMenuItem } from "@/types/core";

type CoreNavbarProps = {
  logo: React.ReactNode;
  navLinks: IconNavLink[];
  bottomLinks?: IconNavLink[];
};

type LogoProps = {
  children: React.ReactNode;
  isMobile?: boolean;
};

type NavMenuProps = {
  navLinks: IconNavLink[];
  isMobile?: boolean;
};

type TopbarProps = CoreNavbarProps & {
  hasSearch?: boolean;
  hasBreadcrumbNav?: boolean;
  searchPlaceholder?: string;
  hideThemeToggle?: boolean;
  profileMenuItems?: ProfileMenuItem[][];
};

type IconSidebarLayoutProps = TopbarProps & {
  children: React.ReactNode;
};

const Logo = ({ children, isMobile }: LogoProps) => {
  return (
    <Link
      href="/"
      className={cn(
        "group flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base",
        isMobile ? "h-9 w-9 md:h-8 md:w-8" : "h-10 w-10"
      )}
    >
      {children}
    </Link>
  );
};

const NavigationLinks = ({ navLinks, isMobile }: NavMenuProps) => {
  const pathname = usePathname();

  return isMobile ? (
    navLinks.map((link) => (
      <Link
        key={link.name}
        href={link.url}
        className={cn(
          "flex items-center gap-4 px-2.5",
          pathname === link.url
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        {link.icon}
        {link.name}
      </Link>
    ))
  ) : (
    <TooltipProvider>
      {navLinks.map((link) => (
        <Tooltip key={link.name}>
          <TooltipTrigger asChild>
            <Link
              href={link.url}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8",
                pathname === link.url
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground"
              )}
            >
              {link.icon}
              <span className="sr-only">{link.name}</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">{link.name}</TooltipContent>
        </Tooltip>
      ))}
    </TooltipProvider>
  );
};

const MobileNavbar = ({ logo, navLinks, bottomLinks }: CoreNavbarProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col h-full sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <Logo isMobile>{logo}</Logo>
          <NavigationLinks navLinks={navLinks} isMobile />
        </nav>
        {bottomLinks && (
          <nav className="grid gap-6 text-lg font-medium mt-auto">
            <NavigationLinks navLinks={bottomLinks} isMobile />
          </nav>
        )}
      </SheetContent>
    </Sheet>
  );
};

const Sidebar = ({ logo, navLinks, bottomLinks }: CoreNavbarProps) => {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Logo isMobile>{logo}</Logo>
        <NavigationLinks navLinks={navLinks} />
      </nav>
      {bottomLinks && (
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <NavigationLinks navLinks={bottomLinks} />
        </nav>
      )}
    </aside>
  );
};

const Topbar = ({
  logo,
  navLinks,
  bottomLinks,
  hasSearch,
  hasBreadcrumbNav,
  searchPlaceholder,
  hideThemeToggle,
  profileMenuItems,
}: TopbarProps) => {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <MobileNavbar logo={logo} navLinks={navLinks} bottomLinks={bottomLinks} />
      {hasBreadcrumbNav && <BreadcrumbNav />}
      <section className="flex ml-auto gap-4">
        {hasSearch && (
          <SearchBox
            placeholder={searchPlaceholder}
            formStyles="ml-auto flex-1 sm:flex-initial"
          />
        )}
        {!hideThemeToggle && <ThemeToggle />}
        {profileMenuItems && <ProfileMenu items={profileMenuItems} />}
      </section>
    </header>
  );
};

const IconSidebarLayout = ({
  logo,
  navLinks,
  bottomLinks,
  hasSearch,
  hasBreadcrumbNav,
  searchPlaceholder,
  hideThemeToggle,
  profileMenuItems,
  children,
}: IconSidebarLayoutProps) => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar logo={logo} navLinks={navLinks} bottomLinks={bottomLinks} />
      <section className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Topbar
          logo={logo}
          navLinks={navLinks}
          bottomLinks={bottomLinks}
          hasSearch={hasSearch}
          hasBreadcrumbNav={hasBreadcrumbNav}
          searchPlaceholder={searchPlaceholder}
          hideThemeToggle={hideThemeToggle}
          profileMenuItems={profileMenuItems}
        />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </section>
    </div>
  );
};

export default IconSidebarLayout;
