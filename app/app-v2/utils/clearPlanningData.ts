// Call this after video generation to clear all planning data from localStorage
export function clearPlanningData() {
  try {
    localStorage.removeItem("planning_what_data");
    localStorage.removeItem("planning_how_data");
    localStorage.removeItem("planning_what_product_url");
  } catch (e) {
    console.error("Error clearing planning data:", e);
  }
}
