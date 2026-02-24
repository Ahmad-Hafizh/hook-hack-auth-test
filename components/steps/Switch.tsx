import React from "react";
import { Switch as ShadcnSwitch } from "@/components/ui/switch";

interface ProductionSwitchProps {
  value: {
    production: "Inside" | "Outside";
    purpose: "Impression" | "Conversion";
  };
  onChange: (value: {
    production: "Inside" | "Outside";
    purpose: "Impression" | "Conversion";
  }) => void;
  commentInfo: any;
}

export const Switch: React.FC<ProductionSwitchProps> = ({
  value,
  onChange,
  commentInfo,
}) => {
  const production = value.production;
  const purpose = value.purpose;

  const handleProduction = (checked: boolean) => {
    const next = checked ? "Outside" : "Inside";
    onChange?.({ production: next, purpose });
  };
  const handlePurpose = (checked: boolean) => {
    const next = checked ? "Impression" : "Conversion";
    onChange?.({ production, purpose: next });
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full bg-white">
        <h2 className="text-2xl text-left font-semibold mb-6">コメント情報</h2>
        <div className="flex flex-row gap-4 mb-4 w-full">
          <div className="border border-gray-400 rounded-md flex flex-col items-start justify-center p-5 gap-2 w-full">
            <div className="text-sm text-gray-500 font-semibold">コメント</div>
            <div className="text-base text-gray-700 text-center">
              {commentInfo?.comments?.text ||
                commentInfo?.text ||
                "No comment selected."}
            </div>
          </div>
        </div>
        <div className="w-full flex gap-5 mb-4">
          <div className="font-semibold text-base border border-gray-400 rounded-md py-4 px-4 flex flex-col items-start justify-center w-full text-left">
            <h2 className="text-xs font-normal">いいね数</h2>
            <h2 className="text-sm">
              {commentInfo?.comments?.like ?? commentInfo?.like ?? "N/A"}
            </h2>
          </div>
          <div className="font-semibold text-base border border-gray-400 rounded-md py-4 px-4 flex flex-col items-start justify-center w-full text-left">
            <h2 className="text-xs font-normal">価値</h2>
            <h2 className="text-sm">
              {commentInfo?.comments?.value ?? commentInfo?.value ?? "N/A"}
            </h2>
          </div>
        </div>

        <h2 className="text-2xl text-center font-semibold mt-12 mb-4">
          プロダクションと目的を選択してください。
        </h2>
        {/* Switches Row */}
        <div className="flex flex-row gap-16 w-full justify-between">
          {/* Inside/Outside Production Switch */}
          <div className="border border-black rounded-md p-8 min-w-[320px] w-full flex flex-col items-center">
            <div className="mb-4 text-lg font-medium">Production</div>
            <div className="flex items-center gap-4">
              <span
                className={`px-4 py-2 rounded font-semibold text-lg transition-colors duration-200 ${production === "Inside" ? "bg-green-200 text-green-900" : "bg-gray-100 text-gray-500"}`}
              >
                Inside
              </span>
              <ShadcnSwitch
                checked={production === "Outside"}
                onCheckedChange={handleProduction}
                className="mx-2"
              />
              <span
                className={`px-4 py-2 rounded font-semibold text-lg transition-colors duration-200 ${production === "Outside" ? "bg-green-200 text-green-900" : "bg-gray-100 text-gray-500"}`}
              >
                Outside
              </span>
            </div>
          </div>
          {/* IMP/CV Purpose Switch */}
          <div className="border border-black rounded-md p-8 min-w-[320px] w-full flex flex-col items-center">
            <div className="mb-4 text-lg font-medium">Purpose</div>
            <div className="flex items-center gap-4">
              <span
                className={`px-4 py-2 rounded font-semibold text-lg transition-colors duration-200 ${purpose === "Conversion" ? "bg-red-200 text-red-900" : "bg-gray-100 text-gray-500"}`}
              >
                Conversion
              </span>
              <ShadcnSwitch
                checked={purpose === "Impression"}
                onCheckedChange={handlePurpose}
                className="mx-2"
              />
              <span
                className={`px-4 py-2 rounded font-semibold text-lg transition-colors duration-200 ${purpose === "Impression" ? "bg-red-200 text-red-900" : "bg-gray-100 text-gray-500"}`}
              >
                Impression
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
