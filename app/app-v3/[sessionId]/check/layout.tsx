import React from "react";

export const metadata = {
  title: "広告チェック | HookHack",
  description: "広告の分析とチェック",
};

const CheckLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* Material Symbols for icons */}
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />
      {children}
    </>
  );
};

export default CheckLayout;
