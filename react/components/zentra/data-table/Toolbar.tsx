"use client";

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
import { Row, Table } from "@tanstack/react-table";
import {
  Download,
  File,
  FolderOutput,
  ListFilter,
  PlusCircle,
  RotateCcw,
} from "lucide-react";
import { Badge } from "../ui/badge";
import SearchFilter from "./SearchFilter";
import ViewOptions from "./ViewOptions";

type CoreProps<TData> = {
  table: Table<TData>;
};

type DataTableToolbarProps<TData> = CoreProps<TData> & {
  hideExport?: boolean;
  hideAddItem?: boolean;
  hideViewOptions?: boolean;
  searchFilterColumn?: string;
  categoryFilterColumn?: string;
  extraFilterOptions?: React.ReactNode;
};

type CategoryFilterProps<TData> = CoreProps<TData> & {
  column: string;
};

function CategoryFilter<TData>({ table, column }: CategoryFilterProps<TData>) {
  const col = table.getColumn(column);
  const options = col?.getFacetedUniqueValues();
  const selectedValues = new Set(col?.getFilterValue() as string[]);

  const toggleFilter = (option: string) => {
    if (selectedValues.has(option)) {
      selectedValues.delete(option);
    } else {
      selectedValues.add(option);
    }

    const updatedFilterValues = Array.from(selectedValues);
    col?.setFilterValue(
      updatedFilterValues.length > 0 ? updatedFilterValues : undefined
    );
  };

  const resetFilter = () => {
    col?.setFilterValue(undefined);
  };

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
        {options &&
          Array.from(options.keys()).map((option) => (
            <DropdownMenuCheckboxItem
              key={option}
              className="cursor-pointer"
              checked={selectedValues.has(option)}
              onCheckedChange={() => toggleFilter(option)}
            >
              {option}
              <Badge className="ml-auto">{options.get(option)}</Badge>
            </DropdownMenuCheckboxItem>
          ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex gap-2 items-center cursor-pointer"
          onClick={resetFilter}
        >
          Reset
          <RotateCcw size={16} className="ml-auto" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Export<TData>({ table }: CoreProps<TData>) {
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
  categoryFilterColumn,
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
        {categoryFilterColumn && (
          <CategoryFilter table={table} column={categoryFilterColumn} />
        )}
        {!hideExport && <Export table={table} />}
        {!hideViewOptions && <ViewOptions table={table} />}
        {!hideAddItem && <AddItem />}
      </section>
    </div>
  );
}
