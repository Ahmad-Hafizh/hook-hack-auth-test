"use client";

import { useState } from "react";
import { SearchResult, StoryboardItem } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Download, Copy, Music, Video, Share2 } from "lucide-react";

interface ResultsDisplayProps {
  results: SearchResult;
}

export function ResultsDisplay({ results }: ResultsDisplayProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 transition-all">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              Analysis Results
            </h2>
            <p className="text-slate-600">
              Analysis based on top CVR videos in {results.genre}
            </p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Save</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>
          </div>
        </div>

        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>

            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Video Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-medium text-slate-800">
                    {results.videoType}
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    Most effective video format for CVR
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">BGM</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Music className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-lg font-medium text-slate-800">
                        {results.bgm.genre}
                      </p>
                      <p className="text-sm text-slate-500">
                        BPM: {results.bgm.bpm}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Average Duration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-medium text-slate-800">
                    {results.averageDuration} seconds
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    Optimal video length
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Key Points</CardTitle>
                <CardDescription>
                  Important elements analyzed from top CVR videos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {results.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-slate-700">{point}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Hook Pattern Analysis (0-3 sec)</CardTitle>
                <CardDescription>
                  Most effective patterns in hook section of top CVR videos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {results.insights.hook.map((insight, index) => (
                  <div key={index} className="p-4 rounded-lg bg-slate-50">
                    <h4 className="font-medium text-slate-800 mb-2">
                      {insight.title}
                    </h4>
                    <p className="text-slate-700 text-sm">
                      {insight.description}
                    </p>
                    <div className="flex gap-2 mt-2">
                      {insight.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Problem Pattern Analysis (3-7 sec)</CardTitle>
                <CardDescription>
                  Techniques for creating relatable problem statements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {results.insights.problem.map((insight, index) => (
                  <div key={index} className="p-4 rounded-lg bg-slate-50">
                    <h4 className="font-medium text-slate-800 mb-2">
                      {insight.title}
                    </h4>
                    <p className="text-slate-700 text-sm">
                      {insight.description}
                    </p>
                    <div className="flex gap-2 mt-2">
                      {insight.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>CTA Pattern Analysis (7-15 sec)</CardTitle>
                <CardDescription>
                  Characteristics of effective call-to-action
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {results.insights.cta.map((insight, index) => (
                  <div key={index} className="p-4 rounded-lg bg-slate-50">
                    <h4 className="font-medium text-slate-800 mb-2">
                      {insight.title}
                    </h4>
                    <p className="text-slate-700 text-sm">
                      {insight.description}
                    </p>
                    <div className="flex gap-2 mt-2">
                      {insight.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
