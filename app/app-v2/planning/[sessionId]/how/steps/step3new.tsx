"use client";

import React, { useState, useCallback, useMemo } from "react";
import {
  ModalOptions,
  ModalButton,
} from "@/components/lp-analyzer/copy-creation-hook-test/types";
import { defaultRowData } from "@/components/lp-analyzer/copy-creation-hook-test/data";
import { Modal } from "@/components/lp-analyzer/copy-creation-hook-test/Modal";
import { SheetTabs } from "@/components/lp-analyzer/copy-creation-hook-test/SheetTabs";
import { DataTable } from "@/components/lp-analyzer/copy-creation-hook-test/DataTable";
import { ArrowRight, Grid, Plus, Trash2 } from "lucide-react";
import { IDataRowFinalized, useDataContext } from "../hooks/useDataContext";

const createEmptyRow15s = (): IDataRowFinalized => ({
  hookImage: "",
  hook: "",
  body1Image: "",
  body1: "",
  body2Image: "",
  body2: "",
  cta: "",
});

const createEmptyRow30s = (): IDataRowFinalized => ({
  hookImage: "",
  hook: "",
  body1Image: "",
  body1ImageB: "",
  body1: "",
  body2Image: "",
  body2ImageB: "",
  body2: "",
  cta: "",
});

export interface Sheet {
  id: string;
  name: string;
  data: IDataRowFinalized[];
}

export const Step3New = ({ onNext }: { onNext: () => void }) => {
  const {
    finalizedDataRows,
    selectedFinalizedRows,
    onSetSelectedFinalizedRows,
  } = useDataContext();

  // Sheet Management
  const [sheets, setSheets] = useState<Sheet[]>([
    { id: "sheet_1", name: "Sheet 1", data: [...finalizedDataRows] },
  ]);
  const [activeSheetId, setActiveSheetId] = useState("sheet_1");

  // Selection State
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [selectedImages, setSelectedImages] = useState<Record<string, boolean>>(
    {},
  );
  const [selectedImage, setSelectedImage] = useState<any>({
    hookImage: [],
    body1Image: [],
    body1ImageB: [],
    body2Image: [],
    body2ImageB: [],
  });

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

  const { duration } = useDataContext();

  // Computed Values
  const activeSheet = useMemo(
    () => sheets.find((s) => s.id === activeSheetId) || sheets[0],
    [sheets, activeSheetId],
  );

  const patternCounts = useMemo(() => {
    // Count unique selected images
    const getUniqueSelectedImages = (imageType: string) => {
      const indices: number[] = selectedImage[imageType] || [];
      const urls = indices
        .map(
          (idx: number) =>
            activeSheet.data[idx]?.[imageType as keyof IDataRowFinalized],
        )
        .filter((url): url is string => !!url && url.trim() !== "");
      return new Set(urls).size;
    };

    const imagePatterns =
      getUniqueSelectedImages("hookImage") +
      getUniqueSelectedImages("body1Image") +
      (duration === 30 ? getUniqueSelectedImages("body1ImageB") : 0) +
      getUniqueSelectedImages("body2Image") +
      (duration === 30 ? getUniqueSelectedImages("body2ImageB") : 0);

    // Count rows with text
    const textPatterns = activeSheet.data.filter(
      (row) =>
        row.hook?.trim() ||
        row.body1?.trim() ||
        row.body2?.trim() ||
        row.cta?.trim(),
    ).length;

    // Total = rows in sheet
    const total = activeSheet.data.length;

    return { imagePatterns, textPatterns, total };
  }, [selectedImage, activeSheet.data, duration]);

  // Sheet Functions
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
                data:
                  duration === 15
                    ? [createEmptyRow15s()]
                    : [createEmptyRow30s()],
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
                  s.id === sheetId ? { ...s, name: name.trim() } : s,
                ),
              );
            }
          },
        },
      ],
    });
  };

  // Row Functions
  const updateSheetData = (newData: IDataRowFinalized[]) => {
    setSheets(
      sheets.map((s) => (s.id === activeSheetId ? { ...s, data: newData } : s)),
    );
  };

  const handleTextChange = (
    rowIndex: number,
    field: keyof IDataRowFinalized,
    value: string,
  ) => {
    const newData = [...activeSheet.data];
    newData[rowIndex] = { ...newData[rowIndex], [field]: value };
    updateSheetData(newData);
  };

  const addRow = () => {
    updateSheetData([
      ...activeSheet.data,
      duration === 15 ? createEmptyRow15s() : createEmptyRow30s(),
    ]);
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
              (_, i) => !selectedRows.has(i),
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
    checked: boolean,
  ) => {
    setSelectedImage((prev: any) => {
      const currentArray = prev[imageType] || [];
      if (checked) {
        // Prevent duplicates by checking if rowIndex already exists
        if (!currentArray.includes(rowIndex)) {
          return {
            ...prev,
            [imageType]: [...currentArray, rowIndex],
          };
        }
        return prev;
      } else {
        return {
          ...prev,
          [imageType]: currentArray.filter((idx: number) => idx !== rowIndex),
        };
      }
    });
  };

  const handleSelectAllImages = (imageType: string, selected: boolean) => {
    setSelectedImage((prev: any) => {
      if (selected) {
        // Select all rows that have an image for this imageType
        const selectedIndices = activeSheet.data
          .map((row, index) => {
            const imageUrl = row[imageType as keyof IDataRowFinalized];
            return imageUrl &&
              typeof imageUrl === "string" &&
              imageUrl.trim() !== ""
              ? index
              : -1;
          })
          .filter((index) => index !== -1);
        return {
          ...prev,
          [imageType]: selectedIndices,
        };
      } else {
        return {
          ...prev,
          [imageType]: [],
        };
      }
    });
  };

  const handleImageSlotClick = (
    rowIndex: number,
    imageType: string,
    currentUrl?: string,
  ) => {
    // For now, just show a placeholder - in a real app, this would open an upload modal
    const newData = [...activeSheet.data];
    newData[rowIndex] = { ...newData[rowIndex], [imageType]: currentUrl || "" };
    updateSheetData(newData);
  };
  const onSubmit = () => {
    // Map active sheet data to IDataRowFinalized array
    const patterns: IDataRowFinalized[] = activeSheet.data.map((row) => ({
      hookImage: row.hookImage || "",
      hook: row.hook || "",
      body1Image: row.body1Image || "",
      body1ImageB: duration === 30 ? row.body1ImageB || "" : undefined,
      body1: row.body1 || "",
      body2Image: row.body2Image || "",
      body2ImageB: duration === 30 ? row.body2ImageB || "" : undefined,
      body2: row.body2 || "",
      cta: row.cta || "",
    }));

    // Store in context
    onSetSelectedFinalizedRows(patterns);
    onNext();
    console.log("Generated Patterns:", patterns);
  };

  return (
    <div className="flex-1 w-full max-w-[1800px] mx-auto p-6 flex flex-col items-start gap-6 ">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0093b4] text-3xl">
              <Grid className="text-[#0093b4]" />
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

      {/* Data Table */}
      <DataTable
        rows={activeSheet.data}
        selectedRows={selectedRows}
        selectedImages={selectedImage}
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
      <div className="w-full flex justify-between items-center gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={addRow}
            className="bg-white border border-[#0093b4] text-[#0093b4] hover:bg-[#0093b4] hover:text-white font-bold text-sm px-4 py-2 rounded-md shadow-sm transition-all flex items-center gap-2"
          >
            <Plus className="text-[#0093b4] w-4 h-4" />
            Add Row
          </button>
          <button
            onClick={deleteSelectedRows}
            className="bg-white border border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-bold text-sm px-4 py-2 rounded-md shadow-sm transition-all flex items-center gap-2"
          >
            <Trash2 className="text-red-500 w-4 h-4" />
            Delete Row
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="w-full flex justify-end items-center gap-6 mt-6 mb-4">
        <button className="text-slate-500 hover:text-slate-800 font-bold text-sm transition-colors">
          戻る
        </button>
        <button
          className="bg-[#0093b4] hover:bg-[#007a92] text-white font-bold text-sm px-8 py-3 rounded-md shadow-sm transition-all flex items-center gap-2"
          onClick={onSubmit}
          disabled={activeSheet.data.length === 0}
        >
          次へ進む
          <ArrowRight className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Modal */}
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
    </div>
  );
};

export default Step3New;
