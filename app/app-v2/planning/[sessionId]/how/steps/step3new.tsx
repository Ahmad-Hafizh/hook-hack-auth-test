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
import { ArrowRight, Copy, Plus, Trash2, UploadCloud } from "lucide-react";
import { IDataRowFinalized, useDataContext } from "../hooks/useDataContext";
import UploadImageButton from "../components/uploadImageButton";
import { uploadImage } from "../hooks/useFetchAPINext";
import { Button } from "@/components/ui/button";

const createEmptyRow15s = (): IDataRowFinalized => ({
  hookImage: "",
  hookPart1: "",
  hookPart2: "",
  body1Image: "",
  body1Part1: "",
  body1Part2: "",
  body2Image: "",
  body2Part1: "",
  body2Part2: "",
  ctaPart1: "",
  ctaPart2: "",
});

const createEmptyRow30s = (): IDataRowFinalized => ({
  hookImage: "",
  hookPart1: "",
  hookPart2: "",
  body1Image: "",
  body1ImageB: "",
  body1Part1: "",
  body1Part2: "",
  body2Image: "",
  body2ImageB: "",
  body2Part1: "",
  body2Part2: "",
  ctaPart1: "",
  ctaPart2: "",
});

export interface Sheet {
  id: string;
  name: string;
  data: IDataRowFinalized[];
}

export const Step3New = ({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev?: () => void;
}) => {
  const {
    finalizedDataRows,
    selectedFinalizedRows,
    onSetSelectedFinalizedRows,
  } = useDataContext();

  // Sheet Management
  const [sheets, setSheets] = useState<Sheet[]>([
    { id: "sheet_1", name: "シート１", data: [...finalizedDataRows] },
  ]);
  const [activeSheetId, setActiveSheetId] = useState("sheet_1");

  // Selection State
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
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

  // Count selected images for bulk upload
  const selectedImageCount = useMemo(() => {
    return Object.values(selectedImage).reduce(
      (acc: number, arr: any) => acc + (arr?.length || 0),
      0,
    );
  }, [selectedImage]);

  // Check if a row is complete (has all required fields)
  const isRowComplete = useCallback(
    (row: IDataRowFinalized) => {
      const hasRequiredImages =
        !!row.hookImage?.trim() &&
        !!row.body1Image?.trim() &&
        !!row.body2Image?.trim() &&
        (duration !== 30 ||
          (!!row.body1ImageB?.trim() && !!row.body2ImageB?.trim()));
      return hasRequiredImages;
    },
    [duration],
  );

  const patternCounts = useMemo(() => {
    let completePatterns = 0;
    let incompletePatterns = 0;

    activeSheet.data.forEach((row) => {
      if (isRowComplete(row)) {
        completePatterns++;
      } else {
        // Check if the row has any data at all (not completely empty)
        const hasAnyData =
          row.hookImage?.trim() ||
          row.hookPart1?.trim() ||
          row.hookPart2?.trim() ||
          row.body1Image?.trim() ||
          row.body1Part1?.trim() ||
          row.body1Part2?.trim() ||
          row.body2Image?.trim() ||
          row.body2Part1?.trim() ||
          row.body2Part2?.trim() ||
          row.ctaPart1?.trim() ||
          row.ctaPart2?.trim() ||
          (duration === 30 &&
            (row.body1ImageB?.trim() || row.body2ImageB?.trim()));

        if (hasAnyData) {
          incompletePatterns++;
        }
      }
    });

    // Total rows in sheet
    const total = activeSheet.data.length;

    return { completePatterns, incompletePatterns, total };
  }, [activeSheet.data, duration, isRowComplete]);

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
    // Reset image selections when switching sheets
    setSelectedImage({
      hookImage: [],
      body1Image: [],
      body1ImageB: [],
      body2Image: [],
      body2ImageB: [],
    });
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

  const duplicateSelectedRows = () => {
    if (selectedRows.size === 0) {
      showModal({
        type: "info",
        title: "No Rows Selected",
        message: "Please select at least one row to duplicate.",
        buttons: [{ text: "OK", primary: true }],
      });
      return;
    }

    // Get selected rows data and create deep copies
    const selectedIndices = Array.from(selectedRows).sort((a, b) => a - b);
    const duplicatedRows = selectedIndices.map((index) =>
      JSON.parse(JSON.stringify(activeSheet.data[index])),
    );

    // Add duplicated rows at the end
    updateSheetData([...activeSheet.data, ...duplicatedRows]);
    setSelectedRows(new Set());

    showModal({
      type: "success",
      title: "Rows Duplicated",
      message: `${duplicatedRows.length} row(s) have been duplicated successfully.`,
      buttons: [{ text: "OK", primary: true }],
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
        // Select ALL rows for bulk upload (not just rows with images)
        const allIndices = activeSheet.data.map((_, index) => index);
        return {
          ...prev,
          [imageType]: allIndices,
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
    console.log("[handleImageSlotClick] Called with:", {
      rowIndex,
      imageType,
      currentUrl,
    });

    if (!currentUrl) {
      console.warn("[handleImageSlotClick] No URL provided, skipping update");
      return;
    }

    const newData = [...activeSheet.data];
    newData[rowIndex] = { ...newData[rowIndex], [imageType]: currentUrl };
    console.log(
      "[handleImageSlotClick] Updating row:",
      rowIndex,
      "field:",
      imageType,
      "to:",
      currentUrl,
    );
    updateSheetData(newData);
  };
  // Map imageType field names to API slot values
  const imageTypeToSlot = (
    imageType: string,
  ): "hook" | "body_a" | "body_b" | "body_c" | "cta" | "logo" => {
    if (imageType.startsWith("hook")) return "hook";
    if (imageType.startsWith("body1")) return "body_a";
    if (imageType.startsWith("body2")) return "body_b";
    if (imageType.startsWith("cta")) return "cta";
    return "hook";
  };

  // Get distinct slots that have selections
  const getSelectedSlots = (): {
    slot: "hook" | "body_a" | "body_b" | "body_c" | "cta" | "logo";
    imageTypes: string[];
  }[] => {
    const slotMap = new Map<string, string[]>();
    Object.keys(selectedImage).forEach((imageType) => {
      if (selectedImage[imageType]?.length > 0) {
        const slot = imageTypeToSlot(imageType);
        if (!slotMap.has(slot)) slotMap.set(slot, []);
        slotMap.get(slot)!.push(imageType);
      }
    });
    return Array.from(slotMap.entries()).map(([slot, imageTypes]) => ({
      slot: slot as any,
      imageTypes,
    }));
  };

  const [isBulkUploading, setIsBulkUploading] = useState(false);

  // Bulk upload handler - uploads file once per distinct slot type
  const handleBulkUploadFile = async (file: File) => {
    setIsBulkUploading(true);
    const selectedSlots = getSelectedSlots();
    const newData = [...activeSheet.data];

    try {
      // Upload once per distinct slot
      for (const { slot, imageTypes } of selectedSlots) {
        const url = await uploadImage({
          file,
          onUploadImage: () => {},
          slot,
        });

        if (url) {
          // Apply URL to all selected rows for this slot's image types
          imageTypes.forEach((imageType) => {
            const indices: number[] = selectedImage[imageType] || [];
            indices.forEach((rowIndex) => {
              if (newData[rowIndex]) {
                newData[rowIndex] = { ...newData[rowIndex], [imageType]: url };
              }
            });
          });
        }
      }

      updateSheetData(newData);

      // Clear all image selections after upload
      setSelectedImage({
        hookImage: [],
        body1Image: [],
        body1ImageB: [],
        body2Image: [],
        body2ImageB: [],
      });
    } catch (error) {
      console.error("[handleBulkUploadFile] Error:", error);
    } finally {
      setIsBulkUploading(false);
    }
  };

  const onSubmit = () => {
    // Get complete rows (rows with all required data)
    const completeRows = activeSheet.data.filter((row) => isRowComplete(row));

    // Check for incomplete rows that have some data
    const incompleteRowIndices: number[] = [];
    activeSheet.data.forEach((row, index) => {
      if (!isRowComplete(row)) {
        const hasAnyData =
          row.hookImage?.trim() ||
          row.hookPart1?.trim() ||
          row.hookPart2?.trim() ||
          row.body1Image?.trim() ||
          row.body1Part1?.trim() ||
          row.body1Part2?.trim() ||
          row.body2Image?.trim() ||
          row.body2Part1?.trim() ||
          row.body2Part2?.trim() ||
          row.ctaPart1?.trim() ||
          row.ctaPart2?.trim() ||
          (duration === 30 &&
            (row.body1ImageB?.trim() || row.body2ImageB?.trim()));

        if (hasAnyData) {
          incompleteRowIndices.push(index + 1); // 1-indexed for display
        }
      }
    });

    // No complete patterns available
    if (completeRows.length === 0) {
      showModal({
        type: "danger",
        title: "パターンがありません",
        message:
          incompleteRowIndices.length > 0
            ? `完成したパターンがありません。\n\n以下の行に不足しているデータがあります: 行 ${incompleteRowIndices.join(", ")}\n\nすべての画像を設定してください。`
            : "データを入力してください。",
        buttons: [{ text: "OK", primary: true }],
      });
      return;
    }

    // Show warning if there are incomplete rows but proceed with complete ones
    if (incompleteRowIndices.length > 0) {
      showModal({
        type: "info",
        title: "警告: 不完全な行があります",
        message: `以下の行にデータが不足しています: 行 ${incompleteRowIndices.join(", ")}\n\nこれらの行は除外され、${completeRows.length}件の完成したパターンのみが使用されます。`,
        buttons: [
          { text: "キャンセル" },
          {
            text: "続行",
            primary: true,
            onClick: () => {
              const patterns: IDataRowFinalized[] = completeRows.map((row) => ({
                hookImage: row.hookImage || "",
                hookPart1: row.hookPart1 || "",
                hookPart2: row.hookPart2 || "",
                body1Image: row.body1Image || "",
                body1ImageB:
                  duration === 30 ? row.body1ImageB || "" : undefined,
                body1Part1: row.body1Part1 || "",
                body1Part2: row.body1Part2 || "",
                body2Image: row.body2Image || "",
                body2ImageB:
                  duration === 30 ? row.body2ImageB || "" : undefined,
                body2Part1: row.body2Part1 || "",
                body2Part2: row.body2Part2 || "",
                ctaPart1: row.ctaPart1 || "",
                ctaPart2: row.ctaPart2 || "",
              }));
              onSetSelectedFinalizedRows(patterns);
              onNext();
              console.log("Generated Patterns:", patterns);
            },
          },
        ],
      });
      return;
    }

    // All rows are complete, proceed directly
    const patterns: IDataRowFinalized[] = completeRows.map((row) => ({
      hookImage: row.hookImage || "",
      hookPart1: row.hookPart1 || "",
      hookPart2: row.hookPart2 || "",
      body1Image: row.body1Image || "",
      body1ImageB: duration === 30 ? row.body1ImageB || "" : undefined,
      body1Part1: row.body1Part1 || "",
      body1Part2: row.body1Part2 || "",
      body2Image: row.body2Image || "",
      body2ImageB: duration === 30 ? row.body2ImageB || "" : undefined,
      body2Part1: row.body2Part1 || "",
      body2Part2: row.body2Part2 || "",
      ctaPart1: row.ctaPart1 || "",
      ctaPart2: row.ctaPart2 || "",
    }));

    // Store in context
    onSetSelectedFinalizedRows(patterns);
    onNext();
    console.log("Generated Patterns:", patterns);
  };

  return (
    <div className="flex-1 w-full max-w-[1800px] mx-auto px-6 py-4 flex flex-col items-start gap-6">
      {/* Header */}
      <div className="w-full flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-slate-800">
            コピー作成
          </h1>
          <p className="text-slate-500 text-base">
            画像とテキストを編集してバリエーションを作成してください
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Pattern Counter - Single counter showing total patterns */}
          <div className="flex items-center bg-white rounded-lg border border-slate-400 px-4 py-1 shadow-sm gap-1 h-[54px]">
            <div className="flex items-center">
              <div className="flex flex-col items-end mr-3">
                <span className="text-[10px] font-bold text-slate-500 leading-tight whitespace-nowrap">
                  合計
                  <br />
                  パターン数
                </span>
              </div>
              <span className="text-2xl font-bold text-slate-800 font-mono tracking-tight min-w-[2ch] text-center">
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

      {/* Bulk Upload Section */}
      {selectedImageCount > 0 && (
        <div className="flex items-center w-full gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <UploadImageButton
            onUploadImage={() => {}}
            aspectRatio={16 / 9}
            onCroppedFile={handleBulkUploadFile}
            disabled={isBulkUploading}
          >
            <Button
              className="bg-[#0093b4] hover:bg-[#007a92] text-white font-bold text-sm px-4 py-2 rounded-md shadow-sm transition-all flex items-center gap-2"
              type="button"
              size="sm"
            >
              <UploadCloud className="w-4 h-4" />
              一括アップロード
            </Button>
          </UploadImageButton>
          <span className="text-sm font-medium text-slate-700">
            ({selectedImageCount}個選択中)
          </span>
          <button
            onClick={() =>
              setSelectedImage({
                hookImage: [],
                body1Image: [],
                body1ImageB: [],
                body2Image: [],
                body2ImageB: [],
              })
            }
            className="ml-auto text-xs text-slate-500 hover:text-slate-700 underline"
          >
            選択解除
          </button>
        </div>
      )}

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
      <div className="w-full flex flex-col gap-3">
        {/* Row Actions */}
        <div className="flex items-center gap-3">
          {/* <button
            onClick={addRow}
            className="bg-white border border-[#0093b4] text-[#0093b4] hover:bg-[#0093b4] hover:text-white font-bold text-sm px-4 py-2 rounded-md shadow-sm transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            行を追加
          </button> */}
          <button
            onClick={duplicateSelectedRows}
            className="bg-white border border-slate-500 text-slate-500 hover:bg-slate-500 hover:text-white font-bold text-sm px-4 py-2 rounded-md shadow-sm transition-all flex items-center gap-2"
          >
            <Copy className="w-4 h-4" />
            行を複製
          </button>
          <button
            onClick={deleteSelectedRows}
            className="bg-white border border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-bold text-sm px-4 py-2 rounded-md shadow-sm transition-all flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            行を削除
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="w-full flex justify-end items-center gap-4 mt-6 mb-4">
        <button
          onClick={onPrev}
          className="px-6 py-2.5 rounded-lg text-slate-500 font-semibold hover:text-slate-800 hover:bg-slate-100 text-sm transition-colors"
        >
          戻る
        </button>
        <button
          className="bg-[#0093b4] hover:bg-[#007a92] text-white font-semibold text-sm px-8 py-2.5 rounded-lg shadow-sm transition-all flex items-center gap-2"
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
