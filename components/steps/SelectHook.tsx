import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import callApi from "@/config/axios/axios";

interface HookData {
  type: string;
  hook: string;
}

interface SelectHookProps {
  searchword: string;
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
    const res = await callApi.post("/get-hooks", payload);
    if (res.data && res.data.success) {
      return res.data.data;
    }
    throw new Error("API did not return success");
  } catch (err) {
    return null;
  }
}

export const SelectHook: React.FC<SelectHookProps> = ({
  searchword,
  onSelectHook,
}) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editedHook, setEditedHook] = useState<string>("");

  useEffect(() => {
    console.log("searchword", searchword);
    const getHooks = async () => {
      setLoading(true);
      const apiData = await fetchHooks(searchword);
      if (apiData) {
        setData(apiData);
      } else {
        setData(mockHookResponse);
      }
      setLoading(false);
    };
    if (searchword) getHooks();
  }, [searchword]);

  if (loading || !data) {
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
            {/* <div className="border border-gray-400 rounded-md flex-1 flex flex-col items-start justify-center p-5 gap-2">
              <div className="text-sm text-gray-500 font-semibold">
                Ratio (Likes/%)
              </div>
              <div className="text-lg font-bold">{data.percent}</div>
            </div>
            <div className="border border-gray-400 rounded-md flex-1 flex flex-col items-start justify-center p-5 gap-2">
              <div className="text-sm text-gray-500 font-semibold">Likes</div>
              <div className="text-lg font-bold">{data.likes}</div>
            </div> */}

            <div className="border border-gray-400 rounded-md flex flex-col items-start justify-center p-5 gap-2 w-full">
              <div className="text-sm text-gray-500 font-semibold">
                Comment Insight
              </div>
              <div className="text-base text-gray-700 text-center">
                {data.sampledComment}
              </div>
            </div>
          </div>
          {/* Insight/Summary */}
          <div className="w-full flex gap-5">
            <div className="font-semibold text-base mb-1 border border-gray-400 rounded-md py-4 px-4 flex flex-col items-start justify-center w-full text-left">
              <h2 className="text-xs font-normal">Likes</h2>
              <h2 className="text-sm">50</h2>
            </div>
            <div className="font-semibold text-base mb-1 border border-gray-400 rounded-md py-4 px-4 flex flex-col items-start justify-center w-full text-left">
              <h2 className="text-xs font-normal">Value</h2>
              <h2 className="text-sm">Functional</h2>
            </div>
          </div>
          {/* <div className="border border-gray-400 rounded-md py-4 px-4 mb-6 w-full text-left">
          
            <div className="text-sm text-gray-600">{data.insightSummary}</div>
          </div> */}
          {/* Hooks Table - styled like SelectComment */}
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
                {data.hooks.map((h: any, idx: number) => (
                  <tr key={h.type}>
                    <td className="px-2 py-1 border">{idx + 1}</td>
                    <td className="px-2 py-1 border">
                      {editingIdx === idx ? (
                        <textarea
                          className="w-full border rounded p-1 text-sm"
                          value={editedHook}
                          onChange={(e) => setEditedHook(e.target.value)}
                        />
                      ) : (
                        h.hook
                      )}
                    </td>
                    <td className="px-2 py-1 border flex gap-2">
                      <Button
                        className="bg-[#E6E6FA] text-[#433D8B] px-4 py-1 rounded-full"
                        disabled={idx !== 0}
                        onClick={() =>
                          idx === 0 && onSelectHook && onSelectHook(h)
                        }
                      >
                        use
                      </Button>
                      {editingIdx === idx ? (
                        <Button
                          className="bg-green-200 text-green-900 px-4 py-1 rounded-full"
                          onClick={() => {
                            // Save edited hook
                            const newHooks = [...data.hooks];
                            newHooks[idx] = {
                              ...newHooks[idx],
                              hook: editedHook,
                            };
                            setData({ ...data, hooks: newHooks });
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
                            setEditedHook(h.hook);
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
