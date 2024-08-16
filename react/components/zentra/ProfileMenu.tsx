import { CircleUser } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ProfileMenuItem } from "@/types/core";

type ProfileMenuProps = {
  items: ProfileMenuItem[][];
};

const ProfileMenu = ({ items }: ProfileMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <CircleUser className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {items.map((group, groupIdx) => (
          <Fragment key={groupIdx}>
            {group.map((item, itemIndex) =>
              item.type === "label" ? (
                <DropdownMenuLabel
                  key={itemIndex}
                  className="flex items-center gap-2"
                >
                  {item.icon && item.icon}
                  {item.text}
                </DropdownMenuLabel>
              ) : item.type === "item" ? (
                <DropdownMenuItem key={itemIndex}>
                  {item.url ? (
                    <Link href={item.url} className="flex items-center gap-2">
                      {item.icon && item.icon}
                      {item.text}
                    </Link>
                  ) : (
                    <div className="flex items-center gap-2">
                      {item.icon && item.icon}
                      {item.text}
                    </div>
                  )}
                </DropdownMenuItem>
              ) : null
            )}
            <DropdownMenuSeparator key={`separator-${groupIdx}`} />
          </Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
