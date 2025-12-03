import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { CustomCheckboxGroup, CustomCheckboxItem } from './customCheckbox';
import { IElements, IVariants } from '../hooks/useStepData';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import UploadImageButton from './uploadImageButton';
import { Edit } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { reformValue, replaceMessages } from '../hooks/useLogic';

const ElementCard = ({
  type,
  variants,
  elements,
  onElementValueChange,
  setVariants,
  setElements,
}: {
  type: string;
  variants: IVariants;
  setVariants?: React.Dispatch<React.SetStateAction<IVariants>>;
  elements: IElements;
  onElementValueChange: (type: keyof IElements, value: string[], elements: IElements, setElements: React.Dispatch<React.SetStateAction<IElements>>) => void;
  setElements: React.Dispatch<React.SetStateAction<IElements>>;
}) => {
  if (type === 'hook' && setVariants) {
    return (
      <Card className="w-full h-fit pr-5 pb-5">
        <CardHeader className="w-full">
          <CardTitle>Hooks</CardTitle>
        </CardHeader>
        <CardContent className="w-full  h-[400px] overflow-y-scroll ">
          <CustomCheckboxGroup className="gap-5  w-full" value={elements.hooks} onValueChange={(value) => onElementValueChange('hooks', value, elements, setElements)}>
            {variants.hooks &&
              variants.hooks.map((value: string, index: number) => (
                <div className="flex items-center space-x-2 w-full" key={index}>
                  <CustomCheckboxItem id={`hook-option-${index + 1}`} value={value} />
                  <Label htmlFor={`hook-option-${index + 1}`} className="text-base w-full whitespace-nowrap cursor-pointer">
                    <Textarea defaultValue={reformValue(value, 6, 6)} className="w-[150px] h-[120px] p-2" onChange={(e) => replaceMessages(e.target.value, setVariants, index, 'hooks', variants.hooks)} />
                  </Label>
                </div>
              ))}
          </CustomCheckboxGroup>
        </CardContent>
      </Card>
    );
  } else if (type === 'body1image' && setVariants) {
    return (
      <Card className="flex flex-col gap-5 h-fit  pb-5">
        <CardHeader>
          <CardTitle>Body 1 image :7cm increase in height</CardTitle>
          <CardDescription className="underline">Image guide: 16:9 ratio</CardDescription>
        </CardHeader>
        <CardContent>
          <CustomCheckboxGroup value={elements.body1Images} onValueChange={(value) => onElementValueChange('body1Images', value, elements, setElements)}>
            {variants.strong_point_1_images &&
              variants.strong_point_1_images.map((value: string, index: number) => (
                <div className="flex items-center space-x-2 " key={index}>
                  <CustomCheckboxItem id={`body1-image-guide`} value={value} disabled={!value} />
                  <div className="text-base relative w-[300px] aspect-video ">
                    <Image src={value} alt="Body 1 Image Guide" fill className="border rounded-sm absolute object-fill" />
                    <div className="top-2 right-2 absolute">
                      <UploadImageButton
                        onUploadImage={(url: string) => {
                          setVariants((prevVariants) => {
                            const newImages = prevVariants.strong_point_1_images ? [...prevVariants.strong_point_1_images.slice(0, index), url, ...prevVariants.strong_point_1_images.slice(index + 1)] : [url];
                            return { ...prevVariants, strong_point_1_images: newImages };
                          });
                        }}
                      >
                        <div className="p-2 border bg-white rounded-full shadow-md hover:bg-gray-100">
                          <Edit className="w-4 h-4" />
                        </div>
                      </UploadImageButton>
                    </div>
                  </div>
                </div>
              ))}
            <UploadImageButton
              disabled={variants.strong_point_1_images.length >= 5}
              onUploadImage={(url: string) => {
                setVariants((prevVariants) => {
                  const newImages = prevVariants.strong_point_1_images ? [...prevVariants.strong_point_1_images, url] : [url];
                  return { ...prevVariants, strong_point_1_images: newImages };
                });
              }}
            />
          </CustomCheckboxGroup>
        </CardContent>
      </Card>
    );
  } else if (type === 'body1message' && setVariants) {
    return (
      <Card className="flex flex-col gap-5 h-fit pr-5 pb-5">
        <CardHeader>
          <CardTitle>Body 1 Message</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px] overflow-y-scroll">
          <CustomCheckboxGroup className="gap-5" value={elements.body1Messages} onValueChange={(value) => onElementValueChange('body1Messages', value, elements, setElements)}>
            {variants.strong_point_1_messages &&
              variants.strong_point_1_messages.map((value: string, index: number) => (
                <div className="flex items-center space-x-2 " key={index}>
                  <CustomCheckboxItem id={`body1-message-${index + 1}`} value={value} />
                  <Label htmlFor={`body1-message-${index + 1}`} className="text-base cursor-pointer">
                    <Textarea defaultValue={reformValue(value, 9, 4)} className="w-[150px] h-[120px] p-2" onChange={(e) => replaceMessages(e.target.value, setVariants, index, 'strong_point_1_messages', variants.strong_point_1_messages)} />
                  </Label>
                </div>
              ))}
          </CustomCheckboxGroup>
        </CardContent>
      </Card>
    );
  } else if (type === 'body2image' && setVariants) {
    return (
      <Card className="flex flex-col gap-5 h-fit pr-5 pb-5">
        <CardHeader>
          <CardTitle>Body 2 Image</CardTitle>
          <CardDescription className="underline">Image guide: 16:9 ratio</CardDescription>
        </CardHeader>
        <CardContent>
          <CustomCheckboxGroup value={elements.body2Images} onValueChange={(value) => onElementValueChange('body2Images', value, elements, setElements)}>
            {variants.strong_point_2_images &&
              variants.strong_point_2_images.map((value: string, index: number) => (
                <div className="flex items-center space-x-2 " key={index}>
                  <CustomCheckboxItem id={`body2-image-guide`} value={value} disabled={!value} />
                  <div className="text-base relative w-[300px] aspect-video ">
                    <Image src={value} alt="Body 2 Image Guide" fill className="border rounded-sm absolute object-fill" />
                    <div className="top-2 right-2 absolute">
                      <UploadImageButton
                        onUploadImage={(url: string) => {
                          setVariants((prevVariants) => {
                            const newImages = prevVariants.strong_point_2_images ? [...prevVariants.strong_point_2_images.slice(0, index), url, ...prevVariants.strong_point_2_images.slice(index + 1)] : [url];
                            return { ...prevVariants, strong_point_2_images: newImages };
                          });
                        }}
                      >
                        <div className="p-2 border bg-white rounded-full shadow-md hover:bg-gray-100">
                          <Edit className="w-4 h-4" />
                        </div>
                      </UploadImageButton>
                    </div>
                  </div>
                </div>
              ))}
            <UploadImageButton
              disabled={variants.strong_point_2_images.length >= 5}
              onUploadImage={(url: string) => {
                setVariants((prevVariants) => {
                  const newImages = prevVariants.strong_point_2_images ? [...prevVariants.strong_point_2_images, url] : [url];
                  return { ...prevVariants, strong_point_2_images: newImages };
                });
              }}
            />
          </CustomCheckboxGroup>
        </CardContent>
      </Card>
    );
  } else if (type === 'body2message' && setVariants) {
    return (
      <Card className="flex flex-col gap-5 h-fit pr-5 pb-5">
        <CardHeader>
          <CardTitle>Body 2 Message</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px] overflow-y-scroll">
          <CustomCheckboxGroup className="gap-5" value={elements.body2Messages} onValueChange={(value) => onElementValueChange('body2Messages', value, elements, setElements)}>
            {variants.strong_point_2_messages &&
              variants.strong_point_2_messages.map((value: string, index: number) => (
                <div className="flex items-center space-x-2 " key={index}>
                  <CustomCheckboxItem id={`body2-message-${index + 1}`} value={value} />
                  <Label htmlFor={`body2-message-${index + 1}`} className="text-base cursor-pointer">
                    <Textarea defaultValue={reformValue(value, 9, 4)} className="w-[150px] h-[120px] p-2" onChange={(e) => replaceMessages(e.target.value, setVariants, index, 'strong_point_2_messages', variants.strong_point_2_messages)} />
                  </Label>
                </div>
              ))}
          </CustomCheckboxGroup>
        </CardContent>
      </Card>
    );
  } else if (type === 'body3image' && setVariants) {
    return (
      <Card className="flex flex-col gap-5 h-fit pr-5 pb-5">
        <CardHeader>
          <CardTitle>Body 3 Image</CardTitle>
          <CardDescription className="underline">Image guide: 16:9 ratio</CardDescription>
        </CardHeader>
        <CardContent>
          <CustomCheckboxGroup value={elements.body3Images} onValueChange={(value) => onElementValueChange('body3Images', value, elements, setElements)}>
            {variants.strong_point_3_images &&
              variants.strong_point_3_images.map((value: string, index: number) => (
                <div className="flex items-center space-x-2 " key={index}>
                  <CustomCheckboxItem id={`body3-image-guide`} value={value} disabled={!value} />
                  <div className="text-base relative w-[300px] aspect-video ">
                    <Image src={value} alt="Body 3 Image Guide" fill className="border rounded-sm absolute object-fill" />
                    <div className="top-2 right-2 absolute">
                      <UploadImageButton
                        onUploadImage={(url: string) => {
                          setVariants((prevVariants) => {
                            const newImages = prevVariants.strong_point_3_images ? [...prevVariants.strong_point_3_images.slice(0, index), url, ...prevVariants.strong_point_3_images.slice(index + 1)] : [url];
                            return { ...prevVariants, strong_point_3_images: newImages };
                          });
                        }}
                      >
                        <div className="p-2 border bg-white rounded-full shadow-md hover:bg-gray-100">
                          <Edit className="w-4 h-4" />
                        </div>
                      </UploadImageButton>
                    </div>
                  </div>
                </div>
              ))}
            <UploadImageButton
              disabled={variants.strong_point_3_images.length >= 5}
              onUploadImage={(url: string) => {
                setVariants((prevVariants) => {
                  const newImages = prevVariants.strong_point_3_images ? [...prevVariants.strong_point_3_images, url] : [url];
                  return { ...prevVariants, strong_point_3_images: newImages };
                });
              }}
            />
          </CustomCheckboxGroup>
        </CardContent>
      </Card>
    );
  } else if (type === 'body3message' && setVariants) {
    return (
      <Card className="flex flex-col gap-5 h-fit pr-5 pb-5">
        <CardHeader>
          <CardTitle>Body 3 Message</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px] overflow-y-scroll">
          <CustomCheckboxGroup className="gap-5" value={elements.body3Messages} onValueChange={(value) => onElementValueChange('body3Messages', value, elements, setElements)}>
            {variants.strong_point_3_messages &&
              variants.strong_point_3_messages.map((value: string, index: number) => (
                <div className="flex items-center space-x-2 " key={index}>
                  <CustomCheckboxItem id={`body3-message-${index + 1}`} value={value} />
                  <Label htmlFor={`body3-message-${index + 1}`} className="text-base cursor-pointer">
                    <Textarea defaultValue={reformValue(value, 9, 4)} className="w-[150px] h-[120px] p-2" onChange={(e) => replaceMessages(e.target.value, setVariants, index, 'strong_point_3_messages', variants.strong_point_3_messages)} />
                  </Label>
                </div>
              ))}
          </CustomCheckboxGroup>
        </CardContent>
      </Card>
    );
  } else if (type === 'cta' && setVariants) {
    return (
      <Card className="w-full h-fit pr-5 pb-5">
        <CardHeader className="w-full">
          <CardTitle>CTA's</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px] overflow-y-scroll ">
          <CustomCheckboxGroup className="gap-5  w-full" value={elements.ctas} onValueChange={(value) => onElementValueChange('ctas', value, elements, setElements)}>
            {variants.ctas &&
              variants.ctas.map((value: string, index: number) => (
                <div className="flex items-center space-x-2 w-full" key={index}>
                  <CustomCheckboxItem id={`cta-option-${index + 1}`} value={value} />
                  <Label htmlFor={`cta-option-${index + 1}`} className="text-base w-full whitespace-nowrap cursor-pointer">
                    <Textarea defaultValue={reformValue(value, 5, 3)} className="w-[150px] h-[120px] p-2" onChange={(e) => replaceMessages(e.target.value, setVariants, index, 'ctas', variants.ctas)} />
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
