import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { CustomCheckboxGroup, CustomCheckboxItem } from "./customCheckbox";
import Image from "next/image";
import UploadImageButton from "./uploadImageButton";
import { Edit } from "lucide-react";
import CustomEditMessage from "./customEditMessage";

const ElementCard = ({
  type,
  variant,
  onElementValueChange,
  value,
  onVariantChange,
  title,
  description,
  aspectRatio,
  aspectStyle,
}: {
  type: string;
  variant: any[];
  onElementValueChange: (value: string[]) => void;
  value: string[];
  onVariantChange: (value: string, index: number) => void;
  title: string;
  description?: string;
  aspectRatio?: number;
  aspectStyle?: string;
}) => {
  if (type === "text") {
    return (
      <Card className="w-full h-fit pr-5 pb-5">
        <CardHeader className="w-full">
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent className="w-full  h-[400px] overflow-y-scroll ">
          <CustomCheckboxGroup
            className="gap-5  w-full"
            value={value}
            onValueChange={onElementValueChange}
          >
            {variant &&
              variant.map((value: string, index: number) => (
                <CustomEditMessage
                  value={value}
                  onVariantChange={onVariantChange}
                  index={index}
                  key={index}
                  title={title}
                />
              ))}
          </CustomCheckboxGroup>
        </CardContent>
      </Card>
    );
  } else if (type === "image") {
    return (
      <Card className="flex flex-col gap-5 h-fit  pb-5">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && (
            <CardDescription className="underline">
              {description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <CustomCheckboxGroup
            value={value}
            onValueChange={onElementValueChange}
          >
            {variant &&
              variant.map((value: string, index: number) => (
                <div className="flex items-center space-x-2 " key={index}>
                  <CustomCheckboxItem
                    id={title + "-" + index}
                    value={value}
                    disabled={!value}
                  />
                  <div
                    className={`text-base relative w-[300px] aspect-[${aspectStyle}]`}
                  >
                    <Image
                      src={value}
                      alt={title}
                      fill
                      className={`border rounded-sm absolute object-contain `}
                    />
                    <div className="top-2 right-2 absolute">
                      <UploadImageButton
                        onUploadImage={(url: string) =>
                          onVariantChange(url, index)
                        }
                        aspectRatio={aspectRatio}
                      >
                        <div className="px-2 py-1 border bg-white rounded-full shadow-md text-sm leading-none font-bold cursor-pointer flex items-center gap-1 hover:bg-gray-100">
                          Edit <Edit className="w-4 h-4" />
                        </div>
                      </UploadImageButton>
                    </div>
                  </div>
                </div>
              ))}
            <UploadImageButton
              disabled={variant.length >= 5}
              onUploadImage={(url: string) => {
                onVariantChange(url, variant.length);
              }}
              aspectRatio={aspectRatio}
            />
          </CustomCheckboxGroup>
        </CardContent>
      </Card>
    );
  }
};

export default ElementCard;
