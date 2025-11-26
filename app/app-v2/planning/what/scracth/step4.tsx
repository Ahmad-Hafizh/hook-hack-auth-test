'use client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';
import KeyMessageCard from '../components/keyMessageCard';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

const Step4 = ({ suggestions, competitorStrategy }: { suggestions: any; competitorStrategy: any }) => {
  const router = useRouter();
  return (
    <div className="px-10 h-full flex flex-col gap-10 container justify-between">
      <div className="flex flex-col gap-8 w-full items-center justify-start">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl">Your Company</CardTitle>
          </CardHeader>
          <CardContent className="gap-4 flex flex-col">
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
          </CardContent>
          <CardFooter>
            <div className="flex gap-4 w-full items-center justify-center ">
              <input type="checkbox" />
              <Button>Edit This</Button>
            </div>
          </CardFooter>
        </Card>

        <KeyMessageCard key_message={suggestions.key_message} strong_points={suggestions.strong_points} title="AI Suggestion" />
        {competitorStrategy.map((competitor: any, index: number) => (
          <KeyMessageCard key_message={competitor.key_message} strong_points={competitor.strong_points} title="Competitor" key={index} />
        ))}
      </div>
      <Button type="button" onClick={() => router.push('/app-v2/planning/how')}>
        Next
      </Button>
    </div>
  );
};

export default Step4;
