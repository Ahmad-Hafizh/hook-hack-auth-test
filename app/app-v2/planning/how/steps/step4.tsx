import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { Music, PauseCircle, PlayCircle } from 'lucide-react';
import { submitStep4 } from '../hooks/useFetchApi';

const Step4 = ({ onNext }: { onNext: () => void }) => {
  const [loading, setLoading] = React.useState(false);
  const [audioPlaying, setAudioPlaying] = React.useState<string | null>(null);

  const playAudio = (audioId: string) => {
    if (audioPlaying === audioId) {
      setAudioPlaying(null); // Stop playing if the same audio is clicked
    } else {
      setAudioPlaying(audioId); // Play the selected audio
    }
  };

  return (
    <div className="px-10 h-full flex flex-col gap-5 container justify-between">
      <div className="flex flex-col ">
        <h2 className="text-2xl font-semibold">Select your preferred distribution channels</h2>
        <p> Select 8 element, multiple checks per element will lead to more patterns being tested</p>
      </div>

      <div className="grid grid-cols-2 gap-10 w-full h-full ">
        <Card className="flex flex-col gap-4 ">
          <CardHeader className="p-4 justify-between flex flex-row items-center">
            <CardTitle className="font-bold text-lg">Brand Logo</CardTitle>
            <Button variant={'outline'} className="!mt-0">
              Upload
            </Button>
          </CardHeader>
          <CardContent className="p-10 pt-0 h-full">
            <div className="relative flex items-center w-full h-full">
              <Image src="/planning_test_image.jpg" alt={`brand logo image`} fill className="inline-block mr-2 rounded-lg absolute object-cover" />
            </div>
          </CardContent>
        </Card>
        <Card className="flex flex-col gap-4">
          <CardHeader className="p-4">
            <CardTitle className="font-bold text-lg">Background Color</CardTitle>
          </CardHeader>
          <CardContent className="px-4">
            <RadioGroup defaultValue="option-one" className="gap-4">
              {Array.from({ length: 10 }).map((_, index) => (
                <div className="flex items-center space-x-2 " key={index}>
                  <RadioGroupItem value={`hook-option-${index + 1}`} id={`hook-option-${index + 1}`} />
                  <Label htmlFor={`hook-option-${index + 1}`} className="text-base flex flex-row items-center gap-2">
                    <div className={`content-[''] bg-[color] w-5 h-5 border`}></div>
                    <p>Background Color option {index + 1}</p>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
        <Card className="flex flex-col gap-4">
          <CardHeader className="p-4">
            <CardTitle className="font-bold text-lg">Background Music</CardTitle>
          </CardHeader>
          <CardContent className="px-4">
            <RadioGroup defaultValue="option-one" className="gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div className="flex items-center space-x-2 " key={index}>
                  <RadioGroupItem value={`hook-option-${index + 1}`} id={`hook-option-${index + 1}`} />
                  <Label htmlFor={`hook-option-${index + 1}`} className="text-base flex flex-row items-center px-2 py-1 bg-gray-200 w-full rounded-md">
                    <Button className="p-0 m-0 hover:bg-transparent" variant={'ghost'} onClick={() => playAudio(`bgm-option-${index + 1}`)}>
                      {audioPlaying === `bgm-option-${index + 1}` ? <PauseCircle className="inline-block mr-2 w-5 h-5 " /> : <PlayCircle className="inline-block mr-2 w-5 h-5" />}
                    </Button>
                    BGM option {index + 1}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <Card className="flex flex-col gap-4">
          <CardHeader className="p-4">
            <CardTitle className="font-bold text-lg">Font</CardTitle>
          </CardHeader>
          <CardContent className="px-4">
            <RadioGroup defaultValue="option-one" className="gap-4">
              {Array.from({ length: 2 }).map((_, index) => (
                <div className="flex items-center space-x-2 " key={index}>
                  <RadioGroupItem value={`hook-option-${index + 1}`} id={`hook-option-${index + 1}`} />
                  <Label htmlFor={`hook-option-${index + 1}`} className="text-base">
                    Font option {index + 1}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={() => submitStep4({ setLoading, onNext })} disabled={loading}>
          {loading && <Spinner />}
          Next
        </Button>
      </div>
    </div>
  );
};

export default Step4;
