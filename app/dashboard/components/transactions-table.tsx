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
  Eye,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Define the data structure
interface TransactionData {
  id: number;
  invoiceId: string;
  status: "completed" | "pending" | "failed";
  amount: number;
  dateCreated: string;
}

// Remove sampleData

const columns: ColumnDef<TransactionData>[] = [
  {
    accessorKey: "invoiceId",
    header: "Invoice ID",
    cell: ({ row }) => (
      <div className="font-medium font-mono">{row.original.invoiceId}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          variant={
            status === "completed"
              ? "default"
              : status === "pending"
                ? "secondary"
                : "destructive"
          }
          className={`flex items-center gap-1 ${status === "completed" ? "bg-green-600 text-white" : ""}`}
        >
          {status === "completed" && <CheckCircle className="h-3 w-3" />}
          {status === "pending" && <Clock className="h-3 w-3" />}
          {status === "failed" && <XCircle className="h-3 w-3" />}
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <div className="font-medium">${row.original.amount.toFixed(2)}</div>
    ),
  },
  {
    accessorKey: "dateCreated",
    header: "Date Created",
    cell: ({ row }) => {
      const date = new Date(row.original.dateCreated);
      return (
        <div className="text-muted-foreground">
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      );
    },
  },
  {
    id: "view",
    header: "View",
    cell: ({ row }) => (
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2 bg-white text-black hover:bg-gray-200"
        onClick={() =>
          console.log(`View transaction ${row.original.invoiceId}`)
        }
      >
        <Eye className="h-4 w-4" />
        View
      </Button>
    ),
  },
];

export function TransactionsTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [transactions, setTransactions] = React.useState<TransactionData[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch("/api/transactions");
        if (!response.ok) {
          const data = await response.json();
          setError(
            `Error ${response.status}: ${data.error || response.statusText}`
          );
          setTransactions([]);
          console.error(
            "❌ Error fetching transactions:",
            data.error || response.statusText
          );
          return;
        }
        const data = await response.json();
        setTransactions(data.data || []);
      } catch (err: any) {
        setError(err.message || "An error occurred");
        setTransactions([]);
        console.error("❌ Error fetching transactions:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTransactions();
  }, []);

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

  if (error) {
    return (
      <div className="rounded-md border-2 border-[#361a20] py-10 px-10 bg-[#0f0f0f] text-center text-amber-400">
        {error}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="rounded-md border-2 border-[#361a20] py-10 px-10 bg-[#0f0f0f] text-center text-white">
        Loading transactions...
      </div>
    );
  }

  return (
    <div className="rounded-md border border-[#361a20] px-5">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-[#361a20]">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="h-12 border-[#361a20] text-white"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? "flex items-center gap-2 cursor-pointer select-none"
                            : ""
                        }
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: <ChevronUpIcon className="h-4 w-4" />,
                          desc: <ChevronDownIcon className="h-4 w-4" />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
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
                className="border-[#361a20]"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="border-[#361a20]">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center border-[#361a20]"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
