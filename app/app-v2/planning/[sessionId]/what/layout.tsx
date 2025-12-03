import React from 'react';
import PlannningWhatContextProvider from './hooks/plannningWhatContext';

const PlanningWhatLayout = async ({ children }: { children: React.ReactNode }) => {
  return <PlannningWhatContextProvider>{children}</PlannningWhatContextProvider>;
};

export default PlanningWhatLayout;
