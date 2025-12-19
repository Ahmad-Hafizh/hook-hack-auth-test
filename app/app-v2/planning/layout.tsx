"use client";
import { Card, CardContent } from "@/components/ui/card";
import { usePathname } from "next/navigation";
import React from "react";
import { usePlannningContext } from "../hooks/plannningContext";

const PlanningPage = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();
  const currentPath = path.split("/")[path.split("/").length - 1];
  const progressValue =
    currentPath === "what" ? 0 : currentPath === "how" ? 50 : 100;

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
      steps: (page == "what_scratch"
        ? [
            "input product name or url",
            "select keyword",
            "select competitors key visuals",
            "AI suggest keywords & key visuals",
          ]
        : page == "what_skip" && [
            "input product name or url & competitors urls",
            "AI suggest keywords & key visuals",
          ]) || [
        "input product name or url",
        "select keyword",
        "select competitors key visuals",
        "AI suggest keywords & key visuals",
      ],
    },
    {
      page: "how",
      japanesePage: "企画​（訴求​方法）​",
      steps: [
        "input budget",
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
    <div className="w-full grid grid-cols-[25vw_1fr] ">
      <div className="h-screen relative p-6 flex items-center">
        <Card className="fixed">
          <CardContent className="flex flex-col items-center justify-center gap-1 h-full p-6">
            <div className="flex flex-col items-start pr-5 gap-4">
              {pagesList.map((item, index) => (
                <div
                  className="grid grid-rows-1 grid-cols-[auto_1fr] gap-4 "
                  key={index}
                >
                  <div className="flex items-center justify-center flex-col gap-2 ">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center z-10 flex-shrink-0 ${pagePositionIndex == index ? "bg-black " : pagePositionIndex > index ? "bg-gray-600 " : "bg-gray-300 "}`}
                    >
                      <p className=" text-white leading-[0] text-base font-bold">
                        {index + 1}
                      </p>
                    </div>
                    {index < pagesList.length - 1 && (
                      <div
                        className={`contents-[''] w-[6px] h-full rounded-full top-6 z-0 ${pagePositionIndex == index ? "bg-black " : pagePositionIndex > index ? "bg-gray-600 " : "bg-gray-300 "}`}
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
          </CardContent>
        </Card>
      </div>
      <div className="min-h-screen overflow-x-hidden w-full">{children}</div>
    </div>
  );
};

export default PlanningPage;
