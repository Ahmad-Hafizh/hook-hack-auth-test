"use client";
import { PaginatedProjectsTable } from "../paginated-projects-table";

export default function ProjectsPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold tracking-tight">プロジェクト</h1>
        <p className="text-[13px] text-muted-foreground">プロジェクトを管理・追跡できます</p>
      </div>

      <PaginatedProjectsTable />
    </div>
  );
}
