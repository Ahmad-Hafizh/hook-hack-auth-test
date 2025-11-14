import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import callAppV2Api from '@/config/axios/axiosAppV2';
import React from 'react';

const Step1Scratch = ({ onNext, onSetKeywords }: { onNext: () => void; onSetKeywords: (keywords: any) => void }) => {
  const [loading, setLoading] = React.useState(false);
  const [url, setUrl] = React.useState('');
  const submitStep1 = async () => {
    setLoading(true);
    try {
      const { data } = await callAppV2Api.post('/v1/keywords', {
        text: url,
        provider: 'OpenAI',
        max_keywords: 12,
      });

      onSetKeywords(data.keywords);
    } catch (error) {
      console.error('Error submitting Step 1:', error);
    } finally {
      setLoading(false);
      onNext();
    }
  };
  return (
    <div className="px-10 h-full flex flex-col gap-5 container justify-between">
      <div className=" flex flex-col gap-20">
        <div className="flex flex-col gap-2">
          <p className="text-lg">Step 1</p>
          <h1 className="text-3xl font-bold leading-none">ANALYZE COMPETITORS APPPEAL POINT</h1>
        </div>
        <div className="flex flex-col gap-2">
          <p>ENTER YOUR PRODUCT/SERVICE URL</p>
          <Input type="text" placeholder="https://url/" className="border  px-4 py-2 w-[500px]" value={url} onChange={(e) => setUrl(e.target.value)} />
          {/* <p>
            ※ALREADY KNOW UR COMPETITOR'S URL?? U NEED THREE URL. IF SO,{' '}
            <a href="#" className=" underline">
              CLICK HERE
            </a>
          </p> */}
        </div>
      </div>
      <div className="flex justify-end">
        <Button className="border border-black bg-black text-white px-4 py-2" onClick={submitStep1} disabled={loading}>
          {loading && <Spinner className="w-3 h-3" />} Next
        </Button>
      </div>
    </div>
  );
};

export default Step1Scratch;
