"use client";

import { useState, useEffect } from "react";
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

// Resume data interface
export interface ResumeData {
  id: string;
  userinput: any;
  comment: any;
  hook: any;
  content: any;
  resumeStep: number;
  resumeMetadata?: {
    hasUserinput: boolean;
    hasComment: boolean;
    hasHook: boolean;
    hasContent: boolean;
    lastModified: string;
  };
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

// Props interface for MultiStepForm
interface MultiStepFormProps {
  resumeData?: ResumeData | null;
  initialStep?: number;
}

export function MultiStepForm({
  resumeData = null,
  initialStep = 1,
}: MultiStepFormProps) {
  const { userId } = useAuth();
  const [currentStep, setCurrentStep] = useState(initialStep);
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
  // Resume Logic: Hydrate form state with existing data
  // ----------------------
  useEffect(() => {
    if (resumeData) {
      console.log("🔄 MultiStepForm - Hydrating with resume data:", resumeData);

      // Set project ID for existing project
      if (resumeData.id) {
        setProjectId(resumeData.id);
        console.log("✅ MultiStepForm - Project ID set:", resumeData.id);
      }

      // Hydrate user input data (Step 1)
      if (resumeData.userinput) {
        setUserInputData(resumeData.userinput);
        console.log(
          "✅ MultiStepForm - User input data hydrated:",
          resumeData.userinput
        );
      }

      // Hydrate selected comment (Step 2)
      if (resumeData.comment) {
        setSelectedComment(resumeData.comment);
        console.log(
          "✅ MultiStepForm - Selected comment hydrated:",
          resumeData.comment
        );
        console.log(
          "🔍 Comment structure:",
          Object.keys(resumeData.comment || {})
        );
      }

      // Hydrate selected hook (Step 3)
      if (resumeData.hook) {
        setSelectedHook(resumeData.hook);
        console.log(
          "✅ MultiStepForm - Selected hook hydrated:",
          resumeData.hook
        );
        console.log("🔍 Hook structure:", Object.keys(resumeData.hook || {}));
      }

      // Set current step to resume step
      setCurrentStep(resumeData.resumeStep);
      console.log(
        "✅ MultiStepForm - Current step set to:",
        resumeData.resumeStep
      );

      // If we have userinput, we need comment data for Step 2
      // Pre-fetch comments if resuming from step 2 or later and no comments loaded
      // DISABLED: Auto-fetching causes CORS issues, let user manually fetch if needed
      // if (resumeData.resumeStep >= 2 && resumeData.userinput && commentListData.length === 0) {
      //   console.log("🔄 MultiStepForm - Pre-fetching comments for resume...");
      //   fetchCommentsForInput(resumeData.userinput);
      // }

      console.log(
        "🔄 MultiStepForm - Resume data loaded, skipping auto-fetch to avoid CORS issues"
      );
    }
  }, [resumeData]); // Only run when resumeData changes

  // ----------------------
  // Update currentStep when initialStep prop changes
  // ----------------------
  useEffect(() => {
    if (!resumeData) {
      // Only update if not resuming (resumeData takes precedence)
      setCurrentStep(initialStep);
    }
  }, [initialStep, resumeData]);

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

  const handleSwitchComplete = async () => {
    console.log(
      "🔄 MultiStepForm - Saving switch state and advancing to Step 5"
    );

    // Store switch state as metadata that will be used in content generation
    const switchMetadata = {
      switchState: switchState,
      stepCompleted: 4,
      timestamp: new Date().toISOString(),
    };

    // We'll store this in the hook field as metadata, or wait until content generation
    // For now, just advance to step 5 - the switchState is already in component state
    console.log(
      "🔄 MultiStepForm - Switch state ready for content generation:",
      switchState
    );
    setCurrentStep(5);
  };

  // ----------------------
  // Step 5: Content Generation Complete
  // ----------------------
  const handleContentGenerated = async (content: any) => {
    console.log(
      "🔄 MultiStepForm - Content generated, saving to database:",
      content
    );
    await updateProjectInDatabase("content", content);
    console.log("✅ MultiStepForm - Content saved to database");
  };

  // ----------------------
  // Skip/Next functions for resumed projects
  // ----------------------
  const handleSkipToNextStep = async () => {
    console.log(
      `🔄 MultiStepForm - Skipping from step ${currentStep} to ${currentStep + 1}`
    );
    setCurrentStep(currentStep + 1);
  };

  const handleReselect = () => {
    console.log(
      `🔄 MultiStepForm - User wants to re-select in step ${currentStep}`
    );
    // The existing selection handlers will be used when user makes new selection
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
          <div>
            <SelectComment
              data={commentListData}
              onSelectComment={handleCommentSelected}
              onPlayVideo={handlePlayVideo}
              searchword={userInputData.searchword}
            />

            {/* Show manual fetch button if we're resuming and have no comments */}
            {resumeData && commentListData.length === 0 && (
              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-amber-700 font-medium">
                      Comments not loaded. You can fetch new comments if you
                      want to change your selection.
                    </p>
                    <p className="text-xs text-amber-600 mt-1">
                      Previous comment: "
                      {selectedComment?.text?.substring(0, 50) ||
                        "Comment selected"}
                      ..."
                    </p>
                  </div>
                  <button
                    onClick={() => fetchCommentsForInput(userInputData)}
                    className="bg-amber-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-amber-700 transition-colors"
                    disabled={isLoading}
                  >
                    {isLoading ? "Fetching..." : "Fetch Comments"}
                  </button>
                </div>
              </div>
            )}

            {/* Show skip button if we're resuming and already have a comment */}
            {resumeData && selectedComment && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-700 font-medium">
                      You already selected a comment. Continue with your
                      previous selection or choose a new one.
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      Previous: "
                      {selectedComment?.text?.substring(0, 50) ||
                        "Comment selected"}
                      ..."
                    </p>
                  </div>
                  <button
                    onClick={handleSkipToNextStep}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Continue with Previous →
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      case 3:
        return (
          <div>
            <SelectHook
              selectedRow={selectedComment}
              onSelectHook={handleHookSelected}
            />
            {/* Show skip button if we're resuming and already have a hook */}
            {resumeData && selectedHook && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-700 font-medium">
                      You already selected a hook. Continue with your previous
                      selection or choose a new one.
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      Previous: "
                      {selectedHook?.text?.substring(0, 50) ||
                        selectedHook?.label ||
                        Object.values(selectedHook || {})?.[0]
                          ?.toString()
                          ?.substring(0, 50) ||
                        "Hook selected"}
                      ..."
                    </p>
                  </div>
                  <button
                    onClick={handleSkipToNextStep}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Continue with Previous →
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      case 4:
        return (
          <div>
            <ProductionSwitch
              commentInfo={selectedComment}
              value={{
                production: switchState.production as "Inside" | "Outside",
                purpose: switchState.purpose as "Impression" | "Conversion",
              }}
              onChange={handleSwitchChange}
            />
            {/* Always show continue button for Step 4 */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleSwitchComplete}
                className="bg-[#fe2858] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#d91f4a] transition-colors"
              >
                Continue to Content Generation →
              </button>
            </div>
          </div>
        );
      case 5:
        return (
          <StructureGenerator
            video_url={""}
            client_input={{
              ...userInputData,
              switchState: switchState, // Include switch state in client input
            }}
            selectedHook={selectedHook}
            onContentGenerated={handleContentGenerated}
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
      if (projectId) {
        // Resume case: Update existing project
        console.log("🔄 MultiStepForm - Updating existing project:", projectId);
        const updateData = {
          userinput: JSON.stringify(dataToSave),
        };
        const response = await fetch(`/api/project/${projectId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        });
        if (!response.ok) throw new Error("Failed to update user input");
        console.log(
          "✅ MultiStepForm - User input updated for existing project"
        );
      } else {
        // Fresh case: Create new project
        console.log("🔄 MultiStepForm - Creating new project");
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
        console.log(
          "✅ MultiStepForm - New project created with ID:",
          result.project.id
        );
      }
    } catch (error) {
      console.error("❌ MultiStepForm - Error saving user input:", error);
      // handle error
    } finally {
      setIsSaving(false);
    }
  };

  // Update project in DB (Step 2/3)
  const updateProjectInDatabase = async (field: string, data: any) => {
    if (!projectId) {
      console.warn("⚠️ MultiStepForm - No project ID available for update");
      return;
    }

    console.log(
      `🔄 MultiStepForm - Updating project ${projectId} field: ${field}`
    );
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
      console.log(
        `✅ MultiStepForm - Successfully updated ${field} for project ${projectId}`
      );
    } catch (error) {
      console.error(`❌ MultiStepForm - Error updating ${field}:`, error);
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
            client_input={{
              ...userInputData,
              switchState: switchState, // Include switch state in client input
            }}
            selectedHook={selectedHook}
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
