'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { RadioGroupItem } from '@/components/ui/radio-group';
import React, { useState } from 'react';

const KeyMessageCard = ({
  key_message,
  strong_points,
  title,
  type,
  setKeyMessage,
  setStrongPoints,
}: {
  key_message: string;
  strong_points: string[];
  title: string;
  type: string;
  setKeyMessage?: (message: string) => void;
  setStrongPoints?: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <Card className="w-full min-w-[800px] relative h-full">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 w-full items-start justify-center">
        {type === 'your-company' || type === 'ai-suggestion' ? (
          <>
            <div className="flex flex-col gap-2 w-full items-start justify-center">
              {type === 'your-company' ? (
                <p>
                  <strong> キーメッセージ</strong>
                  ：動画の​Hook​（冒頭の​つかみ）に​活用します
                </p>
              ) : (
                <p className="opacity-0">asas</p>
              )}
              <Input
                className="w-full py-3 px-4 text-xl border border-black h-fit focus-visible:ring-0 disabled:opacity-100"
                defaultValue={key_message || undefined}
                placeholder="Key Messages"
                onChange={(e) => setKeyMessage && setKeyMessage(e.target.value)}
                disabled={!isEdit}
              />
            </div>
            <div className="flex flex-col gap-2 w-full items-start justify-center">
              {type === 'your-company' ? (
                <p>
                  <strong>３つの​強み</strong> ：動画の​Body​（本編）​部分の​構成に​活用します
                </p>
              ) : (
                <p className="opacity-0">asas</p>
              )}
              <div className="w-full">
                <Input
                  className="w-full py-3 px-4 text-lg border border-black h-fit focus-visible:ring-0 mb-2 disabled:opacity-100"
                  defaultValue={strong_points[0] || undefined}
                  placeholder="Strong point 1"
                  onChange={(e) => setStrongPoints && setStrongPoints((prev) => [...prev.slice(0, 0), e.target.value, ...prev.slice(1)])}
                  disabled={!isEdit}
                />
                <Input
                  className="w-full py-3 px-4 text-lg border border-black h-fit focus-visible:ring-0 mb-2 disabled:opacity-100"
                  defaultValue={strong_points[1] || undefined}
                  placeholder="Strong point 2"
                  onChange={(e) => setStrongPoints && setStrongPoints((prev) => [...prev.slice(0, 1), e.target.value, ...prev.slice(2)])}
                  disabled={!isEdit}
                />
                <Input
                  className="w-full py-3 px-4 text-lg border border-black h-fit focus-visible:ring-0 disabled:opacity-100"
                  defaultValue={strong_points[2] || undefined}
                  placeholder="Strong point 3"
                  onChange={(e) => setStrongPoints && setStrongPoints((prev) => [...prev.slice(0, 2), e.target.value])}
                  disabled={!isEdit}
                />
              </div>
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
          <div className="w-full h-full flex items-end justify-center">
            <div className="flex gap-4 w-fit items-center justify-center ">
              <RadioGroupItem value={type} id={type} className="w-5 h-5 border-2 border-rose-600 rounded-full data-[state=checked]:text-cyan-300  data-[state=checked]:border-cyan-500" fill="fill-cyan-300" />
              <Button onClick={() => setIsEdit(!isEdit)} variant={'outline'}>
                {isEdit ? 'Save' : 'Edit'}
              </Button>
            </div>
          </div>
        </CardFooter>
      ) : null}
    </Card>
  );
};

export default KeyMessageCard;
