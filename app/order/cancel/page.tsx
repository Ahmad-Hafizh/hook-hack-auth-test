"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const CancelPage = () => {
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();

  useEffect(() => {
    if (countdown === 0) {
      router.push("/dashboard");
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f0f0f] p-4">
      <div className="bg-[#1a1a1a] border border-[#361a20] p-12 rounded-2xl shadow-2xl text-center max-w-2xl w-full">
        <Image
          src="/newlogo.svg"
          alt="HookHack Logo"
          width={180}
          height={60}
          className="mx-auto mb-8"
        />
        <div className="mb-8">
          <div className="w-16 h-16 bg-red-500/20 border-2 border-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            決済がキャンセルされました
          </h1>
          <p className="text-gray-300 text-xl mb-6">
            ご注文はキャンセルされました。お支払いは発生いたしません。
          </p>
        </div>

        <div className="bg-[#0f0f0f] border border-[#361a20] rounded-lg p-6 mb-8">
          <p className="text-gray-400 text-lg">
            {countdown}秒後にダッシュボードへ自動的にリダイレクトします...
          </p>
          <div className="mt-4 w-full bg-[#361a20] rounded-full h-2">
            <div
              className="bg-[#fe2858] h-2 rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${(countdown / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        <button
          onClick={() => router.push("/dashboard")}
          className="px-8 py-3 bg-[#fe2858] text-white font-semibold rounded-lg hover:bg-[#e01e4d] transition-colors focus:outline-none focus:ring-2 focus:ring-[#fe2858] focus:ring-offset-2 focus:ring-offset-[#1a1a1a]"
        >
          ダッシュボードへ戻る
        </button>
      </div>
    </div>
  );
};

export default CancelPage;
