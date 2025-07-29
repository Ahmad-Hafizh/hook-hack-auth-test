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
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F3F4F6] p-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md w-full">
        <Image
          src="/newlogo.svg"
          alt="HookHack Logo"
          width={150}
          height={50}
          className="mx-auto mb-6"
        />
        <h1 className="text-3xl font-bold text-[#D32F2F] mb-4">
          決済がキャンセルされました
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          ご注文はキャンセルされました。お支払いは発生いたしません。
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

export default CancelPage;
