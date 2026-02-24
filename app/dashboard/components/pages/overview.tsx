"use client";
import { useEffect, useState } from "react";
import { ProjectsTable } from "../projects-table";
import { UserCards } from "../user-cards";
import callHomeApi from "@/config/axios/axioshome";

interface ProjectData {
  id: number;
  productName: string;
  dateCreated: string;
  creditsLeft: number;
}

interface DashboardData {
  user: {
    id: string;
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    credit: number;
    createdAt: string;
    updatedAt: string;
  };
  stats: {
    credits: number;
    createdProjects: number;
    currentPlan: string;
  };
  projects: ProjectData[];
}

// Mock data for fallback
const mockDashboardData: DashboardData = {
  user: {
    id: "1",
    userId: "user_mock",
    email: "user@example.com",
    firstName: "John",
    lastName: "Doe",
    credit: 1000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  stats: {
    credits: 1000,
    createdProjects: 12,
    currentPlan: "Free Plan",
  },
  projects: [
    {
      id: 1,
      productName: "Product Analysis - Q4 Campaign",
      dateCreated: "2024-01-15",
      creditsLeft: 150,
    },
    {
      id: 2,
      productName: "Video Performance Review",
      dateCreated: "2024-01-10",
      creditsLeft: 75,
    },
    {
      id: 3,
      productName: "Marketing Strategy Analysis",
      dateCreated: "2024-01-05",
      creditsLeft: 200,
    },
  ],
};

interface OverviewPageProps {
  title?: string;
  description?: string;
}

export default function OverviewPage({
  title = "Dashboard",
  description = "Welcome to your HookHack dashboard",
}: OverviewPageProps) {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        console.log("🔄 Fetching dashboard data...");

        const response = await callHomeApi.post("/api/dashboard", { limit: 5 });
        console.log("🔄 Dashboard API Response:", response);
        const result = response.data;

        console.log("✅ Dashboard API Response:", result);

        if (!result.success) {
          throw new Error(result.error || "Failed to fetch dashboard data");
        }

        // Log the full API result for debugging
        console.log("📊 Dashboard Data (raw):", result.data);

        // Transform projects: creditsLeft = hook_count + content_count
        const transformedProjects = (result.data.projects || []).map(
          (project: any) => ({
            ...project,
            creditsLeft:
              (typeof project.hook_count === "number"
                ? project.hook_count
                : 0) +
              (typeof project.content_count === "number"
                ? project.content_count
                : 0),
          })
        );

        // Log transformed projects for verification
        console.log("📋 Transformed Projects:", transformedProjects);

        setDashboardData({
          ...result.data,
          projects: transformedProjects,
        });
      } catch (err: any) {
        // Axios puts the response on err.response
        if (err.response && err.response.status === 401) {
          window.location.href = "/sign-in";
          return;
        }
        console.error("❌ Error fetching dashboard data:", err);
        setError(
          err.response
            ? `Error ${err.response.status}: ${err.response.data?.error || err.message}`
            : err.message || "An error occurred"
        );
        // Do not set mockDashboardData
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Get user's full name
  const getUserName = () => {
    if (dashboardData?.user) {
      const { firstName, lastName } = dashboardData.user;
      return `${firstName} ${lastName}`.trim();
    }
    return "User";
  };

  return (
    <div className="flex flex-col gap-7 py-8 md:gap-6 md:py-10 px-10 bg-[#0f0f0f] min-h-screen">
      {/* Dynamic Header */}
      <div className="px-4 lg:px-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-white my-3">
            Hi, {getUserName()}! 👋
          </h1>
          <p className="text-gray-300 mb-2">{description}</p>
          {error && (
            <div className="text-sm mb-2 text-amber-400 bg-amber-900/20 border border-amber-700 rounded-md px-3 py-2">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* User Cards with fetched data or mock data */}
      <UserCards
        credits={dashboardData?.stats.credits}
        createdProjects={dashboardData?.stats.createdProjects}
        currentPlan={dashboardData?.stats.currentPlan}
        isLoading={isLoading}
      />

      {/* Projects Table with fetched data or mock data */}
      <div className="px-5">
        <ProjectsTable
          projects={dashboardData?.projects}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
