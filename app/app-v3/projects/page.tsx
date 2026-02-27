"use client";
import React, { useEffect, useState } from "react";
import { ProjectTable } from "@/components/lp-analyzer/project-management/ProjectTable";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Filter,
  Plus,
  Search,
  SortAsc,
  SortDesc,
} from "lucide-react";
import callApi from "@/config/axios/axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { errorToastCaller } from "../[sessionId]/planning/components/toastCaller";

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
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const router = useRouter();

  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (error) {
      toast.error(decodeURIComponent(error), { position: "top-center" });
    }
  }, [error]);

  const getProjectsList = async () => {
    try {
      setLoading(true);
      const { data } = await callApi.get("/app-v3/projects", {
        params: { search: searchQuery, page: currentPage, sort: sortOrder },
      });

      if (data.projects) {
        setProjectList(data.projects);
        setTotalProjects(data.totalProjects);
        setTotalPage(data.totalPage);
      } else {
        setProjectList([]);
        toast.info("No projects found. Create your first project!", {
          position: "top-center",
        });
      }
    } catch (error) {
      setProjectList([]);
      console.error("Failed to fetch projects:", error);
      errorToastCaller(error);
    } finally {
      setLoading(false);
    }
  };

  const createNewProject = async (name: string) => {
    try {
      setLoadingSubmit(true);
      await callApi.post("/app-v3/projects", { name });
      toast.success("Project created!", { position: "top-center" });
    } catch (error) {
      console.error("Failed to create project:", error);
      errorToastCaller(error);
    } finally {
      setNewProjectName("");
      setLoadingSubmit(false);
      setOpenCreateDialog(false);
      getProjectsList();
    }
  };

  const onProjectClick = (projectId: string) => {
    router.push(`/app-v3/projects/${projectId}`);
  };

  useEffect(() => {
    getProjectsList();
  }, [searchQuery, currentPage, sortOrder]);

  return (
    <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-12 md:px-8 flex flex-col justify-start">
      {/* Header */}
      <div className="mb-8 animate-fade-in-up flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            onClick={() => router.back()}
            variant={"ghost"}
            className="p-0 hover:bg-transparent"
          >
            <ArrowLeft className="w-8 h-8 mt-1" />
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-800 leading-none">
            プロジェクト管理
          </h1>
        </div>
        <Button
          className="bg-[#0093b4] hover:bg-[#007a92] text-white font-bold rounded-lg shadow-sm transition-all duration-200 flex items-center gap-2 group"
          size={"lg"}
          onClick={() => setOpenCreateDialog(true)}
        >
          <Plus className="w-5 h-5 text-white group-hover:rotate-90 transition-transform" />
          <span>新規プロジェクト作成</span>
        </Button>
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
            <button
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold border rounded-lg transition-colors whitespace-nowrap ${
                sortOrder === "asc"
                  ? "text-[#0093b4] border-[#0093b4] bg-[#0093b4]/5 hover:bg-[#0093b4]/10"
                  : "text-slate-500 hover:text-slate-800 border-slate-200 bg-white hover:bg-slate-50"
              }`}
              onClick={() =>
                setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"))
              }
            >
              {sortOrder === "asc" ? (
                <SortAsc className="w-4 h-4" />
              ) : (
                <SortDesc className="w-4 h-4" />
              )}
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
          <div>全 {totalProjects} プロジェクト中 1-5 件を表示</div>
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
          <DialogHeader className="flex ">
            <DialogTitle className="pb-4 border-b">
              新規プロジェクト作成
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="project-name"
              className="text-xs font-medium text-slate-700"
            >
              プロジェクト名
            </Label>
            <Input
              id="project-name"
              placeholder="例）新しいプロジェクト"
              className="w-full "
              onChange={(e) => setNewProjectName(e.target.value)}
            />
          </div>
          <Button
            className="bg-[#0093b4] hover:bg-[#007a92]"
            type="button"
            onClick={() => createNewProject(newProjectName)}
            disabled={loadingSubmit}
          >
            {loadingSubmit ? "作成中..." : "作成"}
          </Button>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default ProjectManagement;
