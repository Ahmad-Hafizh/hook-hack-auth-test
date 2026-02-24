"use client";
import { MultiStepForm } from "@/components/hookhack/multi-step-form";
import { useState } from "react";
import PassedForm from "@/components/passedform";

export default function Home() {
  // const [passed, setPassed] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 flex items-center justify-center py-8 px-2 sm:px-6 md:px-12 lg:px-24">
      <div className="w-full max-w-5xl mx-auto">
        <MultiStepForm />
        {/* {passed ? (
          <MultiStepForm />
        ) : (
          <div className="flex flex-col gap-5 justify-center items-center">
            <h1 className="text-2xl font-bold">Please enter password</h1>
            <PassedForm onPass={setPassed} />
            </div>
        )} */}
      </div>
    </div>
  );
}
