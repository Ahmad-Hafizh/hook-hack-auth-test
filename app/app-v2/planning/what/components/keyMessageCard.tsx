import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';

const KeyMessageCard = ({ key_message, strong_points, title, type }: { key_message: string; strong_points: string[]; title: string; type: string }) => {
  return (
    <Card className="w-full min-w-[800px]">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 w-full items-start justify-center">
        {type === 'your-company' ? (
          <>
            <div className="flex flex-col gap-2 w-full items-start justify-center">
              <p>
                <strong>Key message</strong> - This will help with making up Hooks for your video
              </p>
              <Textarea className="w-full py-4 px-6 text-lg border border-black h-fit focus-visible:ring-0" defaultValue={'This area, u would be able to edit'} />
            </div>
            <div className="flex flex-col gap-2 w-full items-start justify-center">
              <p>
                <strong>3 strong points</strong> - This will help with making up the Body part for your video
              </p>
              <Textarea className="w-full py-4 px-6 text-lg border border-black h-fit focus-visible:ring-0" defaultValue={'This area, u would be able to edit'} />
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-2 w-full items-start justify-center">
              <div className="opacity-0">
                <p>''</p>
              </div>
              <div className="py-4 px-6 border border-black w-full h-fit flex flex-col items-start justify-center rounded-lg">
                <p className="text-lg font-semibold">{key_message}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full items-start justify-center">
              <div className="opacity-0">
                <p> </p>
              </div>
              <div className="py-4 px-6 border border-black w-full h-fit flex flex-col items-start justify-center rounded-lg ">
                <ol className="list-decimal list-inside text-lg font-medium">
                  {strong_points.map((point: string, index: number) => (
                    <li key={index}>{point}</li>
                  ))}
                </ol>
              </div>
            </div>
          </>
        )}
      </CardContent>
      {type === 'ai-suggestion' || type === 'your-company' ? (
        <CardFooter>
          <div className="flex gap-4 w-full items-center justify-center ">
            <RadioGroupItem value={type} id={type} className="w-5 h-5 border-2 border-black rounded-full checked:bg-cyan-500" />
            <Button>Edit This</Button>
          </div>
        </CardFooter>
      ) : null}
    </Card>
  );
};

export default KeyMessageCard;
