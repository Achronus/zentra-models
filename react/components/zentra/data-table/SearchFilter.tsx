import { Table } from "@tanstack/react-table";

import SearchBox from "../SearchBox";

type SearchFilterProps<TData> = {
  table: Table<TData>;
  column: string;
};

export default function SearchFilter<TData>({
  table,
  column,
}: SearchFilterProps<TData>) {
  return (
    <SearchBox
      placeholder={`Filter by ${column}...`}
      value={(table.getColumn(column)?.getFilterValue() as string) ?? ""}
      onChange={(event) =>
        table.getColumn(column)?.setFilterValue(event.target.value)
      }
    />
  );
}
