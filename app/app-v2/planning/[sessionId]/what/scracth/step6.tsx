"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePlanningWhatDataContext } from "../hooks/planningWhatDataContext";
import { Card, PageHeader } from "@/components/lp-analyzer";
import {
  DesireItem,
  ValueDesireCard,
} from "@/components/lp-analyzer/ValueDesireCard";
import { Spinner } from "@/components/ui/spinner";
import { ArrowRight } from "lucide-react";

const Step6 = ({ onNext }: { onNext: () => void }) => {
  const { desireOrganization } = usePlanningWhatDataContext();
  const [loading, setLoading] = React.useState(false);

  console.log(desireOrganization);

  return (
    <>
      {/* <div className="px-10 h-full flex flex-col gap-20 container justify-between">
        <div className="flex gap-20">
          <h1 className="text-3xl">価値に​対応する​欲求の​整理</h1>
        </div>
        <div className="grid grid-cols-2 h-fit w-full gap-x-20 gap-y-10">
          {Array.from({ length: 6 }).map((_, index) => (
            <div className="flex flex-col w-ful gap-2">
              <p className="text-xl">価​値①：​</p>
              <div className="flex flex-col gap-2 w-full ">
                <div className="">
                  <p className="text-lg">欲求top1</p>
                  <p className="text-sm">理由：</p>
                </div>
                <div className="flex gap-4 items-center w-full">
                  <Input type="checkbox" className="w-4 h-4" />
                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex flex-col items-start w-full">
                      <p>旧​前​提​（卒業）</p>
                      <Input defaultValue={"〇〇"} className="w-full" />
                    </div>
                    <div className="flex flex-col items-start w-full">
                      <p>新前提​（当たり前）​</p>
                      <Input defaultValue={"〇〇"} className="w-full" />
                    </div>
                    <div className="flex flex-col items-start w-full">
                      <p>判断</p>
                      <Input defaultValue={"〇〇"} className="w-full" />
                    </div>
                    <div className="flex flex-col items-start w-full">
                      <p>行動の​流れ</p>
                      <Input defaultValue={"〇〇"} className="w-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <Button
            className=" border-2 border-sky-600 bg-sky-600  hover:bg-sky-500 text-white px-4 py-2"
            onClick={onNext}
          >
            {/* {loading && <Spinner className="w-5 h-5" />} 
            次に​進む
          </Button>
        </div>
      </div> */}
      <div className="flex-1 w-full max-w-6xl mx-auto px-4 py-12 md:px-8 flex flex-col justify-center h-full items-start">
        <PageHeader title="価値の整理" />
        <div className="w-full">
          <div className="flex flex-col gap-8">
            {/* card */}

            <Card variant="elevated" className="w-full !p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-8 w-full ">
                {desireOrganization.map((desireOrg) => (
                  <ValueDesireCard
                    value_id={desireOrg.value_id}
                    value_category={desireOrg.value_category}
                    value_label={desireOrg.value_label}
                    desire_1={desireOrg.desire_1}
                    desire_2={desireOrg.desire_2}
                  />
                ))}
              </div>
              <div className="flex justify-center mt-10 gap-4">
                <Button
                  variant={"secondary"}
                  className="bg-gray-50 text-gray-500"
                  size={"lg"}
                >
                  戻る
                </Button>
                <Button
                  className="bg-cyan-600 hover:bg-cyan-700"
                  size={"lg"}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner className="h-4 w-4" />
                      読み込み中...
                    </>
                  ) : (
                    <>
                      次に進む <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step6;
