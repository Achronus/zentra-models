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

  const title = (value: string) => {
    return value[0].toUpperCase() + value.substring(1);
  };

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {pathNames.map((item, idx) => (
          <Fragment key={idx}>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={idx === 0 ? `/${item}` : item}>{title(item)}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </Fragment>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage>{title(currentPage)}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbNav;
