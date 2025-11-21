import { Skeleton } from '@/components/ui/skeleton';
import { ToggleGroupItem } from '@radix-ui/react-toggle-group';
import Image from 'next/image';
import React from 'react';

const KeyVisualsCard = ({ keyVisual, index }: { keyVisual: any; index: number }) => {
  if (keyVisual.status !== 'ok') {
    return (
      <ToggleGroupItem value={keyVisual.url} className="border-2 p-2 h-fit w-fit flex-col gap-2 rounded-xl data-[state=on]:bg-cyan-50 data-[state=on]:border-cyan-200" key={index}>
        <p className="w-[600px] min-h-[470px] h-full flex flex-col justify-center items-center border-2 rounded-lg p-4 text-center ">
          {keyVisual.status} by {keyVisual.url}
        </p>
      </ToggleGroupItem>
    );
  }

  return (
    <ToggleGroupItem value={keyVisual.url} className="border-2 p-2 h-fit w-fit flex-col gap-2 rounded-xl data-[state=on]:bg-cyan-50 data-[state=on]:border-cyan-200" key={index}>
      <div className="w-[600px] h-[400px] relative rounded-lg overflow-hidden">
        {/* <Skeleton className="w-full h-full" /> */}
        {keyVisual.screenshot && keyVisual.screenshot.link ? (
          <Image fill src={keyVisual.screenshot.link} alt={keyVisual.meta_description || `keyvisual of ${keyVisual.url}`} className="absolute object-cover" />
        ) : (
          <Skeleton className="w-full h-full" />
        )}
      </div>
      <div className="flex flex-col items-start w-full gap-2 p-2 text-start max-w-[600px]">
        {keyVisual.text ? <h2 className="text-lg font-semibold leading-tight">{keyVisual.texts.h1 || ''}</h2> : <h2 className="text-lg font-semibold leading-tight">Title not available</h2>}
        <div className="flex flex-col items-start">
          {keyVisual.title ? <p className="text-xs text-gray-500">{keyVisual.title || ''}</p> : <p className="text-xs text-gray-500">description not available</p>}
          <a className="text-xs  text-gray-500 leading-none" href={keyVisual.url || ''} target="blank">
            {keyVisual.url || ''}
          </a>
        </div>
      </div>
    </ToggleGroupItem>
  );
};

export default KeyVisualsCard;
