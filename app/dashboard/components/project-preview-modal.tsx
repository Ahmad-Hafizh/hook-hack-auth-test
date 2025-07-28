"use client";

import { useState } from "react";
import { X, FileText, MessageSquare, Sparkles, Video } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ProjectData {
  id: number;
  productName: string;
  dateCreated: string;
  creditsLeft: number;
  userinput?: any;
  comment?: any;
  hook?: any;
  content?: any;
}

interface ProjectPreviewModalProps {
  project: ProjectData | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectPreviewModal({
  project,
  isOpen,
  onClose,
}: ProjectPreviewModalProps) {
  if (!project) return null;

  const formatJsonData = (data: any) => {
    if (!data) return null;

    try {
      const parsed = typeof data === "string" ? JSON.parse(data) : data;
      return parsed;
    } catch (error) {
      console.error("Failed to parse JSON data:", error);
      return null;
    }
  };

  const userInputData = formatJsonData(project.userinput);
  const commentData = formatJsonData(project.comment);
  const hookData = formatJsonData(project.hook);

  // Debug logging
  console.log("🎯 Modal opened for project:", {
    id: project.id,
    productName: project.productName,
    hasUserInput: !!project.userinput,
    hasComment: !!project.comment,
    hasHook: !!project.hook,
    hasContent: !!project.content,
  });

  if (userInputData) {
    console.log(
      "📝 UserInput data for project",
      project.id,
      ":",
      userInputData
    );
  }
  if (commentData) {
    console.log("💬 Comment data for project", project.id, ":", commentData);
  }
  if (hookData) {
    console.log("✨ Hook data for project", project.id, ":", hookData);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-10 bg-[#0f0f0f] border-[#361a20] text-white">
        <DialogHeader className="mb-10">
          <DialogTitle className="flex items-center gap-2 text-white">
            <FileText className="h-5 w-5 text-[#fe2858]" />
            Project Preview: {project.productName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* User Input Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-[#fe2858]" />
              <h3 className="font-semibold text-lg text-white">User Input</h3>
            </div>
            {userInputData ? (
              <div className="grid grid-cols-2 gap-4 p-4 bg-[#1a1a1a] border border-[#361a20] rounded-lg">
                <div>
                  <span className="text-sm font-medium text-gray-300">
                    Search Word:
                  </span>
                  <p className="text-sm text-white">
                    {userInputData.searchword || "N/A"}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-300">
                    Product Name:
                  </span>
                  <p className="text-sm font-semibold text-[#fe2858]">
                    {userInputData.product_name || "N/A"}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-300">
                    Product Category:
                  </span>
                  <p className="text-sm text-white">
                    {userInputData.product_category || "N/A"}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-300">
                    Functional Value:
                  </span>
                  <p className="text-sm text-white">
                    {userInputData.functional_value || "N/A"}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-300">
                    Emotional Value:
                  </span>
                  <p className="text-sm text-white">
                    {userInputData.emotional_value || "N/A"}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-300">
                    Currency:
                  </span>
                  <p className="text-sm text-white">
                    {userInputData.currency || "N/A"}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-300">
                    Cost:
                  </span>
                  <p className="text-sm text-white">
                    {userInputData.cost || "N/A"}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-300">
                    Marketing Campaign:
                  </span>
                  <p className="text-sm text-white">
                    {userInputData.marketing_campaign || "N/A"}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-300">
                    Age:
                  </span>
                  <p className="text-sm text-white">
                    {userInputData.age || "N/A"}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-300">
                    Gender:
                  </span>
                  <p className="text-sm text-white">
                    {userInputData.gender || "N/A"}
                  </p>
                </div>
                <div className="col-span-2">
                  <span className="text-sm font-medium text-gray-300">
                    Issue:
                  </span>
                  <p className="text-sm text-white">
                    {userInputData.issue || "N/A"}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-gray-400 text-sm">
                No user input data available
              </p>
            )}
          </div>

          <Separator className="bg-[#361a20]" />

          {/* Comment Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-[#fe2858]" />
              <h3 className="font-semibold text-lg text-white">Comment</h3>
            </div>
            {commentData ? (
              <div className="p-4 bg-[#1a1a1a] border border-[#361a20] rounded-lg space-y-3">
                <div className="flex items-center gap-2">
                  <Badge
                    variant={commentData?.label ? "default" : "secondary"}
                    className={
                      commentData?.label
                        ? "bg-green-600 text-white"
                        : "bg-gray-600 text-white"
                    }
                  >
                    {commentData?.label ? "Verified" : "Unverified"}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-gray-300 border-gray-600"
                  >
                    Likes: {commentData?.like || 0}
                  </Badge>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-300">
                    Comment:
                  </span>
                  <p className="text-sm mt-1 text-white">
                    {commentData?.text || "N/A"}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-300">
                    Author:
                  </span>
                  <p className="text-sm text-white">
                    {commentData?.name || "N/A"}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-gray-400 text-sm">No comment data available</p>
            )}
          </div>

          <Separator className="bg-[#361a20]" />

          {/* Hook Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#fe2858]" />
              <h3 className="font-semibold text-lg text-white">Hook</h3>
            </div>
            {hookData ? (
              <div className="p-4 bg-[#1a1a1a] border border-[#361a20] rounded-lg space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-300">
                    Label:
                  </span>
                  <p className="text-sm text-white">
                    {hookData?.label || "N/A"}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-300">
                    Hook Text:
                  </span>
                  <p className="text-sm font-semibold mt-1 text-[#fe2858]">
                    {hookData?.text || "N/A"}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-gray-400 text-sm">No hook data available</p>
            )}
          </div>

          <Separator className="bg-[#361a20]" />

          {/* Content Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Video className="h-4 w-4 text-[#fe2858]" />
              <h3 className="font-semibold text-lg text-white">Content</h3>
            </div>
            <div className="p-4 bg-[#1a1a1a] border border-[#361a20] rounded-lg">
              <p className="text-sm text-gray-300">
                Content preview will be displayed here. This is a placeholder
                for the actual content.
              </p>
              <div className="mt-3 p-3 bg-[#0f0f0f] border border-[#361a20] rounded">
                <p className="text-xs text-gray-400">Content placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
