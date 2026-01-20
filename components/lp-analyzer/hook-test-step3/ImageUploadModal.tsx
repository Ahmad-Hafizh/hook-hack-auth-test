"use client";

import React, { useRef } from "react";

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
}

export const ImageUploadModal: React.FC<ImageUploadModalProps> = ({
  isOpen,
  onClose,
  onUpload,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0093b4]">
              upload
            </span>
            Upload Image
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <p className="text-sm text-slate-500 mb-4">
          Select an image file to upload to this slot.
        </p>
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#0093b4] hover:bg-blue-50/30 transition-all cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">
            cloud_upload
          </span>
          <p className="text-sm text-slate-500">
            Click to select or drag and drop
          </p>
          <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 10MB</p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-500 hover:text-slate-800 font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadModal;
