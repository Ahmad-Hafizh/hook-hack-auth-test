export type SortField = "head_company" | "name" | "url" | "title" | "source";
export type SortDirection = "asc" | "desc";

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}
