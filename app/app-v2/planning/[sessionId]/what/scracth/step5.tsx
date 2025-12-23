import React from "react";
import {
  CustomCheckboxGroup,
  CustomCheckboxItem,
} from "../../how/components/customCheckbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Step5 = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className="px-10 h-full flex flex-col gap-auto container justify-between">
      <div className="flex gap-20">
        <h1 className="text-3xl">価値の​整理</h1>
        <div className="flex flex-col gap-2">
          <p>価値の​入口を​選ぶ​基準：</p>
          <ul className="list-disc list-inside">
            <li>​その​価値が​ないと​ らしさが​消える</li>
            <li>それを​言われると​ 顧客が​「それが​欲しい」と​即答しやすい​</li>
            <li>
              競合が​真似しにくい​（または、​真似しても​本物に​なりにくい）​
            </li>
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-2 h-fit w-full gap-x-20 gap-y-10">
        <div className="flex flex-col w-full">
          <p className="text-xl">人</p>
          <div className="flex flex-col gap-2 w-full">
            <CustomCheckboxGroup>
              {Array.from({ length: 3 }).map((_, index) => (
                <div className="flex gap-2 items-start w-full" key={index}>
                  <CustomCheckboxItem
                    value={String(index + 1)}
                    className="mt-3"
                  />
                  <div className="flex flex-col items-start w-full">
                    <Input defaultValue={"案"} className="w-full" />
                    <p>根拠：</p>
                  </div>
                </div>
              ))}
            </CustomCheckboxGroup>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <p className="text-xl">情報</p>
          <div className="flex flex-col gap-2 w-full">
            <CustomCheckboxGroup>
              {Array.from({ length: 3 }).map((_, index) => (
                <div className="flex gap-2 items-start w-full" key={index}>
                  <CustomCheckboxItem
                    value={String(index + 1)}
                    className="mt-3"
                  />
                  <div className="flex flex-col items-start w-full">
                    <Input defaultValue={"案"} className="w-full" />
                    <p>根拠：</p>
                  </div>
                </div>
              ))}
            </CustomCheckboxGroup>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <p className="text-xl">モノ</p>
          <div className="flex flex-col gap-2 w-full">
            <CustomCheckboxGroup>
              {Array.from({ length: 3 }).map((_, index) => (
                <div className="flex gap-2 items-start w-full" key={index}>
                  <CustomCheckboxItem
                    value={String(index + 1)}
                    className="mt-3"
                  />
                  <div className="flex flex-col items-start w-full">
                    <Input defaultValue={"案"} className="w-full" />
                    <p>根拠：</p>
                  </div>
                </div>
              ))}
            </CustomCheckboxGroup>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <p className="text-xl">バイブス</p>
          <div className="flex flex-col gap-2 w-full">
            <CustomCheckboxGroup>
              {Array.from({ length: 3 }).map((_, index) => (
                <div className="flex gap-2 items-start w-full" key={index}>
                  <CustomCheckboxItem
                    value={String(index + 1)}
                    className="mt-3"
                  />
                  <div className="flex flex-col items-start w-full">
                    <Input defaultValue={"案"} className="w-full" />
                    <p>根拠：</p>
                  </div>
                </div>
              ))}
            </CustomCheckboxGroup>
          </div>
        </div>
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

export default Step5;
