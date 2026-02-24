import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { submitStep4 } from "../hooks/useFetchAPINext";
import UploadImageButton from "../components/uploadImageButton";
import { onUploadBrandLogo } from "../hooks/usePattern";
import { useDataContext } from "../hooks/useDataContext";
import { useParams } from "next/navigation";

const Step4 = ({ onNext }: { onNext: () => void }) => {
  const {
    patternCombinations,
    onSetPatternCombinations,
    variants,
    onSetRendersCreatomate,
    selectedTemplateId,
  } = useDataContext();
  const [loading, setLoading] = React.useState(false);
  const [brandLogoUrl, setBrandLogoUrl] = React.useState<string>(
    variants.brand_logo || ""
  );
  // Preselect the first background music URL (if any) so we always send a valid value
  const [bgm, setBgm] = React.useState<string>(
    variants.background_music[0] || ""
  );
  const { sessionId } = useParams();

  return (
    <div className="px-10 h-full flex flex-col gap-5 container justify-between">
      <div className="flex flex-col ">
        <h2 className="text-2xl font-semibold">
          Select your preferred distribution channels
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-10 w-full h-fit ">
        <Card className="flex flex-col gap-4 px-4 ">
          <CardHeader className="p-4 justify-between flex flex-row items-center">
            <CardTitle className="font-bold text-lg">ブランドロゴ</CardTitle>
            <div className="w-fit">
              <UploadImageButton
                onUploadImage={(url) =>
                  onUploadBrandLogo(
                    url,
                    patternCombinations,
                    onSetPatternCombinations,
                    setBrandLogoUrl
                  )
                }
              />
            </div>
          </CardHeader>
          <CardContent className="p-10 pt-0 h-full flex justify-center items-center">
            <div className="relative flex items-center h-[300px] w-[300px] border rounded-xl">
              <Image
                src={brandLogoUrl}
                alt={`brand logo image`}
                fill
                className="inline-block mr-2 rounded-lg absolute object-cover"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col gap-4 px-4">
          <CardHeader className="p-4">
            <CardTitle className="font-bold text-lg underline">BGM</CardTitle>
          </CardHeader>
          <CardContent className="px-4">
            <RadioGroup
              value={bgm}
              className="gap-4"
              onValueChange={(value) => setBgm(value)}
            >
              {variants.background_music.map((value: string, index) => (
                <div className="flex items-center space-x-2 " key={index}>
                  <RadioGroupItem
                    value={value}
                    id={`bgm-option-${index + 1}`}
                  />
                  <Label htmlFor={`bgm-option-${index + 1}`} className="">
                    <audio controls>
                      <source src={value} type="audio/mpeg" />
                    </audio>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={() =>
            submitStep4({
              setLoading,
              onNext,
              patternCombinations,
              brandLogoUrl,
              bgm,
              sessionId: sessionId as string,
            })
          }
          disabled={loading}
          className="border-2 border-sky-600 bg-sky-600  hover:bg-sky-500 text-white px-4 py-2"
        >
          {loading && <Spinner className="w-3 h-3" />}
          次に​進む
        </Button>
      </div>
    </div>
  );
};

export default Step4;
