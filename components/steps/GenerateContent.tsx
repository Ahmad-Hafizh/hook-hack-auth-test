import React from "react";

interface GenerateContentProps {
  videoListData: any[];
}

export const GenerateContent: React.FC<GenerateContentProps> = ({
  videoListData,
}) => {
  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-6">
        Generate Content (Coming Soon)
      </h2>
    </div>
  );
};
