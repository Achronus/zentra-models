"use client";

import { cn } from "@/lib/utils";
import {
  ColumnDef,
  ColumnFiltersState,
  RowData,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import ColumnSortFilter from "./ColumnSortFilter";
import DataTablePagination from "./Pagination";
import DataTableToolbar from "./Toolbar";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    hideOnMobile?: boolean;
    sortFilter?: boolean;
  }
}

type Action = {
  name: string;
  onClick: () => void;
};

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  actions?: Action[];
  title?: string;
  description?: string;
  hideExport?: boolean;
  hideViewOptions?: boolean;
  searchFilterColumn?: string;
  categoryFilterColumn?: string;
  extraFilterOptions?: React.ReactNode;
  addItemOnClick?: () => void;
};

const ActionMenu = ({ actions }: { actions: Action[] }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-haspopup="true" size="icon" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {actions.map((action) => (
          <DropdownMenuItem
            key={action.name}
            className="cursor-pointer"
            onClick={action.onClick}
          >
            {action.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default function DataTable<TData, TValue>({
  columns,
  data,
  actions,
  title,
  description,
  hideExport,
  hideViewOptions,
  searchFilterColumn,
  categoryFilterColumn,
  extraFilterOptions,
  addItemOnClick,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [tableColumns, setTableColumns] =
    useState<ColumnDef<TData, TValue>[]>(columns);

  useEffect(() => {
    const addActionColumns = (actions?: Action[]) => {
      if (!actions) {
        return;
      }

      const selectRow: ColumnDef<TData, TValue> = {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
            className="border-muted-foreground"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="border-muted-foreground"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      };

      const actionRow: ColumnDef<TData, TValue> = {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => <ActionMenu actions={actions} />,
      };

      setTableColumns([selectRow, ...columns, actionRow]);
    };

    addActionColumns(actions);
  }, [actions]);

  useEffect(() => {
    const addFilterFn = (column?: string) => {
      if (!column) {
        return;
      }

      const columnExists = tableColumns.some(
        // @ts-ignore
        (col) => col.id === column || col.accessorKey === column
      );

      if (!columnExists) {
        throw new Error(
          `'${categoryFilterColumn}' does not exist in 'columns'!`
        );
      }

      setTableColumns((prevColumns) =>
        prevColumns.map((col) =>
          columnExists
            ? {
                ...col,
                filterFn: (row, id, value) => value.includes(row.getValue(id)),
              }
            : col
        )
      );
    };

    addFilterFn(categoryFilterColumn);
  }, [categoryFilterColumn]);

  const table = useReactTable({
    data,
    columns: tableColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <Card x-chunk="dashboard-06-chunk-0">
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className={cn(!title && !description && "mt-6")}>
        <DataTableToolbar
          table={table}
          hideExport={hideExport}
          hideViewOptions={hideViewOptions}
          searchFilterColumn={searchFilterColumn}
          categoryFilterColumn={categoryFilterColumn}
          extraFilterOptions={extraFilterOptions}
          addItemOnClick={addItemOnClick}
        />
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className={cn(
                          "md:table-cell",
                          header.column.columnDef.meta?.hideOnMobile && "hidden"
                        )}
                      >
                        <div className="flex items-center">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                          {header.column.columnDef.meta?.sortFilter && (
                            <ColumnSortFilter column={header.column} />
                          )}
                        </div>
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          "md:table-cell",
                          cell.column.columnDef.meta?.hideOnMobile && "hidden"
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <DataTablePagination table={table} />
      </CardContent>
    </Card>
  );
}
