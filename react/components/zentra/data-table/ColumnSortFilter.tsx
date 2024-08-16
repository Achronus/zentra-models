import { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";

type ColumnSortFilterProps<TData, TValue> = {
  column: Column<TData, TValue>;
};

export default function ColumnSortFilter<TData, TValue>({
  column,
}: ColumnSortFilterProps<TData, TValue>) {
  const currentSort = column.getIsSorted();

  const toggleSortOrder = () => {
    column.toggleSorting();
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="p-0 hover:bg-none!"
      onClick={toggleSortOrder}
    >
      {currentSort === "desc" ? (
        <ArrowDown className="ml-2 h-4 w-4" />
      ) : currentSort === "asc" ? (
        <ArrowUp className="ml-2 h-4 w-4" />
      ) : (
        <ChevronsUpDown className="ml-2 h-4 w-4" />
      )}
    </Button>
  );
}
