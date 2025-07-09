import React, { useEffect, useState } from "react";
import callApi from "@/config/axios/axios";
import { Button } from "@/components/ui/button";

interface ApiComment {
  comments: {
    label: boolean;
    text: string;
    like: number;
    name: string;
  };
  video_data: {
    likes: number;
    comments: number;
    saves: number;
    shares: number;
    summary: string;
    storage: string;
  };
}

interface SelectCommentProps {
  data?: ApiComment[];
  onSelectComment?: (comment: ApiComment) => void;
  onPlayVideo?: (row: ApiComment) => void;
  searchword?: string;
}

export const SelectComment: React.FC<SelectCommentProps> = ({
  data = [],
  onSelectComment,
  onPlayVideo,
  searchword,
}) => {
  const [commentList, setCommentList] = useState<ApiComment[]>([]);

  useEffect(() => {
    setCommentList(data);
    console.log(searchword);
  }, [data]);

  return (
    <div className="w-full flex flex-col items-center">
      {searchword && (
        <div className="text-2xl text-[#433D8B] font-semibold mt-4 mb-8">
          検索ワード: {searchword}
        </div>
      )}
      <h2 className="text-2xl text-center font-semibold mb-6">コメント一覧</h2>
      <table className="min-w-full border-separate border-spacing-y-3 mb-4">
        <thead>
          <tr>
            <th className="px-2 py-1 border">Comments</th>
            <th className="px-2 py-1 border w-[180px]">Video</th>
            <th className="px-2 py-1 border w-[100px]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {commentList.map((row, idx) => (
            <tr key={idx}>
              <td className="px-2 py-1 border align-top">
                <div className="whitespace-pre-line text-sm">
                  {row.comments.text}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {row.comments.name} / {row.comments.like} いいね
                </div>
              </td>
              <td className="px-2 py-1 border align-top text-center">
                <Button
                  className="bg-[#E6E6FA] text-[#433D8B] px-4 py-1 rounded"
                  onClick={() => onPlayVideo && onPlayVideo(row)}
                >
                  再生 ▶️
                </Button>
              </td>
              <td className="px-2 py-1 border align-top text-center">
                <Button
                  className="bg-[#E6E6FA] text-[#433D8B] px-4 py-1 rounded"
                  onClick={() => onSelectComment && onSelectComment(row)}
                >
                  Use
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
