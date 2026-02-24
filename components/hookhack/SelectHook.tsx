import React from "react";

const MOCK_DATA = {
  percent: 15.4,
  likes: 1684,
  sampledComment: "男性からメイク似合ってないって言われたことがある。",
  comment_explanation:
    "This comment reflects a common sentiment among users, highlighting the diversity of opinions.",
  hook: {
    type_A: "How is your life?",
    type_B: "Do you want to have fun!",
    type_C: "What is the best way to do this?",
    type_D: "What is the best way to do this?",
  },
};

const HOOK_TYPE_LABELS = {
  type_A: "Question",
  type_B: "Excitement",
  type_C: "Curiosity",
  type_D: "Need",
};

export const SelectHook = ({
  onSelect,
  comment,
}: {
  onSelect?: (hook: any) => void;
  comment?: any;
}) => {
  React.useEffect(() => {
    if (comment) {
      console.log("Selected comment in SelectHook:", comment);
    }
  }, [comment]);

  // Prepare hooks as array, filter out empty
  const hooksArr = (
    Object.entries(MOCK_DATA.hook) as [keyof typeof HOOK_TYPE_LABELS, string][]
  )
    .filter(([, v]) => v)
    .map(([k, v]) => ({ type: HOOK_TYPE_LABELS[k] || k, text: v }));

  return (
    <div className="w-full flex flex-col items-center justify-center p-8">
      {/* Summary row */}
      <div className="flex w-full max-w-3xl mb-4 gap-2">
        <div className="flex flex-1 gap-2">
          <div className="flex flex-col items-center flex-1">
            <div className="border rounded-lg px-4 py-2 text-sm font-medium bg-white shadow w-full text-center">
              Ratio
              <div className="text-xl font-bold mt-1">{MOCK_DATA.percent}</div>
            </div>
          </div>
          <div className="flex flex-col items-center flex-1">
            <div className="border rounded-lg px-4 py-2 text-sm font-medium bg-white shadow w-full text-center">
              Likes
              <div className="text-xl font-bold mt-1">{MOCK_DATA.likes}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center flex-[2]">
          <div className="border rounded-lg px-4 py-2 bg-white shadow w-full text-center flex flex-col justify-start items-start h-full">
            <span className="text-sm font-medium text-gray-600 mb-1">
              Comment
            </span>
            <span className="text-base text-black">
              {MOCK_DATA.sampledComment}
            </span>
          </div>
        </div>
      </div>
      {/* Insight box */}
      <div className="w-full max-w-3xl mb-6">
        <div className="border rounded-lg px-6 py-4 bg-gray-50 shadow text-center text-base">
          <div className="font-semibold mb-1 text-left">Summary of Insight</div>
          <div className="text-gray-700">
            {MOCK_DATA.comment_explanation || "Details about the comment"}
          </div>
        </div>
      </div>
      {/* Hook table */}
      <div className="w-full max-w-3xl bg-gray-100 rounded-xl p-6 shadow flex flex-col relative">
        <div className="flex flex-row items-center mb-2">
          <div className="w-1/4 text-center font-semibold">Type</div>
          <div className="w-2/4 text-left font-semibold">Hook</div>
        </div>
        {hooksArr.map((h, idx) => (
          <div
            key={h.type + h.text}
            className="flex flex-row items-center mb-2"
          >
            <div className="w-1/4 text-center">{h.type}</div>
            <div className="w-2/4 text-left">{h.text}</div>
            <div className="w-1/4 flex justify-end">
              <button
                className={`px-4 py-1 rounded-lg text-white text-sm font-semibold transition-colors ${
                  idx === 0
                    ? "bg-indigo-400 hover:bg-indigo-500 cursor-pointer"
                    : "bg-gray-200 cursor-not-allowed"
                }`}
                disabled={idx !== 0}
                onClick={() => idx === 0 && onSelect && onSelect(h)}
              >
                Use
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
