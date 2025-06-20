"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, User, Mail, Settings } from "lucide-react";
import type { FormData } from "../multi-step-form";
import React, { useEffect, useState } from "react";
import callApi from "@/config/axios/axios";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

interface StructureGeneratorProps {
  video_url: string;
  client_input: any;
  onStructureReady?: (result: any) => void;
}

const mockGeneratedContent = [
  {
    scene: 1,
    sec: 0,
    structure: "hook",
    caption: "「仕事でヘトヘト…もう癒やされたい」",
    visual_info:
      "女性がオフィスで疲れ切った表情をしている。背景にはパソコンや書類が見える。",
    visual_movement:
      "女性が肩を落とし、ため息をつく。顔をしかめたり、目を閉じたりする。",
    visual_method:
      "オフィスでの日常風景を再現。手持ちカメラで撮影し、リアルな雰囲気を出す。",
    visual_prompt: "",
    proof:
      "- 基本情報分析：ターゲットの課題（忙しい毎日で気持ちが落ち着かない）",
  },
  {
    scene: 2,
    sec: 5,
    structure: "問題提起",
    caption: "「毎日のスキンケア、面倒じゃない？」",
    visual_info: "洗面所で鏡を見つめる女性。手にはスキンケア商品。",
    visual_movement: "女性が悩んだ表情で商品を見つめる。",
    visual_method: "鏡越しのショットでリアル感を演出。",
    visual_prompt: "",
    proof: "- ターゲットの悩み：スキンケアの手間",
  },
  {
    scene: 3,
    sec: 10,
    structure: "解決策提示",
    caption: "「これ一本でOK！」",
    visual_info: "商品を手に持ち、笑顔で紹介する女性。",
    visual_movement: "女性が商品をカメラに向けて見せる。",
    visual_method: "明るい照明で商品を強調。",
    visual_prompt: "",
    proof: "- 商品の特徴：オールインワンタイプ",
  },
  {
    scene: 4,
    sec: 15,
    structure: "使用シーン",
    caption: "「朝の忙しい時間でも簡単！」",
    visual_info: "朝のバタバタした様子。女性が素早くスキンケアをする。",
    visual_movement: "女性が時計を見ながら商品を使う。",
    visual_method: "タイムラプスでスピード感を演出。",
    visual_prompt: "",
    proof: "- 利便性の強調：時短ケア",
  },
  {
    scene: 5,
    sec: 20,
    structure: "ベネフィット",
    caption: "「これで一日中しっとり肌！」",
    visual_info: "女性が外出先で肌を触って満足そうな表情。",
    visual_movement: "女性が頬を触って微笑む。",
    visual_method: "屋外の自然光で健康的な肌を表現。",
    visual_prompt: "",
    proof: "- 効果の実感：保湿力の持続",
  },
];

export function StructureGenerator({
  video_url,
  client_input,
  onStructureReady,
}: StructureGeneratorProps) {
  const [loading, setLoading] = useState(true);
  const [dotCount, setDotCount] = useState(1);
  const [generatedContent, setGeneratedContent] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editableContent, setEditableContent] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const callingAPI = async () => {
    setLoading(true);
    setError(null);
    const payload = {
      input: {
        demo: true,
        keyword: client_input.searchword,
      },
    };
    console.log("INI PAYLOAD : ", payload);
    try {
      const response = await callApi.post("/generate-content", payload);
      console.log("INI RESPONSE NEW API : ", response);
      if (response.data.success) {
        setGeneratedContent(response.data.data.generated_content);
        setEditableContent(response.data.data.generated_content);
        setLoading(false);
        if (onStructureReady)
          onStructureReady(response.data.data.generated_content);
      } else {
        setGeneratedContent(mockGeneratedContent);
        setEditableContent(mockGeneratedContent);
        setError(null);
        setLoading(false);
      }
    } catch (err: any) {
      setGeneratedContent(mockGeneratedContent);
      setEditableContent(mockGeneratedContent);
      setError(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setGeneratedContent([]);
    setEditableContent([]);
    setDotCount(1);
    setIsEditing(false);
    callingAPI();
    const dotInterval = setInterval(() => {
      setDotCount((prev) => (prev % 3) + 1);
    }, 400);
    return () => {
      clearInterval(dotInterval);
    };
  }, [video_url, client_input]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditableContent(JSON.parse(JSON.stringify(generatedContent)));
  };

  const handleSave = () => {
    setIsEditing(false);
    setGeneratedContent(editableContent);
    if (onStructureReady) onStructureReady(editableContent);
  };

  const handleChange = (idx: number, key: string, value: string) => {
    setEditableContent((prev) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [key]: value };
      return updated;
    });
  };

  // CSV download logic
  const handleDownloadCSV = () => {
    const tableData = isEditing ? editableContent : generatedContent;
    if (!tableData.length) return;
    const now = new Date();
    const dateStr = now.toLocaleString();
    const header = [
      "Scene",
      "Sec",
      "Structure",

      "Caption",
      "Visual Info",
      "Visual Movement",
      "Visual Method",
      // 'Visual Prompt', // omitted as in table
      "Proof",
    ];
    const rows = tableData.map((row) => [
      row.scene,
      row.sec,
      row.structure?.replace(/\r?\n/g, " ") ?? "",
      row.caption?.replace(/\r?\n/g, " ") ?? "",
      row.visual_info?.replace(/\r?\n/g, " ") ?? "",
      row.visual_movement?.replace(/\r?\n/g, " ") ?? "",
      row.visual_method?.replace(/\r?\n/g, " ") ?? "",
      // row.visual_prompt?.replace(/\r?\n/g, " ") ?? "",
      row.proof?.replace(/\r?\n/g, " ") ?? "",
    ]);
    // CSV content
    let csvContent = "";
    csvContent += `Created with Clip-Studio (clip-studio.tokyo)\n`;
    csvContent += `Exported: ${dateStr}\n`;
    csvContent += `\n`;
    csvContent += header.join(",") + "\n";
    rows.forEach((r) => {
      csvContent +=
        r
          .map((field) => '"' + String(field).replace(/"/g, '""') + '"')
          .join(",") + "\n";
    });
    // Download
    const BOM = "\uFEFF";
    const blob = new Blob([BOM + csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `structure_${now.getFullYear()}-${
        now.getMonth() + 1
      }-${now.getDate()}_${now.getHours()}${now.getMinutes()}${now.getSeconds()}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]  rounded-2xl">
        <div className="flex flex-col items-center gap-4">
          {/* <div className="w-12 h-12 border-4 border-[#433D8B] border-t-transparent rounded-full animate-spin" /> */}
          <img src="/pedropedro.gif" className="w-20 h-20" />
          <div className="text-lg text-[#433D8B] font-semibold">
            シーンを生成中🏋
            {".".repeat(dotCount)}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] rounded-2xl">
        <div className="text-lg text-[#433D8B] font-semibold mb-2">{error}</div>
        <Button onClick={callingAPI} className="bg-[#2E236C] text-white mt-2">
          Retry
        </Button>
      </div>
    );
  }

  const tableData = isEditing ? editableContent : generatedContent;

  return (
    <div className="w-full min-h-[60vh] flex flex-col justify-start items-start py-10 px-1 md:px-4 overflow-x-auto">
      <div className="flex justify-end items-center gap-2 mb-2">
        <Button
          variant="outline"
          size="sm"
          onClick={callingAPI}
          disabled={loading}
        >
          再生成
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownloadCSV}
          disabled={
            loading ||
            (isEditing
              ? editableContent.length === 0
              : generatedContent.length === 0)
          }
        >
          CSVダウンロード
        </Button>
        {!isEditing ? (
          <Button
            variant="outline"
            size="sm"
            onClick={handleEdit}
            disabled={loading || tableData.length === 0}
          >
            編集
          </Button>
        ) : (
          <Button variant="default" size="sm" onClick={handleSave}>
            保存
          </Button>
        )}
      </div>
      <div className="w-full bg-white rounded-xl shadow p-1 md:p-3">
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-2 text-[10px] md:text-xs">
            <thead>
              <tr>
                <th className="bg-gray-200 p-1 rounded-tl-lg text-left whitespace-nowrap">
                  シーン
                </th>
                <th className="bg-gray-200 p-1 text-left whitespace-nowrap">
                  秒数
                </th>
                <th className="bg-gray-200 p-1 text-left whitespace-nowrap">
                  構成
                </th>
                <th className="bg-gray-200 p-1 text-left whitespace-nowrap">
                  キャプション
                </th>
                <th className="bg-gray-200 p-1 text-left whitespace-nowrap">
                  視覚的情報
                </th>
                <th className="bg-gray-200 p-1 text-left whitespace-nowrap">
                  視覚的動作
                </th>
                <th className="bg-gray-200 p-1 text-left whitespace-nowrap">
                  撮影方法
                </th>
                <th className="bg-gray-200 p-1 rounded-tr-lg text-left whitespace-nowrap">
                  根拠
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, idx) => (
                <tr key={idx}>
                  <td className="bg-white border border-gray-300 align-top p-1 font-bold text-gray-700 text-center whitespace-nowrap">
                    {row.scene}
                  </td>
                  <td className="bg-white border border-gray-300 align-top p-1 text-center whitespace-nowrap">
                    {row.sec}
                  </td>
                  <td className="bg-white border border-gray-300 align-top p-1 text-center whitespace-nowrap">
                    {isEditing ? (
                      <Textarea
                        className="min-h-[50px] text-xs"
                        value={row.structure}
                        disabled={!isEditing}
                        onChange={(e) =>
                          handleChange(idx, "structure", e.target.value)
                        }
                      />
                    ) : (
                      row.structure
                    )}
                  </td>

                  <td className="bg-white border border-gray-300 align-top p-1 whitespace-pre-line">
                    {isEditing ? (
                      <Textarea
                        className="min-h-[50px] text-xs"
                        value={row.caption}
                        disabled={!isEditing}
                        onChange={(e) =>
                          handleChange(idx, "visual_caption", e.target.value)
                        }
                      />
                    ) : (
                      row.caption
                    )}
                  </td>
                  <td className="bg-white border border-gray-300 align-top p-1 whitespace-pre-line">
                    {isEditing ? (
                      <Textarea
                        className="min-h-[50px] text-xs"
                        value={row.visual_info}
                        disabled={!isEditing}
                        onChange={(e) =>
                          handleChange(idx, "visual_info", e.target.value)
                        }
                      />
                    ) : (
                      row.visual_info
                    )}
                  </td>
                  <td className="bg-white border border-gray-300 align-top p-1 whitespace-pre-line">
                    {isEditing ? (
                      <Textarea
                        className="min-h-[50px] text-xs"
                        value={row.visual_movement}
                        disabled={!isEditing}
                        onChange={(e) =>
                          handleChange(idx, "visual_movement", e.target.value)
                        }
                      />
                    ) : (
                      row.visual_movement
                    )}
                  </td>
                  <td className="bg-white border border-gray-300 align-top p-1 whitespace-pre-line">
                    {isEditing ? (
                      <Textarea
                        className="min-h-[50px] text-xs"
                        value={row.visual_method}
                        disabled={!isEditing}
                        onChange={(e) =>
                          handleChange(idx, "visual_method", e.target.value)
                        }
                      />
                    ) : (
                      row.visual_method
                    )}
                  </td>
                  {/* <td className="bg-white border border-gray-300 align-top p-1 whitespace-pre-line">
                    {isEditing ? (
                      <Textarea
                        className="min-h-[50px] text-xs"
                        value={row.visual_prompt}
                        disabled={!isEditing}
                        onChange={e => handleChange(idx, 'visual_prompt', e.target.value)}
                      />
                    ) : (
                      row.visual_prompt
                    )}
                  </td> */}
                  <td className="bg-white border border-gray-300 align-top p-1 whitespace-pre-line">
                    {isEditing ? (
                      <Textarea
                        className="min-h-[50px] text-xs"
                        value={row.proof}
                        disabled={!isEditing}
                        onChange={(e) =>
                          handleChange(idx, "proof", e.target.value)
                        }
                      />
                    ) : (
                      row.proof
                    )}
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
