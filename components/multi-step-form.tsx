"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { UserInput } from "@/components/steps/UserInput";
import { SelectComment } from "@/components/steps/SelectComment";
import { SelectHook } from "@/components/steps/SelectHook";
import { StructureGenerator } from "./steps/StructureGenerator";
import { useAuth } from "@clerk/nextjs";
import callApi from "@/config/axios/axios";
import ReactDOM from "react-dom";
import { Switch as ProductionSwitch } from "@/components/steps/Switch";

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
  { id: 2, title: "コメント選択" },
  { id: 3, title: "フック選択" },
  { id: 4, title: "プロダクション/目的選択" },
  { id: 5, title: "コンテンツ生成" },
];

// Mock data fallback
const mockCommentListData = [
  {
    comments: {
      label: true,
      text: "イソトレチノイ飲んたら1発でニキビできなくなる",
      like: 104,
      name: "／10",
    },
    video_data: {
      likes: 149600,
      comments: 1610,
      saves: 6829,
      shares: 2981,
      summary: "",
      storage: "",
    },
  },
  {
    comments: {
      label: true,
      text: "どっちも使ったことあるけど白くなるのは伸び悪いし日焼け効果高いのはアリーだから間違えないで",
      like: 3307,
      name: "すいれん 柴石",
    },
    video_data: {
      likes: 120000,
      comments: 800,
      saves: 3000,
      shares: 1200,
      summary: "",
      storage: "",
    },
  },
];

export function MultiStepForm() {
  const { userId } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [projectId, setProjectId] = useState<string | null>(null);
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
  const [commentListData, setCommentListData] = useState<any[]>([]);
  const [selectedComment, setSelectedComment] = useState<any>(null);
  const [selectedHook, setSelectedHook] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVideo, setModalVideo] = useState<null | any>(null);
  const [switchState, setSwitchState] = useState({
    production: "Inside",
    purpose: "Conversion",
  });

  // ----------------------
  // Step 1: User Input
  // ----------------------
  const handleUserInputComplete = async (values: any) => {
    setUserInputData(values);
    await saveUserInputToDatabase(values);
    await fetchCommentsForInput(values);
    setCurrentStep(2);
  };

  // ----------------------
  // Step 2: Comment Selection
  // ----------------------
  const handleCommentSelected = async (comment: any) => {
    setSelectedComment(comment);
    await updateProjectInDatabase("comment", comment.comments);
    setCurrentStep(3);
  };

  // ----------------------
  // Step 3: Hook Selection
  // ----------------------
  const handleHookSelected = async (hook: any) => {
    setSelectedHook(hook);
    await updateProjectInDatabase("hook", hook);
    setCurrentStep(4);
  };

  // ----------------------
  // Step 4: Production/Purpose Switch
  // ----------------------
  const handleSwitchChange = (values: {
    production: "Inside" | "Outside";
    purpose: "Impression" | "Conversion";
  }) => {
    setSwitchState(values);
  };

  // ----------------------
  // Step 2: Comment Selection (Play Video Modal)
  // ----------------------
  const handlePlayVideo = (row: any) => {
    setModalVideo(row);
  };
  const handleCloseModal = () => setModalVideo(null);

  // ----------------------
  // Step Rendering
  // ----------------------
  const renderStep = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[300px]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#fe2858] mb-6"></div>
          <div className="text-lg font-semibold text-[#fe2858]">検索中...</div>
        </div>
      );
    }
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
          <SelectComment
            data={commentListData}
            onSelectComment={handleCommentSelected}
            onPlayVideo={handlePlayVideo}
            searchword={userInputData.searchword}
          />
        );
      case 3:
        return (
          <SelectHook
            selectedRow={selectedComment}
            onSelectHook={handleHookSelected}
          />
        );
      case 4:
        return (
          <ProductionSwitch
            commentInfo={selectedComment}
            value={{
              production: switchState.production as "Inside" | "Outside",
              purpose: switchState.purpose as "Impression" | "Conversion",
            }}
            onChange={handleSwitchChange}
          />
        );
      case 5:
        return (
          <StructureGenerator
            video_url={""}
            client_input={userInputData}
            selectedHook={selectedHook}
            onContentGenerated={() => {}}
          />
        );
      default:
        return null;
    }
  };

  // ----------------------
  // Utility/API/DB Functions
  // ----------------------
  // Fetch comments for input (Step 2)
  const fetchCommentsForInput = async (input: FormData) => {
    setIsLoading(true);
    try {
      console.log("[API 1] Calling /api/v1/scrape/list with:", {
        searchword: input.searchword,
        amount: 10,
      });
      // 1. Fetch video list
      const response = await callApi.post("/api/v1/scrape/list", {
        searchword: input.searchword,
        amount: 10,
      });
      console.log("[API 1] Response:", response.data);
      const videoList = response.data.videolist || [];

      // 2. For each video, fetch comments in parallel from the new endpoint
      const allArrays = await Promise.all(
        videoList.map(async (video: any, idx: number) => {
          console.log(
            `[API 2] Calling /api/v1/scrape/indivisual for video #${idx + 1}:`,
            video.url
          );
          const indivRes = await callApi.post("/api/v1/scrape/indivisual", {
            url: video.url,
          });
          console.log(`[API 2] Response for video #${idx + 1}:`, indivRes.data);
          // Each call returns an array of { comments, video_data }
          // If indivRes.data.data is an array, return it, else return []
          return indivRes.data.data || [];
        })
      );

      // 3. Flatten all arrays into one
      const flatResults = allArrays.flat();
      setCommentListData(
        flatResults.length > 0 ? flatResults : mockCommentListData
      );
    } catch (error) {
      setCommentListData(mockCommentListData);
    } finally {
      setIsLoading(false);
    }
  };

  // Save user input to DB (Step 1)
  const saveUserInputToDatabase = async (inputData?: any) => {
    const dataToSave = inputData || userInputData;
    if (!userId) return;
    setIsSaving(true);
    try {
      const projectData = {
        userinput: JSON.stringify(dataToSave),
      };
      const response = await fetch("/api/project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });
      if (!response.ok) throw new Error("Failed to save user input");
      const result = await response.json();
      setProjectId(result.project.id);
    } catch (error) {
      // handle error
    } finally {
      setIsSaving(false);
    }
  };

  // Update project in DB (Step 2/3)
  const updateProjectInDatabase = async (field: string, data: any) => {
    if (!projectId) return;
    setIsSaving(true);
    try {
      const updateData: any = {
        [field]: JSON.stringify(data),
      };
      const response = await fetch(`/api/project/${projectId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });
      if (!response.ok) throw new Error(`Failed to update ${field}`);
    } catch (error) {
      // handle error
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
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
            {currentStep > 1 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
                disabled={isSaving}
                className="flex items-center gap-2 bg-[#2af0ea] text-black hover:bg-[#288784] hover:text-white transition-all duration-300 "
              >
                <ChevronLeft className="w-4 h-4" />
                前に戻る
              </Button>
            )}
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
            {currentStep === 4 && (
              <Button
                onClick={() => setCurrentStep(5)}
                className="bg-[#2af0ea] text-black hover:bg-[#288784] hover:text-white transition-all duration-300 "
              >
                次のステップへ
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
        {/* Only wrap steps 1-4 in Card, render StructureGenerator directly for step 5 */}
        {currentStep === 5 ? (
          <StructureGenerator
            video_url={""}
            client_input={userInputData}
            selectedHook={selectedHook}
            onContentGenerated={() => {}}
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
      {typeof window !== "undefined" &&
        modalVideo &&
        ReactDOM.createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={handleCloseModal}
          >
            <div
              className="bg-white rounded-lg shadow-lg py-5 px-10 relative flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
                onClick={handleCloseModal}
              >
                ×
              </button>
              {modalVideo.video_data.storage ? (
                <div className="aspect-[9/16] w-72 mt-6">
                  <video
                    src={modalVideo.video_data.storage}
                    controls
                    autoPlay
                    className="w-full h-full object-contain rounded"
                  />
                </div>
              ) : (
                <div className="aspect-[9/16] w-72 flex items-center justify-center bg-gray-200 rounded mt-6 mb-4 text-gray-500">
                  No video available
                </div>
              )}
              <div className="mb-2 w-full px-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex flex-col items-center">
                    <span className="text-gray-500">いいね数</span>
                    <span className="font-semibold">
                      {modalVideo.video_data.likes?.toLocaleString() ?? "-"}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-gray-500">コメント数</span>
                    <span className="font-semibold">
                      {modalVideo.video_data.comments?.toLocaleString() ?? "-"}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-gray-500">シェア数</span>
                    <span className="font-semibold">
                      {modalVideo.video_data.shares?.toLocaleString() ?? "-"}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-gray-500">セーブ数</span>
                    <span className="font-semibold">
                      {modalVideo.video_data.saves?.toLocaleString() ?? "-"}
                    </span>
                  </div>
                </div>
              </div>
              {modalVideo.video_data.summary && (
                <div className="bg-gray-100 rounded p-3 text-xs text-gray-700 mt-2 w-full px-4">
                  <h2 className="font-semibold mb-2">サマリー</h2>
                  <div>{modalVideo.video_data.summary}</div>
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
