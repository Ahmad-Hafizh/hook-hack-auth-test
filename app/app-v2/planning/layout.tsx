"use client";
import { Card, CardContent } from "@/components/ui/card";
import { usePathname } from "next/navigation";
import React from "react";

const PlanningPage = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();
  const currentPath = path.split("/")[path.split("/").length - 1];
  const progressValue =
    currentPath === "what" ? 0 : currentPath === "how" ? 50 : 100;

  return (
    <div className="w-full grid grid-cols-[20vw_1fr] ">
      <div className="h-screen relative p-6 flex items-center">
        <Card className="fixed">
          <CardContent className="flex flex-col items-center justify-center gap-1 h-full p-6">
            <div className="flex flex-col items-start pr-5 gap-2">
              <div className="grid grid-rows-1 grid-cols-[auto_1fr] gap-4 ">
                <div className=" flex items-center justify-center flex-col gap-2">
                  <div
                    className={` w-6 h-6  border-2 rounded-full flex items-center justify-center z-10 ${progressValue == 0 ? "bg-cyan-500 border-cyan-500" : "bg-rose-500 border-rose-600"} `}
                  >
                    <p className=" text-white leading-[0] text-xs font-bold">
                      1
                    </p>
                  </div>
                  <div
                    className={`contents-[''] w-[3px] h-8 rounded-full top-6 z-0 ${progressValue == 0 ? "bg-gray-300" : "bg-rose-500"}`}
                  ></div>
                </div>
                <div
                  className={`leading-none  flex items-start pt-1 ${currentPath == "what" ? "text-black font-bold" : "text-gray-500 font-medium"}`}
                >
                  <p>企画​（訴求​内容）​</p>
                </div>
              </div>
              <div className="grid grid-rows-1 grid-cols-[auto_1fr] gap-4 ">
                <div className=" flex items-center justify-center flex-col gap-2">
                  <div
                    className={` w-6 h-6  border-2 rounded-full flex items-center justify-center z-10 ${progressValue == 0 ? "bg-gray-200 border-gray-300 text-gray-400" : progressValue == 50 ? "bg-cyan-500 border-cyan-500 text-white " : progressValue === 100 && "bg-rose-500 border-rose-600 text-white "} `}
                  >
                    <p className=" leading-[0] text-xs font-bold">2</p>
                  </div>
                  <div
                    className={`contents-[''] w-[3px] h-8 rounded-full top-6 z-0 ${progressValue > 50 ? "bg-rose-500" : "bg-gray-300"}`}
                  ></div>
                </div>
                <div
                  className={`leading-none  flex items-start pt-1 ${currentPath == "how" ? "text-black font-bold" : "text-gray-500 font-medium"}`}
                >
                  <p>企画​（訴求​方法）​</p>
                </div>
              </div>
              <div className="grid grid-rows-1 grid-cols-[auto_1fr] gap-4 ">
                <div className=" flex items-center justify-center flex-col gap-2">
                  <div
                    className={` w-6 h-6  border-2 rounded-full flex items-center justify-center z-10 ${progressValue === 100 ? "bg-cyan-500 border-cyan-500 text-white " : "bg-gray-200 border-gray-300 text-gray-400"} `}
                  >
                    <p className=" leading-[0] text-xs font-bold">3</p>
                  </div>
                </div>
                <div
                  className={`leading-none  flex items-start pt-1 ${currentPath == "generation" ? "text-black font-bold" : "text-gray-500 font-medium"}`}
                >
                  <p>動画生成</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="min-h-screen overflow-x-hidden w-full">{children}</div>
    </div>
  );
};

export default PlanningPage;
