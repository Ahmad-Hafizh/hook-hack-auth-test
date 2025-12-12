import { Skeleton } from '@/components/ui/skeleton';
import { ToggleGroupItem } from '@radix-ui/react-toggle-group';
import { XCircleIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const KeyVisualsCard = ({ keyVisual, index }: { keyVisual: any; index: number }) => {
  if (!keyVisual.screenshot_url) {
    return (
      <ToggleGroupItem value={keyVisual.url} className="border-2 h-[470px] w-[600px] flex-col gap-2 rounded-xl data-[state=on]:bg-cyan-50 data-[state=on]:border-cyan-200" key={index}>
        <div className="w-full h-full flex flex-col justify-center items-center gap-2 leading-none">
          <XCircleIcon className="w-8 h-8 text-black " />
          <p className="text-center">Key Visuals not Available</p>
          <p className="">{keyVisual.url}</p>
        </div>
      </ToggleGroupItem>
    );
  }

  return (
    <ToggleGroupItem value={keyVisual.url} className="border-2 p-2 h-fit w-fit flex-col gap-2 rounded-xl data-[state=on]:bg-cyan-50 data-[state=on]:border-cyan-200" key={index}>
      <div className="w-full h-fit relative rounded-lg overflow-hidden">
        {keyVisual.screenshot_url ? (
          <Image src={keyVisual.screenshot_url} alt={keyVisual.meta_description || `keyvisual of ${keyVisual.url}`} className="object-cover overflow-hidden" width={600} height={400} />
        ) : (
          <Skeleton className="w-[600px] h-[400px]" />
        )}
      </div>
      <div className="flex flex-col items-start gap-2 p-2 text-start w-[600px] h-fit">
        {keyVisual.title ? <h2 className="text-lg font-semibold leading-tight">{keyVisual.title}</h2> : <h2 className="text-lg font-semibold leading-tight">Title not available</h2>}
        <div className="flex flex-col items-start">
          {keyVisual.meta_description ? (
            <p className="text-xs text-gray-500">Description : {keyVisual.meta_description}</p>
          ) : keyVisual.texts?.h1 ? (
            <p className="text-xs text-gray-500">Description : {keyVisual.texts.h1}</p>
          ) : (
            <p className="text-xs text-gray-500 h-10 overflow-hidden break-words">Description : description not available</p>
          )}
          <a className="text-xs  text-gray-500 leading-none" href={keyVisual.url || ''} target="blank">
            URL : {keyVisual.url || ''}
          </a>
        </div>
      </div>
    </ToggleGroupItem>
  );
};

export default KeyVisualsCard;
