"use client";

import React, { useState } from "react";
import { ProjectTable } from "./ProjectTable";
import { projectsData } from "./data";

export const ProjectManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const totalProjects = 24;
  const projectsPerPage = 5;

  const filteredProjects = projectsData.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-12 md:px-8 flex flex-col justify-start">
      {/* Header */}
      <div className="mb-8 animate-fade-in-up flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-800">
          プロジェクト管理
        </h1>
        <button className="bg-[#0093b4] hover:bg-[#007a92] text-white font-bold py-2.5 px-6 rounded-lg shadow-sm transition-all duration-200 flex items-center gap-2 group">
          <span className="material-symbols-outlined text-[20px] group-hover:rotate-90 transition-transform">
            add
          </span>
          <span>新規プロジェクト作成</span>
        </button>
      </div>

      {/* Main Card */}
      <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 animate-fade-in-up overflow-hidden flex flex-col">
        {/* Search and Filter Bar */}
        <div className="p-4 border-b border-slate-200 bg-slate-50/30 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-80 group">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#0093b4] transition-colors">
              search
            </span>
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
              <span className="material-symbols-outlined text-[18px]">
                filter_list
              </span>
              <span>フィルター</span>
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 transition-colors whitespace-nowrap">
              <span className="material-symbols-outlined text-[18px]">
                sort
              </span>
              <span>並び替え</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <ProjectTable projects={filteredProjects} />

        {/* Pagination */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/20 flex items-center justify-between text-xs text-slate-500">
          <div>
            全 {totalProjects} プロジェクト中 1-{projectsPerPage} 件を表示
          </div>
          <div className="flex gap-1">
            <button
              className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            >
              <span className="material-symbols-outlined text-[16px] leading-none">
                chevron_left
              </span>
            </button>
            <button
              className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50"
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              <span className="material-symbols-outlined text-[16px] leading-none">
                chevron_right
              </span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProjectManagement;
