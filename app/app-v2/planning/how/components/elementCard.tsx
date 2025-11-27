import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { CustomCheckboxGroup, CustomCheckboxItem } from './customCheckbox';
import { IElements, IVariants } from '../hooks/useStepData';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import UploadImageButton from './uploadImageButton';
import { onUploadBodyImage } from '../hooks/usePattern';
import { X } from 'lucide-react';

const ElementCard = ({
  type,
  variants,
  elements,
  onElementValueChange,
  setElements,
}: {
  type: string;
  variants: IVariants;
  elements: IElements;
  onElementValueChange: (type: keyof IElements, value: string[], elements: IElements, setElements: React.Dispatch<React.SetStateAction<IElements>>) => void;
  setElements: React.Dispatch<React.SetStateAction<IElements>>;
}) => {
  if (type === 'hook') {
    return (
      <Card className="w-full h-fit pr-5 pb-5">
        <CardHeader className="w-full">
          <CardTitle>Hooks</CardTitle>
        </CardHeader>
        <CardContent className="w-full">
          <CustomCheckboxGroup className="gap-5  w-full" value={elements.hooks} onValueChange={(value) => onElementValueChange('hooks', value, elements, setElements)}>
            {variants.hooks &&
              variants.hooks.map((value: string, index: number) => (
                <div className="flex items-center space-x-2 w-full" key={index}>
                  <CustomCheckboxItem id={`hook-option-${index + 1}`} value={value} />
                  <Label htmlFor={`hook-option-${index + 1}`} className="text-base w-full whitespace-nowrap cursor-pointer">
                    {value}
                  </Label>
                </div>
              ))}
          </CustomCheckboxGroup>
        </CardContent>
      </Card>
    );
  } else if (type === 'body1') {
    return (
      <Card className="flex flex-row gap-5 h-fit pr-5 pb-5">
        <div className="">
          <CardHeader>
            <CardTitle>Body 1 Image</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-[350px] flex flex-col gap-4">
              {elements.body1Images.map((value: string, index: number) => {
                return (
                  <div className="relative flex items-center w-[350px] h-[250px] rounded-md overflow-hidden" key={index}>
                    {value && <Image src={value} alt={`${value} image`} fill className="absolute object-cover" />}
                    <Button
                      className="absolute top-2 right-2 p-1 rounded-full bg-white/70 hover:bg-white"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const newImages = elements.body1Images.filter((_, i) => i !== index);
                        setElements({ ...elements, body1Images: newImages });
                      }}
                    >
                      <X />
                    </Button>
                  </div>
                );
              })}

              <UploadImageButton
                onUploadImage={(url) => {
                  onUploadBodyImage(url, setElements, 'body1Images');
                }}
              />
            </div>
          </CardContent>
        </div>
        <div className="">
          <CardHeader>
            <CardTitle>Body 1 Message</CardTitle>
          </CardHeader>
          <CardContent>
            <CustomCheckboxGroup className="gap-5" value={elements.body1Messages} onValueChange={(value) => onElementValueChange('body1Messages', value, elements, setElements)}>
              {variants.strong_point_1_messages &&
                variants.strong_point_1_messages.map((value: string, index: number) => (
                  <div className="flex items-center space-x-2 " key={index}>
                    <CustomCheckboxItem id={`body1-message-${index + 1}`} value={value} />
                    <Label htmlFor={`body1-message-${index + 1}`} className="text-base cursor-pointer">
                      {value}
                    </Label>
                  </div>
                ))}
            </CustomCheckboxGroup>
          </CardContent>
        </div>
      </Card>
    );
  } else if (type === 'body2') {
    return (
      <Card className="flex flex-row gap-5 h-fit pr-5 pb-5">
        <div className="">
          <CardHeader>
            <CardTitle>Body 2 Image</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-[350px] flex flex-col gap-4">
              {elements.body2Images.map((value: string, index: number) => {
                return (
                  <div className="relative flex items-center w-[350px] h-[250px] rounded-md overflow-hidden" key={index}>
                    {value && <Image src={value} alt={`${value} image`} fill className="absolute object-cover" />}
                    <Button
                      className="absolute top-2 right-2 p-1 rounded-full bg-white/70 hover:bg-white"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const newImages = elements.body2Images.filter((_, i) => i !== index);
                        setElements({ ...elements, body2Images: newImages });
                      }}
                    >
                      <X />
                    </Button>
                  </div>
                );
              })}

              <UploadImageButton
                onUploadImage={(url) => {
                  onUploadBodyImage(url, setElements, 'body2Images');
                }}
              />
            </div>
          </CardContent>
        </div>
        <div className="">
          <CardHeader>
            <CardTitle>Body 2 Message</CardTitle>
          </CardHeader>
          <CardContent>
            <CustomCheckboxGroup className="gap-5" value={elements.body2Messages} onValueChange={(value) => onElementValueChange('body2Messages', value, elements, setElements)}>
              {variants.strong_point_2_messages &&
                variants.strong_point_2_messages.map((value: string, index: number) => (
                  <div className="flex items-center space-x-2 " key={index}>
                    <CustomCheckboxItem id={`body2-message-${index + 1}`} value={value} />
                    <Label htmlFor={`body2-message-${index + 1}`} className="text-base cursor-pointer">
                      {value}
                    </Label>
                  </div>
                ))}
            </CustomCheckboxGroup>
          </CardContent>
        </div>
      </Card>
    );
  } else if (type === 'body3') {
    return (
      <Card className="flex flex-row gap-5 h-fit pr-5 pb-5">
        <div className="">
          <CardHeader>
            <CardTitle>Body 3 Image</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-[350px] flex flex-col gap-4">
              {elements.body3Images.map((value: string, index: number) => {
                return (
                  <div className="relative flex items-center w-[350px] h-[250px] rounded-md overflow-hidden" key={index}>
                    {value && <Image src={value} alt={`${value} image`} fill className="absolute object-cover" />}
                    <Button
                      className="absolute top-2 right-2 p-1 rounded-full bg-white/70 hover:bg-white"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const newImages = elements.body3Images.filter((_, i) => i !== index);
                        setElements({ ...elements, body3Images: newImages });
                      }}
                    >
                      <X />
                    </Button>
                  </div>
                );
              })}

              <UploadImageButton
                onUploadImage={(url) => {
                  onUploadBodyImage(url, setElements, 'body3Images');
                }}
              />
            </div>
          </CardContent>
        </div>
        <div className="">
          <CardHeader>
            <CardTitle>Body 3 Message</CardTitle>
          </CardHeader>
          <CardContent>
            <CustomCheckboxGroup className="gap-5" value={elements.body3Messages} onValueChange={(value) => onElementValueChange('body3Messages', value, elements, setElements)}>
              {variants.strong_point_3_messages &&
                variants.strong_point_3_messages.map((value: string, index: number) => (
                  <div className="flex items-center space-x-2 " key={index}>
                    <CustomCheckboxItem id={`body3-message-${index + 1}`} value={value} />
                    <Label htmlFor={`body3-message-${index + 1}`} className="text-base cursor-pointer">
                      {value}
                    </Label>
                  </div>
                ))}
            </CustomCheckboxGroup>
          </CardContent>
        </div>
      </Card>
    );
  } else if (type === 'cta') {
    return (
      <Card className="w-full h-fit pr-5 pb-5">
        <CardHeader className="w-full">
          <CardTitle>CTA's</CardTitle>
        </CardHeader>
        <CardContent className="w-full">
          <CustomCheckboxGroup className="gap-5  w-full" value={elements.ctas} onValueChange={(value) => onElementValueChange('ctas', value, elements, setElements)}>
            {variants.ctas &&
              variants.ctas.map((value: string, index: number) => (
                <div className="flex items-center space-x-2 w-full" key={index}>
                  <CustomCheckboxItem id={`cta-option-${index + 1}`} value={value} />
                  <Label htmlFor={`cta-option-${index + 1}`} className="text-base w-full whitespace-nowrap cursor-pointer">
                    {value}
                  </Label>
                </div>
              ))}
          </CustomCheckboxGroup>
        </CardContent>
      </Card>
    );
  }
};

export default ElementCard;
