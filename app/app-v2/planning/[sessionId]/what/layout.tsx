import React from 'react';
import PlannningWhatContextProvider from './hooks/plannningWhatContext';
import PlannningWhatDataContextProvider from './hooks/planningWhatDataContext';

const PlanningWhatLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <PlannningWhatContextProvider>
      <PlannningWhatDataContextProvider>{children}</PlannningWhatDataContextProvider>
    </PlannningWhatContextProvider>
  );
};

export default PlanningWhatLayout;
