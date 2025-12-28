import {
  BlogType,
  CategoryType,
  PagenationGetBlogType,
} from "@/types/BlogType";
import { BASE_URL } from "./data";

// ブログ取得（Server Action用
export async function getBlogs(limit = 10, offset = 0) {
  const response = await fetch(
    `${BASE_URL}/api/v1/blog?limit=${limit}&offset=${offset}&orders=-publishedAt`,
    {
      headers: {
        "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY || "",
      },
      method: "GET",
    }
  );
  const data = await response.json();
  return data.contents as BlogType[];
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
        // next: { revalidate: 3600 }, // ISR: 1日ごとに再検証
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
    // next: { revalidate: 3600 }, // ISR: 1日ごとに再検証（オプション）
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
  offset = 0
) {
  let categoryVariants;
  switch (category) {
    case "memory":
      categoryVariants = "sq6jyab_dcj";
      break;

    case "release":
      categoryVariants = "5plhbfsr2";
      break;

    case "learn":
      categoryVariants = "6x-voqyv7x_k";
      break;

    case "important":
      categoryVariants = "djjof-818q";
      break;

    default:
      break;
  }
  const response = await fetch(
    `${BASE_URL}/api/v1/blog?filters=category[contains]${categoryVariants}&limit=${limit}&offset=${offset}&orders=-publishedAt`,
    {
      headers: {
        "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY || "",
      },
      method: "GET",
      // next: { revalidate: 3600 }, // ISR: 1日ごとに再検証
    }
  );
  const data = await response.json();
  return data.contents as BlogType[];
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
        // next: { revalidate: 3600 }, // ISR: 1日ごとに再検証
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
        // next: { revalidate: 3600 }, // ISR: 1日ごとに再検証
      }
    );
    const data = await response.json();
    return (data.contents[0] as PagenationGetBlogType) || null;
  } catch (error) {
    console.error("Error fetching prev post:", error);
    return null;
  }
}
