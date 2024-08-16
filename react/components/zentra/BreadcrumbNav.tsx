"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const BreadcrumbNav = () => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);
  const currentPage = paths.split("/").pop() ?? "Current";

  pathNames.pop();

  const handleString = (value: string) => {
    const words = value.split("-");

    let updatedWords: string[] = [];
    words.map((word) =>
      updatedWords.push(word[0].toUpperCase() + word.substring(1))
    );

    return updatedWords.join(" ");
  };

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {pathNames.map((item, idx) => (
          <Fragment key={idx}>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={idx === 0 ? `/${item}` : item}>
                  {handleString(item)}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </Fragment>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage>{handleString(currentPage)}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbNav;
