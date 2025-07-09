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
  const [hooks, setHooks] = useState<HookData[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editedHook, setEditedHook] = useState<string>("");

  useEffect(() => {
    const getHooks = async () => {
      setLoading(true);
      try {
        const payload = {
          comment: selectedRow?.comments.text || "",
          video_summary: selectedRow?.video_data.summary || "",
        };
        const res = await callApi.post("api/v1/generate/hook", payload);
        if (res.data && Array.isArray(res.data.data)) {
          setHooks(res.data.data);
        } else {
          setHooks(mockHooks);
        }
      } catch (err) {
        setHooks(mockHooks);
      }
      setLoading(false);
    };
    if (selectedRow) getHooks();
  }, [selectedRow]);

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
                {hooks.map((hook, idx) => (
                  <tr key={idx}>
                    <td className="px-2 py-1 border">{idx + 1}</td>
                    <td className="px-2 py-1 border">{hook.label || "N/A"}</td>
                    <td className="px-2 py-1 border">
                      {editingIdx === idx ? (
                        <textarea
                          className="w-full border rounded p-1 text-sm"
                          value={editedHook}
                          onChange={(e) => setEditedHook(e.target.value)}
                        />
                      ) : (
                        hook.text || "N/A"
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
                            const newHooks = [...hooks];
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
                            setEditedHook(hook.text);
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
          </div>
        </div>
      </div>
    </div>
  );
};
