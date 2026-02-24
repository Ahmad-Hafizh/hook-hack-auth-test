"use client";
import React, { useEffect, useState } from "react";
import { ProjectTable } from "@/components/lp-analyzer/project-management/ProjectTable";
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  Plus,
  Search,
  SortDesc,
} from "lucide-react";
import callApi from "@/config/axios/axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export interface Project {
  id: string;
  name: string;
  memo: string;
  updatedAt: string;
}

const ProjectManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [totalProjects, setTotalProjects] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const router = useRouter();

  const getProjectsList = async () => {
    try {
      setLoading(true);

      // Always read from localStorage first
      const saved = localStorage.getItem("local_projects");
      const localProjects: Project[] = saved ? JSON.parse(saved) : [];

      // Apply search filter
      const filtered = searchQuery
        ? localProjects.filter((p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()),
          )
        : localProjects;

      setProjectList(filtered);
      setTotalProjects(filtered.length);
      setTotalPage(1);

      // Try to sync with DB in background (optional)
      try {
        const { data } = await callApi.get("/app-v2/projects", {
          params: { search: searchQuery, page: currentPage },
        });

        // Merge DB projects with local projects (local takes priority)
        const localIds = new Set(localProjects.map((p) => p.id));
        const dbProjects: Project[] = data.projects || [];
        const mergedProjects = [
          ...localProjects,
          ...dbProjects.filter((p) => !localIds.has(p.id)),
        ];

        // Save merged list back to localStorage
        localStorage.setItem("local_projects", JSON.stringify(mergedProjects));

        const mergedFiltered = searchQuery
          ? mergedProjects.filter((p) =>
              p.name.toLowerCase().includes(searchQuery.toLowerCase()),
            )
          : mergedProjects;

        setProjectList(mergedFiltered);
        setTotalProjects(mergedFiltered.length);
      } catch (apiError) {
        console.log("DB sync failed, using localStorage only:", apiError);
      }
    } catch (error) {
      console.error("Error loading projects:", error);
      setProjectList([]);
    } finally {
      setLoading(false);
    }
  };

  const createNewProject = async (name: string) => {
    try {
      setLoadingSubmit(true);

      // Always save to localStorage first
      const saved = localStorage.getItem("local_projects");
      const projects: Project[] = saved ? JSON.parse(saved) : [];
      const newProject: Project = {
        id: `local_${Date.now()}`,
        name,
        memo: "",
        updatedAt: new Date().toISOString(),
      };
      projects.unshift(newProject);
      localStorage.setItem("local_projects", JSON.stringify(projects));

      // Then try to sync with DB (optional)
      try {
        await callApi.post("/app-v2/projects", { name });
      } catch (apiError) {
        console.log("DB sync failed, using localStorage only:", apiError);
      }

      toast.success("プロジェクトを作成しました");
    } catch (error) {
      console.error("Failed to create project:", error);
      toast.error("プロジェクトの作成に失敗しました");
    } finally {
      setNewProjectName("");
      setLoadingSubmit(false);
      setOpenCreateDialog(false);
      getProjectsList();
    }
  };

  const onProjectClick = (projectId: string) => {
    router.push(`/app-v2/projects/${projectId}`);
  };

  useEffect(() => {
    getProjectsList();
  }, [searchQuery, currentPage]);

  return (
    <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-12 md:px-8 flex flex-col justify-start">
      {/* Header */}
      <div className="mb-8 animate-fade-in-up flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-800">
          プロジェクト管理
        </h1>
        <button
          className="bg-[#0093b4] hover:bg-[#007a92] text-white font-semibold py-2.5 px-6 rounded-lg shadow-sm transition-all duration-200 flex items-center gap-2 group"
          onClick={() => setOpenCreateDialog(true)}
        >
          <Plus className="w-5 h-5 text-white group-hover:rotate-90 transition-transform" />
          <span>新規プロジェクト作成</span>
        </button>
      </div>

      {/* Main Card */}
      <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 animate-fade-in-up overflow-hidden flex flex-col">
        {/* Search and Filter Bar */}
        <div className="p-4 border-b border-slate-200 bg-slate-50/30 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-80 group">
            <Search className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#0093b4] transition-colors w-4 h-4" />

            <input
              className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0093b4]/20 focus:border-[#0093b4] transition-all bg-white text-slate-800 placeholder-slate-400"
              placeholder="プロジェクト名で検索..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
            <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 transition-colors whitespace-nowrap">
              <Filter className="w-4 h-4" />
              <span>フィルター</span>
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 transition-colors whitespace-nowrap">
              <SortDesc className="w-4 h-4" />
              <span>並び替え</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <ProjectTable
          projects={projectList}
          loading={loading}
          onProjectClick={onProjectClick}
        />

        {/* Pagination */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/20 flex items-center justify-between text-xs text-slate-500">
          <div>全 {totalProjects} 件中 1–5 件を表示</div>
          <div className="flex gap-1">
            <button
              className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50"
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage >= totalPage}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* create project dialog */}
      <Dialog
        open={openCreateDialog}
        onOpenChange={() => {
          if (!loadingSubmit) {
            setOpenCreateDialog(false);
          }
        }}
      >
        <DialogContent>
          <DialogHeader className="flex flex-col gap-4">
            <DialogTitle>新規プロジェクト作成</DialogTitle>
            <Input
              placeholder="プロジェクト名"
              className="w-full mt-4"
              onChange={(e) => setNewProjectName(e.target.value)}
            />
            <Button
              className="bg-[#0093b4] hover:bg-[#007a92]"
              type="button"
              onClick={() => createNewProject(newProjectName)}
              disabled={loadingSubmit}
            >
              {loadingSubmit ? "作成中..." : "作成"}
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default ProjectManagement;
