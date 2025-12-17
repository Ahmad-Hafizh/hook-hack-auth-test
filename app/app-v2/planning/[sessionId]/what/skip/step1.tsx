import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import callAppV2Api from '@/config/axios/axiosAppV2';
import React from 'react';
import { IBriefPlanning } from '../hooks/useStepData';

const Step1Skip = ({ onNext, setBriefPlanning }: { onNext: () => void; setBriefPlanning: React.Dispatch<React.SetStateAction<IBriefPlanning>> }) => {
  const [loadingSubmit, setLoadingSubmit] = React.useState(false);
  const [competitorUrls, setCompetitorUrls] = React.useState<string[]>([]);
  const [userUrl, setUserUrl] = React.useState('');

  const submitStep1 = async () => {
    setLoadingSubmit(true);
    try {
      const competitors = competitorUrls.map((url) => {
        return {
          url,
        };
      });
      const { data } = await callAppV2Api.post('/v1/key-message', {
        competitors,
        user_url: userUrl,
        provider: 'openai',
      });

      setBriefPlanning({
        user: data.user,
        competitors: data.competitors,
        suggestion: data.suggestion,
      });
      onNext();
    } catch (error) {
      console.error('Error submitting Step 1:', error);
    } finally {
      setLoadingSubmit(false);
    }
  };
  return (
    <div className="p-10 h-full flex flex-col gap-5 container justify-between">
      <div className=" flex flex-col gap-20">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-xl font-bold">あなたの​プロダクトや​サービスの​LPの​urlを​入力してください​</p>
            <Input type="text" placeholder="https://url/" className="border border-black px-4 py-2 w-[500px]" onChange={(e) => setUserUrl(e.target.value)} />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xl font-bold">競合他社の​プロダクトや​サービスの​LPの​urlを​入力してください​</p>
            <Input
              type="text"
              placeholder="https://url/"
              className="border border-black px-4 py-2 w-[500px]"
              onChange={(e) =>
                setCompetitorUrls((prev) => {
                  const newUrls = [...prev];
                  newUrls[0] = e.target.value;
                  return newUrls;
                })
              }
            />
            <Input
              type="text"
              placeholder="https://url/"
              className="border border-black px-4 py-2 w-[500px]"
              onChange={(e) =>
                setCompetitorUrls((prev) => {
                  const newUrls = [...prev];
                  newUrls[1] = e.target.value;
                  return newUrls;
                })
              }
            />
            <Input
              type="text"
              placeholder="https://url/"
              className="border border-black px-4 py-2 w-[500px]"
              onChange={(e) =>
                setCompetitorUrls((prev) => {
                  const newUrls = [...prev];
                  newUrls[2] = e.target.value;
                  return newUrls;
                })
              }
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button onClick={submitStep1} disabled={loadingSubmit} className="border-2 border-rose-600 bg-rose-600  hover:bg-rose-500 text-white px-4 py-2">
          {loadingSubmit && <Spinner className="w-4 h-4" />}
          次に​進む
        </Button>
      </div>
    </div>
  );
};

export default Step1Skip;
