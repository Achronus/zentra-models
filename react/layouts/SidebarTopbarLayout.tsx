"use client";

import { Bell, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import ProfileMenu from "@/components/ProfileMenu";
import SearchBox from "@/components/SearchBox";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { cn } from "@/lib/utils";
import { NavLink, ProfileMenuItem } from "@/types/core";

type CoreNavProps = {
  logo: React.ReactNode;
  navLinks: NavLink[];
};

type SidebarProps = CoreNavProps & {
  hasNotifications?: boolean;
};

type TopNavbarProps = CoreNavProps & {
  hasSearch?: boolean;
  searchPlaceholder?: string;
  hideThemeToggle?: boolean;
  profileMenuItems?: ProfileMenuItem[][];
};

type LogoProps = {
  children: React.ReactNode;
  hasNotifications?: boolean;
  isMobile?: boolean;
};

type SidebarTopbarLayoutProps = TopNavbarProps &
  SidebarProps & {
    children: React.ReactNode;
  };

const Logo = ({ isMobile, hasNotifications, children }: LogoProps) => {
  return (
    <section
      id="logo"
      className={cn(
        isMobile
          ? "mb-6"
          : "flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6"
      )}
    >
      <Link href="/" className="flex items-center gap-2 font-semibold">
        {children}
      </Link>
      {hasNotifications && (
        <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
      )}
    </section>
  );
};

const SideNavbar = ({ logo, navLinks, hasNotifications }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <aside className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <Logo hasNotifications={hasNotifications}>{logo}</Logo>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.url}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                  pathname === link.url
                    ? "bg-muted text-primary"
                    : "text-muted-foreground"
                )}
              >
                {link.icon && link.icon}
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Card x-chunk="dashboard-02-chunk-0">
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support
                team.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full">
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </aside>
  );
};

const MobileNavbar = ({ logo, navLinks: links }: CoreNavProps) => {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
          <Logo isMobile>{logo}</Logo>
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.url}
              className={cn(
                "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground",
                pathname === link.url
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {link.icon && link.icon}
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="mt-auto">
          <Card>
            <CardHeader>
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support
                team.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="sm" className="w-full">
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const TopNavbar = ({
  logo,
  navLinks: links,
  hasSearch,
  searchPlaceholder,
  hideThemeToggle,
  profileMenuItems,
}: TopNavbarProps) => {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <MobileNavbar logo={logo} navLinks={links} />
      <div className="w-full flex-1">
        {hasSearch && (
          <SearchBox
            placeholder={searchPlaceholder ? searchPlaceholder : "Search..."}
            inputStyles="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:1/2 xl:w-1/3"
          />
        )}
      </div>
      {!hideThemeToggle && <ThemeToggle />}
      {profileMenuItems && <ProfileMenu items={profileMenuItems} />}
    </header>
  );
};

const SidebarTopbarLayout = ({
  logo,
  navLinks,
  hasNotifications,
  hasSearch,
  searchPlaceholder,
  hideThemeToggle,
  profileMenuItems,
  children,
}: SidebarTopbarLayoutProps) => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <SideNavbar
        logo={logo}
        navLinks={navLinks}
        hasNotifications={hasNotifications}
      />
      <section className="flex flex-col">
        <TopNavbar
          logo={logo}
          navLinks={navLinks}
          hasSearch={hasSearch}
          searchPlaceholder={searchPlaceholder}
          hideThemeToggle={hideThemeToggle}
          profileMenuItems={profileMenuItems}
        />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </section>
    </div>
  );
};

export default SidebarTopbarLayout;
