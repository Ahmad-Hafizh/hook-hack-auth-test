export interface PDCACycle {
  id: string;
  status: "planning" | "executing" | "completed" | "cancelled";
  hypothesis: string;
  memo: string;
}

export const statusConfig: Record<
  PDCACycle["status"],
  { label: string; bgClass: string; textClass: string; borderClass: string }
> = {
  planning: {
    label: "計画中",
    bgClass: "bg-blue-100",
    textClass: "text-blue-800",
    borderClass: "border-blue-200",
  },
  executing: {
    label: "実行中",
    bgClass: "bg-emerald-100",
    textClass: "text-emerald-800",
    borderClass: "border-emerald-200",
  },
  completed: {
    label: "完了",
    bgClass: "bg-slate-100",
    textClass: "text-slate-600",
    borderClass: "border-slate-200",
  },
  cancelled: {
    label: "中止",
    bgClass: "bg-slate-100",
    textClass: "text-slate-600",
    borderClass: "border-slate-200",
  },
};
