import React from "react";

interface CompetitorDetailColumnProps {
  data: {
    keyMessage: string;
    keyMessageTags: string[];
    feature1: string;
    feature1Tags: string[];
    feature2: string;
    feature2Tags: string[];
    feature3: string;
    feature3Tags: string[];
    cta: string;
  };
}

const DetailSection: React.FC<{
  label: string;
  content: string;
  tags: string[];
  height: string;
}> = ({ label, content, tags, height }) => (
  <div className="flex flex-col gap-2">
    <div className="flex justify-between items-start mb-1 h-[48px]">
      <span className="text-xs font-bold text-text-muted pt-2">{label}</span>
      {tags.length > 0 && (
        <div className="flex gap-1 pt-0.5">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="text-[9px] px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-500"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
    <p className={`text-xs text-text-main p-3 ${height} overflow-y-auto`}>
      {content}
    </p>
  </div>
);

export const CompetitorDetailColumn: React.FC<CompetitorDetailColumnProps> = ({
  data,
}) => (
  <div className="flex-1 flex flex-col gap-6 border-r border-border-light/50 pr-4 last:border-0 last:pr-0">
    <DetailSection
      label="キーメッセージ"
      content={data.keyMessage}
      tags={data.keyMessageTags}
      height="leading-relaxed h-[110px]"
    />
    <DetailSection
      label="特徴 1"
      content={data.feature1}
      tags={data.feature1Tags}
      height="h-[84px]"
    />
    <DetailSection
      label="特徴 2"
      content={data.feature2}
      tags={data.feature2Tags}
      height="h-[84px]"
    />
    <DetailSection
      label="特徴 3"
      content={data.feature3}
      tags={data.feature3Tags}
      height="h-[84px]"
    />
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-start mb-1 h-[48px]">
        <span className="text-xs font-bold text-text-muted pt-2">CTA</span>
      </div>
      <p className="text-xs text-text-main px-3 font-medium h-[46px] flex items-center">
        {data.cta}
      </p>
    </div>
  </div>
);
