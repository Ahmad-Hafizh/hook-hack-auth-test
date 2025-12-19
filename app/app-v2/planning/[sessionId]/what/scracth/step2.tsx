import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import React from "react";
import { submitStep2Scratch } from "../hooks/useFetchAPINext";
import { useParams } from "next/navigation";

const Step2Scratch = ({
  onNext,
  keywords,
  selectedKeywords,
  onSetSelectedKeywords,
  onSetKeyVisuals,
}: {
  onNext: () => void;
  keywords: any[];
  selectedKeywords: string;
  onSetSelectedKeywords: (value: string) => void;
  onSetKeyVisuals: (visuals: any[]) => void;
}) => {
  const [loading, setLoading] = React.useState(false);
  const { sessionId } = useParams();

  return (
    <div className="px-10 h-full flex flex-col gap-5 container justify-between">
      <div className=" flex flex-col gap-20 h-full py-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold leading-none">
            あなたの​プロダクト／サービスに​当てはまる​キーワードを​選択してください​
          </h1>
        </div>
        <ToggleGroup
          type="single"
          variant={"outline"}
          className="justify-start flex-wrap gap-4 w-1/2"
          onValueChange={(value) => onSetSelectedKeywords(value)}
          value={selectedKeywords}
        >
          {keywords.map((keyword, index) => (
            <ToggleGroupItem
              key={index}
              value={keyword.term}
              className="data-[state=on]:font-bold data-[state=on]:border-yellow-600 rounded-full px-4 py-2 border-2 border-gray-300 data-[state=on]:text-white data-[state=on]:bg-yellow-600 "
            >
              {keyword.term}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <div className="flex justify-end">
        <Button
          className="border-2 border-sky-600 bg-sky-600  hover:bg-sky-500 text-white px-4 py-2"
          onClick={() =>
            submitStep2Scratch({
              selectedKeywords,
              onNext,
              setLoading,
              sessionId: sessionId as string,
              onSetKeyVisuals,
            })
          }
          disabled={loading}
        >
          {loading && <Spinner className="w-3 h-3" />} 次に​進む
        </Button>
      </div>
    </div>
  );
};

export default Step2Scratch;
