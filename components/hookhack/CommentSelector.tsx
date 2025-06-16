import React, { useMemo } from "react";

const MOCK_SUMMARY = {
  videos: 10,
  comments: 260,
  likes: 100,
};

const MOCK_COMMENTS = [
  {
    name: "koala0424",
    like: 1684,
    text: "人による…",
    url: "https://www.tiktok.com/@girls_cosme/video/7370646455851273480",
    score: 0.1544954128440367,
  },
  {
    name: "𖧷marimo𖧷",
    like: 703,
    text: "白潤マジで良かった\n化粧水難民で敏感肌だけどピリピリしないししっとりするのにベタつかない！！",
    url: "https://www.tiktok.com/@girls_cosme/video/7370646455851273480",
    score: 0.0644954128440367,
  },
  {
    name: "まお",
    like: 44,
    text: "キュレル使ってるけど敏感肌はまじでオススメ。乾燥からくる肌荒れまじで消えた",
    url: "https://www.tiktok.com/@cosme_kaiju/video/7468596651179986183",
    score: 0.018534119629317607,
  },
  {
    name: "maruko",
    like: 27,
    text: "ハトムギ？",
    url: "https://www.tiktok.com/@beekojapan1/video/7459267073357729042",
    score: 0.01784534038334435,
  },
  {
    name: "160cmchan",
    like: 316,
    text: "アヌアの化粧水1回つけたら次の日白ニキビめっちゃできた",
    url: "https://www.tiktok.com/@hirobeautychannel/video/7166535688937114881",
    score: 0.015265700483091787,
  },
];

export const CommentSelector = ({
  onSelect,
}: {
  onSelect?: (comment: any) => void;
}) => {
  // Sort comments by score descending
  const sortedComments = useMemo(
    () => [...MOCK_COMMENTS].sort((a, b) => b.score - a.score),
    []
  );

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* Summary boxes */}
      <div className="flex gap-8 mb-8">
        <div className="flex flex-col items-center">
          <span className="text-xs mb-1">Amount of Videos</span>
          <div className="border rounded-lg px-8 py-4 text-2xl font-semibold bg-white shadow">
            {MOCK_SUMMARY.videos}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs mb-1">Amount of Comments</span>
          <div className="border rounded-lg px-8 py-4 text-2xl font-semibold bg-white shadow">
            {MOCK_SUMMARY.comments}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs mb-1">Amount of Likes</span>
          <div className="border rounded-lg px-8 py-4 text-2xl font-semibold bg-white shadow">
            {MOCK_SUMMARY.likes}
          </div>
        </div>
      </div>
      {/* Table and notes */}
      <div className="relative flex flex-row w-full max-w-3xl">
        {/* Table */}
        <div className="flex-1 bg-gray-100 rounded-xl p-6 shadow flex flex-col">
          <div className="grid grid-cols-7 gap-2 font-semibold mb-2">
            <div className="col-span-1 text-center">Ratio</div>
            <div className="col-span-1 text-center">Likes</div>
            <div className="col-span-4 text-left">Text</div>
            <div className="col-span-1"></div>
          </div>
          {sortedComments.map((c, idx) => (
            <div
              key={c.name + c.like}
              className="grid grid-cols-7 gap-2 items-center mb-2"
            >
              <div className="col-span-1 text-center">
                {(c.score * 100).toFixed(1)}
              </div>
              <div className="col-span-1 text-center">{c.like}</div>
              <div className="col-span-4 text-left truncate" title={c.text}>
                {c.text}
              </div>
              <div className="col-span-1 flex justify-center">
                <button
                  className={`px-4 py-1 rounded-lg text-white text-sm font-semibold transition-colors ${
                    idx === 0
                      ? "bg-indigo-400 hover:bg-indigo-500 cursor-pointer"
                      : "bg-gray-200 cursor-not-allowed"
                  }`}
                  disabled={idx !== 0}
                  onClick={() => idx === 0 && onSelect && onSelect(c)}
                >
                  Use
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Right sticky note */}
      </div>
    </div>
  );
};
