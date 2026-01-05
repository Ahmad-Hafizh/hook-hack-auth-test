"use client";
import React from "react";
import callApi from "@/config/axios/axios";
import { useRouter } from "next/navigation";
import { getSessionId } from "./hooks/fetchAPI";
import { CompetitorResearchStep, RadioCard } from "@/components/lp-analyzer";
import { Link, Search } from "lucide-react";

const SwitchPage = () => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  return (
    <>
      <div className="flex-1 w-full max-w-6xl mx-auto px-4 py-12 md:px-8 flex flex-col justify-center">
        <div className="mb-10 ">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 text-text-main">
            競合他社調査の開始
          </h1>
        </div>
        <div className="w-full">
          <div className="flex flex-col gap-8">
            {/* card */}
            <div className="rounded-xl border sm:p-4 md:p8 lg:p-12">
              <div className="text-center mb-10">
                <h3 className="text-lg md:text-xl font-bold text-text-main mb-2">
                  以下どちらかを選択してください
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 h-full">
                <RadioCard
                  name="research_method"
                  value="search"
                  icon={<Search />}
                  title="競合他社の調査を始める"
                  description="キーワードや業界から、リサーチすべき競合LPを探します。"
                />

                <RadioCard
                  name="research_method"
                  value="url"
                  icon={<Link />}
                  title="調査したい競合3社のLPのURLをすでにご存じの方"
                  description="直接URLを入力して、すぐに分析を開始します。"
                />
              </div>
            </div>
          </div>
        </div>

        {/* old ui */}
        <div className="flex flex-col gap-4 items-center text-lg">
          <p>以下どちらかを選択してください</p>
          <div className="flex gap-10">
            <div
              className={`rounded-xl text-center flex flex-col justify-center items-center w-[200px] h-[200px] hover:border-black hover:shadow hover:font-bold transition-all border-gray-300 border-2 ${loading ? "pointer-events-none opacity-50" : "cursor-pointer"}`}
              onClick={() => {
                getSessionId({ page: "what_scratch", setLoading, router });
              }}
            >
              <p className="w-8/12">競合他社の​調査を​始める​</p>
            </div>
            <div
              className={`rounded-xl text-center flex flex-col justify-center items-center w-[200px] h-[200px] hover:border-black hover:shadow hover:font-bold transition-all border-gray-300 border-2 leading-normal ${loading ? "pointer-events-none opacity-50" : "cursor-pointer"}`}
              onClick={() => {
                getSessionId({ page: "what_skip", setLoading, router });
              }}
            >
              <p className="w-8/12">
                調査したい​競合3社の​LPの​URLを​すでに​ご存じの​方は​こちら
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SwitchPage;
