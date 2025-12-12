"use client";
import callApi from "@/config/axios/axios";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
// import { useDataContext } from '../hooks/useDataContext';

const Step5 = () => {
  // const { rendersCreatomate } = useDataContext();
  const { sessionId } = useParams();
  const [renderedVideos, setRenderedVideos] = React.useState<
    { videoUrl: string }[]
  >([]);

  const getRenderedVideos = async () => {
    try {
      const { data } = await callApi.post("/app-v2/planning/generation", {
        sessionId: sessionId,
      });
      setRenderedVideos(data.renders);
    } catch (error) {
      console.error("Error fetching rendered videos:", error);
    }
  };

  useEffect(() => {
    getRenderedVideos();
  }, []);

  return (
    <div className="w-full h-full py-10 px-10  flex flex-col justify-center items-center">
      <div className="mb-10">
        <h1 className="text-2xl font-semibold">プレビュー</h1>
      </div>
      <div className="relative w-full h-fit overflow-x-scroll">
        <div className="flex w-fit gap-6 justify-center items-center">
          {renderedVideos.map((render, index) => (
            <video
              key={index}
              className="aspect-[9/16] w-[350px] rounded-xl mb-4"
              controls
            >
              <source src={render.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step5;
