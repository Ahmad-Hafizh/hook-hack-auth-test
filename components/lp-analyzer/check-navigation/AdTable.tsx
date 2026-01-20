"use client";

import React, { useState } from "react";
import { AdData } from "./types";

interface AdTableProps {
  data: AdData[];
}

const ImageSlot: React.FC<{ hasImage: boolean; imageUrl?: string }> = ({
  hasImage,
  imageUrl,
}) => (
  <div className="w-full h-full p-1 flex flex-col items-center justify-center relative">
    <div
      className={`w-10 h-10 rounded-sm border ${hasImage ? "border-gray-300 border-solid bg-white p-0.5" : "border-dashed border-gray-400 bg-slate-50 hover:border-[#0093b4] hover:bg-blue-50/50"} flex items-center justify-center cursor-pointer transition-all text-gray-400 hover:text-[#0093b4] relative overflow-hidden group`}
    >
      {hasImage && imageUrl ? (
        <img
          alt="Selected"
          className="w-full h-full object-cover"
          src={imageUrl}
        />
      ) : (
        <span className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform">
          add_photo_alternate
        </span>
      )}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
    </div>
  </div>
);

const TableCell: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => (
  <td
    className={`border-b border-r border-slate-500 relative p-0 transition-colors hover:bg-slate-100 bg-white ${className}`}
  >
    {children}
  </td>
);

const TableHeader: React.FC<{
  children: React.ReactNode;
  className?: string;
  bgColor?: string;
}> = ({ children, className = "", bgColor = "bg-slate-200" }) => (
  <th
    className={`border-b border-r border-slate-500 text-left text-[10px] font-bold text-black px-1 py-1.5 select-none whitespace-nowrap sticky top-0 z-50 shadow-sm leading-tight ${bgColor} ${className}`}
  >
    {children}
  </th>
);

export const AdTable: React.FC<AdTableProps> = ({ data }) => {
  const [editableData, setEditableData] = useState(data);

  const handleTextChange = (
    index: number,
    field: "hook" | "body1" | "body2" | "cta",
    value: string
  ) => {
    const newData = [...editableData];
    newData[index] = { ...newData[index], [field]: value };
    setEditableData(newData);
  };

  return (
    <div className="table-wrapper w-full bg-white rounded-lg border border-slate-500 shadow-sm overflow-visible relative isolate mb-8">
      <table className="w-full border-collapse text-[10px] table-fixed">
        <thead className="z-50 sticky top-0">
          <tr className="h-[32px]">
            <TableHeader
              className="w-[45px] text-center p-0 border-l-0"
              bgColor="bg-gray-50"
            >
              広告名
            </TableHeader>
            <TableHeader
              className="w-[45px] text-center p-0 text-[9px]"
              bgColor="bg-blue-100"
            >
              Hook
              <br />
              維持率
            </TableHeader>
            <TableHeader className="w-[60px] text-center" bgColor="bg-blue-100">
              Hook
              <br />
              画像
            </TableHeader>
            <TableHeader className="w-[15%]" bgColor="bg-blue-100">
              Hook メッセージ
            </TableHeader>
            <TableHeader
              className="w-[45px] text-center p-0 text-[9px]"
              bgColor="bg-orange-100"
            >
              Body1
              <br />
              維持率
            </TableHeader>
            <TableHeader
              className="w-[60px] text-center"
              bgColor="bg-orange-100"
            >
              Body1
              <br />
              画像
            </TableHeader>
            <TableHeader className="w-[15%]" bgColor="bg-orange-100">
              Body1 メッセージ
            </TableHeader>
            <TableHeader
              className="w-[45px] text-center p-0 text-[9px]"
              bgColor="bg-purple-100"
            >
              Body2
              <br />
              維持率
            </TableHeader>
            <TableHeader
              className="w-[60px] text-center"
              bgColor="bg-purple-100"
            >
              Body2
              <br />
              画像
            </TableHeader>
            <TableHeader className="w-[15%]" bgColor="bg-purple-100">
              Body2 メッセージ
            </TableHeader>
            <TableHeader
              className="w-[45px] text-center p-0 text-[9px]"
              bgColor="bg-pink-100"
            >
              CTA
              <br />
              維持率
            </TableHeader>
            <TableHeader className="w-[12%]" bgColor="bg-pink-100">
              CTA メッセージ
            </TableHeader>
            <TableHeader
              className="w-[40px] text-center text-[9px]"
              bgColor="bg-gray-100"
            >
              CTR
            </TableHeader>
            <TableHeader
              className="w-[40px] text-center text-[9px] border-r-0"
              bgColor="bg-gray-100"
            >
              CVR
            </TableHeader>
          </tr>
        </thead>
        <tbody className="text-black">
          {editableData.map((row, index) => (
            <tr key={index} className="group h-[50px]">
              <TableCell className="align-middle text-center border-l-0">
                <span className="font-mono text-xs font-bold text-black">
                  {row.name}
                </span>
              </TableCell>
              <TableCell className="align-middle text-center">
                <span className="font-mono text-xs font-bold text-black">
                  {row.h}
                </span>
              </TableCell>
              <TableCell>
                <ImageSlot
                  hasImage={index === 0}
                  imageUrl={
                    index === 0
                      ? "https://lh3.googleusercontent.com/aida-public/AB6AXuAW9HnYOP1ZfD6GpB7A5iBYvYWr61_5P1VDkC7OwdOXbHq15-wgtrHERQc9n-h7smUGRcYJowbDnUaDJcLVKz4pRshQFebXeQWSqgvj0zKUF5eCmkiVoKsfF1kvz6WRnMNJYEcxxdNHga1PZCnxx-COTeMAqUw9blNYEIF5La6s5H89VDwXmwmP4ceezwh_brmP6pKFZyAcHhGQz1FL3Okjx22ChHqAumf24E5KPY93cBF5gKxtvzv13mD55dt5cR_Gnd0ik0XGLYuC"
                      : undefined
                  }
                />
              </TableCell>
              <TableCell className="align-top">
                <div className="flex h-full w-full relative">
                  <textarea
                    className="w-full h-full py-1 px-1.5 text-[10px] leading-tight bg-transparent border-none focus:ring-0 focus:outline-none resize-none transition-all text-black placeholder-gray-400"
                    value={row.hook}
                    onChange={(e) =>
                      handleTextChange(index, "hook", e.target.value)
                    }
                  />
                </div>
              </TableCell>
              <TableCell className="align-middle text-center">
                <span className="font-mono text-xs font-bold text-black">
                  {row.b1}
                </span>
              </TableCell>
              <TableCell>
                <ImageSlot hasImage={false} />
              </TableCell>
              <TableCell className="align-top">
                <div className="flex h-full w-full relative">
                  <textarea
                    className="w-full h-full py-1 px-1.5 text-[10px] leading-tight bg-transparent border-none focus:ring-0 focus:outline-none resize-none transition-all text-black placeholder-gray-400"
                    value={row.body1}
                    onChange={(e) =>
                      handleTextChange(index, "body1", e.target.value)
                    }
                  />
                </div>
              </TableCell>
              <TableCell className="align-middle text-center">
                <span className="font-mono text-xs font-bold text-black">
                  {row.b2}
                </span>
              </TableCell>
              <TableCell>
                <ImageSlot hasImage={false} />
              </TableCell>
              <TableCell className="align-top">
                <div className="flex h-full w-full relative">
                  <textarea
                    className="w-full h-full py-1 px-1.5 text-[10px] leading-tight bg-transparent border-none focus:ring-0 focus:outline-none resize-none transition-all text-black placeholder-gray-400"
                    value={row.body2}
                    onChange={(e) =>
                      handleTextChange(index, "body2", e.target.value)
                    }
                  />
                </div>
              </TableCell>
              <TableCell className="align-middle text-center">
                <span className="font-mono text-xs font-bold text-black">
                  {row.c}
                </span>
              </TableCell>
              <TableCell className="align-top">
                <div className="flex h-full w-full relative">
                  <textarea
                    className="w-full h-full py-1 px-1.5 text-[10px] leading-tight bg-transparent border-none focus:ring-0 focus:outline-none resize-none transition-all text-black placeholder-gray-400"
                    value={row.cta}
                    onChange={(e) =>
                      handleTextChange(index, "cta", e.target.value)
                    }
                  />
                </div>
              </TableCell>
              <TableCell className="align-middle text-center">
                <span className="font-mono text-xs font-bold text-black">
                  {row.ctr}
                </span>
              </TableCell>
              <TableCell className="align-middle text-center border-r-0">
                <span className="font-mono text-xs font-bold text-black">
                  {row.cvr}
                </span>
              </TableCell>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdTable;
