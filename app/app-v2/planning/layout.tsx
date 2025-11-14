'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { usePathname } from 'next/navigation';
import React from 'react';

const PlanningPage = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();
  const currentPath = path.split('/')[3]; // Get the current sub-path after /app-v2/

  return (
    <div className="w-full grid grid-cols-[20vw_1fr] ">
      <div className="h-screen relative p-6 flex items-center">
        <Card className="fixed">
          <CardContent className="flex flex-col items-center justify-center gap-1 h-full p-6">
            <div className="flex flex-col items-start pr-5">
              <div className="grid grid-rows-1 grid-cols-[auto_1fr] gap-4 relative pb-10">
                <div className=" flex items-center justify-center before:contents-[''] before:absolute before:w-[2px] before:h-8 before:rounded-full before:bg-green-500 before:top-6 before:z-0 ">
                  <div className="bg-white  w-5 h-5  border-green-500 border-2 rounded-full flex items-center justify-center z-10">
                    <p className=" text-green-500 leading-none text-xs font-bold">1</p>
                  </div>
                </div>
                <div className={`leading-none  flex items-center ${currentPath == 'what' ? 'text-black font-bold' : 'text-gray-500 font-medium'}`}>
                  <p>Planning (WHAT)</p>
                </div>
              </div>
              <div className="grid grid-rows-1 grid-cols-[auto_1fr] gap-4 relative pb-10">
                <div
                  className={`flex items-center justify-center before:contents-[''] before:absolute before:w-[2px] before:h-8 before:rounded-full before:top-6 before:z-0 ${currentPath !== 'what' ? 'before:bg-green-500' : ' before:bg-gray-400'}`}
                >
                  <div className={`bg-white  w-5 h-5   border-2 rounded-full flex items-center justify-center z-10 ${currentPath !== 'what' ? 'border-green-500' : 'border-gray-400'}`}>
                    <p className={`leading-none text-xs font-bold ${currentPath !== 'what' ? 'text-green-500' : 'text-gray-400'}`}>2</p>
                  </div>
                </div>
                <div className={`leading-none flex items-center ${currentPath == 'how' ? 'text-black font-bold' : 'text-gray-500 font-medium '}`}>
                  <p>Planning (HOW)</p>
                </div>
              </div>
              <div className="grid grid-rows-1 grid-cols-[auto_1fr] gap-4 relative ">
                <div className=" flex items-center justify-center  ">
                  <div className={`bg-white  w-5 h-5 border-2 rounded-full flex items-center justify-center z-10 ${currentPath == 'generation' ? 'border-green-500' : 'border-gray-400'}`}>
                    <p className={` text-gray-400 leading-none text-xs font-bold ${currentPath == 'generation' ? 'text-green-500' : 'text-gray-400'}`}>3</p>
                  </div>
                </div>
                <div className={`leading-none flex items-center ${currentPath == 'generation' ? 'text-black font-bold' : 'text-gray-500 font-medium'}`}>
                  <p>Generation</p>
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
