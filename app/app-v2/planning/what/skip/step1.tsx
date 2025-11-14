import React from 'react';

const Step1Skip = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className="p-10 h-full flex flex-col gap-5 container justify-between">
      <div className=" flex flex-col gap-20">
        <div className="flex flex-col gap-2">
          <p className="text-lg">Step 1</p>
          <h1 className="text-3xl font-bold leading-none">ANALYZE COMPETITORS APPPEAL POINT</h1>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p>ENTER YOUR PRODUCT/SERVICE URL</p>
            <input type="text" placeholder="https://url/" className="border border-black px-4 py-2 w-[500px]" />
          </div>
          <div className="flex flex-col gap-2">
            <p>ENTER YOUR COMPETITOR PRODUCT/SERVICE URL</p>
            <input type="text" placeholder="https://url/" className="border border-black px-4 py-2 w-[500px]" />
            <input type="text" placeholder="https://url/" className="border border-black px-4 py-2 w-[500px]" />
            <input type="text" placeholder="https://url/" className="border border-black px-4 py-2 w-[500px]" />
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

export default Step1Skip;
