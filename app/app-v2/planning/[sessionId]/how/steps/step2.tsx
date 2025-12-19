import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import React from "react";
import { submitStep2 } from "../hooks/useFetchAPINext";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useParams } from "next/navigation";
import { useDataContext } from "../hooks/useDataContext";

const Step2 = ({ onNext }: { onNext: () => void }) => {
  const [loading, setLoading] = React.useState(false);
  const { sessionId } = useParams();
  const [selectedTemplateId, setSelectedTemplateId] =
    React.useState<string>("");
  const { onSetJobId } = useDataContext();

  const templatesCreatomateList = [
    {
      template_id: "6f8e118a-703d-4b94-8534-96a2b7be7d62",
      video_url: "/Real_estate.m4v",
    },
    {
      template_id: "ca63102c-c78f-43c9-98d6-1c718dfe6ed1",
      video_url: "/B2B_Saas.m4v",
    },
    {
      template_id: "f9a7fdef-4311-4b0c-942a-6f3f00a353dd",
      video_url: "/EC_video.m4v",
    },
  ];

  return (
    <div className="px-10 h-full flex flex-col gap-5 container justify-between">
      <div className="flex flex-col gap-5">
        <h2 className="text-2xl font-bold">
          動画の​スタイルを​選択してください​
        </h2>
      </div>
      <RadioGroup
        className="flex gap-20 justify-center items-center "
        onValueChange={(value) => setSelectedTemplateId(value)}
        value={selectedTemplateId}
      >
        {templatesCreatomateList.map((template, index) => (
          <Card
            key={index}
            className="flex flex-col gap-4 h-full justify-center items-center "
          >
            <Label htmlFor={`pattern${index + 1}`} className="">
              <CardHeader className="p-4 text-center">
                <CardTitle className="text-lg leading-none">
                  スタイル {index + 1}
                </CardTitle>
                <CardDescription className="text-gray-500 font-medium leading-tight text-xs">
                  Pattern description
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 py-0">
                <video
                  controls
                  className="aspect-[9/16] w-60 rounded-lg mb-4 border"
                  controlsList="nodownload nofullscreen noremoteplayback"
                  disablePictureInPicture
                  disableRemotePlayback
                  playsInline
                >
                  <source src={template.video_url} type="video/mp4" />
                </video>
              </CardContent>
            </Label>
            <RadioGroupItem
              value={template.template_id}
              id={`pattern${index + 1}`}
              className=""
            />
          </Card>
        ))}
      </RadioGroup>
      <div className="flex justify-end">
        <Button
          onClick={() =>
            submitStep2({
              setLoading,
              onNext,
              selectedTemplateId,
              sessionId: sessionId as string,
              onSetJobId,
            })
          }
          disabled={loading || selectedTemplateId === ""}
          className="border-2 border-sky-600 bg-sky-600  hover:bg-sky-500 text-white px-4 py-2"
        >
          {loading && <Spinner className="w-4 h-4" />}
          次に​進む
        </Button>
      </div>
    </div>
  );
};

export default Step2;
