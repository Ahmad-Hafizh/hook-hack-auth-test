import React from "react";
import PlannningWhatDataContextProvider from "./hooks/planningWhatDataContext";

const PlanningWhatLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <PlannningWhatDataContextProvider>
      {children}
    </PlannningWhatDataContextProvider>
  );
};

export default PlanningWhatLayout;
