import Link from 'next/link';
import React from 'react';

const Step2Scratch = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className="p-10 h-full flex flex-col gap-5 container justify-between">
      <div className=" flex flex-col gap-20">
        <div className="flex flex-col gap-2">
          <p className="text-lg">Step 2</p>
          <h1 className="text-3xl font-bold leading-none"> Choose Keyword</h1>
        </div>
        <div className="flex gap-2">
          <div className="p-4 border border-black cursor-pointer">
            <p>KEYWORD</p>
          </div>
          <div className="p-4 border border-black cursor-pointer">
            <p>KEYWORD</p>
          </div>
          <div className="p-4 border border-black cursor-pointer">
            <p>KEYWORD</p>
          </div>
          <div className="p-4 border border-black cursor-pointer">
            <p>KEYWORD</p>
          </div>
          <div className="p-4 border border-black cursor-pointer">
            <p>KEYWORD</p>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button className="border border-black bg-black text-white px-4 py-2" onClick={onNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Step2Scratch;
