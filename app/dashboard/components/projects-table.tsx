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
import { ChevronDownIcon, ChevronUpIcon, Eye, Play } from "lucide-react";

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

// Sample data for fallback
const sampleData: ProjectData[] = [
  {
    id: 1,
    productName: "Product Analysis - Q4 Campaign",
    dateCreated: "2024-01-15",
    creditsLeft: 150,
  },
  {
    id: 2,
    productName: "Video Performance Review",
    dateCreated: "2024-01-10",
    creditsLeft: 75,
  },
  {
    id: 3,
    productName: "Marketing Strategy Analysis",
    dateCreated: "2024-01-05",
    creditsLeft: 200,
  },
  {
    id: 4,
    productName: "Competitor Analysis Report",
    dateCreated: "2024-01-01",
    creditsLeft: 120,
  },
  {
    id: 5,
    productName: "Brand Awareness Study",
    dateCreated: "2023-12-28",
    creditsLeft: 90,
  },
];

interface ProjectsTableProps {
  projects?: ProjectData[];
  isLoading?: boolean;
}

export function ProjectsTable({
  projects = sampleData,
  isLoading = false,
}: ProjectsTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [selectedProject, setSelectedProject] =
    React.useState<ProjectData | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

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
        // Calculate sequential number based on row index
        const sequentialNumber = row.index + 1;
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

  if (isLoading) {
    return (
      <div className="rounded-md border-2 border-[#361a20] px-10 bg-[#0f0f0f]">
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
            {[1, 2, 3].map((i) => (
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

      {/* Project Preview Modal */}
      <ProjectPreviewModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
