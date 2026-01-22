import { Hand, MousePointerClick, Stars } from "lucide-react";
import React from "react";
import FieldFeature from "./fieldFeature";
import { RadioGroupItem } from "@/components/ui/radio-group";

type CompetitiveMatrixProps = {
  type: "own" | "competitor" | "ai-summary";
  onSetKeymessage?: (keymessage: string) => void;
  keymessage?: string;
  onSetStrongPoint?: (strongPoint: string, index: number) => void;
  strongPoint?: string[];
  competitors?: any[];
};

const CompetitiveMatrix: React.FC<CompetitiveMatrixProps> = ({
  type,
  onSetKeymessage,
  keymessage,
  onSetStrongPoint,
  strongPoint,
  competitors,
}) => {
  if (type === "own" && onSetKeymessage && onSetStrongPoint && strongPoint) {
    return (
      <div className="flex flex-col gap-3 group w-[400px] ">
        {/* Header */}
        <div className="bg-white p-4 rounded-xl shadow-sm relative overflow-hidden flex-none h-[70px] flex flex-col justify-center">
          <div className={`absolute top-0 left-0 w-full h-1 bg-sky-600`}></div>
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-text-main flex items-center gap-2">
              競合詳細データ
            </h3>
            <RadioGroupItem value="your-company" />
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border shadow-sm flex flex-col gap-6 h-full min-h-[860px]">
          {/* field */}
          <FieldFeature
            isTextarea={true}
            inputHeight="h-[110px]"
            label="キーメッセージ"
            icon={<Stars className="text-sky-600 fill-sky-600 w-4 h-4" />}
            topSelected="function"
            bottomSelected="result"
            placeholder="例：他にはない○○機能で、あなたの△△を解決します。"
            value={keymessage}
            onChange={onSetKeymessage}
          />
          {/* strong points */}
          {Array.from({ length: 3 }).map((_, index) => (
            <FieldFeature
              key={index}
              isTextarea={true}
              inputHeight="h-[84px]"
              label={`強み・特徴 ${index + 1}`}
              icon={
                <span
                  className={`w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold`}
                >
                  {index + 1}
                </span>
              }
              topSelected="function"
              bottomSelected="result"
              placeholder={`例：他にはない○○機能で、あなたの△△を解決します。`}
              value={strongPoint[index]}
              onChange={(value) => onSetStrongPoint(value, index)}
            />
          ))}
          {/* cta */}
          <FieldFeature
            isTextarea={false}
            label="CTA"
            icon={
              <MousePointerClick className="text-sky-600 fill-sky-600 w-4 h-4" />
            }
            topSelected="function"
            bottomSelected="result"
            placeholder="例：今すぐ無料で始める"
            value=""
            onChange={() => {}}
          />
        </div>
      </div>
    );
  } else if (
    type === "ai-summary" &&
    onSetKeymessage &&
    onSetStrongPoint &&
    strongPoint &&
    keymessage
  ) {
    return (
      <div className="flex flex-col gap-3 group w-[400px] ">
        {/* Header */}
        <div className="bg-white p-4 rounded-xl shadow-sm relative overflow-hidden flex-none h-[70px] flex flex-col justify-center">
          <div
            className={`absolute top-0 left-0 w-full h-1 bg-indigo-600`}
          ></div>
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-text-main flex items-center gap-2">
              競合AIサマリー
            </h3>
            <RadioGroupItem value="ai-suggestion" />
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border shadow-sm flex flex-col gap-6 h-full min-h-[860px]">
          {/* field */}
          <FieldFeature
            isTextarea={true}
            inputHeight="h-[110px]"
            label="キーメッセージ"
            icon={<Stars className="text-indigo-600 fill-indigo-600 w-4 h-4" />}
            topSelected="function"
            bottomSelected="result"
            placeholder="例：他にはない○○機能で、あなたの△△を解決します。"
            value={keymessage}
            onChange={onSetKeymessage}
          />
          {/* strong points */}
          {Array.from({ length: 3 }).map((_, index) => (
            <FieldFeature
              key={index}
              isTextarea={true}
              inputHeight="h-[84px]"
              label={`強み・特徴 ${index + 1}`}
              icon={
                <span
                  className={`w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold`}
                >
                  {index + 1}
                </span>
              }
              topSelected="function"
              bottomSelected="result"
              placeholder={`例：他にはない○○機能で、あなたの△△を解決します。`}
              value={strongPoint[index]}
              onChange={(value) => onSetStrongPoint(value, index)}
            />
          ))}
          {/* cta */}
          <FieldFeature
            isTextarea={false}
            label="CTA"
            icon={
              <MousePointerClick className="text-indigo-600 fill-indigo-600 w-4 h-4" />
            }
            topSelected="function"
            bottomSelected="result"
            placeholder="例：今すぐ無料で始める"
            value=""
            onChange={() => {}}
          />
        </div>
      </div>
    );
  } else if (type === "competitor" && competitors) {
    return (
      <div className="flex flex-col gap-6 group  ">
        {/* Header */}
        <div className="bg-gray-50 p-4 rounded-xl shadow-sm relative overflow-hidden flex-none h-[70px] flex flex-col justify-center">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-text-main flex items-center gap-2 text-gray-500">
              競合詳細データ
            </h3>
          </div>
        </div>

        <div className="bg-gray-50 p-5 rounded-xl border shadow-sm flex flex-row gap-6 h-full min-h-[860px] text-gray-500">
          {competitors.map((competitor, index) => (
            <div
              key={index}
              className={`flex w-[350px] flex-col gap-6 ${index < competitors.length - 1 ? "border-r pr-6" : ""}`}
            >
              <FieldFeature
                isTextarea={true}
                inputHeight="h-[110px]"
                label="キーメッセージ"
                topSelected="function"
                bottomSelected="result"
                value={competitor.key_message}
              />

              {competitor.strong_points.map(
                (strongPoint: string, i: number) => (
                  <FieldFeature
                    key={i}
                    isTextarea={true}
                    inputHeight="h-[84px]"
                    label={`強み・特徴 ${i + 1}`}
                    topSelected="function"
                    bottomSelected="result"
                    value={strongPoint}
                  />
                ),
              )}

              <FieldFeature
                isTextarea={false}
                label="CTA"
                topSelected="function"
                bottomSelected="result"
                placeholder="例：今すぐ無料で始める"
                value=""
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default CompetitiveMatrix;
