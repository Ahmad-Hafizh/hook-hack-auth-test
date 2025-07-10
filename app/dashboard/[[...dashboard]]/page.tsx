"use client";
import { useUser, UserButton, UserProfile } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
  const searchInputRef = useRef<HTMLInputElement>(null);

  // ===== API HANDLERS =====

  /**
   * Handles server-side search functionality
   * Triggers API call with search parameters and updates project list
   */
  const handleSearch = async () => {
    setSearchTerm(search.trim()); // Set the actual search term for filtering
    setPage(1); // Reset to first page when searching
    let url = `/api/project?page=1&pageSize=${pageSize}`;
    if (search.trim()) {
      url += `&search=${encodeURIComponent(search.trim())}`;
    }
    setProjectLoading(true);
    setProjectError("");
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch projects");
      const data = await res.json();
      setProjects(data.projects || []);
      setTotalPages(data.totalPages || 1);
    } catch (err: any) {
      setProjectError(err.message || "Failed to fetch projects");
    } finally {
      setProjectLoading(false);
    }
  };

  /**
   * Handles credit deduction and navigation to app
   * Decreases user credit by 1 before allowing access to project creation
   */
  const handleGoToApp = async () => {
    setLoadingToApp(true);
    setProjectError("");

    try {
      // Call API to decrease credit by 1
      const res = await fetch("/api/user/decrease-credit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to decrease credit");
      }

      const data = await res.json();

      // Update local user state with new credit amount
      if (data.user && dbUser) {
        setDbUser(data.user);
      }

      // Proceed to app after successful credit decrease
      setTimeout(() => {
        router.push("/app");
      }, 700);
    } catch (err: any) {
      setProjectError(err.message || "Failed to create new project");
      setLoadingToApp(false);
    }
  };

  // ===== EFFECTS =====

  /**
   * Fetch user data from database on component mount
   * Only runs when user is loaded and signed in
   */
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      setDbUserLoading(true);
      setDbUserError("");
      fetch("/api/user")
        .then(async (res) => {
          if (!res.ok) {
            const err = await res.json();
            throw new Error(err.error || "Failed to fetch user");
          }
          return res.json();
        })
        .then((data) => {
          setDbUser(data.user);
          setDbUserLoading(false);
        })
        .catch((err) => {
          setDbUserError(err.message);
          setDbUserLoading(false);
        });
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
      setProjectLoading(true);
      setProjectError("");
      let url = `/api/project?page=${page}&pageSize=${pageSize}`;
      fetch(url)
        .then(async (res) => {
          if (!res.ok) {
            const err = await res.json();
            throw new Error(err.error || "Failed to fetch projects");
          }
          return res.json();
        })
        .then((data) => {
          setProjects(data.projects || []);
          setTotalPages(data.totalPages || 1);
          setProjectLoading(false);
        })
        .catch((err) => {
          setProjectError(err.message);
          setProjectLoading(false);
        });
    }
  }, [isLoaded, isSignedIn, page, pageSize]);

  // ===== COMPUTED VALUES =====

  /**
   * Filter projects based on search term
   * Searches in searchword and product_name fields within userinput JSON
   */
  const filteredProjects = searchTerm
    ? projects.filter((project) => {
        let userinput: any = {};
        try {
          userinput =
            typeof project.userinput === "string"
              ? JSON.parse(project.userinput)
              : project.userinput;
        } catch (e) {}
        const s = searchTerm.toLowerCase();
        return (
          (userinput.searchword || "").toLowerCase().includes(s) ||
          (userinput.product_name || "").toLowerCase().includes(s)
        );
      })
    : projects;

  // ===== LOADING STATES =====

  // Show loading spinner while Clerk is initializing
  if (!isLoaded)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#272727]">
        <div className="flex flex-col items-center">
          <svg
            className="animate-spin h-12 w-12 text-[#fe2858] mb-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-[#fe2858] mb-2">Loading...</h2>
          <p className="text-gray-300">
            Please wait while we prepare your workspace.
          </p>
        </div>
      </div>
    );

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
      {/* ===== NAVIGATION BAR ===== */}
      <nav className="bg-[#181818] shadow-md border-b border-[#232323]">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-12 sm:px-12 sm:py-8 lg:px-16 lg:py-12 h-20">
          <div className="flex items-center space-x-2">
            <a href="/dashboard">
              <img src="/newlogo.svg" alt="logo" className="h-9 w-auto my-3" />
            </a>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-white hover:text-[#fe2858] transition-colors font-semibold"
            >
              Home
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </nav>

      {/* ===== MAIN CONTENT ===== */}
      <main className="max-w-7xl mx-auto py-14 sm:px-6 lg:px-8">
        <div className="px-4 py-1 sm:px-0">
          {/* ===== HEADER SECTION ===== */}
          <div className="flex justify-between items-center w-full mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome to HookHack
                {user?.firstName ? `, ${user.firstName}` : ""}
              </h1>
              <p className="text-gray-300">
                Your TikTok analytics and insights dashboard
              </p>
            </div>

            {/* ===== ACTION BUTTONS ===== */}
            <div className="grid grid-cols-2 gap-6 items-stretch w-fit ml-auto">
              {/* Create New Project Button - Disabled when no credit */}
              <button
                onClick={handleGoToApp}
                className="bg-[#fe2858] w-full hover:bg-[#e0244f] text-white px-5 py-2 text-base font-bold rounded-md shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center -mb-5"
                disabled={!dbUser || dbUser.credit <= 0}
              >
                Create new project
              </button>

              {/* Buy Credit Button */}
              <a
                href="/buy-credit"
                className="bg-[#2af0ea] w-full hover:bg-[#288784] text-black px-5 py-2 text-base font-bold rounded-md shadow-lg transition-all duration-300 border border-[#2af0ea] flex items-center justify-center -mb-5"
                style={{ minWidth: 120 }}
              >
                Buy Credit
              </a>

              {/* Credit Error Message */}
              {(!dbUser || dbUser.credit <= 0) && (
                <div className="col-span-2 text-red-400 text-sm mt-2 w-full text-center">
                  {!dbUser
                    ? "Loading user data..."
                    : "You do not have enough credit to create a new project. Please buy more credit."}
                </div>
              )}
            </div>
          </div>

          {/* ===== USER ACCOUNT SECTION ===== */}
          <div className="mb-8">
            {dbUserLoading && (
              <div className="text-gray-400">Loading your data...</div>
            )}
            {dbUserError && (
              <div className="text-red-400 font-semibold">{dbUserError}</div>
            )}
            {dbUser && (
              <div className="bg-[#232323] rounded-lg p-6 text-white shadow mb-4">
                <div className="mb-2 font-bold text-lg">Your Account Info</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                  <div>
                    <span className="text-gray-400">Name:</span>{" "}
                    {dbUser.firstName} {dbUser.lastName}
                  </div>
                  <div>
                    <span className="text-gray-400">Email:</span> {dbUser.email}
                  </div>
                  <div>
                    <span className="text-gray-400">Phone:</span>{" "}
                    {dbUser.phoneNumber || (
                      <span className="italic text-gray-500">N/A</span>
                    )}
                  </div>
                  <div>
                    <span className="text-gray-400">TikTok:</span>{" "}
                    {dbUser.tiktokUsername || (
                      <span className="italic text-gray-500">N/A</span>
                    )}
                  </div>
                  <div>
                    <span className="text-gray-400">Credits:</span>{" "}
                    {dbUser.credit}
                  </div>
                  <div>
                    <span className="text-gray-400">Joined:</span>{" "}
                    {new Date(dbUser.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ===== STATISTICS CARDS ===== */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              {
                label: "Credits Available",
                value: dbUser ? dbUser.credit : 0,
                icon: <span className="text-white font-bold">C</span>,
                bg: "bg-[#fe2858]",
              },
              {
                label: "Analytics Generated",
                value: 0, // Replace with real value if available
                icon: <span className="text-white font-bold">A</span>,
                bg: "bg-green-600",
              },
              {
                label: "Reports Created",
                value: 0, // Replace with real value if available
                icon: <span className="text-white font-bold">R</span>,
                bg: "bg-purple-600",
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-[#232323] overflow-hidden shadow rounded-lg"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div
                        className={`w-8 h-8 ${card.bg} rounded-md flex items-center justify-center`}
                      >
                        {card.icon}
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-400 truncate">
                          {card.label}
                        </dt>
                        <dd className="text-lg font-medium text-white">
                          {card.value}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ===== PROJECTS TABLE SECTION ===== */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">
              Your Generated Projects
            </h2>

            {/* ===== SEARCH BAR ===== */}
            <div className="flex items-center gap-2 mb-4">
              <Input
                ref={searchInputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
                placeholder="Search by keyword or product name..."
                className="w-full bg-[#181818] text-white"
              />
              <Button onClick={handleSearch} variant="default" className="px-4">
                Search
              </Button>
            </div>

            {/* ===== LOADING AND ERROR STATES ===== */}
            {projectLoading && (
              <div className="text-gray-400">Loading projects...</div>
            )}
            {projectError && (
              <div className="text-red-400 font-semibold">{projectError}</div>
            )}

            {/* ===== PROJECTS TABLE ===== */}
            <div className="bg-[#232323] rounded-lg text-white shadow mb-4 p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-white">Searchword</TableHead>
                    <TableHead className="text-white">Product Name</TableHead>
                    <TableHead className="text-white">Gender</TableHead>
                    <TableHead className="text-white">Age</TableHead>
                    <TableHead className="text-white">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProjects.length === 0 && !projectLoading ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center text-gray-400"
                      >
                        No projects found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredProjects.slice(0, 5).map((project) => {
                      let userinput: any = {};
                      try {
                        userinput =
                          typeof project.userinput === "string"
                            ? JSON.parse(project.userinput)
                            : project.userinput;
                      } catch (e) {}
                      console.log(
                        "Project date debug:",
                        project.system_createdAt,
                        project
                      );
                      return (
                        <TableRow key={project.id}>
                          <TableCell>{userinput.searchword || "-"}</TableCell>
                          <TableCell>{userinput.product_name || "-"}</TableCell>
                          <TableCell>{userinput.gender || "-"}</TableCell>
                          <TableCell>{userinput.age || "-"}</TableCell>
                          <TableCell>
                            {project.system_createdAt
                              ? new Date(
                                  project.system_createdAt
                                ).toLocaleDateString()
                              : "-"}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>

              {/* ===== PAGINATION CONTROLS ===== */}
              <Pagination className="mt-4">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage((p) => Math.max(1, p - 1));
                      }}
                      aria-disabled={page === 1}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        href="#"
                        isActive={page === i + 1}
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(i + 1);
                        }}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage((p) => Math.min(totalPages, p + 1));
                      }}
                      aria-disabled={page === totalPages}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
