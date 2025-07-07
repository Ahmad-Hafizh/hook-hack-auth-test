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
import { useWatch } from "react-hook-form";
import { useAuth } from "@clerk/nextjs";

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
  { id: 2, title: "動画選択" },
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
  const { userId } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [projectId, setProjectId] = useState<string | null>(null);

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
  const [commentData, setCommentData] = useState<any>(null);
  const [selectedHook, setSelectedHook] = useState<any>(null);
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

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
    // Only allow going back from step 3 onwards (not from step 2 to step 1)
    if (currentStep > 2) {
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

  const handleSelectHook = (hook: any) => {
    setSelectedHook(hook);
    setCurrentStep(5);
  };

  const handleContentGenerated = async (content: any) => {
    console.log("🔄 handleContentGenerated called with:", content);
    setGeneratedContent(content);
    console.log("📝 About to save content to database...");
    await updateProjectInDatabase("content", content);
    console.log("✅ Content saved to database successfully");
  };

  const saveUserInputToDatabase = async (inputData?: any) => {
    const dataToSave = inputData || userInputData;
    console.log("🚩 userInputData before save:", dataToSave);
    if (!userId) {
      console.error("❌ No user ID available");
      return;
    }

    console.log("📝 User ID:", userId);
    setIsSaving(true);
    try {
      const projectData = {
        userinput: JSON.stringify(dataToSave),
      };
      console.log("🚩 Sending to API (userinput):", projectData.userinput);

      console.log("📤 Creating project with data:", projectData);

      const response = await fetch("/api/project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      console.log("📥 Project creation response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Project creation failed:", errorText);
        throw new Error("Failed to save user input");
      }

      const result = await response.json();
      console.log("✅ Project created successfully:", result);
      console.log("📝 Setting project ID to:", result.project.id);
      setProjectId(result.project.id);
    } catch (error) {
      console.error("❌ Error saving user input:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const updateProjectInDatabase = async (field: string, data: any) => {
    console.log(
      `🔄 updateProjectInDatabase called with field: ${field}, data:`,
      data
    );
    console.log(`📝 Current projectId: ${projectId}`);
    console.log(`📝 Field type: ${typeof field}`);
    console.log(`📝 Data type: ${typeof data}`);
    console.log(
      `📝 Data length: ${Array.isArray(data) ? data.length : "not array"}`
    );

    if (!projectId) {
      console.error("❌ No project ID available - cannot save to database");

      return;
    }

    console.log(`📝 Project ID: ${projectId}`);
    setIsSaving(true);
    try {
      const updateData: any = {
        [field]: JSON.stringify(data),
      };

      console.log(`📤 Sending PATCH request to /api/project/${projectId}`);
      console.log(`📤 Update data:`, updateData);
      console.log(`📤 JSON.stringify(data):`, JSON.stringify(data));

      const response = await fetch(`/api/project/${projectId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      console.log(`📥 Response status: ${response.status}`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ Response not ok: ${errorText}`);
        throw new Error(`Failed to update ${field}`);
      }

      const result = await response.json();
      console.log(`✅ ${field} updated successfully:`, result);
    } catch (error) {
      console.error(`❌ Error updating ${field}:`, error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleUserInputComplete = async (values: any) => {
    setUserInputData(values);
    console.log("🚩 userInputData before save (from values):", values);
    await saveUserInputToDatabase(values);
    setCurrentStep(2);
  };

  const handleCommentSelected = async (comment: any, fullCommentData: any) => {
    setSelectedComment(comment);
    setCommentData(fullCommentData);
    await updateProjectInDatabase("comment", fullCommentData.comments);
    setCurrentStep(4);
  };

  const handleHookSelected = async (hook: any) => {
    setSelectedHook(hook);
    await updateProjectInDatabase("hook", hook);
    setCurrentStep(5);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <UserInput
            data={userInputData}
            updateData={setUserInputData}
            onNextStep={handleUserInputComplete}
          />
        );
      case 2:
        return (
          <VideoList
            userInputData={userInputData}
            setVideoListData={setVideoListData}
            onSelectVideo={handleSelectVideo}
          />
        );
      case 3:
        return (
          <SelectComment
            videoListData={videoListData}
            selectedVideo={selectedVideo}
            onSelectComment={(comment, fullCommentData) => {
              handleCommentSelected(comment, fullCommentData);
            }}
          />
        );
      case 4:
        return (
          <SelectHook
            searchword={userInputData.searchword}
            comment={selectedComment}
            onSelectHook={handleHookSelected}
          />
        );
      case 5:
        return (
          <StructureGenerator
            video_url={videoListData[0].url}
            client_input={client_input}
            onContentGenerated={handleContentGenerated}
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
      className="w-full min-h-screen flex flex-col justify-center "
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
                        ? "bg-[#fe2858] text-white shadow-lg"
                        : currentStep > step.id
                          ? "bg-[#b72645] text-white"
                          : "bg-[#f8d3db] text-[#b72645]"
                    }
                  `}
                >
                  {step.id}
                </div>
                <span className="text-xs mt-2 text-[#fe2858] font-medium whitespace-nowrap mx-3">
                  {step.title}
                </span>
              </div>
              {/* Draw the line except after the last step */}
              {idx < steps.length - 1 && (
                <div
                  className={`h-[2px] -mt-5 w-12 mx-2 transition-colors duration-200 ${
                    currentStep > step.id ? "bg-[#fe2858]" : "bg-[#ffa3a3]"
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
          {currentStep === 3 || currentStep === 4 || currentStep === 5 ? (
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={isSaving}
              className="flex items-center gap-2 bg-[#2af0ea] text-black hover:bg-[#288784] hover:text-white transition-all duration-300 "
            >
              <ChevronLeft className="w-4 h-4" />
              前に戻る
            </Button>
          ) : null}
        </div>
        <div>
          {currentStep === 1 && (
            <Button
              type="submit"
              form="user-input-form"
              disabled={isSaving}
              className="bg-[#2af0ea] text-black hover:bg-[#288784] hover:text-white transition-all duration-300 "
            >
              {isSaving ? "保存中..." : "次のステップへ"}
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
          {currentStep === 2 && (
            <Button
              disabled
              onClick={nextStep}
              className="bg-[#2af0ea] text-black hover:bg-[#288784] hover:text-white transition-all duration-300 "
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
          onContentGenerated={handleContentGenerated}
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
