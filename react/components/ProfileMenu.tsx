import { CircleUser } from "lucide-react";

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
import Link from "next/link";
import { Fragment } from "react";

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
                <DropdownMenuLabel key={itemIndex}>
                  {item.text}
                </DropdownMenuLabel>
              ) : item.type === "item" ? (
                <DropdownMenuItem key={itemIndex}>
                  {item.url ? (
                    <Link href={item.url}>{item.text}</Link>
                  ) : (
                    item.text
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
