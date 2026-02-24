"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TransactionData {
  id: string;
  invoiceId: string;
  status: "completed" | "pending" | "failed";
  type: string;
  amount: number;
  dateCreated: string;
}

interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const columns: ColumnDef<TransactionData>[] = [
  {
    accessorKey: "invoiceId",
    header: "請求書ID",
    cell: ({ row }) => {
      const id = row.original.invoiceId;
      return (
        <span className="font-mono text-[13px]" title={id}>
          {id.length > 20 ? `${id.slice(0, 20)}...` : id}
        </span>
      );
    },
  },
  {
    accessorKey: "type",
    header: "種別",
    cell: ({ row }) => (
      <span className="text-[13px]">{row.original.type}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "ステータス",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          variant={
            status === "completed" ? "default" : status === "pending" ? "secondary" : "destructive"
          }
          className="text-[11px] font-normal"
        >
          {status === "completed" ? "完了" : status === "pending" ? "処理中" : "失敗"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "金額",
    cell: ({ row }) => (
      <span className="text-[13px] tabular-nums">¥{row.original.amount.toLocaleString()}</span>
    ),
  },
  {
    accessorKey: "dateCreated",
    header: "日付",
    cell: ({ row }) => (
      <span className="text-[13px] text-muted-foreground tabular-nums">
        {new Date(row.original.dateCreated).toLocaleDateString("ja-JP")}
      </span>
    ),
  },
];

export function TransactionsTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [transactions, setTransactions] = React.useState<TransactionData[]>([]);
  const [pagination, setPagination] = React.useState<PaginationData>({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const fetchTransactions = React.useCallback(
    async (page: number, status: string, search: string) => {
      try {
        setIsLoading(true);
        setError(null);

        const params = new URLSearchParams({
          page: String(page),
          limit: "10",
          sortOrder: "desc",
        });
        if (status && status !== "all") params.set("status", status);
        if (search) params.set("search", search);

        const res = await fetch(`/api/new-dashboard/transactions?${params}`);
        if (!res.ok) throw new Error("Failed to fetch transactions");

        const result = await res.json();
        setTransactions(result.data);
        setPagination(result.pagination);
        setCurrentPage(result.pagination.currentPage);
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError("取引履歴の取得に失敗しました");
        setTransactions([]);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  React.useEffect(() => {
    fetchTransactions(1, statusFilter, debouncedSearchQuery);
  }, [debouncedSearchQuery, statusFilter, fetchTransactions]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchTransactions(newPage, statusFilter, debouncedSearchQuery);
    }
  };

  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground stroke-[1.5]" />
          <Input
            placeholder="請求書IDで検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 h-9 text-[13px]"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value)}
        >
          <SelectTrigger className="w-full sm:w-40 h-9 text-[13px]">
            <SelectValue placeholder="ステータス" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="text-[13px]">すべて</SelectItem>
            <SelectItem value="completed" className="text-[13px]">完了</SelectItem>
            <SelectItem value="pending" className="text-[13px]">処理中</SelectItem>
            <SelectItem value="failed" className="text-[13px]">失敗</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {error ? (
        <div className="flex items-center justify-center rounded-lg border border-dashed py-12">
          <p className="text-[13px] text-muted-foreground">{error}</p>
        </div>
      ) : isLoading ? (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((_, index) => (
                  <TableHead key={index} className="h-10">
                    <div className="h-3 w-16 rounded bg-muted animate-pulse" />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3, 4, 5].map((i) => (
                <TableRow key={i}>
                  {columns.map((_, index) => (
                    <TableCell key={index}>
                      <div className="h-3 w-20 rounded bg-muted animate-pulse" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="h-10 text-[12px]">
                      {header.isPlaceholder ? null : (
                        <div
                          className={
                            header.column.getCanSort()
                              ? "flex items-center gap-1.5 cursor-pointer select-none"
                              : ""
                          }
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: <ChevronUpIcon className="size-3.5 stroke-[1.5]" />,
                            desc: <ChevronDownIcon className="size-3.5 stroke-[1.5]" />,
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
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
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-[13px] text-muted-foreground"
                  >
                    取引履歴がありません
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {pagination.totalCount > 0 && (
        <div className="flex items-center justify-between text-[13px]">
          <p className="text-muted-foreground tabular-nums">
            {pagination.totalCount}件中 {(currentPage - 1) * 10 + 1}〜{Math.min(currentPage * 10, pagination.totalCount)}件
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!pagination.hasPreviousPage}
            >
              <ChevronLeft className="size-4 stroke-[1.5]" />
            </Button>
            {(() => {
              const totalPages = pagination.totalPages;
              const pagesToShow = Math.max(1, Math.min(5, totalPages));
              return Array.from({ length: pagesToShow }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="icon"
                    className="size-8 text-[12px]"
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              });
            })()}
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!pagination.hasNextPage}
            >
              <ChevronRight className="size-4 stroke-[1.5]" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
