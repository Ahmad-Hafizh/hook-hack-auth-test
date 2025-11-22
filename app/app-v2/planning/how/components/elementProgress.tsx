import React, { useEffect } from 'react';

const ElementProgress = ({ elements }: { elements: any }) => {
  const elementNames = Object.keys(elements);
  const displayNames: { [key: string]: string } = {
    hooks: 'Hooks',
    body1Images: 'Body 1 Images',
    body1Messages: 'Body 1 Messages',
    body2Images: 'Body 2 Images',
    body2Messages: 'Body 2 Messages',
    body3Images: 'Body 3 Images',
    body3Messages: 'Body 3 Messages',
    ctas: 'CTAs',
  };

  return (
    <div className="flex justify-center items-start mb-10 gap-2">
      {elementNames.map((elementName: string, i: number) => {
        const isFilled = elements[elementName].length > 0;

        return (
          <div className="flex items-center justify-center gap-2" key={elementName}>
            <div className="relative flex flex-col items-center">
              <div
                className={`content-[''] w-6 h-6 border-2 rounded-full flex items-center justify-center z-10 transition-all duration-200 ${isFilled ? 'bg-rose-500 border-rose-600 text-white' : 'bg-gray-200 border-gray-300 text-gray-400'}`}
              />
              <span className={`absolute top-8 text-[10px] text-center w-12 leading-tight ${isFilled ? 'font-semibold' : 'font-normal'}`}>{displayNames[elementName]}</span>
            </div>
            {i < elementNames.length - 1 && <div className={`h-[3px] w-8 rounded-full transition-all duration-200 ${isFilled ? 'bg-rose-500' : 'bg-gray-300'}`} />}
          </div>
        );
      })}
    </div>
  );
};

export default ElementProgress;
