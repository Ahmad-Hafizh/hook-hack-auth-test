import { Skeleton } from "@/components/ui/skeleton";
import { ToggleGroupItem } from "@radix-ui/react-toggle-group";
import { XCircleIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const KeyVisualsCard = ({
  keyVisual,
  index,
}: {
  keyVisual: any;
  index: number;
}) => {
  if (!keyVisual.screenshot_url) {
    return (
      <ToggleGroupItem
        value={keyVisual.url}
        className="border-2 h-[410px] w-[600px] flex-col gap-2 rounded-xl data-[state=on]:bg-yellow-50 data-[state=on]:border-yellow-200"
        key={index}
      >
        <div className="w-full h-full flex flex-col justify-center items-center gap-2 leading-none">
          <XCircleIcon className="w-8 h-8 text-black " />
          <p className="text-center">Key Visuals not Available</p>
          <p className="">{keyVisual.url}</p>
        </div>
      </ToggleGroupItem>
    );
  }

  return (
    <ToggleGroupItem
      value={keyVisual.url}
      className="border-2 p-2 h-fit w-fit flex-col gap-2 rounded-xl data-[state=on]:bg-yellow-50 data-[state=on]:border-yellow-200"
      key={index}
    >
      <div className="w-[600px] h-[300px] relative rounded-lg overflow-hidden">
        {keyVisual.screenshot_url ? (
          <Image
            src={keyVisual.screenshot_url}
            alt={keyVisual.meta_description || `keyvisual of ${keyVisual.url}`}
            className="object-cover overflow-hidden absolute inset-0"
            fill
          />
        ) : (
          <Skeleton className="w-[600px] h-[400px]" />
        )}
      </div>
      <div className="flex flex-col items-start gap-2 p-2 text-start w-[600px] h-fit">
        {keyVisual.title ? (
          <h2 className="text-lg font-semibold leading-tight pt-2">
            {keyVisual.title}
          </h2>
        ) : (
          <h2 className="text-lg font-semibold leading-tight pt-2">
            Title not available
          </h2>
        )}
        <div className="flex flex-col items-start gap-2  text-start w-[600px] h-fit">
          {keyVisual.meta_description ? (
            <p className="text-xs text-gray-500 w-full h-4 truncate">
              Description : {keyVisual.meta_description}
            </p>
          ) : keyVisual.texts?.h1 ? (
            <p className="text-xs text-gray-500 w-full h-4 truncate">
              Description : {keyVisual.texts.h1}
            </p>
          ) : (
            <p className="text-xs text-gray-500 w-full h-4 truncate">
              Description : description not available
            </p>
          )}
          <a
            className="text-xs  text-gray-500 leading-none"
            href={keyVisual.url || ""}
            target="blank"
          >
            URL : {keyVisual.url || ""}
          </a>
        </div>
      </div>
    </ToggleGroupItem>
  );
};

export default KeyVisualsCard;
