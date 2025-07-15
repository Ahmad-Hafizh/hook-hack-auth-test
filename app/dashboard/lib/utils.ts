/**
 * Utility functions for the dashboard
 */

/**
 * Serializes BigInt and Date objects for JSON responses
 * Handles BigInt conversion to string and Date conversion to ISO string
 */
export function serializeBigInt(obj: any): any {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === "bigint") return obj.toString();
  if (obj instanceof Date) return obj.toISOString();
  if (Array.isArray(obj)) return obj.map(serializeBigInt);
  if (typeof obj === "object") {
    const newObj: any = {};
    for (const key in obj) {
      newObj[key] = serializeBigInt(obj[key]);
    }
    return newObj;
  }
  return obj;
}

/**
 * Parses userinput JSON safely
 * Returns parsed object or empty object if parsing fails
 */
export function parseUserInput(userinput: any): any {
  try {
    return typeof userinput === "string" ? JSON.parse(userinput) : userinput;
  } catch (e) {
    return {};
  }
}

/**
 * Formats date to locale string
 * Returns formatted date or "-" if invalid
 */
export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return "-";
  try {
    return new Date(dateString).toLocaleDateString();
  } catch (e) {
    return "-";
  }
}

/**
 * Filters projects based on search term
 * Searches in searchword and product_name fields within userinput JSON
 */
export function filterProjects(projects: any[], searchTerm: string): any[] {
  if (!searchTerm.trim()) return projects;

  return projects.filter((project) => {
    const userinput = parseUserInput(project.userinput);
    const s = searchTerm.toLowerCase();
    return (
      (userinput.searchword || "").toLowerCase().includes(s) ||
      (userinput.product_name || "").toLowerCase().includes(s)
    );
  });
}
