"use client";
import React from "react";
import { FlowHeader } from "../../components/flow-header";

const PlanningPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-50">
      <FlowHeader />
      <div className="flex-1 w-full">{children}</div>
    </div>
  );
};

export default PlanningPage;
