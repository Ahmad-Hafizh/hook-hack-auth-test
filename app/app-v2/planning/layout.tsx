"use client";
import React from "react";
import { usePlannningContext } from "../plannningContext";

const PlanningPage = ({ children }: { children: React.ReactNode }) => {
  const { page, step: currentStep } = usePlannningContext();
  const pagePositionIndex =
    page === "what_scratch" || page === "what_skip"
      ? 0
      : page === "how"
        ? 1
        : 2;

  const pagesList = [
    {
      page: "what",
      japanesePage: "企画​（訴求​内容）​",
      steps:
        page == "what_skip"
          ? [
              "input product name or url & competitors urls",
              "competitor matrix",
              "organize value",
              "organize core desire",
              "positioning spine",
            ]
          : [
              "input product name or url",
              "select keyword",
              "select competitors key visuals",
              "competitor matrix",
              "organize value",
              "organize core desire",
              "positioning spine",
            ],
    },
    {
      page: "how",
      japanesePage: "企画​（訴求​方法）​",
      steps: [
        "select video duration",
        "select video style",
        "select videos variants",
        "input logo & select music style",
      ],
    },
    {
      page: "generation",
      japanesePage: "動画生成",
      steps: [],
    },
  ];

  return (
    <div className="w-full grid lg:grid-cols-[25vw_1fr] grid-cols-1 lg:gap-8 gap-0 lg:min-h-screen min-h-fit">
      <div className="lg:h-screen h-fit relative p-6 flex items-center lg:w-[25vw] w-full">
        <div className="flex lg:flex-col md:flex-row flex-col  items-start pr-5 gap-4 h-fit border rounded-xl p-6 w-full">
          {pagesList.map((item, index) => (
            <div
              className="grid grid-rows-1 grid-cols-[auto_1fr] gap-4 "
              key={index}
            >
              <div className="flex lg:items-center items-start justify-center lg:flex-col flex-row gap-2 ">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center z-10 flex-shrink-0 ${pagePositionIndex == index ? "bg-black " : pagePositionIndex > index ? "bg-gray-600 " : "bg-gray-300 "}`}
                >
                  <p className=" text-white leading-[0] text-base font-bold">
                    {index + 1}
                  </p>
                </div>
                {index < pagesList.length - 1 && (
                  <div
                    className={`contents-[''] w-[6px] h-full hidden lg:block  rounded-full top-6 z-0 ${pagePositionIndex == index ? "bg-black " : pagePositionIndex > index ? "bg-gray-600 " : "bg-gray-300 "}`}
                  ></div>
                )}
              </div>
              <div
                className={`leading-none  flex flex-col gap-2 items-start pt-1 `}
              >
                <p
                  className={`text-xl ${pagePositionIndex == index ? "text-black font-bold" : pagePositionIndex > index ? "text-gray-600 font-medium" : "text-gray-400 font-medium"}`}
                >
                  {item.japanesePage}
                </p>
                <ol className="flex flex-col gap-1 list-[lower-alpha] list-inside pb-1">
                  {item.steps.length > 0 &&
                    pagesList[index].steps.map((step, stepIndex) => (
                      <li
                        key={stepIndex}
                        className={`text-sm leading-tight ${pagePositionIndex === index && currentStep === stepIndex + 1 ? "text-yellow-700 font-medium" : pagePositionIndex === index && currentStep > stepIndex + 1 ? "text-black font-medium" : pagePositionIndex > index ? "text-gray-600 font-medium" : "text-gray-400 font-medium"}`}
                      >
                        {step}
                      </li>
                    ))}
                </ol>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="lg:min-h-screen overflow-x-hidden w-full">{children}</div>
    </div>
  );
};

export default PlanningPage;
