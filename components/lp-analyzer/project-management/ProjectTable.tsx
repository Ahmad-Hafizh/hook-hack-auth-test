"use client";

import React, { useState } from "react";
import { Project } from "./types";

interface ProjectTableProps {
  projects: Project[];
  onProjectClick?: (project: Project) => void;
}

export const ProjectTable: React.FC<ProjectTableProps> = ({
  projects,
  onProjectClick,
}) => {
  const [memos, setMemos] = useState<Record<string, string>>(
    projects.reduce((acc, p) => ({ ...acc, [p.id]: p.memo }), {})
  );

  const handleMemoChange = (projectId: string, value: string) => {
    setMemos((prev) => ({ ...prev, [projectId]: value }));
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left border-collapse">
        <thead className="bg-slate-50 text-slate-500 font-bold text-xs uppercase tracking-wider">
          <tr>
            <th className="border border-slate-200 px-4 py-3 min-w-[240px]">
              プロジェクト名
            </th>
            <th className="border border-slate-200 px-4 py-3 w-[300px] text-slate-800 bg-slate-200/80 text-[11px]">
              メモ
            </th>
            <th className="border border-slate-200 px-4 py-3 w-[180px]">
              最終更新日
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {projects.map((project) => (
            <tr
              key={project.id}
              className="hover:bg-cyan-50/30 transition-colors group"
            >
              <td
                className="border border-slate-200 px-4 py-3 text-slate-800 font-bold cursor-pointer"
                onClick={() => onProjectClick?.(project)}
              >
                {project.name}
              </td>
              <td className="border border-slate-200 px-0 py-0 align-top">
                <textarea
                  className="w-full h-full min-h-[44px] px-4 py-3 bg-transparent border-none resize-none focus:ring-2 focus:ring-inset focus:ring-[#0093b4]/20 text-slate-500 placeholder-slate-300 text-sm leading-relaxed"
                  placeholder="メモを入力..."
                  value={memos[project.id]}
                  onChange={(e) => handleMemoChange(project.id, e.target.value)}
                />
              </td>
              <td
                className="border border-slate-200 px-4 py-3 text-slate-500 cursor-pointer"
                onClick={() => onProjectClick?.(project)}
              >
                {project.lastUpdated}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
