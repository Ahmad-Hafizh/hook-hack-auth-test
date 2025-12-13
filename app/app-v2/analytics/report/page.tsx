import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const ReportPage = () => {
  return (
    <div className="container py-10">
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold">REPORT</h1>
        <p>
          <strong>Results</strong>
          <br />
          You've tested 3 Hook patterns and 2 Body B message patterns. A total
          of 6 patterns(video). We've given u a score for each pattern based on
          the ideal exit percentage.
        </p>
        <p>
          Your Hook did well but your Body B message needs improvement Either
          the Message is not good or the image needs to be changed
        </p>
        <p>How would you like to proceed with the next step</p>
      </div>
      <div className="w-full mt-10 overflow-x-scroll">
        <table className="w-fit table-auto border border-gray-300 mb-10">
          <thead className="bg-white flex flex-col gap-[1px]">
            <tr className="grid grid-cols-[repeat(5,600px)] gap-[1px] bg-white text-sm">
              <th className="bg-gray-300 py-2">Hook</th>
              <th className="bg-gray-300 py-2">Body A</th>
              <th className="bg-gray-300 py-2">Body B</th>
              <th className="bg-gray-300 py-2">Body C</th>
              <th className="bg-gray-300 py-2">CTA</th>
            </tr>
            <tr className="grid grid-cols-[repeat(5,600px)] bg-white gap-[1px]">
              <th className="grid grid-cols-4 gap-[1px] bg-white text-xs leading-tight p-0">
                <div className="col-span-2 bg-gray-300 flex items-center justify-center p-2">
                  <p>Message</p>
                </div>
                <div className="bg-gray-300 flex items-center justify-center p-2">
                  <p>Score</p>
                </div>
                <div className="bg-gray-300 flex items-center justify-center p-2">
                  <p>Average exit percentage (20% is ideal)</p>
                </div>
              </th>
              <th className="grid grid-cols-4 gap-[1px] bg-white text-xs leading-tight p-0">
                <div className="bg-gray-300 flex items-center justify-center p-2">
                  <p>Image</p>
                </div>
                <div className="bg-gray-300 flex items-center justify-center p-2">
                  <p>Message</p>
                </div>
                <div className="bg-gray-300 flex items-center justify-center p-2">
                  <p>Score</p>
                </div>
                <div className="bg-gray-300 flex items-center justify-center p-2">
                  <p>Average exit percentage (20% is ideal)</p>
                </div>
              </th>
              <th className="grid grid-cols-4 gap-[1px] bg-white text-xs leading-tight p-0">
                <div className="bg-gray-300 flex items-center justify-center p-2">
                  <p>Image</p>
                </div>
                <div className="bg-gray-300 flex items-center justify-center p-2">
                  <p>Message</p>
                </div>
                <div className="bg-gray-300 flex items-center justify-center p-2">
                  <p>Score</p>
                </div>
                <div className="bg-gray-300 flex items-center justify-center p-2">
                  <p>Average exit percentage (20% is ideal)</p>
                </div>
              </th>
              <th className="grid grid-cols-4 gap-[1px] bg-white text-xs leading-tight p-0">
                <div className="bg-gray-300 flex items-center justify-center p-2">
                  <p>Image</p>
                </div>
                <div className="bg-gray-300 flex items-center justify-center p-2">
                  <p>Message</p>
                </div>
                <div className="bg-gray-300 flex items-center justify-center p-2">
                  <p>Score</p>
                </div>
                <div className="bg-gray-300 flex items-center justify-center p-2">
                  <p>Average exit percentage (20% is ideal)</p>
                </div>
              </th>
              <th className="grid grid-cols-4 gap-[1px] bg-white text-xs leading-tight p-0">
                <div className="col-span-2 bg-gray-300 flex items-center justify-center p-2">
                  <p>Message</p>
                </div>
                <div className="bg-gray-300 flex items-center justify-center p-2">
                  <p>Score</p>
                </div>
                <div className="bg-gray-300 flex items-center justify-center p-2">
                  <p>Average exit percentage (20% is ideal)</p>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="grid grid-cols-[repeat(5,600px)] bg-gray-300 gap-[1px]">
              <td className="grid grid-cols-4 gap-[1px] bg-gray-300 text-xs leading-tight p-0">
                <div className="col-span-2 flex items-start justify-center p-2 bg-white">
                  <p>With every step, the world looks a little different.</p>
                </div>
                <div className="col-span-1 flex items-start justify-center p-2 bg-white">
                  <p>8/10</p>
                </div>
                <div className="col-span-1 flex items-start justify-center p-2 bg-white">
                  <p>15%</p>
                </div>
              </td>
              <td className="grid grid-cols-4 gap-[1px] bg-gray-300 text-xs leading-tight p-0">
                <div className="col-span-1 flex items-center justify-center p-2 bg-white relative h-[120px] ">
                  <Image
                    src="/planning_test_image.jpg"
                    fill
                    className="absolute p-[1px]"
                    alt="Planning Test"
                  />
                </div>
                <div className="col-span-1 flex items-start justify-center p-2 bg-white">
                  <p>Instantly boost your height by a natural +7cm.</p>
                </div>
                <div className="col-span-1 flex items-start justify-center p-2 bg-white">
                  <p>2/10</p>
                </div>
                <div className="col-span-1 flex items-start justify-center p-2 bg-white">
                  <p>40%</p>
                </div>
              </td>
              <td className="grid grid-cols-4 gap-[1px] bg-gray-300 text-xs leading-tight p-0">
                <div className="col-span-1 flex items-center justify-center p-2 bg-white relative h-[120px] ">
                  <Image
                    src="/planning_test_image.jpg"
                    fill
                    className="absolute p-[1px]"
                    alt="Planning Test"
                  />
                </div>
                <div className="col-span-1 flex items-start justify-center p-2 bg-white">
                  <p>Instantly boost your height by a natural +7cm.</p>
                </div>
                <div className="col-span-1 flex items-start justify-center p-2 bg-white">
                  <p>2/10</p>
                </div>
                <div className="col-span-1 flex items-start justify-center p-2 bg-white">
                  <p>40%</p>
                </div>
              </td>
              <td className="grid grid-cols-4 gap-[1px] bg-gray-300 text-xs leading-tight p-0">
                <div className="col-span-1 flex items-center justify-center p-2 bg-white relative h-[120px] ">
                  <Image
                    src="/planning_test_image.jpg"
                    fill
                    className="absolute p-[1px]"
                    alt="Planning Test"
                  />
                </div>
                <div className="col-span-1 flex items-start justify-center p-2 bg-white">
                  <p>Instantly boost your height by a natural +7cm.</p>
                </div>
                <div className="col-span-1 flex items-start justify-center p-2 bg-white">
                  <p>2/10</p>
                </div>
                <div className="col-span-1 flex items-start justify-center p-2 bg-white">
                  <p>40%</p>
                </div>
              </td>
              <td className="grid grid-cols-4 gap-[1px] bg-gray-300 text-xs leading-tight p-0">
                <div className="col-span-2 flex items-start justify-center p-2 bg-white">
                  <p>With every step, the world looks a little different.</p>
                </div>
                <div className="col-span-1 flex items-start justify-center p-2 bg-white">
                  <p>8/10</p>
                </div>
                <div className="col-span-1 flex items-start justify-center p-2 bg-white">
                  <p>15%</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-10">
        <Button variant={"outline"} className="h-fit leading-tight text-center">
          Test BodyB <br />
          ​（Image+Message）​検証する​
        </Button>
      </div>
    </div>
  );
};

export default ReportPage;
