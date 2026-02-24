"use client";
import React from "react";
import QualitySelectPage from "./step/qualitySelect/qualitySelect";
import AnalyticSelectPage from "./step/analyticSelect/analyticSelect";
import InputUrlScratchPage from "./step/inputUrl/page/inputUrlScratch";
import CompetitiveMatrixPage from "./step/competitiveMatrix/competitiveMatrix";
import ValueOrganizationPage from "./step/valueOrganization/valueOrganization";
import DesireOrganizationPage from "./step/desireOrganization/desireOrganization";
import PositioningOutlinePage from "./step/positioningOutline/positioningOutline";
import { usePlannningContext } from "../../plannningContext";
import { useParams } from "next/navigation";
import DurationSelectionPage from "./step/durationSelection/durationSelection";
import SelectDataVariantsPage from "./step/dataVariants/dataVariants";
import GenerationSettingsPage from "./step/generationSettings/generationSettings";
import { FlowHeader } from "../../components/flow-header";
import FinalizedDataVariantsPage from "./step/finalizedDataVariants/finalizedDataVariants";
import GenerationPage from "./step/generation/generation";
import WebsiteSelectionPage from "./step/websiteSelection/websiteSelection";
import InputUrlSkipPage from "./step/inputUrl/page/inputUrlSkip";
import InputUrlSpeedPage from "./step/inputUrl/page/inputUrlSpeed";

const PlanningPage = () => {
  const params = useParams();
  const sessionId: string = params.sessionId as string;
  const { onDbStep, step, whatType } = usePlannningContext();

  const listScratchPage = [
    {
      id: 3,
      label: "自社LP URL入力",
      page: (
        <InputUrlScratchPage
          onNext={() => {
            onDbStep(4, sessionId);
          }}
          onPrev={() => {
            onDbStep(2, sessionId);
          }}
        />
      ),
    },

    {
      id: 4,
      label: "ベンチマーク選択",
      page: (
        <WebsiteSelectionPage
          onNext={() => {
            onDbStep(5, sessionId);
          }}
          onPrev={() => {
            onDbStep(3, sessionId);
          }}
        />
      ),
    },
    {
      id: 5,
      label: "分析素材の確認",
      page: (
        <CompetitiveMatrixPage
          stepId={5}
          onNext={() => {
            onDbStep(6, sessionId);
          }}
          onPrev={() => {
            onDbStep(4, sessionId);
          }}
        />
      ),
    },
    {
      id: 6,
      label: "価値整理",
      page: (
        <ValueOrganizationPage
          stepId={6}
          onNext={() => {
            onDbStep(7, sessionId);
          }}
          onPrev={() => {
            onDbStep(5, sessionId);
          }}
        />
      ),
    },
    {
      id: 7,
      label: "ニーズ整理",
      page: (
        <DesireOrganizationPage
          stepId={7}
          onNext={() => {
            onDbStep(8, sessionId);
          }}
          onPrev={() => {
            onDbStep(6, sessionId);
          }}
        />
      ),
    },
    {
      id: 8,
      label: "ポジショニング骨子選択",
      page: (
        <PositioningOutlinePage
          stepId={8}
          onPrev={() => {
            onDbStep(7, sessionId);
          }}
          onNext={() => {
            onDbStep(9, sessionId);
          }}
        />
      ),
    },
  ];

  const listSkipPage = [
    {
      id: 3,
      label: "URL・競合入力",
      page: (
        <InputUrlSkipPage
          onNext={() => {
            onDbStep(4, sessionId);
          }}
          onPrev={() => {
            onDbStep(2, sessionId);
          }}
        />
      ),
    },
    {
      id: 4,
      label: "分析素材の確認",
      page: (
        <CompetitiveMatrixPage
          stepId={4}
          onNext={() => {
            onDbStep(5, sessionId);
          }}
          onPrev={() => {
            onDbStep(3, sessionId);
          }}
        />
      ),
    },
    {
      id: 5,
      label: "価値整理",
      page: (
        <ValueOrganizationPage
          stepId={5}
          onNext={() => {
            onDbStep(6, sessionId);
          }}
          onPrev={() => {
            onDbStep(4, sessionId);
          }}
        />
      ),
    },
    {
      id: 6,
      label: "ニーズ整理",
      page: (
        <DesireOrganizationPage
          stepId={6}
          onNext={() => {
            onDbStep(7, sessionId);
          }}
          onPrev={() => {
            onDbStep(5, sessionId);
          }}
        />
      ),
    },
    {
      id: 7,
      label: "ポジショニング骨子選択",
      page: (
        <PositioningOutlinePage
          stepId={7}
          onPrev={() => {
            onDbStep(6, sessionId);
          }}
          onNext={() => {
            onDbStep(8, sessionId);
          }}
        />
      ),
    },
  ];

  const allPages = [
    {
      id: 1,
      name: "Quality Select",
      page: <QualitySelectPage onNext={() => onDbStep(2, sessionId)} />,
    },
    ...(whatType === "scratch" || whatType === "skip"
      ? [
          {
            id: 2,
            name: "ベンチマーク調査モード選択",
            page: (
              <AnalyticSelectPage
                onBack={() => onDbStep(1, sessionId)}
                onNext={() => onDbStep(3, sessionId)}
              />
            ),
          },
        ]
      : whatType === "speed"
        ? [
            {
              id: 2,
              label: "自社LP URL入力",
              page: (
                <InputUrlSpeedPage
                  onNext={() => {
                    onDbStep(3, sessionId);
                  }}
                  onPrev={() => {
                    onDbStep(1, sessionId);
                  }}
                />
              ),
            },
          ]
        : []),
    ...(whatType === "scratch"
      ? listScratchPage
      : whatType === "skip"
        ? listSkipPage
        : []),
    {
      id: whatType === "scratch" ? 9 : whatType === "skip" ? 8 : 3,
      name: "メッセージ選択",
      page: (
        <DurationSelectionPage
          stepId={whatType === "scratch" ? 9 : whatType === "skip" ? 8 : 3}
          onNext={() => {
            onDbStep(
              whatType === "scratch" ? 10 : whatType === "skip" ? 9 : 4,
              sessionId,
            );
          }}
          onPrev={() => {
            onDbStep(
              whatType === "scratch" ? 8 : whatType === "skip" ? 7 : 2,
              sessionId,
            );
          }}
        />
      ),
    },
    {
      id: whatType === "scratch" ? 10 : whatType === "skip" ? 9 : 4,
      name: "画像・クリエイティブ確認",
      page: (
        <SelectDataVariantsPage
          stepId={whatType === "scratch" ? 10 : whatType === "skip" ? 9 : 4}
          onNext={() => {
            onDbStep(
              whatType === "scratch" ? 11 : whatType === "skip" ? 10 : 5,
              sessionId,
            );
          }}
          onPrev={() => {
            onDbStep(
              whatType === "scratch" ? 9 : whatType === "skip" ? 8 : 3,
              sessionId,
            );
          }}
        />
      ),
    },
    {
      id: whatType === "scratch" ? 11 : whatType === "skip" ? 10 : 5,
      name: "その​他設定",
      page: (
        <FinalizedDataVariantsPage
          stepId={whatType === "scratch" ? 11 : whatType === "skip" ? 10 : 5}
          onNext={() => {
            onDbStep(
              whatType === "scratch" ? 12 : whatType === "skip" ? 11 : 6,
              sessionId,
            );
          }}
          onPrev={() => {
            onDbStep(
              whatType === "scratch" ? 10 : whatType === "skip" ? 9 : 4,
              sessionId,
            );
          }}
        />
      ),
    },
    {
      id: whatType === "scratch" ? 12 : whatType === "skip" ? 11 : 6,
      name: "動画生成",
      page: (
        <GenerationSettingsPage
          stepId={whatType === "scratch" ? 12 : whatType === "skip" ? 11 : 6}
          onNext={() => {
            onDbStep(
              whatType === "scratch" ? 13 : whatType === "skip" ? 12 : 7,
              sessionId,
            );
          }}
          onPrev={() => {
            onDbStep(
              whatType === "scratch" ? 11 : whatType === "skip" ? 10 : 5,
              sessionId,
            );
          }}
        />
      ),
    },
    {
      id: whatType === "scratch" ? 13 : whatType === "skip" ? 12 : 7,
      name: "生成設定確認",
      page: (
        <GenerationPage
          onPrev={() => {
            onDbStep(
              whatType === "scratch" ? 12 : whatType === "skip" ? 11 : 6,
              sessionId,
            );
          }}
        />
      ),
    },
  ];

  return (
    <div className="flex-1 overflow-x-hidden w-full relative">
      <FlowHeader />
      {allPages[step - 1]?.page}
    </div>
  );
};

export default PlanningPage;
