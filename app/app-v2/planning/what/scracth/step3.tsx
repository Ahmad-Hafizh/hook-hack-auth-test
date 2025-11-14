'use client';
import Link from 'next/link';
import React from 'react';

const Step3 = ({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) => {
  const [selectedVisuals, setSelectedVisuals] = React.useState<boolean>(false);
  return (
    <div className="p-10 h-full flex flex-col gap-5 container justify-between">
      <div className=" flex flex-col gap-20">
        <div className="flex flex-col gap-4">
          <p className="text-lg">Step 3</p>
          <h1 className="text-3xl font-bold leading-none">Select 3 key visuals that matches your product/ services</h1>
          <button className="border border-black  px-4 py-2 w-fit" onClick={onPrev}>
            Change Keyword
          </button>
        </div>
        <div className="overflow-x-scroll w-full">
          <div className="flex gap-4 w-fit">
            <div className="flex flex-col gap-4 items-center justify-center pb-4">
              <div className="p-4 border border-black cursor-pointer w-[700px] h-[400px] flex items-center justify-center">
                <p>Key Visuals</p>
              </div>
              <input type="checkbox" className="w-5 h-5" />
            </div>
            <div className="flex flex-col gap-4 items-center justify-center pb-4">
              <div className="p-4 border border-black cursor-pointer w-[700px] h-[400px] flex items-center justify-center">
                <p>Key Visuals</p>
              </div>
              <input type="checkbox" className="w-5 h-5" />
            </div>
            <div className="flex flex-col gap-4 items-center justify-center pb-4">
              <div className="p-4 border border-black cursor-pointer w-[700px] h-[400px] flex items-center justify-center">
                <p>Key Visuals</p>
              </div>
              <input type="checkbox" className="w-5 h-5" />
            </div>
            <div className="flex flex-col gap-4 items-center justify-center pb-4">
              <div className="p-4 border border-black cursor-pointer w-[700px] h-[400px] flex items-center justify-center">
                <p>Key Visuals</p>
              </div>
              <input type="checkbox" className="w-5 h-5" />
            </div>
            <div className="flex flex-col gap-4 items-center justify-center pb-4">
              <div className="p-4 border border-black cursor-pointer w-[700px] h-[400px] flex items-center justify-center">
                <p>Key Visuals</p>
              </div>
              <input type="checkbox" className="w-5 h-5" />
            </div>
            {selectedVisuals && (
              <>
                <div className="flex flex-col gap-4 items-center justify-center pb-4">
                  <div className="p-4 border border-black cursor-pointer w-[700px] h-[400px] flex items-center justify-center">
                    <p>Key Visuals</p>
                  </div>
                  <input type="checkbox" className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-4 items-center justify-center pb-4">
                  <div className="p-4 border border-black cursor-pointer w-[700px] h-[400px] flex items-center justify-center">
                    <p>Key Visuals</p>
                  </div>
                  <input type="checkbox" className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-4 items-center justify-center pb-4">
                  <div className="p-4 border border-black cursor-pointer w-[700px] h-[400px] flex items-center justify-center">
                    <p>Key Visuals</p>
                  </div>
                  <input type="checkbox" className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-4 items-center justify-center pb-4">
                  <div className="p-4 border border-black cursor-pointer w-[700px] h-[400px] flex items-center justify-center">
                    <p>Key Visuals</p>
                  </div>
                  <input type="checkbox" className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-4 items-center justify-center pb-4">
                  <div className="p-4 border border-black cursor-pointer w-[700px] h-[400px] flex items-center justify-center">
                    <p>Key Visuals</p>
                  </div>
                  <input type="checkbox" className="w-5 h-5" />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <button className="border border-black px-4 py-2" onClick={() => setSelectedVisuals(true)}>
          Show 5 More
        </button>
        <button className="border border-black bg-black text-white px-4 py-2" onClick={onNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Step3;
