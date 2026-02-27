// "use client";

// import { redirect, useParams } from "next/navigation";
import React from "react";

const SessionLayout = ({ children }: { children: React.ReactNode }) => {
  // const { sessionId } = useParams<{ sessionId: string }>();

  // if (sessionId) {
  //   redirect(
  //     `/app-v3/projects?error=${encodeURIComponent("No seession found.")}`,
  //   );
  // }

  return <>{children}</>;
};

export default SessionLayout;
