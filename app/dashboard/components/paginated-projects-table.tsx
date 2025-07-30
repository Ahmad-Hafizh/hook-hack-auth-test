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
  Play,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
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

// Define the data structure
interface ProjectData {
  id: number;
  productName: string;
  dateCreated: string;
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
  console.log("🎯 PaginatedProjectsTable - Component rendering");
  console.log("🎯 PaginatedProjectsTable - Props:", {
    initialProjects: initialProjects.length,
    initialPagination,
  });

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [selectedProject, setSelectedProject] =
    React.useState<ProjectData | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [projects, setProjects] =
    React.useState<ProjectData[]>(initialProjects);
  const [pagination, setPagination] =
    React.useState<PaginationData>(initialPagination);
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [error, setError] = React.useState<string | null>(null);

  // Call API on component mount
  React.useEffect(() => {
    console.log("🚀 PaginatedProjectsTable - Component mounted");
    console.log(
      "🚀 PaginatedProjectsTable - Initial projects:",
      initialProjects.length
    );
    console.log(
      "🚀 PaginatedProjectsTable - Initial pagination:",
      initialPagination
    );

    // Only fetch if we don't have initial data
    if (initialProjects.length === 0) {
      console.log(
        "🚀 PaginatedProjectsTable - No initial data, fetching projects..."
      );
      fetchProjects(1, 10);
    } else {
      console.log("🚀 PaginatedProjectsTable - Using initial data");
    }
  }, []);

  const fetchProjects = async (page: number, limit: number = 10) => {
    try {
      setIsLoading(true);
      setError(null);
      console.log(`🔄 Fetching projects - Page ${page}, Limit ${limit}`);
      console.log(`🔄 API URL: /api/projects`);
      console.log(`🔄 Request body:`, { page, limit });
      console.log(`🔄 Full URL: http://localhost:3000/api/projects`);

      const response = await callHomeApi.post("/api/projects", { page, limit });
      const result = response.data;

      console.log("✅ Projects API Response:", result);
      console.log("✅ Response status:", response.status);
      console.log("✅ Response headers:", response.headers);

      if (!result.success) {
        throw new Error(result.error || "Failed to fetch projects data");
      }

      // Log the full API result for debugging
      console.log("📊 Projects Data (raw):", result.data.projects);

      // Transform projects: creditsLeft = hook_count + content_count
      const transformedProjects = (result.data.projects || []).map(
        (project: any) => ({
          ...project,
          creditsLeft:
            (typeof project.hook_count === "number" ? project.hook_count : 0) +
            (typeof project.content_count === "number"
              ? project.content_count
              : 0),
        })
      );

      // Log transformed projects for verification
      console.log("📋 Transformed Projects:", transformedProjects);

      setProjects(transformedProjects);
      setPagination(result.data.pagination);
      setCurrentPage(page);
    } catch (err: any) {
      console.error("❌ Error fetching projects data:", err);
      setError(
        err.response
          ? `Error ${err.response.status}: ${err.response.data?.error || err.message}`
          : err.message || "An error occurred"
      );
      // Do not keep existing data on error
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchProjects(newPage, pagination.limit);
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
        // Calculate sequential number based on current page and row index
        const sequentialNumber =
          (currentPage - 1) * pagination.limit + row.index + 1;
        return <div className="font-medium text-white">{sequentialNumber}</div>;
      },
    },
    {
      accessorKey: "productName",
      header: "Product Name",
      cell: ({ row }) => (
        <div className="font-medium text-white">{row.original.productName}</div>
      ),
    },
    {
      accessorKey: "dateCreated",
      header: "Date Created",
      cell: ({ row }) => {
        const date = new Date(row.original.dateCreated);
        return (
          <div className="text-gray-300">
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
      accessorKey: "creditsLeft",
      header: "Credits Left",
      cell: ({ row }) => (
        <div className="font-medium text-[#fe2858]">
          {row.original.creditsLeft}
        </div>
      ),
    },
    {
      id: "preview",
      header: "Preview",
      cell: ({ row }) => (
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 border-[#fe2858] text-[#fe2858] hover:bg-[#fe2858] hover:text-white transition-colors"
          onClick={() => handlePreviewClick(row.original)}
        >
          <Eye className="h-4 w-4" />
          Preview
        </Button>
      ),
    },
    {
      id: "continue",
      header: "Continue",
      cell: ({ row }) => (
        <Button
          size="sm"
          className="flex items-center gap-2 bg-[#fe2858] hover:bg-[#fe2858]/90 text-white transition-colors"
          onClick={() => {
            console.log(`🚀 Continue project ${row.original.id}`);
            // Navigate to app page with resume parameters
            window.location.href = `/app?resume=true&projectId=${row.original.id}`;
          }}
        >
          <Play className="h-4 w-4" />
          Continue
        </Button>
      ),
    },
  ];

  const table = useReactTable({
    data: projects,
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
      <div className="rounded-md border-2 border-[#361a20] py-2 px-10 bg-[#0f0f0f]">
        <Table>
          <TableHeader>
            <TableRow className="my-2 border-[#361a20]">
              {columns.map((column, index) => (
                <TableHead key={index} className="h-12 border-[#361a20]">
                  <div className="h-4 bg-white/20 rounded animate-pulse"></div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4, 5].map((i) => (
              <TableRow key={i} className="border-[#361a20]">
                {columns.map((column, index) => (
                  <TableCell key={index} className="border-[#361a20]">
                    <div className="h-4 bg-white/20 rounded animate-pulse"></div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border-2 border-[#361a20] py-2 px-10 bg-[#0f0f0f]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="my-2 border-[#361a20] hover:bg-[#361a20]/30"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="h-12 border-[#361a20] text-white font-semibold"
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          className={
                            header.column.getCanSort()
                              ? "flex items-center gap-2 cursor-pointer select-none hover:text-[#fe2858] transition-colors"
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
                  className="border-[#361a20] hover:bg-[#361a20]/20 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="border-[#361a20]">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="border-[#361a20]">
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-gray-300 border-[#361a20]"
                >
                  No projects found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between px-4 py-4 bg-[#1a1a1a] border border-[#361a20] rounded-md my-5">
        <div className="text-sm text-gray-300">
          Showing {(currentPage - 1) * pagination.limit + 1} to{" "}
          {Math.min(currentPage * pagination.limit, pagination.totalCount)} of{" "}
          {pagination.totalCount} projects
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!pagination.hasPrevPage}
            className="border-[#361a20] text-white hover:bg-[#361a20] hover:text-[#fe2858] disabled:opacity-50 bg-[#0f0f0f]"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <div className="flex items-center gap-1">
            {(() => {
              console.log("🎯 Pagination debug:", {
                currentPage,
                totalPages: pagination.totalPages,
                totalCount: pagination.totalCount,
                hasNextPage: pagination.hasNextPage,
                hasPrevPage: pagination.hasPrevPage,
              });

              // Always show at least 1 page button
              const pagesToShow = Math.max(
                1,
                Math.min(5, pagination.totalPages)
              );
              console.log("🎯 Pages to show:", pagesToShow);

              return Array.from({ length: pagesToShow }, (_, i) => {
                const pageNum = i + 1;
                console.log(
                  `🎯 Rendering page button ${pageNum}, currentPage: ${currentPage}, totalPages: ${pagination.totalPages}`
                );
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(pageNum)}
                    className={
                      currentPage === pageNum
                        ? "bg-[#fe2858] text-white hover:bg-[#fe2858]/90"
                        : "border-[#361a20] text-white hover:bg-[#361a20] hover:text-[#fe2858] bg-[#0f0f0f]"
                    }
                  >
                    {pageNum}
                  </Button>
                );
              });
            })()}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!pagination.hasNextPage}
            className="border-[#361a20] text-white hover:bg-[#361a20] hover:text-[#fe2858] disabled:opacity-50 bg-[#0f0f0f]"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Project Preview Modal */}
      <ProjectPreviewModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
