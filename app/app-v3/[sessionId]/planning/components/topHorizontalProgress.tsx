import React from "react";

const TopHorizontalProgress = ({
  pageStep,
  step,
}: {
  pageStep: number;
  step: number;
}) => {
  return (
    <div className="flex justify-center items-center mb-10 gap-2">
      {Array.from({ length: pageStep }).map((_, i) => {
        const stepNumber = i + 1;
        const isCurrentStep = step === stepNumber;
        const isCompletedStep = step > stepNumber;
        const isUpcomingStep = step < stepNumber;

        return (
          <div className="flex items-center justify-center gap-2" key={i}>
            <div
              className={`w-6 h-6 border-2 rounded-full flex items-center justify-center z-10 transition-all duration-200 ${
                isCurrentStep
                  ? "bg-black border-black text-white"
                  : isCompletedStep
                    ? "bg-gray-500 border-gray-600 text-white"
                    : "bg-gray-200 border-gray-300 text-gray-400"
              }`}
            >
              <p className="text-xs font-bold">{stepNumber}</p>
            </div>
            {i < pageStep - 1 && (
              <div
                className={`h-[3px] w-8 rounded-full transition-all duration-200 ${isCompletedStep ? "bg-gray-500" : "bg-gray-300"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TopHorizontalProgress;
