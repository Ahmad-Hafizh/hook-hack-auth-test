import { MousePointerClick, Stars } from "lucide-react";
import React from "react";
import FieldFeature from "../../../components/fieldFeature";
import { IMatrix } from "../../../context/dataTypes";
import { cn } from "@/lib/utils";

type CompetitiveMatrixProps = {
  type: "user" | "competitor" | "suggestion";
  matrix: IMatrix;
  screenshotUrl?: string;
  companyName?: string;
};

const Matrix: React.FC<CompetitiveMatrixProps> = ({
  type,
  matrix,
  companyName,
}) => {
  if (type === "user" && matrix) {
    return (
      <div className="flex flex-col gap-3 group w-[400px] ">
        {/* Header */}
        <div className="bg-white p-4 rounded-xl shadow-sm relative overflow-hidden flex-none h-[70px] flex flex-col justify-center">
          <div className={`absolute top-0 left-0 w-full h-1 bg-sky-600`}></div>
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-text-main flex items-center gap-2">
              自社情報
            </h3>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border shadow-sm flex flex-col gap-6 h-full min-h-[860px]">
          <FieldFeature
            isTextarea={true}
            inputHeight="min-h-[110px]"
            label="キーメッセージ"
            icon={<Stars className="text-sky-600 fill-sky-600 w-4 h-4" />}
            tags={matrix.key_message_tags}
            value={matrix.key_message}
          />
          {Array.from({ length: 3 }).map((_, index) => (
            <FieldFeature
              key={index}
              isTextarea={true}
              inputHeight="min-h-[84px]"
              label={`強み・特徴 ${index + 1}`}
              icon={
                <span
                  className={`w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold`}
                >
                  {index + 1}
                </span>
              }
              tags={
                matrix.strong_points_tagged?.[index]
                  ? {
                      type: matrix.strong_points_tagged[index].type,
                      focus: matrix.strong_points_tagged[index].focus,
                    }
                  : undefined
              }
              value={matrix.strong_points?.[index] || ""}
            />
          ))}
          <FieldFeature
            isTextarea={false}
            label="CTA"
            icon={
              <MousePointerClick className="text-sky-600 fill-sky-600 w-4 h-4" />
            }
            tags={matrix.cta_tags}
            value={matrix.cta || ""}
          />
        </div>
      </div>
    );
  } else if (type === "suggestion" && matrix) {
    return (
      <div className="flex flex-col gap-3 group w-[400px] ">
        {/* Header */}
        <div className="bg-white p-4 rounded-xl shadow-sm relative overflow-hidden flex-none h-[70px] flex flex-col justify-center">
          <div
            className={`absolute top-0 left-0 w-full h-1 bg-indigo-600`}
          ></div>
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-text-main flex items-center gap-2">
              ベンチマーク提案
            </h3>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border shadow-sm flex flex-col gap-6 h-full min-h-[860px]">
          <FieldFeature
            isTextarea={true}
            inputHeight="min-h-[110px]"
            label="キーメッセージ"
            icon={<Stars className="text-indigo-600 fill-indigo-600 w-4 h-4" />}
            tags={matrix.key_message_tags}
            value={matrix.key_message}
          />
          {Array.from({ length: 3 }).map((_, index) => (
            <FieldFeature
              key={index}
              isTextarea={true}
              inputHeight="min-h-[84px]"
              label={`強み・特徴 ${index + 1}`}
              icon={
                <span
                  className={`w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold`}
                >
                  {index + 1}
                </span>
              }
              tags={
                matrix.strong_points_tagged?.[index]
                  ? {
                      type: matrix.strong_points_tagged[index].type,
                      focus: matrix.strong_points_tagged[index].focus,
                    }
                  : undefined
              }
              value={matrix.strong_points?.[index] || ""}
            />
          ))}
          <FieldFeature
            isTextarea={false}
            label="CTA"
            icon={
              <MousePointerClick className="text-sky-600 fill-sky-600 w-4 h-4" />
            }
            tags={matrix.cta_tags}
            value={matrix.cta || ""}
          />
        </div>
      </div>
    );
  } else if (type === "competitor" && matrix) {
    return (
      <div className="flex flex-col gap-6 group w-[350px] justify-between">
        {(companyName || matrix.url) && (
          <div className="flex flex-col gap-1">
            {companyName && (
              <p className="text-sm font-semibold text-slate-700 truncate">{companyName}</p>
            )}
            {matrix.url && (
              <p className="text-xs text-slate-400 truncate">{matrix.url}</p>
            )}
          </div>
        )}
        <div
          className={cn(
            "w-full aspect-video rounded-lg flex items-center justify-center overflow-hidden transition-all duration-200 border relative",
            "bg-slate-50 border-slate-200",
          )}
        >
          {matrix.screenshot_url ? (
            <img
              src={matrix.screenshot_url}
              alt={"Key visual"}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="font-medium z-10 text-[10px] text-center px-2">
              Screenshot unavailable
            </span>
          )}
        </div>

        <FieldFeature
          isTextarea={true}
          inputHeight="min-h-[30px]"
          label="キーメッセージ"
          tags={matrix.key_message_tags}
          value={matrix.key_message}
        />

        {matrix.strong_points.map((strongPoint: string, i: number) => (
          <FieldFeature
            key={i}
            isTextarea={true}
            inputHeight="h-[80px] overflow-y-scroll"
            label={`強み・特徴 ${i + 1}`}
            tags={
              matrix.strong_points_tagged?.[i]
                ? {
                    type: matrix.strong_points_tagged[i].type,
                    focus: matrix.strong_points_tagged[i].focus,
                  }
                : undefined
            }
            value={strongPoint}
          />
        ))}

        <FieldFeature
          isTextarea={false}
          label="CTA"
          tags={matrix.cta_tags}
          placeholder="例：今すぐ無料で始める"
          value={matrix.cta || ""}
          inputHeight="min-h-[30px]"
        />
      </div>
    );
  }
};

export default Matrix;
