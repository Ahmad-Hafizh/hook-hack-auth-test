"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { UserInput } from "@/components/steps/UserInput";
import { Persona } from "@/components/steps/Persona";
import { Sample } from "@/components/steps/Sample";
import { SceneGenerator } from "./steps/SceneGenerator";
import { StructureGenerator } from "./steps/StructureGenerator";
import { z } from "zod";
import { UserInputTarget } from "./steps/UserInputTarget";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { VideoList } from "@/components/steps/VideoList";
import { SelectComment } from "@/components/steps/SelectComment";
import { SelectHook } from "@/components/steps/SelectHook";
import { GenerateContent } from "@/components/steps/GenerateContent";

export interface FormData {
  searchword: string;
  product_name: string;
  product_category: string;
  functional_value: string;
  emotional_value: string;
  cost: string;
  currency: string;
  marketing_campaign: string;
  age: string;
  gender: string;
  issue: string;
}

const steps = [
  { id: 1, title: "ユーザー情報入力" },
  { id: 2, title: "動画リスト" },
  { id: 3, title: "コメント選択" },
  { id: 4, title: "フック選択" },
  { id: 5, title: "コンテンツ生成" },
];

const productSchema = z.object({
  productName: z.string().min(1, "Product Name is required"),
  productGenre: z.string().min(1, "Product Genre is required"),
  productImage: z
    .any()
    .refine((file) => file instanceof File || file === null, {
      message: "Product Image is required",
    }),
  sellingPoints: z.string().min(1, "Selling Points are required"),
  other: z.string().optional(),
});

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  //DATA FOR PERSONA
  const [userInputData, setUserInputData] = useState<FormData>({
    searchword: "",
    product_name: "",
    product_category: "",
    functional_value: "",
    emotional_value: "",
    cost: "",
    currency: "JPY",
    marketing_campaign: "",
    age: "",
    gender: "",
    issue: "",
  });

  const [videoListData, setVideoListData] = useState<any[]>([]);
  const [structureResult, setStructureResult] = useState<any>(null);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [selectedComment, setSelectedComment] = useState<any>(null);

  const updateFormData = (section: keyof FormData, data: any) => {
    setUserInputData((prev) => ({
      ...prev,
      ...data,
    }));
    console.log("Result: ", data);
  };

  const handlePersonaReady = (result: any) => {
    setVideoListData(result);
  };

  const handleAnalyzeStructure = (video: any) => {
    setStructureResult(video);
    setCurrentStep(5);
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
    console.log(userInputData);
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted:", userInputData);
    // Handle form submission here
  };

  const handleUserInputUpdate = (flatData: any) => {
    setUserInputData((prev) => ({
      ...prev,
      product_name: flatData.product_name,
      product_category: flatData.product_category,
      functional_value: flatData.functional_value,
      emotional_value: flatData.emotional_value,
      cost: flatData.cost,
      currency: flatData.currency,
      marketing_campaign: flatData.marketing_campaign,
      age: flatData.age,
      gender: flatData.gender,
      issue: flatData.issue,
    }));
  };

  // Build the correct client_input structure for the API (flat structure)
  const client_input = userInputData;

  const handleSelectVideo = (video: any) => {
    setSelectedVideo(video);
    setCurrentStep(3);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <UserInput data={userInputData} updateData={setUserInputData} />;
      case 2:
        return (
          <VideoList
            userInputData={userInputData.searchword}
            setVideoListData={setVideoListData}
            onSelectVideo={handleSelectVideo}
          />
        );
      case 3:
        return (
          <SelectComment
            videoListData={videoListData}
            selectedVideo={selectedVideo}
            onSelectComment={(comment) => {
              setSelectedComment(comment);
              setCurrentStep(4);
            }}
          />
        );
      case 4:
        return (
          <SelectHook
            searchword={userInputData.searchword}
            comment={selectedComment}
            onSelectHook={() => setCurrentStep(5)}
          />
        );
      case 5:
        return (
          <StructureGenerator
            video_url={videoListData[0].url}
            client_input={client_input}
          />
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full  min-h-screen flex flex-col justify-center"
    >
      {/* Stepper Header OUTSIDE Card */}
      <div className="p-8 text-black">
        {/* Stepper */}
        <div className="flex items-center justify-center mb-6">
          {steps.map((step, idx) => (
            <div key={step.id} className="flex items-center relative">
              <div className="flex flex-col items-center min-w-[80px]">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-md font-bold transition-all duration-200
                    ${
                      currentStep === step.id
                        ? "bg-[#433D8B] text-white shadow-lg"
                        : currentStep > step.id
                        ? "bg-[#433D8B] text-white"
                        : "bg-[#DDE6ED] text-black"
                    }
                  `}
                >
                  {step.id}
                </div>
                <span className="text-xs mt-2 text-[#17153B] font-medium whitespace-nowrap mx-3">
                  {step.title}
                </span>
              </div>
              {/* Draw the line except after the last step */}
              {idx < steps.length - 1 && (
                <div
                  className={`h-[2px] -mt-5 w-12 mx-2 transition-colors duration-200 ${
                    currentStep > step.id ? "bg-[#433D8B]" : "bg-[#DDE6ED]"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Navigation Buttons OUTSIDE Card */}
      <div className="flex justify-between items-start w-full px-8 mt-4">
        <div>
          {currentStep === 2 ||
          currentStep === 3 ||
          currentStep === 4 ||
          currentStep === 5 ? (
            <Button
              variant="outline"
              onClick={prevStep}
              className="flex items-center gap-2 border-[#2E236C] text-[#2E236C] bg-[#DDE6ED] hover:bg-[#9DB2BF] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              前に戻る
            </Button>
          ) : null}
        </div>
        <div>
          {currentStep === 1 && (
            <Button
              onClick={nextStep}
              className="bg-gradient-to-r from-[#17153B] to-[#2E236C] text-white flex items-center gap-2 transition-all duration-200 transform hover:scale-105"
            >
              次のステップへ
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
          {currentStep === 2 && (
            <Button
              disabled
              onClick={nextStep}
              className="bg-gradient-to-r from-[#17153B] to-[#2E236C] text-white flex items-center gap-2 transition-all duration-200 transform hover:scale-105"
            >
              シーンを生成！
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
      {/* Only wrap steps 1-4 in Card, render StructureGenerator directly for step 5 */}
      {currentStep === 5 ? (
        <StructureGenerator
          video_url={structureResult?.video_url || ""}
          client_input={client_input}
        />
      ) : (
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden p-10 mt-8">
          {/* Form Content */}
          <div className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>
        </Card>
      )}
    </motion.div>
  );
}
