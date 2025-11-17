import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import callAppV2Api from '@/config/axios/axiosAppV2';
import React from 'react';

const Step2Scratch = ({ onNext, keywords, onSetWebsites }: { onNext: () => void; keywords: any[]; onSetWebsites: (websites: any[]) => void }) => {
  const [loading, setLoading] = React.useState(false);
  const [selectedKeywords, setSelectedKeywords] = React.useState<string[]>([]);

  const submitStep2 = async () => {
    setLoading(true);
    try {
      const { data } = await callAppV2Api.post('/v1/websites', {
        keywords: selectedKeywords,
        limit: 5,
      });

      console.log('Step 2 submitted successfully:', data);
      onSetWebsites(data.websites);
      onNext();
    } catch (error) {
      console.error('Error submitting Step 2:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-10 h-full flex flex-col gap-5 container justify-between">
      <div className=" flex flex-col gap-20">
        <div className="flex flex-col gap-2">
          <p className="text-lg">Step 2</p>
          <h1 className="text-3xl font-bold leading-none"> Choose Keyword</h1>
        </div>
        <ToggleGroup type="multiple" variant={'outline'} className="justify-start flex-wrap gap-4 w-1/2" onValueChange={(value) => setSelectedKeywords(value)}>
          {keywords.map((keyword, index) => (
            <ToggleGroupItem
              key={index}
              value={keyword.term}
              className="data-[state=on]:font-bold data-[state=on]:border-rose-600 rounded-full px-4 py-2 border-2 border-gray-300 data-[state=on]:text-white data-[state=on]:bg-rose-500 hover:bg-cyan-100 hover:font-semibold hover:border-cyan-300"
            >
              {keyword.term}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <div className="flex justify-end">
        <Button className="border border-black bg-black text-white px-4 py-2" onClick={submitStep2} disabled={loading}>
          {loading && <Spinner className="w-3 h-3" />} Next
        </Button>
      </div>
    </div>
  );
};

export default Step2Scratch;
