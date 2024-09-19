import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Dispatch, useEffect, useState } from "react";
import { USER_CONST } from "@/constants/users";
import { COMMONS_CONST } from "@/constants/commons";
import useDebounce from "@/hook/useDebounce";
import { ParamPagination } from "@/types/pagination.type";
import { useRouter } from "next/navigation";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  routeCreate?: string;
  pagination: ParamPagination;
  setPagination: Dispatch<React.SetStateAction<ParamPagination>>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  routeCreate,
  pagination,
  setPagination,
}: Readonly<DataTableProps<TData, TValue>>) {
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 1000);
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const router = useRouter();

  const table = useReactTable({
    data,
    columns,
    initialState: {
      columnVisibility: {
        id: false,
        _id: false,
      },
    },
    defaultColumn: {
      size: 200,
      minSize: 200,
      maxSize: 250,
    },
    state: {
      expanded,
    },
    getSubRows: (row: any) => row.children,
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  useEffect(() => {
    setPagination((prevState) => ({ ...prevState, keyword: debouncedSearch }));
  }, [debouncedSearch]);

  const handleLimit = (limit: number) => {
    setPagination((prevState) => ({ ...prevState, limit }));
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <Input
          placeholder={USER_CONST.FILTER}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          className="max-w-sm"
        />
        <div className="flex items-center gap-2">
          {routeCreate && (
            <Button onClick={() => router.push(routeCreate)}>
              {COMMONS_CONST.CREATE}
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                {pagination.limit} <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleLimit(100)}>
                100
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLimit(500)}>
                500
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLimit(1000)}>
                1000
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                  {row.getIsExpanded() && (
                    <tr>
                      <td colSpan={row.getAllCells().length}></td>
                    </tr>
                  )}
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().flatRows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {COMMONS_CONST.PREVIOUS}
          </Button>
          <span>
            {COMMONS_CONST.PAGE}{" "}
            <strong>
              {table.getState().pagination.pageIndex + 1} -{" "}
              {table.getPageCount()}
            </strong>
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {COMMONS_CONST.NEXT}
          </Button>
        </div>
      </div>
    </>
  );
}
