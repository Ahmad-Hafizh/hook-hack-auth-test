import React from 'react';
import { IRendersCreatomate } from '../hooks/useStepData';

const Step5 = ({ rendersCreatomate }: { rendersCreatomate: IRendersCreatomate[] }) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Preview</h1>
      </div>
      <div className="relative w-full h-full overflow-x-scroll">
        <div className="flex w-fit gap-5 justify-center items-center">
          {rendersCreatomate.map((render, index) => (
            <video key={index} className="aspect-[9/16] w-[400px] rounded-xl mb-4" controls>
              <source src={render.result_url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step5;
