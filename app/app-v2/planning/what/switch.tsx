import React from 'react';

const SwitchPage = ({ onScratch, onSkip }: { onScratch: () => void; onSkip: () => void }) => {
  return (
    <div className="flex w-full flex-col justify-center items-center h-full gap-20">
      <div className="flex flex-col justify-center text-center items-center gap-4">
        <h1 className="text-3xl font-bold">Start planning with Hook Hack</h1>
        <p>
          you can choose to start from scratch or you can start with <br />
          your competitor URL and safe your time
        </p>
      </div>
      <div className="flex gap-10">
        <div className="border p-10 rounded-xl text-center cursor-pointer flex flex-col justify-center items-center w-[250px]" onClick={onScratch}>
          <p>Start from scratch</p>
        </div>
        <div className="border p-10 rounded-xl text-center cursor-pointer flex flex-col justify-center items-center w-[250px]" onClick={onSkip}>
          <p>
            Already know your competitor's URL? <br />
            You need three URLs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SwitchPage;
