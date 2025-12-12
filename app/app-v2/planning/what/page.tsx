'use client';
import React from 'react';
import callApi from '@/config/axios/axios';
import { useRouter } from 'next/navigation';
import { getSessionId } from '../hooks/fetchAPI';

const SwitchPage = () => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  return (
    <div className="flex w-full flex-col justify-center items-center h-full gap-20">
      <div className="flex flex-col justify-center text-center items-center gap-4">
        <h1 className="text-3xl font-bold">競合他社の​LPを​参考にしながら、​動画の​訴求内容を​決めて​いきましょう​</h1>
      </div>
      <div className="flex flex-col gap-4 items-center text-lg">
        <p>以下​どちらかを​選択してください​</p>
        <div className="flex gap-10">
          <div
            className={`rounded-xl text-center flex flex-col justify-center items-center w-[200px] h-[200px] hover:border-black hover:shadow hover:font-bold transition-all border-gray-300 border-2 ${loading ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
            onClick={() => {
              getSessionId({ page: 'what_scratch', setLoading, router });
            }}
          >
            <p className="w-8/12">競合他社の​調査を​始める​</p>
          </div>
          <div
            className={`rounded-xl text-center flex flex-col justify-center items-center w-[200px] h-[200px] hover:border-black hover:shadow hover:font-bold transition-all border-gray-300 border-2 leading-normal ${loading ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
            onClick={() => {
              getSessionId({ page: 'what_skip', setLoading, router });
            }}
          >
            <p className="w-8/12">調査したい​競合3社の​LPの​URLを​すでに​ご存じの​方は​こちら</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwitchPage;
