"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import KeyMessageCard from "../components/keyMessageCard";
import { useParams, useRouter } from "next/navigation";
import { RadioGroup } from "@/components/ui/radio-group";

import { Spinner } from "@/components/ui/spinner";
import { submitStep4 } from "../hooks/useFetchAPINext";
import { IBriefPlanning } from "../hooks/planningWhatDataContext";

const Step4 = ({ briefPlanning }: { briefPlanning: IBriefPlanning }) => {
  const router = useRouter();
  const { sessionId } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState("your-company");

  const [strongPoints, setStrongPoints] = React.useState<string[]>(
    briefPlanning.user.strong_points
  );
  const [keyMessage, setKeyMessage] = React.useState<string>(
    briefPlanning.user.key_message
  );

  const [suggestionStrongPoints, setSuggestionStrongPoints] = React.useState<
    string[]
  >(briefPlanning.suggestion.strong_points);
  const [suggestionKeyMessage, setSuggestionKeyMessage] =
    React.useState<string>(briefPlanning.suggestion.key_message);

  return (
    <div className="px-10 h-full flex flex-col gap-10 container justify-between">
      <div className="h-full flex justify-center items-center flex-col">
        <div className="w-full overflow-x-scroll pb-10">
          <div className="flex flex-row gap-8 w-fit items-start justify-start ">
            <RadioGroup
              value={selectedOption}
              onValueChange={setSelectedOption}
              className="gap-8 flex w-full"
            >
              <KeyMessageCard
                key_message={keyMessage}
                strong_points={strongPoints}
                setStrongPoints={setStrongPoints}
                setKeyMessage={setKeyMessage}
                title="自社"
                type="your-company"
              />
              <KeyMessageCard
                key_message={suggestionKeyMessage}
                strong_points={suggestionStrongPoints}
                setStrongPoints={setSuggestionStrongPoints}
                setKeyMessage={setSuggestionKeyMessage}
                title="AI競合インサイト"
                type="ai-suggestion"
              />
            </RadioGroup>
            {briefPlanning.competitors.map((competitor: any, index: number) => (
              <KeyMessageCard
                key_message={competitor.key_message}
                strong_points={competitor.strong_points}
                title="競合"
                type="competitor"
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          onClick={() => {
            submitStep4({
              keyMessage:
                selectedOption === "your-company"
                  ? keyMessage
                  : suggestionKeyMessage,
              strongPoints:
                selectedOption === "your-company"
                  ? strongPoints
                  : suggestionStrongPoints,
              sessionId: sessionId as string,
              onNext: () => {
                router.push(`/app-v2/planning/${sessionId}/how`);
              },
              setLoading,
            });
          }}
          className=" border-2 border-sky-600 bg-sky-600  hover:bg-sky-500 text-white px-4 py-2"
        >
          {loading && <Spinner className="w-5 h-5" />}
          次に​進む
        </Button>
      </div>
    </div>
  );
};

export default Step4;
