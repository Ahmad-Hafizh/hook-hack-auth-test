import { Button } from '@/components/ui/button';
import React from 'react';

const KeyMessageCard = ({ key_message, strong_points, title }: { key_message: string; strong_points: string[]; title: string }) => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center pb-4 w-[700px] ">
      <h2 className="text-3xl mb-4 font-bold">{title}</h2>
      <div className="flex flex-col gap-2 w-full items-start justify-center">
        <p className="opacity-0">..</p>
        <div className="py-4 px-6 border border-black w-full h-[175px] flex flex-col items-start justify-center rounded-lg">
          <p className="text-2xl font-semibold">{key_message}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full items-start justify-center">
        <p className="opacity-0">..</p>
        <div className="py-4 px-6 border border-black w-full h-[400px] flex flex-col items-start justify-center rounded-lg ">
          <ol className="list-decimal list-inside text-xl font-medium">
            {strong_points.map((point: string, index: number) => (
              <li key={index}>{point}</li>
            ))}
          </ol>
        </div>
      </div>
      <div className="flex gap-4 w-full items-center justify-center py-5">
        <input type="checkbox" />
        <Button>Edit This</Button>
      </div>
    </div>
  );
};

export default KeyMessageCard;
