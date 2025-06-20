"use client";
import { MultiStepForm } from "@/components/multi-step-form";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#c2a3ff] via-white to-[#8437d1] flex items-center justify-center py-8 px-2 sm:px-6 md:px-12 lg:px-24">
      <div className="w-full max-w-5xl mx-auto my-14">
        <MultiStepForm />
      </div>
    </div>
  );
}
