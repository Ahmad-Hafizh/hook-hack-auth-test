"use client";

import React from "react";
import { RowData, ImageSlotInfo } from "./types";

interface DataTableProps {
  rows: RowData[];
  selectedRows: Set<number>;
  selectedImages: Record<string, boolean>;
  onRowSelectChange: (index: number, selected: boolean) => void;
  onSelectAllRows: (selected: boolean) => void;
  onImageCheckChange: (
    rowIndex: number,
    imageType: string,
    checked: boolean
  ) => void;
  onSelectAllImages: (imageType: string, selected: boolean) => void;
  onTextChange: (rowIndex: number, field: keyof RowData, value: string) => void;
  onImageSlotClick: (info: ImageSlotInfo) => void;
}

interface ImageSlotProps {
  imageUrl?: string;
  checked: boolean;
  onCheckChange: (checked: boolean) => void;
  onSlotClick: () => void;
}

const ImageSlot: React.FC<ImageSlotProps> = ({
  imageUrl,
  checked,
  onCheckChange,
  onSlotClick,
}) => {
  const hasImage = !!imageUrl;

  return (
    <div className="w-full h-full p-2 flex flex-col items-center justify-center relative">
      <div className="flex items-start gap-2 w-full">
        <input
          type="checkbox"
          className="w-3.5 h-3.5 mt-1 text-[#0093b4] border-slate-400 rounded focus:ring-[#0093b4] cursor-pointer flex-shrink-0"
          checked={checked}
          onChange={(e) => onCheckChange(e.target.checked)}
        />
        <div
          className={`w-full h-20 rounded border flex items-center justify-center cursor-pointer transition-all relative overflow-hidden group ${
            hasImage
              ? "border-gray-300 border-solid bg-white p-0.5"
              : "border-dashed border-gray-400 bg-slate-50 hover:border-[#0093b4] hover:bg-blue-50/50 text-gray-400 hover:text-[#0093b4]"
          }`}
          onClick={onSlotClick}
        >
          {hasImage ? (
            <>
              <img
                alt="Selected"
                className="w-full h-full object-cover"
                src={imageUrl}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </>
          ) : (
            <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">
              add_photo_alternate
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export const DataTable: React.FC<DataTableProps> = ({
  rows,
  selectedRows,
  selectedImages,
  onRowSelectChange,
  onSelectAllRows,
  onImageCheckChange,
  onSelectAllImages,
  onTextChange,
  onImageSlotClick,
}) => {
  const allRowsSelected = rows.length > 0 && selectedRows.size === rows.length;
  const someRowsSelected =
    selectedRows.size > 0 && selectedRows.size < rows.length;

  const isImageChecked = (rowIndex: number, imageType: string) => {
    return selectedImages[`${rowIndex}-${imageType}`] || false;
  };

  return (
    <div
      className="w-full bg-white rounded-lg border border-slate-400 shadow-sm overflow-auto relative isolate"
      style={{ height: "540px", minHeight: "540px" }}
    >
      <table className="w-full min-w-[1600px] border-collapse text-sm table-fixed">
        <thead className="z-50">
          <tr className="h-[40px]">
            <th className="border-b border-r border-slate-400 text-left text-xs font-bold text-slate-800 bg-slate-200 px-2 py-3 select-none whitespace-nowrap sticky top-0 z-50 shadow-sm w-[40px] border-l-0 text-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-[#0093b4] border-slate-400 rounded focus:ring-[#0093b4] cursor-pointer"
                checked={allRowsSelected}
                ref={(el) => {
                  if (el) el.indeterminate = someRowsSelected;
                }}
                onChange={(e) => onSelectAllRows(e.target.checked)}
              />
            </th>
            <th className="border-b border-r border-slate-400 text-left text-xs font-bold text-slate-800 bg-slate-200 px-2 py-3 select-none whitespace-nowrap sticky top-0 z-50 shadow-sm w-[13%]">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-3.5 h-3.5 text-[#0093b4] border-slate-400 rounded focus:ring-[#0093b4] cursor-pointer"
                  onChange={(e) =>
                    onSelectAllImages("hookImage", e.target.checked)
                  }
                />
                <span>Hook (画像)</span>
              </div>
            </th>
            <th className="border-b border-r border-slate-400 text-left text-xs font-bold text-slate-800 bg-slate-200 px-2 py-3 select-none whitespace-nowrap sticky top-0 z-50 shadow-sm w-[17%]">
              Hook (メッセージ)
            </th>
            <th className="border-b border-r border-slate-400 text-left text-xs font-bold text-slate-800 bg-slate-200 px-2 py-3 select-none whitespace-nowrap sticky top-0 z-50 shadow-sm w-[13%]">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-3.5 h-3.5 text-[#0093b4] border-slate-400 rounded focus:ring-[#0093b4] cursor-pointer"
                  onChange={(e) =>
                    onSelectAllImages("body1Image", e.target.checked)
                  }
                />
                <span>Body1 (画像)</span>
              </div>
            </th>
            <th className="border-b border-r border-slate-400 text-left text-xs font-bold text-slate-800 bg-slate-200 px-2 py-3 select-none whitespace-nowrap sticky top-0 z-50 shadow-sm w-[17%]">
              Body1 (メッセージ)
            </th>
            <th className="border-b border-r border-slate-400 text-left text-xs font-bold text-slate-800 bg-slate-200 px-2 py-3 select-none whitespace-nowrap sticky top-0 z-50 shadow-sm w-[13%]">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-3.5 h-3.5 text-[#0093b4] border-slate-400 rounded focus:ring-[#0093b4] cursor-pointer"
                  onChange={(e) =>
                    onSelectAllImages("body2Image", e.target.checked)
                  }
                />
                <span>Body2 (画像)</span>
              </div>
            </th>
            <th className="border-b border-r border-slate-400 text-left text-xs font-bold text-slate-800 bg-slate-200 px-2 py-3 select-none whitespace-nowrap sticky top-0 z-50 shadow-sm w-[17%]">
              Body2 (メッセージ)
            </th>
            <th className="border-b border-slate-400 text-left text-xs font-bold text-slate-800 bg-slate-200 px-2 py-3 select-none whitespace-nowrap sticky top-0 z-50 shadow-sm w-[13%] border-r-0">
              CTA (メッセージ)
            </th>
          </tr>
        </thead>
        <tbody className="text-slate-800">
          {rows.map((row, index) => (
            <tr key={index} className="group">
              <td className="border-b border-r border-slate-400 relative p-0 transition-colors bg-white hover:bg-slate-50 border-l-0 text-center align-middle w-[40px]">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-[#0093b4] border-slate-400 rounded focus:ring-[#0093b4] cursor-pointer"
                  checked={selectedRows.has(index)}
                  onChange={(e) => onRowSelectChange(index, e.target.checked)}
                />
              </td>
              <td className="border-b border-r border-slate-400 relative p-0 transition-colors bg-white hover:bg-slate-50">
                <ImageSlot
                  imageUrl={row.hookImage}
                  checked={isImageChecked(index, "hookImage")}
                  onCheckChange={(checked) =>
                    onImageCheckChange(index, "hookImage", checked)
                  }
                  onSlotClick={() =>
                    onImageSlotClick({
                      rowIndex: index,
                      imageType: "hookImage",
                      currentUrl: row.hookImage,
                    })
                  }
                />
              </td>
              <td className="border-b border-r border-slate-400 relative p-0 transition-colors bg-white hover:bg-slate-50 h-24 align-top">
                <div className="flex h-full w-full relative">
                  <textarea
                    className="w-full h-full py-2 px-3 text-xs bg-transparent border-none focus:ring-0 focus:outline-none resize-none leading-relaxed transition-all text-slate-800"
                    placeholder="Hook message..."
                    value={row.hookMessage}
                    onChange={(e) =>
                      onTextChange(index, "hookMessage", e.target.value)
                    }
                  />
                </div>
              </td>
              <td className="border-b border-r border-slate-400 relative p-0 transition-colors bg-white hover:bg-slate-50">
                <ImageSlot
                  imageUrl={row.body1Image}
                  checked={isImageChecked(index, "body1Image")}
                  onCheckChange={(checked) =>
                    onImageCheckChange(index, "body1Image", checked)
                  }
                  onSlotClick={() =>
                    onImageSlotClick({
                      rowIndex: index,
                      imageType: "body1Image",
                      currentUrl: row.body1Image,
                    })
                  }
                />
              </td>
              <td className="border-b border-r border-slate-400 relative p-0 transition-colors bg-white hover:bg-slate-50 h-24 align-top">
                <div className="flex h-full w-full relative">
                  <textarea
                    className="w-full h-full py-2 px-3 text-xs bg-transparent border-none focus:ring-0 focus:outline-none resize-none leading-relaxed transition-all text-slate-800"
                    placeholder="Body1 message..."
                    value={row.body1Message}
                    onChange={(e) =>
                      onTextChange(index, "body1Message", e.target.value)
                    }
                  />
                </div>
              </td>
              <td className="border-b border-r border-slate-400 relative p-0 transition-colors bg-white hover:bg-slate-50">
                <ImageSlot
                  imageUrl={row.body2Image}
                  checked={isImageChecked(index, "body2Image")}
                  onCheckChange={(checked) =>
                    onImageCheckChange(index, "body2Image", checked)
                  }
                  onSlotClick={() =>
                    onImageSlotClick({
                      rowIndex: index,
                      imageType: "body2Image",
                      currentUrl: row.body2Image,
                    })
                  }
                />
              </td>
              <td className="border-b border-r border-slate-400 relative p-0 transition-colors bg-white hover:bg-slate-50 h-24 align-top">
                <div className="flex h-full w-full relative">
                  <textarea
                    className="w-full h-full py-2 px-3 text-xs bg-transparent border-none focus:ring-0 focus:outline-none resize-none leading-relaxed transition-all text-slate-800"
                    placeholder="Body2 message..."
                    value={row.body2Message}
                    onChange={(e) =>
                      onTextChange(index, "body2Message", e.target.value)
                    }
                  />
                </div>
              </td>
              <td className="border-b border-slate-400 relative p-0 transition-colors bg-white hover:bg-slate-50 h-24 align-top border-r-0">
                <div className="flex h-full w-full relative">
                  <textarea
                    className="w-full h-full py-2 px-3 text-xs bg-transparent border-none focus:ring-0 focus:outline-none resize-none leading-relaxed transition-all text-slate-800"
                    placeholder="CTA message..."
                    value={row.ctaMessage}
                    onChange={(e) =>
                      onTextChange(index, "ctaMessage", e.target.value)
                    }
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
