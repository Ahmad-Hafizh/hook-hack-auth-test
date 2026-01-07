import React from "react";
import PlannningContextProvider from "./plannningContext";

const AppV2Layout = ({ children }: { children: React.ReactNode }) => {
  return <PlannningContextProvider>{children}</PlannningContextProvider>;
};

export default AppV2Layout;
