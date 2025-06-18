import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import callApi from "@/config/axios/axios";

interface HookData {
  type: string;
  hook: string;
}

interface SelectHookProps {
  searchword: string;
  comment: any;
  onSelectHook?: (hook: any) => void;
}

const mockHookResponse = {
  percent: 87,
  likes: 120,
  sampledComment: "This product changed my life! Highly recommended.",
  insightSummary:
    "This comment shows strong excitement and trust in the product, which can be leveraged as a hook.",
  hooks: [
    { type: "Question", hook: "How is your life?" },
    { type: "Excitement", hook: "Do you want to have fun!" },
    { type: "Curiosity", hook: "What happens if you try this?" },
  ],
};

// API call function
async function fetchHooks(searchword: string) {
  try {
    const payload = { input: { demo: true, searchword } };
    const res = await callApi.post("/generate-hook", payload);

    return res.data.data;
  } catch (err) {
    return null;
  }
}

export const SelectHook: React.FC<SelectHookProps> = ({
  searchword,
  comment,
  onSelectHook,
}) => {
  const [hooks, setHooks] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editedHook, setEditedHook] = useState<string>("");

  useEffect(() => {
    const getHooks = async () => {
      setLoading(true);
      const apiHooks = await fetchHooks(searchword);
      if (apiHooks) {
        setHooks(apiHooks);
      } else {
        setHooks([]);
      }
      setLoading(false);
    };
    if (searchword) getHooks();
  }, [searchword]);

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
            About Comment
          </h2>
          <div className="flex flex-row gap-4 mb-4 w-full">
            <div className="border border-gray-400 rounded-md flex flex-col items-start justify-center p-5 gap-2 w-full">
              <div className="text-sm text-gray-500 font-semibold">
                Comment Insight
              </div>
              <div className="text-base text-gray-700 text-center">
                {comment?.text || comment?.analyse || "No comment selected."}
              </div>
            </div>
          </div>
          <div className="w-full flex gap-5 mb-4">
            <div className="font-semibold text-base border border-gray-400 rounded-md py-4 px-4 flex flex-col items-start justify-center w-full text-left">
              <h2 className="text-xs font-normal">Likes</h2>
              <h2 className="text-sm">{comment?.like ?? "-"}</h2>
            </div>
            <div className="font-semibold text-base border border-gray-400 rounded-md py-4 px-4 flex flex-col items-start justify-center w-full text-left">
              <h2 className="text-xs font-normal">Value</h2>
              <h2 className="text-sm">{comment?.value ?? "-"}</h2>
            </div>
          </div>
          <h2 className="text-2xl text-left font-semibold mt-7 mb-3">
            Select Hook
          </h2>
          <div className="w-full flex flex-col items-center">
            <table className="min-w-full border-separate border-spacing-y-3 mb-4">
              <thead>
                <tr>
                  <th className="px-2 py-1 border">No</th>
                  <th className="px-2 py-1 border">Hook</th>
                  <th className="px-2 py-1 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {hooks.map((hook, idx) => (
                  <tr key={idx}>
                    <td className="px-2 py-1 border">{idx + 1}</td>
                    <td className="px-2 py-1 border">
                      {editingIdx === idx ? (
                        <textarea
                          className="w-full border rounded p-1 text-sm"
                          value={editedHook}
                          onChange={(e) => setEditedHook(e.target.value)}
                        />
                      ) : (
                        hook
                      )}
                    </td>
                    <td className="px-2 py-1 border flex gap-2">
                      <Button
                        className="bg-[#E6E6FA] text-[#433D8B] px-4 py-1 rounded-full"
                        onClick={() => onSelectHook && onSelectHook(hook)}
                      >
                        use
                      </Button>
                      {editingIdx === idx ? (
                        <Button
                          className="bg-green-200 text-green-900 px-4 py-1 rounded-full"
                          onClick={() => {
                            // Save edited hook
                            const newHooks = [...hooks];
                            newHooks[idx] = editedHook;
                            setHooks(newHooks);
                            setEditingIdx(null);
                          }}
                        >
                          Save
                        </Button>
                      ) : (
                        <Button
                          className="bg-yellow-100 text-yellow-900 px-4 py-1 rounded-full"
                          onClick={() => {
                            setEditingIdx(idx);
                            setEditedHook(hook);
                          }}
                        >
                          Edit
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
