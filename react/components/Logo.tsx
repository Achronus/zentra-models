import { cn } from "@/lib/utils";
import Link from "next/link";

type LogoProps = {
  name: string;
  children: React.ReactNode;
  isMobile?: boolean;
};

const Logo = ({ name, isMobile, children }: LogoProps) => {
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
        <span className="sr-only">{name}</span>
      </Link>
    </section>
  );
};

export default Logo;
