import { useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { parseUserInput, formatDate } from "../lib/utils";

interface ProjectsTableProps {
  projects: any[];
  search: string;
  setSearch: (search: string) => void;
  onSearch: () => void;
  projectLoading: boolean;
  projectError: string;
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  onPreviewProject: (project: any) => void;
}

export default function ProjectsTable({
  projects,
  search,
  setSearch,
  onSearch,
  projectLoading,
  projectError,
  page,
  setPage,
  totalPages,
  onPreviewProject,
}: ProjectsTableProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-white mb-4">
        Your Generated Projects
      </h2>

      {/* ===== SEARCH BAR ===== */}
      <div className="flex items-center gap-2 mb-4">
        <Input
          ref={searchInputRef}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearch();
          }}
          placeholder="Search by keyword or product name..."
          className="w-full bg-[#181818] text-white"
        />
        <Button onClick={onSearch} variant="default" className="px-4">
          Search
        </Button>
      </div>

      {/* ===== LOADING AND ERROR STATES ===== */}
      {projectLoading && (
        <div className="text-gray-400">Loading projects...</div>
      )}
      {projectError && (
        <div className="text-red-400 font-semibold">{projectError}</div>
      )}

      {/* ===== PROJECTS TABLE ===== */}
      <div className="bg-[#232323] rounded-lg text-white shadow mb-4 p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-white">Searchword</TableHead>
              <TableHead className="text-white">Product Name</TableHead>
              <TableHead className="text-white">Gender</TableHead>
              <TableHead className="text-white">Age</TableHead>
              <TableHead className="text-white">Date</TableHead>
              <TableHead className="text-white">Preview</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length === 0 && !projectLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-400">
                  No projects found.
                </TableCell>
              </TableRow>
            ) : (
              projects.slice(0, 5).map((project) => {
                const userinput = parseUserInput(project.userinput);
                return (
                  <TableRow key={project.id}>
                    <TableCell>{userinput.searchword || "-"}</TableCell>
                    <TableCell>{userinput.product_name || "-"}</TableCell>
                    <TableCell>{userinput.gender || "-"}</TableCell>
                    <TableCell>{userinput.age || "-"}</TableCell>
                    <TableCell>
                      {formatDate(project.system_createdAt)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="secondary"
                        onClick={() => onPreviewProject(project)}
                      >
                        Preview
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        {/* ===== PAGINATION CONTROLS ===== */}
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(Math.max(1, page - 1));
                }}
                aria-disabled={page === 1}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  isActive={page === i + 1}
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(i + 1);
                  }}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(Math.min(totalPages, page + 1));
                }}
                aria-disabled={page === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
