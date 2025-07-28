import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import callApi from "@/config/axios/axios";

interface HookData {
  label: string;
  text: string;
}

interface SelectHookProps {
  selectedRow: {
    comments: {
      label: boolean;
      text: string;
      like: number;
      name: string;
      value?: string;
    };
    video_data: {
      likes: number;
      comments: number;
      saves: number;
      shares: number;
      summary: string;
      storage: string;
    };
  } | null;
  onSelectHook?: (hook: any) => void;
}

const mockHooks: HookData[] = [
  {
    label: "コメント忠実度100% : トレンド準拠度50%",
    text: "サッカー部なのに、焼けないって最高！",
  },
  {
    label: "コメント忠実度90% : トレンド準拠度60%",
    text: "これで私の肌、ずっと白いまま！",
  },
  {
    label: "コメント忠実度80% : トレンド準拠度70%",
    text: "2度塗りでこんなに違うんです。",
  },
  {
    label: "コメント忠実度70% : トレンド準拠度80%",
    text: "アネッサより肌に優しいって本当？",
  },
  {
    label: "コメント忠実度60% : トレンド準拠度90%",
    text: "コスパ良すぎてリピ決定！",
  },
  {
    label: "コメント忠実度50% : トレンド準拠度100%",
    text: "毎日太陽の下でも肌が白いの！",
  },
];

export const SelectHook: React.FC<SelectHookProps> = ({
  selectedRow,
  onSelectHook,
}) => {
  // DEBUG: Log the received selectedRow prop
  console.log("🐞 DEBUG: SelectHook received selectedRow:", selectedRow);

  const [hooks, setHooks] = useState<HookData[]>(mockHooks); // ✅ Initialize with mock data
  const [loading, setLoading] = useState(false);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editedHook, setEditedHook] = useState<string>("");

  // ✅ Safety check: Ensure we always have hooks
  const safeHooks = hooks.length > 0 ? hooks : mockHooks;

  useEffect(() => {
    const getHooks = async () => {
      if (!selectedRow || !selectedRow.comments) {
        console.log(
          "⚠️ SelectHook - No selectedRow or comments, skipping hook generation"
        );
        setLoading(false); // Stop loading if no data
        return;
      }
      setLoading(true);
      console.log("🔄 SelectHook - Starting hook generation...");

      try {
        const payload = {
          comment: selectedRow.comments.text,
          video_summary: selectedRow.video_data.summary,
        };

        console.log("🔄 SelectHook - API payload:", payload);
        console.log("🔄 SelectHook - Calling api/v1/generate/hook...");

        const res = await callApi.post("api/v1/generate/hook", payload);
        console.log("📡 SelectHook - API response:", res);

        if (
          res.data &&
          Array.isArray(res.data.data) &&
          res.data.data.length > 0
        ) {
          console.log("✅ SelectHook - Using API data:", res.data.data);
          setHooks(res.data.data);
        } else {
          console.log(
            "⚠️ SelectHook - API returned no valid data, using mock data"
          );
          console.log("📋 SelectHook - Mock data:", mockHooks);
          setHooks(mockHooks);
        }
      } catch (err) {
        console.error(
          "❌ SelectHook - API error, falling back to mock data:",
          err
        );
        console.log("📋 SelectHook - Using mock data:", mockHooks);
        setHooks(mockHooks);
      }
      setLoading(false);

      console.log("🏁 SelectHook - Hook generation complete");
    };

    if (selectedRow) {
      console.log("🚀 SelectHook - selectedRow available, getting hooks...");
      getHooks();
    } else {
      console.log("⚠️ SelectHook - No selectedRow, skipping hook generation");
    }
  }, [selectedRow]);

  if (!selectedRow) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[200px]">
        <div className="text-lg text-gray-500">
          Please select a comment first to generate hooks.
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[200px]">
        <div className="text-lg text-[#433D8B] font-semibold">
          Loading hooks...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex flex-col items-center">
        {/* Card */}
        <div className="w-full bg-white">
          {/* Header Row */}
          <h2 className="text-2xl text-left font-semibold mb-6">
            コメント情報
          </h2>
          <div className="flex flex-row gap-4 mb-4 w-full">
            <div className="border border-gray-400 rounded-md flex flex-col items-start justify-center p-5 gap-2 w-full">
              <div className="text-sm text-gray-500 font-semibold">
                コメント
              </div>
              <div className="text-base text-gray-700 text-center">
                {selectedRow?.comments.text || "No comment selected."}
              </div>
            </div>
          </div>
          <div className="w-full flex gap-5 mb-4">
            <div className="font-semibold text-base border border-gray-400 rounded-md py-4 px-4 flex flex-col items-start justify-center w-full text-left">
              <h2 className="text-xs font-normal">いいね数</h2>
              <h2 className="text-sm">{selectedRow?.comments.like ?? "-"}</h2>
            </div>
            <div className="font-semibold text-base border border-gray-400 rounded-md py-4 px-4 flex flex-col items-start justify-center w-full text-left">
              <h2 className="text-xs font-normal">価値</h2>
              <h2 className="text-sm">{selectedRow?.comments.value ?? "-"}</h2>
            </div>
          </div>
          <h2 className="text-2xl text-center font-semibold mt-12 mb-4">
            参考にしたいフックを選択してください。
          </h2>
          <div className="w-full flex flex-col items-center">
            {safeHooks.filter((hook) => hook && typeof hook === "object")
              .length === 0 ? (
              <div className="w-full p-8 text-center bg-gray-50 border border-gray-200 rounded-lg">
                <div className="text-gray-600 mb-4">
                  <p className="text-lg font-medium">No hooks available</p>
                  <p className="text-sm">
                    Hook generation is not available right now. You can skip
                    this step and continue.
                  </p>
                </div>
              </div>
            ) : (
              <table className="min-w-full border-separate border-spacing-y-3 mb-4">
                <thead>
                  <tr>
                    <th className="px-2 py-1 border">No</th>
                    <th className="px-2 py-1 border">ラベル</th>
                    <th className="px-2 py-1 border">フック</th>
                    <th className="px-2 py-1 border">選択・編集</th>
                  </tr>
                </thead>
                <tbody>
                  {safeHooks
                    .filter((hook) => hook && typeof hook === "object")
                    .map((hook, idx) => (
                      <tr key={idx}>
                        <td className="px-2 py-1 border">{idx + 1}</td>
                        <td className="px-2 py-1 border">
                          {hook?.label || "N/A"}
                        </td>
                        <td className="px-2 py-1 border">
                          {editingIdx === idx ? (
                            <textarea
                              className="w-full border rounded p-1 text-sm"
                              value={editedHook}
                              onChange={(e) => setEditedHook(e.target.value)}
                            />
                          ) : (
                            hook?.text || "N/A"
                          )}
                        </td>
                        <td className="px-2 py-1 border flex gap-2">
                          <Button
                            className="bg-[#E6E6FA] text-[#433D8B] px-4 py-1 rounded-full"
                            onClick={() => onSelectHook && onSelectHook(hook)}
                          >
                            選択
                          </Button>
                          {editingIdx === idx ? (
                            <Button
                              className="bg-green-200 text-green-900 px-4 py-1 rounded-full"
                              onClick={() => {
                                const newHooks = [...safeHooks];
                                newHooks[idx] = {
                                  ...newHooks[idx],
                                  text: editedHook,
                                };
                                setHooks(newHooks);
                                setEditingIdx(null);
                              }}
                            >
                              保存
                            </Button>
                          ) : (
                            <Button
                              className="bg-yellow-100 text-yellow-900 px-4 py-1 rounded-full"
                              onClick={() => {
                                setEditingIdx(idx);
                                setEditedHook(hook?.text || "");
                              }}
                            >
                              編集
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
