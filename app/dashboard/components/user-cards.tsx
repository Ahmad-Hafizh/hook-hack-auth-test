"use client";
import { TrendingUpIcon, CreditCard, FolderOpen, Crown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface UserCardsProps {
  credits?: number;
  createdProjects?: number;
  currentPlan?: string;
  isLoading?: boolean;
}

export function UserCards({
  credits = 0,
  createdProjects = 0,
  currentPlan = "Free Plan",
  isLoading = false,
}: UserCardsProps) {
  if (isLoading) {
    return (
      <div className="flex gap-4 px-4 lg:px-6">
        {[1, 2, 3].map((i) => (
          <Card
            key={i}
            className="flex-1 @container/card bg-gradient-to-br from-[#fe2858] via-[#361a20]  to-[#0f0f0f] border-2 border-[#fe2858]"
          >
            <CardHeader className="relative">
              <div className="h-4 bg-white/20 rounded animate-pulse mb-2"></div>
              <div className="h-8 bg-white/20 rounded animate-pulse"></div>
              <div className="absolute right-4 top-4">
                <div className="h-6 w-16 bg-white/20 rounded animate-pulse"></div>
              </div>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1">
              <div className="h-4 bg-white/20 rounded animate-pulse w-3/4"></div>
              <div className="h-4 bg-white/20 rounded animate-pulse w-1/2"></div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-4 px-4 lg:px-6">
      <Card className="flex-1 @container/card bg-gradient-to-br from-[#fe2858] via-[#361a20]  to-[#0f0f0f] border-2 border-[#361a20] hover:from-[#fe2858]/90 hover:to-black/90 transition-all duration-300">
        <CardHeader className="relative">
          <CardDescription className="text-white/80">Credits</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums text-white">
            {credits.toLocaleString()}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge
              variant="outline"
              className="flex gap-1 rounded-lg text-xs border-white/30 text-white bg-white/10 backdrop-blur-sm"
            >
              <CreditCard className="size-3" />
              Available
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-white">
            Available for video analysis{" "}
            <TrendingUpIcon className="size-4 text-white" />
          </div>
          <div className="text-white/70">Use credits to analyze videos</div>
        </CardFooter>
      </Card>
      <Card className="flex-1 @container/card bg-gradient-to-br from-[#fe2858] via-[#361a20]  to-[#0f0f0f] border-2 border-[#361a20] hover:from-[#fe2858]/90 hover:to-black/90 transition-all duration-300">
        <CardHeader className="relative">
          <CardDescription className="text-white/80">
            Created Projects
          </CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums text-white">
            {createdProjects}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge
              variant="outline"
              className="flex gap-1 rounded-lg text-xs border-white/30 text-white bg-white/10 backdrop-blur-sm"
            >
              <FolderOpen className="size-3" />
              Total
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-white">
            Total projects created <FolderOpen className="size-4 text-white" />
          </div>
          <div className="text-white/70">Successfully completed</div>
        </CardFooter>
      </Card>
      <Card className="flex-1 @container/card bg-gradient-to-br from-[#fe2858] via-[#361a20]  to-[#0f0f0f] border-2 border-[#361a20] hover:from-[#fe2858]/90 hover:to-black/90 transition-all duration-300">
        <CardHeader className="relative">
          <CardDescription className="text-white/80">
            Current Plan
          </CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums text-white">
            {currentPlan}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge
              variant="outline"
              className="flex gap-1 rounded-lg text-xs border-white/30 text-white bg-white/10 backdrop-blur-sm"
            >
              <Crown className="size-3" />
              Active
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-white">
            Current subscription plan <Crown className="size-4 text-white" />
          </div>
          <div className="text-white/70">Plan features and limits</div>
        </CardFooter>
      </Card>
    </div>
  );
}
