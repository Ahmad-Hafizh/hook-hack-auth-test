"use client";
import { PaginatedProjectsTable } from "../paginated-projects-table";

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-4 py-8 md:gap-6 md:py-10 px-10 bg-[#0f0f0f] min-h-screen">
      {/* Header */}
      <div className="px-4 lg:px-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Projects
          </h1>
          <p className="text-gray-300">
            Manage and track your video analysis projects
          </p>
        </div>
      </div>

      {/* Paginated Projects Table */}
      <div className="px-5">
        <PaginatedProjectsTable />
      </div>
    </div>
  );
}
