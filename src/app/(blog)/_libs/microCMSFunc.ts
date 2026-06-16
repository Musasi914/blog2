import {
  BlogListQuery,
  BlogSortOrder,
  BlogType,
  CategoryType,
  PagenationGetBlogType,
} from "@/types/BlogType";
import { BASE_URL } from "./data";

const CATEGORY_ID_MAP: Record<CategoryType, string> = {
  memory: "sq6jyab_dcj",
  release: "5plhbfsr2",
  learn: "6x-voqyv7x_k",
  important: "djjof-818q",
};

function getOrdersParam(sort: BlogSortOrder = "newest") {
  return sort === "newest" ? "-publishedAt" : "publishedAt";
}

const MONTH_PATTERN = /^\d{4}-\d{2}$/;

export function getMonthUpperBound(dateTo: string) {
  const [yearStr, monthStr] = dateTo.split("-");
  const year = Number(yearStr);
  const month = Number(monthStr);

  if (month === 12) {
    return `${year + 1}-01-01`;
  }

  return `${year}-${String(month + 1).padStart(2, "0")}-01`;
}

function buildFilterParts(options?: BlogListQuery & { category?: CategoryType }) {
  const parts: string[] = [];

  if (options?.category) {
    parts.push(`category[contains]${CATEGORY_ID_MAP[options.category]}`);
  }

  if (options?.dateFrom && MONTH_PATTERN.test(options.dateFrom)) {
    parts.push(`publishedAt[greater_than]${options.dateFrom}-01`);
  }

  if (options?.dateTo && MONTH_PATTERN.test(options.dateTo)) {
    parts.push(`publishedAt[less_than]${getMonthUpperBound(options.dateTo)}`);
  }

  return parts;
}

export function buildBlogListQuery(
  limit: number,
  offset: number,
  options?: BlogListQuery & { category?: CategoryType }
) {
  const params = new URLSearchParams({
    limit: String(limit),
    offset: String(offset),
    orders: getOrdersParam(options?.sort),
  });

  const query = options?.query?.trim();
  if (query) {
    params.set("q", query);
  }

  const filters = buildFilterParts(options).join("[and]");
  if (filters) {
    params.set("filters", filters);
  }

  return params.toString();
}

async function fetchBlogList(queryString: string) {
  const response = await fetch(`${BASE_URL}/api/v1/blog?${queryString}`, {
    headers: {
      "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY || "",
    },
    method: "GET",
  });
  const data = await response.json();
  return data.contents as BlogType[];
}

// ブログ取得（Server Action用
export async function getBlogs(
  limit = 10,
  offset = 0,
  options?: BlogListQuery
) {
  const queryString = buildBlogListQuery(limit, offset, options);
  return fetchBlogList(queryString);
}

// 静的生成用: 全記事ID取得
export async function getAllContentIds(): Promise<string[]> {
  let offset = 0;
  const limit = 100;
  let ids: string[] = [];

  while (true) {
    const response = await fetch(
      `${BASE_URL}/api/v1/blog?limit=${limit}&offset=${offset}&fields=id`,
      {
        headers: {
          "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY || "",
        },
        method: "GET",
        // next: { revalidate: 3600 }, // ISR: 1時間ごとに再検証
      }
    );
    const data = await response.json();
    ids.push(...data.contents.map((c: { id: string }) => c.id));

    if (data.contents.length < limit) break;
    offset += limit;
  }

  return ids;
}

// 特定のブログ取得（SSG用 - 静的生成）
export async function getPost(id: string) {
  const response = await fetch(`${BASE_URL}/api/v1/blog/${id}`, {
    headers: {
      "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY || "",
    },
    method: "GET",
    // next: { revalidate: 3600 }, // ISR: 1時間ごとに再検証（オプション）
  });
  const data = await response.json();
  return data as BlogType;
}

// sitemap用（静的生成）
export async function getSitemapIds() {
  const targetCategoryIds = ["6x-voqyv7x_k"]; // learn

  let offset = 0;
  const limit = 100;
  let ids: string[] = [];

  // 正しいフィルタ構文: 各カテゴリIDに対してcategory[contains]を付ける
  const filterQuery = targetCategoryIds
    .map((id) => `category[contains]${id}`)
    .join("[or]");

  while (true) {
    const res = await fetch(
      `${BASE_URL}/api/v1/blog?filters=${filterQuery}&limit=${limit}&offset=${offset}&fields=id`,
      {
        headers: {
          "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY || "",
        },
        method: "GET",
        cache: "force-cache", // 静的生成用なのでキャッシュ
      }
    );
    const data = await res.json();
    ids.push(...data.contents.map((c: { id: string }) => c.id));

    if (data.contents.length < limit) break;
    offset += limit;
  }

  return ids;
}

// カテゴリ別ブログ取得
export async function getBlogsFromCategory(
  category: CategoryType,
  limit = 10,
  offset = 0,
  options?: BlogListQuery
) {
  const queryString = buildBlogListQuery(limit, offset, {
    ...options,
    category,
  });
  return fetchBlogList(queryString);
}

// 次の記事（より新しい記事）を取得
export async function getNextPost(
  currentPublishedAt: string
): Promise<PagenationGetBlogType | null> {
  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/blog?filters=publishedAt[greater_than]${currentPublishedAt}&limit=1&fields=id,title,publishedAt,category.title&orders=publishedAt`,
      {
        headers: {
          "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY || "",
        },
        method: "GET",
        // next: { revalidate: 3600 }, // ISR: 1時間ごとに再検証
      }
    );
    const data = await response.json();
    return (data.contents[0] as PagenationGetBlogType) || null;
  } catch (error) {
    console.error("Error fetching next post:", error);
    return null;
  }
}

// 前の記事（より古い記事）を取得
export async function getPrevPost(
  currentPublishedAt: string
): Promise<PagenationGetBlogType | null> {
  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/blog?filters=publishedAt[less_than]${currentPublishedAt}&limit=1&fields=id,title,publishedAt,category.title&orders=-publishedAt`,
      {
        headers: {
          "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY || "",
        },
        method: "GET",
        // next: { revalidate: 3600 }, // ISR: 1時間ごとに再検証
      }
    );
    const data = await response.json();
    return (data.contents[0] as PagenationGetBlogType) || null;
  } catch (error) {
    console.error("Error fetching prev post:", error);
    return null;
  }
}
