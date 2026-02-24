"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  Eye,
  Play,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProjectPreviewModal } from "./project-preview-modal";
import callHomeApi from "@/config/axios/axioshome";

interface ProjectData {
  id: number;
  productName: string;
  dateCreated: string;
  lastModified: string;
  memo: string;
  creditsLeft: number;
  userinput?: any;
  comment?: any;
  hook?: any;
  content?: any;
}

interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
}

interface PaginatedProjectsTableProps {
  initialProjects?: ProjectData[];
  initialPagination?: PaginationData;
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

export function PaginatedProjectsTable({
  initialProjects = [],
  initialPagination = {
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    hasNextPage: false,
    hasPrevPage: false,
    limit: 10,
  },
}: PaginatedProjectsTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [selectedProject, setSelectedProject] = React.useState<ProjectData | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [projects, setProjects] = React.useState<ProjectData[]>(initialProjects);
  const [pagination, setPagination] = React.useState<PaginationData>(initialPagination);
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [error, setError] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  React.useEffect(() => {
    if (initialProjects.length === 0) {
      fetchProjects(1, 10);
    }
  }, []);

  React.useEffect(() => {
    fetchProjects(1, pagination.limit, debouncedSearchQuery);
  }, [debouncedSearchQuery]);

  const fetchProjects = async (page: number, limit: number = 10, search: string = "") => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await callHomeApi.post("/api/projects", { page, limit, search });
      const result = response.data;

      if (!result.success) {
        throw new Error(result.error || "Failed to fetch projects data");
      }

      const transformedProjects = (result.data.projects || []).map(
        (project: any) => ({
          ...project,
          lastModified: project.updated_at || project.dateCreated,
          memo: project.memo || "",
          creditsLeft:
            (typeof project.hook_count === "number" ? project.hook_count : 0) +
            (typeof project.content_count === "number"
              ? project.content_count
              : 0),
        })
      );

      setProjects(transformedProjects);
      setPagination(result.data.pagination);
      setCurrentPage(page);
    } catch (err: any) {
      console.error("Error fetching projects data:", err);
      setError(
        err.response
          ? `Error ${err.response.status}: ${err.response.data?.error || err.message}`
          : err.message || "An error occurred"
      );
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchProjects(newPage, pagination.limit, debouncedSearchQuery);
    }
  };

  const handlePreviewClick = (project: ProjectData) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const columns: ColumnDef<ProjectData>[] = [
    {
      id: "number",
      header: "No",
      cell: ({ row }) => {
        const sequentialNumber =
          (currentPage - 1) * pagination.limit + row.index + 1;
        return <span className="text-[13px] tabular-nums text-muted-foreground">{sequentialNumber}</span>;
      },
    },
    {
      accessorKey: "productName",
      header: "プロジェクト名",
      cell: ({ row }) => (
        <span className="text-[13px] font-medium">{row.original.productName}</span>
      ),
    },
    {
      accessorKey: "dateCreated",
      header: "作成日",
      cell: ({ row }) => (
        <span className="text-[13px] text-muted-foreground tabular-nums">
          {new Date(row.original.dateCreated).toLocaleDateString("ja-JP")}
        </span>
      ),
    },
    {
      accessorKey: "lastModified",
      header: "最終更新",
      cell: ({ row }) => (
        <span className="text-[13px] text-muted-foreground tabular-nums">
          {new Date(row.original.lastModified).toLocaleDateString("ja-JP")}
        </span>
      ),
    },
    {
      accessorKey: "memo",
      header: "メモ",
      cell: ({ row }) => (
        <span className="text-[13px] text-muted-foreground max-w-[200px] truncate block">
          {row.original.memo || "—"}
        </span>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 gap-1.5 text-[11px]"
            onClick={() => handlePreviewClick(row.original)}
          >
            <Eye className="size-3.5 stroke-[1.5]" />
            確認
          </Button>
          <Button
            size="sm"
            className="h-7 gap-1.5 text-[11px]"
            onClick={() => {
              window.location.href = `/app?resume=true&projectId=${row.original.id}`;
            }}
          >
            <Play className="size-3.5 stroke-[1.5]" />
            続ける
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: projects,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  if (error) {
    return (
      <div className="flex items-center justify-center rounded-lg border border-dashed py-12">
        <p className="text-[13px] text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="relative w-full sm:w-64">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground stroke-[1.5]" />
        <Input
          placeholder="プロジェクトを検索..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8 h-9 text-[13px]"
        />
      </div>

      {isLoading ? (
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
                    className="h-24 text-center text-[13px] text-muted-foreground"
                  >
                    プロジェクトが見つかりません
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
            {pagination.totalCount}件中 {(currentPage - 1) * pagination.limit + 1}〜{Math.min(currentPage * pagination.limit, pagination.totalCount)}件
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!pagination.hasPrevPage}
            >
              <ChevronLeft className="size-4 stroke-[1.5]" />
            </Button>
            {(() => {
              const pagesToShow = Math.max(1, Math.min(5, pagination.totalPages));
              return Array.from({ length: pagesToShow }, (_, i) => {
                const pageNum = i + 1;
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

      <ProjectPreviewModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
