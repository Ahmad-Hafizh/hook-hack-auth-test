"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, User, Mail, Settings } from "lucide-react";
import type { FormData } from "../multi-step-form";
import { useState, useEffect } from "react";
import React from "react";

interface SceneGeneratorProps {
  structureResult: any;
}

export function SceneGenerator({ structureResult }: SceneGeneratorProps) {
  const [loading, setLoading] = useState(true);
  const [dotCount, setDotCount] = useState(1);
  const [sceneData, setSceneData] = useState<any>([]);

  useEffect(() => {
    setLoading(true);
    setSceneData(structureResult.video_content_second);
    setLoading(false);
  }, [structureResult]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
          <div className="text-lg text-blue-700 font-semibold">
            Please wait while we are generating your scene result
            {".".repeat(dotCount)}
          </div>
        </div>
      </div>
    );
  }

  // Layout matching the image
  return (
    <div className="flex justify-center items-center min-h-[60vh] ">
      <div className="bg-white rounded-2xl shadow-lg text-gray-700 w-full max-w-7xl">
        <div className="overflow-x-auto" style={{ maxHeight: "70vh" }}>
          <table className="w-full border-separate border-spacing-y-2 md:text-sm rounded-2xl text-xs">
            <thead>
              <tr>
                <th className="sticky top-0 z-10 bg-gray-50 p-2 text-left font-medium text-xs text-gray-700 rounded-tl-xl ">
                  Seconds
                </th>
                <th className="sticky top-0 z-10 bg-gray-50 p-2 text-left font-medium text-xs text-gray-700">
                  Structure
                </th>
                <th className="sticky top-0 z-10 bg-gray-50 p-2 text-left font-medium text-xs text-gray-700">
                  Caption
                </th>
                <th className="sticky top-0 z-10 bg-gray-50 p-2 text-left font-medium text-xs text-gray-700">
                  Visual Info
                </th>
                <th className="sticky top-0 z-10 bg-gray-50 p-2 text-left font-medium text-xs text-gray-700">
                  Visual Background
                </th>
                <th className="sticky top-0 z-10 bg-gray-50 p-2 text-left font-medium text-xs text-gray-700">
                  Visual Movement
                </th>
                <th className="sticky top-0 z-10 bg-gray-50 p-2 text-left font-medium text-xs text-gray-700">
                  Shooting Method
                </th>
                <th className="sticky top-0 z-10 bg-gray-50 p-2 text-left font-medium text-xs text-gray-700 rounded-tr-xl">
                  Summary
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(sceneData) &&
                sceneData.map((scene: any, idx: number) => (
                  <tr
                    key={idx}
                    className="transition-colors duration-150 hover:bg-blue-50 group rounded-xl"
                    style={{ borderRadius: 12 }}
                  >
                    <td className="bg-white border border-gray-100 align-top p-3 text-center rounded-l-xl group-first:rounded-tl-xl group-last:rounded-bl-xl text-xs md:text-sm text-gray-700 whitespace-nowrap">
                      {scene.sec}
                    </td>
                    <td className="bg-white border border-gray-100 align-top p-3 text-gray-700 text-xs whitespace-nowrap">
                      {scene.structure}
                    </td>
                    <td className="bg-white border border-gray-100 align-top p-3 text-gray-600 text-xs">
                      {scene.visual_caption}
                    </td>
                    <td className="bg-white border border-gray-100 align-top p-3 text-gray-600 text-xs">
                      {scene.visual_info}
                    </td>
                    <td className="bg-white border border-gray-100 align-top p-3 text-gray-600 text-xs">
                      {scene.visual_background}
                    </td>
                    <td className="bg-white border border-gray-100 align-top p-3 text-gray-600 text-xs">
                      {scene.visual_movement}
                    </td>
                    <td className="bg-white border border-gray-100 align-top p-3 text-gray-600 text-xs">
                      {scene.visual_method}
                    </td>
                    <td className="bg-white border border-gray-100 align-top p-3 text-gray-600 text-xs rounded-r-xl group-first:rounded-tr-xl group-last:rounded-br-xl">
                      {scene.summary}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
