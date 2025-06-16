import React, { useEffect, useState } from "react";
import callApi from "@/config/axios/axios";
import { Button } from "@/components/ui/button";

interface SelectCommentProps {
  videoListData: any[];
  selectedVideo: any;
  onSelectComment?: (comment: any) => void;
}

const mockResponse = {
  success: true,
  data: {
    comments: [
      { name: "User A", like: 1000, text: "Sample comment 1", number: 1 },
      { name: "User B", like: 500, text: "Sample comment 2", number: 2 },
      { name: "User C", like: 200, text: "Sample comment 3", number: 3 },
    ],
    datas: {
      likes: 389000,
      comments: 2164,
      saves: 47800,
      shares: 4479,
    },
  },
};

export const SelectComment: React.FC<SelectCommentProps> = ({
  videoListData,
  selectedVideo,
  onSelectComment,
}) => {
  const [commentData, setCommentData] = useState<any>(null);
  useEffect(() => {
    console.log("INI SELECTED VIDEO : ", selectedVideo);
    const fetchComments = async () => {
      if (selectedVideo && selectedVideo.url) {
        try {
          const payload = {
            input: { demo: true, url: selectedVideo.url, amount: 10 },
          };
          const res = await callApi.post("/scrape-indivisual", payload);
          console.log("INI RESPONSE : ", res.data);
          if (res.data.success) {
            setCommentData(res.data.data);
          } else {
            setCommentData(mockResponse.data);
          }
        } catch (err) {
          setCommentData(mockResponse.data);
        }
      }
    };
    fetchComments();
    console.log("selectedVideo", selectedVideo);
  }, [selectedVideo]);

  if (!selectedVideo) {
    return (
      <div className="w-full flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-6">No video selected</h2>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      {/* About video card section */}
      <div className="w-full flex justify-start items-center mb-2">
        <h2 className="text-2xl text-left font-semibold mb-6">About Video</h2>
      </div>
      <div className="w-full flex flex-col items-center mb-8">
        <div className="w-full  bg-white rounded-xl  p-6 border border-gray-400 mb-4">
          <div className="mb-2 text-xs text-gray-500 font-semibold tracking-wide">
            Video sample
          </div>
          <div className="mb-2 text-lg font-bold">Sample Video Title</div>
          <div className="mb-1 text-sm text-gray-700">
            Creator: <span className="font-medium">Jane Doe</span>
          </div>
          <div className="mb-1 text-sm text-gray-700">
            Date: <span className="font-medium">2024-06-01</span>
          </div>
          <div className="mb-2 text-sm text-gray-700">
            Duration: <span className="font-medium">2:34</span>
          </div>
          <div className="text-sm text-gray-600">Sample brief description</div>
        </div>
        {/* Navigation boxes */}
        <div className="flex flex-row justify-between gap-8 w-full mt-2">
          <div className=" h-32 flex items-center justify-center text-3xl bg-white rounded-lg border border-gray-400 w-full font-bold p-5 flex-col gap-2">
            <h2 className="w-full font-semibold text-gray-600 text-sm">Who</h2>
            <h3 className="w-full text-sm text-gray-800">
              This is a sample description
            </h3>
          </div>
          <div className=" h-32 flex items-center justify-center text-3xl bg-white rounded-lg border border-gray-400 w-full font-bold p-5 flex-col gap-2">
            <h2 className="w-full font-semibold text-gray-600 text-sm">What</h2>
            <h3 className="w-full text-sm text-gray-800">
              This is a sample description
            </h3>
          </div>
          <div className=" h-32 flex items-center justify-center text-3xl bg-white rounded-lg border border-gray-400 w-full font-bold p-5 flex-col gap-2">
            <h2 className="w-full font-semibold text-gray-600 text-sm">How</h2>
            <h3 className="w-full text-sm text-gray-800">
              This is a sample description
            </h3>
          </div>
        </div>
      </div>
      {/* End about video card section */}
      <div className="w-full flex justify-start items-center mt-5 mb-2">
        <h2 className="text-2xl text-left font-semibold mb-2">
          Comments & Stats
        </h2>
      </div>
      {commentData && (
        <>
          <div className="mb-4 w-full flex justify-start items-center">
            <strong>Stats: </strong> Likes: {commentData.datas.likes}, Comments:{" "}
            {commentData.datas.comments}, Saves: {commentData.datas.saves},
            Shares: {commentData.datas.shares}
          </div>
          <table className="min-w-full border-separate border-spacing-y-3 mb-4">
            <thead>
              <tr>
                <th className="px-2 py-1 border">#</th>
                <th className="px-2 py-1 border">User</th>
                <th className="px-2 py-1 border">Like</th>
                <th className="px-2 py-1 border">Comment</th>
                <th className="px-2 py-1 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {commentData.comments.map((c: any, idx: number) => (
                <tr key={c.number}>
                  <td className="px-2 py-1 border">{c.number}</td>
                  <td className="px-2 py-1 border">{c.name}</td>
                  <td className="px-2 py-1 border">{c.like}</td>
                  <td className="px-2 py-1 border">{c.text}</td>
                  <td className="px-2 py-1 border">
                    <Button
                      className="bg-[#E6E6FA] text-[#433D8B] px-4 py-1 rounded-full"
                      disabled={idx !== 0}
                      onClick={() => onSelectComment && onSelectComment(c)}
                    >
                      Use
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};
