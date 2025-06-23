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
    caption: "「サッカー部なのに、焼けないって最高！」",
    visual_info: "明るい運動場でサッカーを楽しむ女子高生たちのシーン。",
    visual_movement:
      "カメラはプレイヤーたちを追いかけ、笑顔でボールをパスする様子をズームイン。",
    visual_method: "元気で楽しい雰囲気を伝えるためにスローモーションを使用。",
    visual_prompt: "楽しそうにスポーツをする女子高生たち。",
    proof: "フック案より引用。",
  },
  {
    scene: 2,
    sec: 5,
    structure: "problem",
    caption: "「日焼けが気になってスポーツを思い切り楽しめない...」",
    visual_info: "日差しを気にして陰に隠れる女子高生のシーン。",
    visual_movement: "日差しの強さを表現し、顔をしかめる様子をクローズアップ。",
    visual_method: "表情を強調するためにアップショットを使用。",
    visual_prompt: "日焼けを心配する様子。",
    proof: "ターゲット情報からの課題提起。",
  },
  {
    scene: 3,
    sec: 10,
    structure: "solve",
    caption: "「SUNVEIL UVバリアミルクで、紫外線を徹底カット！」",
    visual_info: "製品を手に持ち微笑む女子高生。",
    visual_movement: "製品ボトルをカメラに向かって見せる。",
    visual_method: "製品の特徴、SPF50+ PA++++をテキストで強調。",
    visual_prompt: "自信満々で製品を紹介。",
    proof: "商品情報より引用。",
  },
  {
    scene: 4,
    sec: 15,
    structure: "solve",
    caption: "「ウォータープルーフで、汗にも水にも強い！」",
    visual_info: "女子高生が汗をかきながらプレイを続ける。",
    visual_movement: "汗を気にせず元気に走るシーン。",
    visual_method: "汗を拭く仕草をスローモーションで。",
    visual_prompt: "汗に負けない様子。",
    proof: "商品情報より引用。",
  },
  {
    scene: 5,
    sec: 20,
    structure: "solve",
    caption: "「素肌感のある透明仕上げだから、メイクの下地にも！」",
    visual_info: "友達と談笑しながら、鏡を見る女子高生。",
    visual_movement: "笑顔で自分の肌を触る。",
    visual_method: "透明感を強調するためのフィルター使用。",
    visual_prompt: "自然な美しさ。",
    proof: "商品情報より引用。",
  },
  {
    scene: 6,
    sec: 25,
    structure: "cta",
    caption: "「今すぐ試して、外でも焼けない安心を手に入れよう！」",
    visual_info: "画面にテキストで価格と購入ボタンを表示。",
    visual_movement: "画面全体に明るいエフェクトが広がる。",
    visual_method: "ナレーションで購入を促すアナウンス。",
    visual_prompt: "行動を促すための明るい音楽。",
    proof: "商品情報の価格とマーケティング情報からの抜粋。",
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
