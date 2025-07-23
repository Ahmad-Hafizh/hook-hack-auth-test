/**
 * API utility functions for the dashboard
 */

/**
 * Handles server-side search functionality
 * Triggers API call with search parameters and updates project list
 */
export async function handleSearch(
  search: string,
  pageSize: number,
  setProjects: (projects: any[]) => void,
  setTotalPages: (pages: number) => void,
  setProjectLoading: (loading: boolean) => void,
  setProjectError: (error: string) => void
) {
  const searchTerm = search.trim();
  let url = `/api/project?page=1&pageSize=${pageSize}`;
  if (searchTerm) {
    url += `&search=${encodeURIComponent(searchTerm)}`;
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
}

/**
 * Handles credit deduction and navigation to app
 * Decreases user credit by 1 before allowing access to project creation
 */
export async function handleGoToApp(
  router: any,
  setLoadingToApp: (loading: boolean) => void,
  setProjectError: (error: string) => void,
  setDbUser: (user: any) => void,
  dbUser: any
) {
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
}

/**
 * Fetches user data from database
 */
export async function fetchUserData(
  setDbUser: (user: any) => void,
  setDbUserLoading: (loading: boolean) => void,
  setDbUserError: (error: string) => void
) {
  setDbUserLoading(true);
  setDbUserError("");

  try {
    const res = await fetch("/api/user");
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to fetch user");
    }
    const data = await res.json();
    setDbUser(data.user);
  } catch (err: any) {
    setDbUserError(err.message);
  } finally {
    setDbUserLoading(false);
  }
}

/**
 * Fetches projects from database with pagination
 */
export async function fetchProjects(
  page: number,
  pageSize: number,
  setProjects: (projects: any[]) => void,
  setTotalPages: (pages: number) => void,
  setProjectLoading: (loading: boolean) => void,
  setProjectError: (error: string) => void
) {
  setProjectLoading(true);
  setProjectError("");

  try {
    const url = `/api/project?page=${page}&pageSize=${pageSize}`;
    const res = await fetch(url);
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to fetch projects");
    }
    const data = await res.json();
    setProjects(data.projects || []);
    setTotalPages(data.totalPages || 1);
  } catch (err: any) {
    setProjectError(err.message);
  } finally {
    setProjectLoading(false);
  }
}
