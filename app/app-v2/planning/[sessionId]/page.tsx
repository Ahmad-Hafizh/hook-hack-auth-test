"use client";
import React from "react";
import QualitySelectPage from "./qualitySelect";
import AnalyticSelectPage from "./analyticSelect";

const PlanningPage = () => {
  const [currentTab, setCurrentTab] = React.useState<
    "qualitySelect" | "analyticSelect"
  >("qualitySelect");

  return (
    <div className="w-full h-screen relative">
      {currentTab === "qualitySelect" ? (
        <QualitySelectPage
          onSetCurrentTab={() => setCurrentTab("analyticSelect")}
        />
      ) : (
        <AnalyticSelectPage onBack={() => setCurrentTab("qualitySelect")} />
      )}
    </div>
  );
};

export default PlanningPage;
