import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import React from "react";
import { useParams } from "next/navigation";
import { submitStep1Scratch } from "../hooks/useFetchAPINext";

const Step1Scratch = ({
  onNext,
  onSetKeywords,
}: {
  onNext: () => void;
  onSetKeywords: (keywords: any) => void;
}) => {
  const { sessionId } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [url, setUrl] = React.useState("");

  return (
    <div className="px-10 h-full flex flex-col gap-5 container justify-between">
      <div className=" flex flex-col gap-20 py-10">
        {/* <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold leading-none">ANALYZE COMPETITORS APPPEAL POINT</h1>
        </div> */}
        <div className="flex flex-col gap-4 ">
          <p className="text-xl font-bold">
            あなたの​プロダクトや​サービスの​LPの​urlを​入力してください​
          </p>
          <Input
            type="text"
            placeholder="https://url or Product name"
            className="border  px-4 py-3 w-[500px]"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          className="border-2 border-sky-600 bg-sky-600  hover:bg-sky-500 text-white px-4 py-2"
          onClick={() =>
            submitStep1Scratch({
              url,
              onSetKeywords,
              onNext,
              setLoading,
              sessionId: sessionId as string,
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

export default Step1Scratch;
