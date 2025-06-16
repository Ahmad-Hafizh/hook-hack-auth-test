import React from "react";

interface VideoRowProps {
    cvr: any;
    likes: any;
    shares: any;
    comments: any;
    thumbnail: any;
    summary: any;
    videoUrl?: string;
    onAnalyzeComplete?: () => void;
}

const VideoRow = ({ cvr, likes, shares, comments, thumbnail, summary, videoUrl, onAnalyzeComplete }: VideoRowProps) => {
    const handleAnalyze = () => {
        setTimeout(() => {
            if (onAnalyzeComplete) onAnalyzeComplete();
        }, 1000);
    };

    return (
      <div className="w-full max-w-5xl mx-auto bg-white border border-gray-200 rounded-lg p-5 shadow-md flex flex-col md:flex-row gap-4">
      {/* Left Section: Stats + Summary + Button */}
      <div className="flex flex-col min-w-[150px] w-full md:w-3/4 gap-2">
        {/* CVR */}
        <div className="px-3 py-1 border rounded text-md font-bold text-white flex items-center justify-between bg-[#433D8B]">
          <span>CVR上位○%</span>
          <span>{cvr}</span>
        </div>
    
        {/* Likes, Shares, Comments */}
        <div className="px-3 py-1 bg-white border rounded text-xs font-semibold text-gray-700 flex items-center justify-between">
          <span>いいね数</span>
          <span>{likes}</span>
        </div>
        <div className="px-3 py-1 bg-white border rounded text-xs font-semibold text-gray-700 flex items-center justify-between">
          <span>シェア数</span>
          <span>{shares}</span>
        </div>
        <div className="px-3 py-1 bg-white border rounded text-xs font-semibold text-gray-700 flex items-center justify-between">
          <span>コメント数</span>
          <span>{comments}</span>
        </div>
    
        {/* Summary */}
        <div className="border border-gray-200 rounded p-3 bg-gray-50 min-h-[200px] h-full flex flex-col">
          <div className="text-xs font-bold text-gray-700 mb-1">要約</div>
          <div className="text-xs text-gray-600 flex-1">{summary}</div>
        </div>
    
        {/* Button */}
        <div className="mt-4">
          <button
            className="w-full bg-[#b89af3] text-[#f9f18d] hover:bg-indigo-600 rounded py-2 text-sm font-semibold transition"
            onClick={handleAnalyze}
          >
            構成を分析する
          </button>
        </div>
      </div>
    
      {/* Right Section: Video */}
      <div className="flex justify-center items-center min-w-[180px] max-w-[250px]">
        <div className="w-[250px] h-full rounded-lg overflow-hidden bg-black flex items-center justify-center">
          {videoUrl ? (
            <video src={videoUrl} controls className="w-full h-full object-cover bg-black" />
          ) : (
            <span className="text-xs text-gray-400">No video found</span>
          )}
        </div>
      </div>
    </div>
    
    );
};

export default VideoRow;
