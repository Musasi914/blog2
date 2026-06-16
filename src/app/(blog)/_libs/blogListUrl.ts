import { BlogListQuery, BlogSortOrder, CategoryType } from "@/types/BlogType";

export type BlogListFilters = {
  query: string;
  sort: BlogSortOrder;
  dateFrom: string;
  dateTo: string;
};

const MONTH_PATTERN = /^\d{4}-\d{2}$/;

/** 選択可能な最古の月（2024年11月） */
export const BLOG_MONTH_MIN = "2024-11";

export function getBlogMonthMax() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export function isValidMonthValue(value: string) {
  return MONTH_PATTERN.test(value);
}

export function isSelectableBlogMonth(value: string) {
  if (!isValidMonthValue(value)) return false;
  return value >= BLOG_MONTH_MIN && value <= getBlogMonthMax();
}

export function clampBlogMonth(value: string) {
  if (!isValidMonthValue(value)) return "";
  if (value < BLOG_MONTH_MIN || value > getBlogMonthMax()) return "";
  return value;
}

export function normalizeDateRange(dateFrom: string, dateTo: string) {
  if (!dateFrom || !dateTo || dateFrom <= dateTo) {
    return { dateFrom, dateTo };
  }

  return { dateFrom: dateTo, dateTo: dateFrom };
}

export function parseBlogListFilters(
  searchParams: URLSearchParams
): BlogListFilters {
  const dateFrom = searchParams.get("from") ?? "";
  const dateTo = searchParams.get("to") ?? "";

  return {
    query: searchParams.get("q") ?? "",
    sort: searchParams.get("sort") === "oldest" ? "oldest" : "newest",
    dateFrom: clampBlogMonth(dateFrom),
    dateTo: clampBlogMonth(dateTo),
  };
}

export function buildBlogListUrlQueryString(filters: BlogListFilters) {
  const params = new URLSearchParams();
  const trimmedQuery = filters.query.trim();

  if (trimmedQuery) {
    params.set("q", trimmedQuery);
  }
  if (filters.sort !== "newest") {
    params.set("sort", filters.sort);
  }
  if (filters.dateFrom) {
    params.set("from", filters.dateFrom);
  }
  if (filters.dateTo) {
    params.set("to", filters.dateTo);
  }

  const queryString = params.toString();
  return queryString ? `?${queryString}` : "";
}

export function buildBlogListQueryOptions(
  filters: BlogListFilters
): BlogListQuery {
  const trimmedQuery = filters.query.trim();

  return {
    ...(trimmedQuery ? { query: trimmedQuery } : {}),
    sort: filters.sort,
    ...(filters.dateFrom ? { dateFrom: filters.dateFrom } : {}),
    ...(filters.dateTo ? { dateTo: filters.dateTo } : {}),
  };
}

export function hasActiveFilters(filters: BlogListFilters) {
  return (
    filters.query.trim() !== "" ||
    filters.sort !== "newest" ||
    filters.dateFrom !== "" ||
    filters.dateTo !== ""
  );
}

export function buildBlogListStorageKey(
  category: CategoryType | undefined,
  filters: BlogListFilters
) {
  const categoryKey = category ?? "all";
  const queryKey = filters.query.trim() || "none";
  const dateFromKey = filters.dateFrom || "none";
  const dateToKey = filters.dateTo || "none";

  return `blogList:${categoryKey}:${queryKey}:${filters.sort}:${dateFromKey}:${dateToKey}`;
}

export function buildBlogListScrollKey(
  category: CategoryType | undefined,
  filters: BlogListFilters
) {
  return `${buildBlogListStorageKey(category, filters)}-scrollPosition`;
}

export function buildBlogListPath(category: CategoryType | undefined) {
  return category ? `/category/${category}` : "/";
}
