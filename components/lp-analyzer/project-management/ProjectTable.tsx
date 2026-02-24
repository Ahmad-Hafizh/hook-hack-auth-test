"use client";

import React, { useRef, useState } from "react";
import { Project } from "@/app/app-v3/projects/page";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ArrowRight, Edit, Play, Save, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import callApi from "@/config/axios/axios";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

interface ProjectTableProps {
  projects: Project[];
  onProjectClick?: (projectId: string) => void;
  loading: boolean;
}

export const ProjectTable: React.FC<ProjectTableProps> = ({
  projects,
  onProjectClick,
  loading,
}) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState<string>("");
  const [savingName, setSavingName] = useState<boolean>(false);
  const memoRef = useRef<HTMLTextAreaElement>(null);

  const saveMemo = async (projectId: string) => {
    try {
      setSaving(true);
      await callApi.post("/app-v3/projects/edit/memo", {
        projectId,
        memo: memoRef.current?.value,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setSaving(false);
    }
  };

  const saveName = async (projectId: string, name: string) => {
    try {
      setSavingName(true);
      await callApi.post("/app-v3/projects/edit/name", {
        projectId,
        name,
      });
    } catch (error) {
      console.log(error);
      toast.error("名前の保存に失敗しました");
    } finally {
      setSavingName(false);
      setEditingProjectId(null);
    }
  };

  const handleNameDoubleClick = (project: Project) => {
    setEditingProjectId(project.id);
    setEditingName(project.name);
  };

  const handleNameKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    project: Project,
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (editingName.trim() && editingName !== project.name) {
        project.name = editingName;
        saveName(project.id, editingName);
      } else {
        setEditingProjectId(null);
      }
    } else if (e.key === "Escape") {
      setEditingProjectId(null);
    }
  };

  const handleNameBlur = (project: Project) => {
    if (editingName.trim() && editingName !== project.name) {
      project.name = editingName;
      saveName(project.id, editingName);
    } else {
      setEditingProjectId(null);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left border-collapse">
        <thead className="bg-slate-50 text-slate-500 font-bold text-xs uppercase tracking-wider">
          <tr>
            <th className="border border-slate-200 px-4 py-3 min-w-[240px]">
              プロジェクト名
            </th>
            <th className="border border-slate-200 px-4 py-3 w-[400px] text-slate-800 text-[11px]">
              メモ
            </th>
            <th className="border border-slate-200 px-4 py-3 w-[180px]">
              最終更新日
            </th>
            <th className="border border-slate-200 px-4 py-3 w-[180px]">
              アクション
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {loading ? (
            <tr>
              <td colSpan={4} className="border border-slate-200 h-[372px]">
                <div className="flex flex-col items-center justify-center h-full text-slate-500">
                  <p className="text-sm font-medium">
                    プロジェクトを読み込み中...
                  </p>
                </div>
              </td>
            </tr>
          ) : projects.length > 0 ? (
            projects.map((project) => (
              <tr
                key={project.id}
                className="hover:bg-cyan-50/30 transition-colors group"
              >
                <td
                  className="border border-slate-200 px-4 py-3 text-slate-800 font-bold"
                  onDoubleClick={() => handleNameDoubleClick(project)}
                >
                  {editingProjectId === project.id ? (
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      onKeyDown={(e) => handleNameKeyDown(e, project)}
                      onBlur={() => handleNameBlur(project)}
                      disabled={savingName}
                      autoFocus
                      className="w-full px-2 py-1 text-sm font-bold border border-[#0093b4] rounded focus:outline-none focus:ring-2 focus:ring-[#0093b4]/20"
                    />
                  ) : (
                    <span className="cursor-pointer" title="ダブルクリックで編集">
                      {project.name}
                    </span>
                  )}
                </td>
                <td className="border border-slate-200 px-0 py-0 align-top relative">
                  <textarea
                    className="w-full h-full min-h-[44px] pl-4 pr-8 py-3 bg-transparent border-none resize-none focus:ring-2 focus:ring-inset focus:ring-[#0093b4]/20 text-slate-500 placeholder-slate-300 text-sm leading-relaxed"
                    placeholder="メモを入力..."
                    defaultValue={project.memo}
                    disabled={!editing || saving}
                    ref={memoRef}
                  />
                  <Button
                    variant={"outline"}
                    className="absolute top-1 right-1 text-slate-400 hover:text-slate-600 transition-colors !w-fit !h-fit p-1"
                    onClick={() => {
                      if (editing) {
                        saveMemo(project.id);
                      }
                      setEditing((prev) => !prev);
                    }}
                    disabled={saving}
                  >
                    {saving ? (
                      <Spinner className="w-4 h-4" />
                    ) : editing ? (
                      <Save className="w-4 h-4" />
                    ) : (
                      <Edit className="w-4 h-4" />
                    )}
                  </Button>
                </td>
                <td className="border border-slate-200 px-4 py-3 text-slate-500">
                  {new Date(project.updatedAt).toLocaleDateString("ja-JP", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="border border-slate-200 px-3 py-3 align-middle">
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => onProjectClick?.(project.id)}
                      className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#0093b4] hover:bg-[#007a92] text-white text-xs font-medium rounded-md transition-colors"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>続ける</span>
                    </button>
                    <button
                      onClick={() =>
                        toast.info("削除機能は準備中です")
                      }
                      className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 text-xs font-medium rounded-md transition-colors border border-red-200"
                    >
                      <Trash className="w-3.5 h-3.5" />
                      <span>消去</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="border border-slate-200 h-[372px] p-0">
                <Empty className="h-full">
                  <EmptyHeader>
                    <EmptyMedia variant="icon">{/* <File /> */}</EmptyMedia>
                    <EmptyTitle className="text-gray-400 font-normal mb-20">
                      プロジェクトがありません
                    </EmptyTitle>
                  </EmptyHeader>
                </Empty>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
