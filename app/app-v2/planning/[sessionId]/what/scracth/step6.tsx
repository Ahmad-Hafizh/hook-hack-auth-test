import React from "react";
import {
  CustomCheckboxGroup,
  CustomCheckboxItem,
} from "../../how/components/customCheckbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Step6 = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className="px-10 h-full flex flex-col gap-20 container justify-between">
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
          {/* {loading && <Spinner className="w-5 h-5" />} */}
          次に​進む
        </Button>
      </div>
    </div>
  );
};

export default Step6;
