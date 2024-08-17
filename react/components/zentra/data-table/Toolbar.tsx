"use client";

import { Row, Table } from "@tanstack/react-table";
import {
  Download,
  File,
  FolderOutput,
  ListFilter,
  PlusCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
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

type ExportProps<TData> = {
  table: Table<TData>;
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

function Export<TData>({ table }: ExportProps<TData>) {
  function convertToCSV<TData>(rows: Row<TData>[]) {
    if (rows.length === 0) {
      return "";
    }
    const headers = Object.keys(rows[0].original as Object).join(",");
    const csvRows = rows
      .map((row) =>
        Object.values(row.original as Object)
          .map((value) => value)
          .join(",")
      )
      .join("\n");

    return `${headers}\n${csvRows}`;
  }

  const downloadCSV = (csvData: string, filename: string) => {
    const blob = new Blob([csvData], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportFiltered = () => {
    const csvData = convertToCSV(table.getFilteredRowModel().rows);
    downloadCSV(csvData, "filteredData");
  };

  const handleExportAll = () => {
    const csvData = convertToCSV(table.getCoreRowModel().rows);
    downloadCSV(csvData, "allData");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="outline" className="h-8 gap-1">
          <File className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Export
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Export as CSV</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={handleExportFiltered}
        >
          <FolderOutput className="mr-2 h-4 w-4" />
          <span>Filtered</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={handleExportAll}>
          <Download className="mr-2 h-4 w-4" />
          <span>All</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const AddItem = () => {
  return (
    <Button size="sm" className="h-8 gap-1">
      <PlusCircle className="h-3.5 w-3.5" />
      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
        Add Item
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
        {!hideExport && <Export table={table} />}
        {!hideViewOptions && <ViewOptions table={table} />}
        {!hideAddItem && <AddItem />}
      </section>
    </div>
  );
}
