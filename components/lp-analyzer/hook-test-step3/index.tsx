"use client";

import React, { useState, useCallback, useMemo } from "react";
import {
  Sheet,
  RowData,
  ModalOptions,
  ModalButton,
  ImageSlotInfo,
} from "./types";
import { defaultRowData } from "./data";
import { Modal } from "./Modal";
import { SheetTabs } from "./SheetTabs";
import { DataTable } from "./DataTable";
import { ImagePreviewModal } from "./ImagePreviewModal";
import { ImageUploadModal } from "./ImageUploadModal";

const createEmptyRow = (): RowData => ({
  hookImage: "",
  hookMessage: "",
  body1Image: "",
  body1Message: "",
  body2Image: "",
  body2Message: "",
  ctaMessage: "",
});

export const HookTestStep3: React.FC = () => {
  // Sheet Management
  const [sheets, setSheets] = useState<Sheet[]>([
    { id: "sheet_1", name: "Sheet 1", data: [...defaultRowData] },
  ]);
  const [activeSheetId, setActiveSheetId] = useState("sheet_1");

  // Selection State
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [selectedImages, setSelectedImages] = useState<Record<string, boolean>>(
    {}
  );

  // Modal State
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    options: ModalOptions | null;
    inputValue: string;
  }>({
    isOpen: false,
    options: null,
    inputValue: "",
  });

  // Image Modal States
  const [imagePreview, setImagePreview] = useState<{
    isOpen: boolean;
    imageUrl: string;
    slotInfo: ImageSlotInfo | null;
  }>({
    isOpen: false,
    imageUrl: "",
    slotInfo: null,
  });
  const [imageUpload, setImageUpload] = useState<{
    isOpen: boolean;
    slotInfo: ImageSlotInfo | null;
  }>({
    isOpen: false,
    slotInfo: null,
  });

  // Bulk Upload Form
  const selectedImageCount = useMemo(() => {
    return Object.values(selectedImages).filter(Boolean).length;
  }, [selectedImages]);

  // Computed Values
  const activeSheet = useMemo(
    () => sheets.find((s) => s.id === activeSheetId) || sheets[0],
    [sheets, activeSheetId]
  );

  const patternCounts = useMemo(() => {
    const uniqueImages = new Set<string>();
    let textPatterns = 0;

    sheets.forEach((sheet) => {
      sheet.data.forEach((row) => {
        if (row.hookImage) uniqueImages.add(row.hookImage);
        if (row.body1Image) uniqueImages.add(row.body1Image);
        if (row.body2Image) uniqueImages.add(row.body2Image);

        const hasText =
          row.hookMessage?.trim() ||
          row.body1Message?.trim() ||
          row.body2Message?.trim() ||
          row.ctaMessage?.trim();
        if (hasText) textPatterns++;
      });
    });

    const imagePatterns = uniqueImages.size;
    const total =
      imagePatterns > 0 && textPatterns > 0
        ? imagePatterns * textPatterns
        : sheets.reduce((acc, s) => acc + s.data.length, 0);

    return { imagePatterns, textPatterns, total };
  }, [sheets]);

  // Modal Functions
  const showModal = (options: ModalOptions) => {
    setModalState({
      isOpen: true,
      options,
      inputValue: options.inputValue || "",
    });
  };

  const hideModal = () => {
    setModalState({ isOpen: false, options: null, inputValue: "" });
  };

  const handleModalButtonClick = (button: ModalButton, inputValue?: string) => {
    button.onClick?.(inputValue);
    hideModal();
  };

  // Sheet Functions
  const switchToSheet = (sheetId: string) => {
    setActiveSheetId(sheetId);
    setSelectedRows(new Set());
  };

  const addSheet = () => {
    showModal({
      type: "input",
      title: "Add New Sheet",
      message: "Enter a name for the new sheet:",
      inputValue: `Sheet ${sheets.length + 1}`,
      inputPlaceholder: "Sheet name",
      buttons: [
        { text: "Cancel" },
        {
          text: "Create",
          primary: true,
          onClick: (name) => {
            if (name?.trim()) {
              const newSheet: Sheet = {
                id: `sheet_${Date.now()}`,
                name: name.trim(),
                data: [createEmptyRow()],
              };
              setSheets([...sheets, newSheet]);
              setActiveSheetId(newSheet.id);
            }
          },
        },
      ],
    });
  };

  const duplicateSheet = () => {
    const newSheet: Sheet = {
      id: `sheet_${Date.now()}`,
      name: `${activeSheet.name} (Copy)`,
      data: JSON.parse(JSON.stringify(activeSheet.data)),
    };
    setSheets([...sheets, newSheet]);
    setActiveSheetId(newSheet.id);

    showModal({
      type: "success",
      title: "Sheet Duplicated",
      message: `"${newSheet.name}" has been created successfully.`,
      buttons: [{ text: "OK", primary: true }],
    });
  };

  const deleteSheet = (sheetId: string) => {
    if (sheets.length <= 1) {
      showModal({
        type: "info",
        title: "Cannot Delete",
        message: "You must have at least one sheet.",
        buttons: [{ text: "OK", primary: true }],
      });
      return;
    }

    const sheet = sheets.find((s) => s.id === sheetId);
    showModal({
      type: "danger",
      title: "Delete Sheet",
      message: `Are you sure you want to delete "${sheet?.name}"? This action cannot be undone.`,
      buttons: [
        { text: "Cancel" },
        {
          text: "Delete",
          primary: true,
          onClick: () => {
            const index = sheets.findIndex((s) => s.id === sheetId);
            const newSheets = sheets.filter((s) => s.id !== sheetId);
            setSheets(newSheets);
            if (activeSheetId === sheetId) {
              setActiveSheetId(newSheets[Math.max(0, index - 1)].id);
            }
          },
        },
      ],
    });
  };

  const renameSheet = (sheetId: string) => {
    const sheet = sheets.find((s) => s.id === sheetId);
    showModal({
      type: "input",
      title: "Rename Sheet",
      message: "Enter a new name for the sheet:",
      inputValue: sheet?.name || "",
      inputPlaceholder: "Sheet name",
      buttons: [
        { text: "Cancel" },
        {
          text: "Rename",
          primary: true,
          onClick: (name) => {
            if (name?.trim()) {
              setSheets(
                sheets.map((s) =>
                  s.id === sheetId ? { ...s, name: name.trim() } : s
                )
              );
            }
          },
        },
      ],
    });
  };

  // Row Functions
  const updateSheetData = (newData: RowData[]) => {
    setSheets(
      sheets.map((s) => (s.id === activeSheetId ? { ...s, data: newData } : s))
    );
  };

  const handleTextChange = (
    rowIndex: number,
    field: keyof RowData,
    value: string
  ) => {
    const newData = [...activeSheet.data];
    newData[rowIndex] = { ...newData[rowIndex], [field]: value };
    updateSheetData(newData);
  };

  const addRow = () => {
    updateSheetData([...activeSheet.data, createEmptyRow()]);
  };

  const deleteSelectedRows = () => {
    if (selectedRows.size === 0) {
      showModal({
        type: "info",
        title: "No Rows Selected",
        message: "Please select at least one row to delete.",
        buttons: [{ text: "OK", primary: true }],
      });
      return;
    }

    if (selectedRows.size >= activeSheet.data.length) {
      showModal({
        type: "info",
        title: "Cannot Delete All",
        message: "You must have at least one row in the table.",
        buttons: [{ text: "OK", primary: true }],
      });
      return;
    }

    showModal({
      type: "danger",
      title: "Delete Rows",
      message: `Are you sure you want to delete ${selectedRows.size} row(s)?`,
      buttons: [
        { text: "Cancel" },
        {
          text: "Delete",
          primary: true,
          onClick: () => {
            const newData = activeSheet.data.filter(
              (_, i) => !selectedRows.has(i)
            );
            updateSheetData(newData);
            setSelectedRows(new Set());
          },
        },
      ],
    });
  };

  // Selection Functions
  const handleRowSelectChange = (index: number, selected: boolean) => {
    const newSelected = new Set(selectedRows);
    if (selected) {
      newSelected.add(index);
    } else {
      newSelected.delete(index);
    }
    setSelectedRows(newSelected);
  };

  const handleSelectAllRows = (selected: boolean) => {
    if (selected) {
      setSelectedRows(new Set(activeSheet.data.map((_, i) => i)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleImageCheckChange = (
    rowIndex: number,
    imageType: string,
    checked: boolean
  ) => {
    setSelectedImages((prev) => ({
      ...prev,
      [`${rowIndex}-${imageType}`]: checked,
    }));
  };

  const handleSelectAllImages = (imageType: string, selected: boolean) => {
    const newSelected = { ...selectedImages };
    activeSheet.data.forEach((_, index) => {
      newSelected[`${index}-${imageType}`] = selected;
    });
    setSelectedImages(newSelected);
  };

  // Image Functions
  const handleImageSlotClick = (info: ImageSlotInfo) => {
    if (info.currentUrl) {
      setImagePreview({
        isOpen: true,
        imageUrl: info.currentUrl,
        slotInfo: info,
      });
    } else {
      setImageUpload({ isOpen: true, slotInfo: info });
    }
  };

  const handleImageDelete = () => {
    if (imagePreview.slotInfo) {
      const { rowIndex, imageType } = imagePreview.slotInfo;
      const newData = [...activeSheet.data];
      newData[rowIndex] = { ...newData[rowIndex], [imageType]: "" };
      updateSheetData(newData);
    }
    setImagePreview({ isOpen: false, imageUrl: "", slotInfo: null });
  };

  const handleImageUpload = (file: File) => {
    if (!imageUpload.slotInfo) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const { rowIndex, imageType } = imageUpload.slotInfo!;
      const newData = [...activeSheet.data];
      newData[rowIndex] = {
        ...newData[rowIndex],
        [imageType]: e.target?.result as string,
      };
      updateSheetData(newData);
      setImageUpload({ isOpen: false, slotInfo: null });
    };
    reader.readAsDataURL(file);
  };

  const handleBulkImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target?.result as string;
      const newData = [...activeSheet.data];

      Object.entries(selectedImages).forEach(([key, isSelected]) => {
        if (isSelected) {
          const [rowIndex, imageType] = key.split("-");
          const idx = parseInt(rowIndex);
          if (newData[idx]) {
            newData[idx] = { ...newData[idx], [imageType]: imageUrl };
          }
        }
      });

      updateSheetData(newData);
      setSelectedImages({});
    };
    reader.readAsDataURL(file);
  };

  return (
    <main className="flex-1 w-full max-w-[1800px] mx-auto p-6 flex flex-col items-start gap-6 pb-20">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0093b4] text-3xl">
              grid_on
            </span>
            コピー作成（Hookテスト用）
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {/* Pattern Counter */}
          <div className="flex items-center bg-white rounded-lg border border-slate-400 px-2 py-1 shadow-sm gap-1 h-[54px]">
            <div className="flex items-center px-4 py-1 border-r border-slate-100/50">
              <div className="flex flex-col items-end mr-3">
                <span className="text-[10px] font-bold text-slate-500 leading-tight whitespace-nowrap">
                  画像
                  <br />
                  パターン数
                </span>
              </div>
              <span className="text-2xl font-bold text-slate-800 font-mono tracking-tight">
                {patternCounts.imagePatterns}
              </span>
            </div>
            <div className="flex items-center px-4 py-1 border-r border-slate-100/50">
              <div className="flex flex-col items-end mr-3">
                <span className="text-[10px] font-bold text-slate-500 leading-tight whitespace-nowrap">
                  テキスト
                  <br />
                  パターン数
                </span>
              </div>
              <span className="text-2xl font-bold text-slate-800 font-mono tracking-tight">
                {patternCounts.textPatterns}
              </span>
            </div>
            <div className="flex items-center px-6 py-1 bg-cyan-50/30 rounded-md ml-1">
              <div className="flex flex-col items-end mr-3">
                <span className="text-[10px] font-bold text-[#0093b4] leading-tight whitespace-nowrap">
                  合計
                  <br />
                  パターン数
                </span>
              </div>
              <span className="text-3xl font-black text-[#0093b4] font-mono tracking-tight">
                {patternCounts.total}
              </span>
            </div>
          </div>
          {/* Budget Reference */}
          <div className="flex flex-col justify-center bg-white rounded-lg border border-slate-400 px-4 py-1 shadow-sm h-[54px]">
            <span className="text-[10px] font-bold text-slate-500 leading-tight mb-0.5">
              1ヶ月運用期間の予算の参考表
            </span>
            <div className="flex items-center gap-3 text-xs font-medium text-slate-800">
              <div className="flex items-baseline gap-1">
                <span className="text-[10px] text-slate-500">
                  ５本の場合 ＝
                </span>
                <span className="font-mono text-slate-800">¥100,000 / 月</span>
              </div>
              <div className="w-px h-3 bg-slate-200"></div>
              <div className="flex items-baseline gap-1">
                <span className="text-[10px] text-slate-500">
                  １０本の場合 ＝
                </span>
                <span className="font-mono text-slate-800">¥200,000 / 月</span>
              </div>
              <div className="w-px h-3 bg-slate-200"></div>
              <div className="flex items-baseline gap-1">
                <span className="text-[10px] text-slate-500">
                  ２０本の場合 ＝
                </span>
                <span className="font-mono text-slate-800">¥400,000 / 月</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Upload Form */}
      {selectedImageCount > 0 && (
        <div className="w-full bg-blue-50 border border-[#0093b4] rounded-lg p-4">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-[#0093b4] text-2xl">
              cloud_upload
            </span>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-800">
                {selectedImageCount} image slot(s) selected
              </p>
              <p className="text-xs text-slate-500">
                Upload an image to apply to all selected slots
              </p>
            </div>
            <label className="bg-[#0093b4] hover:bg-[#007a92] text-white px-4 py-2 rounded-lg cursor-pointer transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">upload</span>
              Upload Image
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleBulkImageUpload}
              />
            </label>
          </div>
        </div>
      )}

      {/* Data Table */}
      <DataTable
        rows={activeSheet.data}
        selectedRows={selectedRows}
        selectedImages={selectedImages}
        onRowSelectChange={handleRowSelectChange}
        onSelectAllRows={handleSelectAllRows}
        onImageCheckChange={handleImageCheckChange}
        onSelectAllImages={handleSelectAllImages}
        onTextChange={handleTextChange}
        onImageSlotClick={handleImageSlotClick}
      />

      {/* Sheet Tabs */}
      <SheetTabs
        sheets={sheets}
        activeSheetId={activeSheetId}
        onSheetSelect={switchToSheet}
        onAddSheet={addSheet}
        onDuplicateSheet={duplicateSheet}
        onDeleteSheet={deleteSheet}
        onRenameSheet={renameSheet}
      />

      {/* Action Buttons */}
      <div className="w-full flex justify-start items-center gap-3">
        <button
          onClick={addRow}
          className="bg-white border border-[#0093b4] text-[#0093b4] hover:bg-[#0093b4] hover:text-white font-bold text-sm px-4 py-2 rounded-md shadow-sm transition-all flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          Add Row
        </button>
        <button
          onClick={deleteSelectedRows}
          className="bg-white border border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-bold text-sm px-4 py-2 rounded-md shadow-sm transition-all flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-lg">delete</span>
          Delete Row
        </button>
      </div>

      {/* Navigation */}
      <div className="w-full flex justify-end items-center gap-6 mt-6 mb-4">
        <button className="text-slate-500 hover:text-slate-800 font-bold text-sm transition-colors">
          戻る
        </button>
        <button className="bg-[#0093b4] hover:bg-[#007a92] text-white font-bold text-sm px-8 py-3 rounded-md shadow-sm transition-all flex items-center gap-2">
          次へ進む
          <span className="font-sans text-lg leading-none pb-0.5">→</span>
        </button>
      </div>

      {/* Modals */}
      {modalState.options && (
        <Modal
          isOpen={modalState.isOpen}
          {...modalState.options}
          inputValue={modalState.inputValue}
          onClose={hideModal}
          onButtonClick={handleModalButtonClick}
          onInputChange={(value) =>
            setModalState((prev) => ({ ...prev, inputValue: value }))
          }
        />
      )}

      <ImagePreviewModal
        isOpen={imagePreview.isOpen}
        imageUrl={imagePreview.imageUrl}
        onClose={() =>
          setImagePreview({ isOpen: false, imageUrl: "", slotInfo: null })
        }
        onDelete={handleImageDelete}
      />

      <ImageUploadModal
        isOpen={imageUpload.isOpen}
        onClose={() => setImageUpload({ isOpen: false, slotInfo: null })}
        onUpload={handleImageUpload}
      />
    </main>
  );
};

export default HookTestStep3;
