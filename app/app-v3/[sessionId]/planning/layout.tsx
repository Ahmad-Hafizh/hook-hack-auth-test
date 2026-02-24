"use client";
import React from "react";
import PlannningWhatDataContextProvider from "./context/planningWhatDataContext";
import { PlanningHowDataContextProvider } from "./context/planningHowDataContext";

const PlanningPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <PlannningWhatDataContextProvider>
      <PlanningHowDataContextProvider>
        {children}
      </PlanningHowDataContextProvider>
    </PlannningWhatDataContextProvider>
  );
};

export default PlanningPage;
