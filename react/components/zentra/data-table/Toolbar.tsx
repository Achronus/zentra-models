"use client";

import { Table } from "@tanstack/react-table";
import { File, ListFilter, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import SearchFilter from "./SearchFilter";
import ViewOptions from "./ViewOptions";

type DataTableToolbarProps<TData> = {
  table: Table<TData>;
  hideFilter?: boolean;
  hideExport?: boolean;
  hideAddItem?: boolean;
  hideViewOptions?: boolean;
  searchFilterColumn?: string;
  extraFilterOptions?: React.ReactNode;
};

const Filter = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <ListFilter className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Filter
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked>Active</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Export = () => {
  return (
    <Button size="sm" variant="outline" className="h-8 gap-1">
      <File className="h-3.5 w-3.5" />
      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
        Export
      </span>
    </Button>
  );
};

const AddItem = () => {
  return (
    <Button size="sm" className="h-8 gap-1">
      <PlusCircle className="h-3.5 w-3.5" />
      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
        Add Product
      </span>
    </Button>
  );
};

export default function DataTableToolbar<TData>({
  table,
  hideFilter,
  hideExport,
  hideAddItem,
  hideViewOptions,
  searchFilterColumn,
  extraFilterOptions,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center mb-4 gap-2">
      {searchFilterColumn && (
        <SearchFilter table={table} column={searchFilterColumn} />
      )}
      {extraFilterOptions}
      <section id="actions" className="ml-auto flex items-center gap-2">
        {!hideFilter && <Filter />}
        {!hideExport && <Export />}
        {!hideViewOptions && <ViewOptions table={table} />}
        {!hideAddItem && <AddItem />}
      </section>
    </div>
  );
}
