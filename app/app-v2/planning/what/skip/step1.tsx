import { Input } from '@/components/ui/input';
import callAppV2Api from '@/config/axios/axiosAppV2';
import React from 'react';

const Step1Skip = ({ onNext, onSetSuggestions, onSetCompetitorStrategy }: { onNext: () => void; onSetSuggestions: (suggestions: any) => void; onSetCompetitorStrategy: (strategy: any) => void }) => {
  const [loadingSubmit, setLoadingSubmit] = React.useState(false);
  const [competitorUrls, setCompetitorUrls] = React.useState<string[]>([]);

  const submitStep1 = async () => {
    setLoadingSubmit(true);
    try {
      const { data } = await callAppV2Api.post('/v1/key-message', {
        competitors: {
          url: competitorUrls,
          title: '',
          meta_description: '',
          hero_text: {
            headline: 'string',
            subhead: 'string',
            cta: 'string',
          },
        },
        provider: 'openai',
        language: 'en',
        brand_hint: 'string',
        audience: 'string',
        tone: 'professional',
      });

      console.log('Step 1 submitted successfully:', data);
      onSetSuggestions(data.suggestion);
      onSetCompetitorStrategy(data.competitors);
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
        <div className="flex flex-col gap-2">
          <p className="text-lg">Step 1</p>
          <h1 className="text-3xl font-bold leading-none">ANALYZE COMPETITORS APPPEAL POINT</h1>
        </div>
        <div className="flex flex-col gap-6">
          {/* <div className="flex flex-col gap-2">
            <p>ENTER YOUR PRODUCT/SERVICE URL</p>
            <input type="text" placeholder="https://url/" className="border border-black px-4 py-2 w-[500px]" />
          </div> */}
          <div className="flex flex-col gap-2">
            <p>ENTER YOUR COMPETITOR PRODUCT/SERVICE URL</p>
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
        <button className="border border-black bg-black text-white px-4 py-2" onClick={submitStep1} disabled={loadingSubmit}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Step1Skip;
