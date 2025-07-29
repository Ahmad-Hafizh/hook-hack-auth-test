"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const SuccessPage = () => {
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F3F4F6] p-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md w-full">
        <Image
          src="/newlogo.svg"
          alt="HookHack Logo"
          width={150}
          height={50}
          className="mx-auto mb-6"
        />
        <h1 className="text-3xl font-bold text-[#433D8B] mb-4">
          ありがとうございました！
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          決済が正常に完了しました。サービスをお楽しみください。
        </p>
        <div className="mt-8">
          <p className="text-gray-500">
            {countdown}秒後にダッシュボードへ自動的にリダイレクトします...
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
