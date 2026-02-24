"use client";

import UploadImageButton from "@/app/app-v2/planning/[sessionId]/how/components/uploadImageButton";
import { Image } from "lucide-react";
import React from "react";

interface ImageSlotProps {
  imageUrl?: string;
  checked: boolean;
  onCheckChange: (checked: boolean) => void;
  onSlotClick: (url: string) => void;
  imageType: string;
}

const imageTypeToSlot = (imageType: string): "hook" | "body_a" | "body_b" | "body_c" | "cta" | "logo" => {
  if (imageType.startsWith("hook")) return "hook";
  if (imageType.startsWith("body1")) return "body_a";
  if (imageType.startsWith("body2")) return "body_b";
  if (imageType.startsWith("cta")) return "cta";
  return "hook";
};

export const ImageSlot: React.FC<ImageSlotProps> = ({
  imageUrl,
  checked,
  onCheckChange,
  onSlotClick,
  imageType,
}) => {
  const hasImage = !!imageUrl;

  return (
    <div className="w-full h-full p-2 flex flex-col items-center justify-center relative">
      <div className="flex items-start gap-2 w-full">
        <input
          type="checkbox"
          className="w-3.5 h-3.5 mt-1 text-[#0093b4] border-slate-400 rounded focus:ring-[#0093b4] cursor-pointer flex-shrink-0"
          data-image-type={imageType}
          checked={checked}
          onChange={(e) => onCheckChange(e.target.checked)}
        />
        <UploadImageButton
          onUploadImage={(url) => {
            console.log("[ImageSlot] onUploadImage received URL:", url);
            onSlotClick(url);
          }}
          aspectRatio={16 / 9}
          slot={imageTypeToSlot(imageType)}
        >
          <div
            className={`w-full h-20 rounded border flex items-center justify-center cursor-pointer transition-all relative overflow-hidden group ${
              hasImage
                ? "border-gray-300 border-solid bg-white p-0.5"
                : "border-dashed border-gray-400 bg-slate-50 hover:border-[#0093b4] hover:bg-blue-50/50 text-gray-400 hover:text-[#0093b4]"
            }`}
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
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform flex">
                <Image />
              </span>
            )}
          </div>
        </UploadImageButton>
      </div>
    </div>
  );
};

export default ImageSlot;
