"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

// Import components
import LoadingSpinner from "../components/LoadingSpinner";
import NavigationBar from "../components/NavigationBar";
import HeaderSection from "../components/HeaderSection";
import UserAccountSection from "../components/UserAccountSection";
import StatsCards from "../components/StatsCards";
import ProjectsTable from "../components/ProjectsTable";
import ProjectPreviewModal from "../components/ProjectPreviewModal";

// Import utilities
import { filterProjects } from "../lib/utils";
import {
  handleSearch,
  handleGoToApp,
  fetchUserData,
  fetchProjects,
} from "../lib/api";

export default function DashboardPage() {
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  // ===== STATE MANAGEMENT =====
  // Loading states
  const [loadingToApp, setLoadingToApp] = useState(false);
  const [dbUserLoading, setDbUserLoading] = useState(true);
  const [projectLoading, setProjectLoading] = useState(false);

  // Data states
  const [dbUser, setDbUser] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);

  // Error states
  const [dbUserError, setDbUserError] = useState("");
  const [projectError, setProjectError] = useState("");

  // Pagination states
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // Search states
  const [search, setSearch] = useState(""); // Input field value
  const [searchTerm, setSearchTerm] = useState(""); // Actual term used for filtering

  // ===== MODAL STATE =====
  const [previewProject, setPreviewProject] = useState<any>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // ===== API HANDLERS =====

  /**
   * Handles server-side search functionality
   * Uses utility function from lib/api
   */
  const onSearch = async () => {
    setSearchTerm(search.trim()); // Set the actual search term for filtering
    setPage(1); // Reset to first page when searching
    await handleSearch(
      search,
      pageSize,
      setProjects,
      setTotalPages,
      setProjectLoading,
      setProjectError
    );
  };

  /**
   * Handles credit deduction and navigation to app
   * Uses utility function from lib/api
   */
  const onGoToApp = async () => {
    await handleGoToApp(
      router,
      setLoadingToApp,
      setProjectError,
      setDbUser,
      dbUser
    );
  };

  // ===== EFFECTS =====

  /**
   * Fetch user data from database on component mount
   * Only runs when user is loaded and signed in
   */
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchUserData(setDbUser, setDbUserLoading, setDbUserError);
    }
  }, [isLoaded, isSignedIn]);

  /**
   * Redirect to sign-in if user is not authenticated
   */
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  /**
   * Fetch projects from database with pagination
   * Updates when page or pageSize changes
   */
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchProjects(
        page,
        pageSize,
        setProjects,
        setTotalPages,
        setProjectLoading,
        setProjectError
      );
    }
  }, [isLoaded, isSignedIn, page, pageSize]);

  // ===== COMPUTED VALUES =====

  /**
   * Filter projects based on search term
   * Uses utility function from lib/utils
   */
  const filteredProjects = filterProjects(projects, searchTerm);

  // ===== LOADING STATES =====

  // Show loading spinner while Clerk is initializing
  if (!isLoaded) return <LoadingSpinner />;

  // Prevent flash of content when not signed in
  if (!isSignedIn) return null;

  // Show loading state when navigating to app
  if (loadingToApp) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#272727]">
        <div className="text-2xl font-bold text-white animate-pulse">
          Loading App...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#272727]">
      {/* ===== PREVIEW MODAL ===== */}
      <ProjectPreviewModal
        isOpen={isPreviewOpen}
        project={previewProject}
        onClose={() => setIsPreviewOpen(false)}
      />

      {/* ===== NAVIGATION BAR ===== */}
      <NavigationBar />

      {/* ===== MAIN CONTENT ===== */}
      <main className="max-w-7xl mx-auto py-14 sm:px-6 lg:px-8">
        <div className="px-4 py-1 sm:px-0">
          {/* ===== HEADER SECTION ===== */}
          <HeaderSection dbUser={dbUser} onGoToApp={onGoToApp} />

          {/* ===== USER ACCOUNT SECTION ===== */}
          <UserAccountSection
            dbUser={dbUser}
            dbUserLoading={dbUserLoading}
            dbUserError={dbUserError}
          />

          {/* ===== STATISTICS CARDS ===== */}
          <StatsCards dbUser={dbUser} />

          {/* ===== PROJECTS TABLE SECTION ===== */}
          <ProjectsTable
            projects={filteredProjects}
            search={search}
            setSearch={setSearch}
            onSearch={onSearch}
            projectLoading={projectLoading}
            projectError={projectError}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            onPreviewProject={(project) => {
              setPreviewProject(project);
              setIsPreviewOpen(true);
            }}
          />
        </div>
      </main>
    </div>
  );
}
